import datetime
import json
import time
import requests
from fastapi import HTTPException
from starlette import status

from app.common import constants
from app.config.global_config import configs
from app.config.message_template_config import BaseTextMessage, UserAlarmInteractive, ChatAlarmInteractive
from app.message.models import MessageBody

service_cache = dict()


def reply_subscribe_url(subscribe_url):
    """
    回复订阅
    :return: 订阅成功
    """
    response = requests.get(subscribe_url)
    response = response.content
    return response


def get_tenant_access_token():
    """
    获得鉴权凭证 鉴权凭证会三十分钟过期
    :return: 鉴权凭证
    """
    if service_cache.get(constants.TENANT_ACCESS_TOKEN, None) and time.time() < service_cache.get(
            constants.TENANT_ACCESS_TOKEN_EXPIRE, 0):
        return service_cache[constants.TENANT_ACCESS_TOKEN]

    url = configs.TENANT_TOKEN_URL
    req = {
        "app_id": configs.ROBOT_APP_ID,
        "app_secret": configs.ROBOT_APP_SECRET,
    }
    headers = {
        'Content-Type': "application/json; charset=utf-8"
    }
    response = requests.request("POST", url, headers=headers, data=json.dumps(req))
    access_token_response = json.loads(response.content)
    if access_token_response['code'] != 0:
        raise HTTPException(status_code=400, detail=access_token_response['msg'])

    service_cache[constants.TENANT_ACCESS_TOKEN_EXPIRE] = time.time() + access_token_response['expire']
    service_cache[constants.TENANT_ACCESS_TOKEN] = access_token_response[constants.TENANT_ACCESS_TOKEN]
    return service_cache[constants.TENANT_ACCESS_TOKEN]


def get_header():
    """
    共同消息头
    :return: 带有鉴权凭证的消息头
    """
    return {
        'Authorization': "Bearer " + get_tenant_access_token(),
        'Content-Type': 'application/json'
    }


async def send_message(url: str, receive_id: str, msg_type: str, content: dict):
    """
    发送消息基本方法
    :param url: 发送消息的url
    :param receive_id: 消息的用户id或群id
    :param msg_type: 消息的类型
    :param content: 消息的内容
    :return:
    """
    req = {
        "receive_id": receive_id,
        "msg_type": msg_type,
        "content": json.dumps(content)
    }
    payload = json.dumps(req)
    response = requests.request("POST", url, headers=get_header(), data=payload)
    return json.loads(response.content)


def get_user_id(
        url: str = configs.GET_USER_ID_URL,
        principal: str = "",
        participator: str = "",
):
    """
    获得负责人和抄送人的userid
    :param url: 获得userid的url地址
    :param principal: 负责人
    :param participator: 抄送人
    :return: 包含（email/phone， userid）元组的list
    """
    users = [user for user in participator.split(",") if participator]
    users.append(principal)
    req = {
        "emails": users,
        "mobiles": users
    }
    payload = json.dumps(req)
    response = requests.request("POST", url, headers=get_header(), data=payload)
    response = json.loads(response.content)
    if response["code"] != 0:
        raise HTTPException(status_code=400, detail=response['msg'])
    res_set = set()
    user_list = response['data']['user_list']
    for user in user_list:
        if user.get('user_id'):
            email_or_mobile = user['email'] if user.get('email') else user['mobile']
            res_set.add((email_or_mobile, user['user_id']))
    return list(res_set)


async def send_user_message(
        message: MessageBody,
        url: str = configs.USER_MESSAGE_URL,
):
    """
    给用户发送飞书信息
    :param message: model定义的消息模型
    :param url: 发送地址url
    """
    if message.type == constants.TEXT:
        template = BaseTextMessage
    elif message.type == constants.INTERACTIVE:
        template = UserAlarmInteractive
    else:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="没有这种消息类型")
    template_message = template(title=message.title, content=message.content, principal=message.principal,
                                redirect_url=message.redirect_url,
                                time=(message.created_at+datetime.timedelta(hours=8)).strftime('%Y-%m-%d %H:%M:%S'))
    users = get_user_id(principal=message.principal, participator=message.participator)
    if not users:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="没有有效私聊对象")
    fail_list = []
    for user_identity, user_id in users:
        response = await send_message(url=url, receive_id=user_id, msg_type=message.type,
                                      content=template_message.build_message())
        if response['code'] != 0:
            fail_list.append(user_identity)
    if len(fail_list) != 0:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=",".join(fail_list) + "发送失败"
        )


async def send_chat_message(
        message: MessageBody,
        url: str = configs.CHAT_MESSAGE_URL,
):
    """
    给群发送飞书信息
    :param message: model定义的消息模型
    :param url: 发送地址url
    """
    if message.type == constants.TEXT:
        template = BaseTextMessage
    elif message.type == constants.INTERACTIVE:
        template = ChatAlarmInteractive
    else:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="没有这种消息类型")
    template_message = template(title=message.title, content=message.content, principal=message.principal,
                                redirect_url=message.redirect_url,
                                time=message.created_at.strftime('%Y-%m-%d %H:%M:%S'))
    chat_id = get_chat_id(chat_name=message.chat_id)
    if not chat_id:
        raise HTTPException(status_code=400, detail="请配置有效群信息")

    req = {
        "receive_id": chat_id,
        "msg_type": message.type,
        "content": json.dumps(template_message.build_message())
    }
    payload = json.dumps(req)
    response = requests.request("POST", url, headers=get_header(), data=payload)
    response = json.loads(response.content)
    if response['code'] != 0:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="群消息发送失败"
        )


def get_chat_id(chat_name: str = ""):
    """
    根据群名获得chat_id
    :param chat_name: 群名
    :return: chat_id
    """
    if not chat_name:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="请配置有效群信息")

    if service_cache.get("chat_id_" + chat_name, None):
        return service_cache["chat_id_" + chat_name]

    url = configs.CHAT_INFO_URL
    response = requests.request("GET", url, headers=get_header())
    chat_id_response = json.loads(response.content)
    if chat_id_response['code'] != 0:
        raise HTTPException(status_code=400, detail="请配置有效群信息")

    chat_id_items = chat_id_response['data'].get("items", [])
    for item in chat_id_items:
        if item.get("name", "") == chat_name:
            service_cache["chat_id_" + chat_name] = item.get("chat_id", "")
    return service_cache.get("chat_id_" + chat_name, "")
