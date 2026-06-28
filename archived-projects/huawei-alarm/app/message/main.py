import asyncio
import json
import time
from types import coroutine

import aiohttp
from fastapi import APIRouter, Depends, HTTPException, Request
from pydantic import BaseModel
from sqlalchemy.orm import Session
from starlette import status

from app.common import constants
from app.common.databases import get_db, engine
from app.message import models
from app.message.crud import create_message, get_message
from app.message.models import MessageBody
from app.message.schemas import MessageCreate, MessageModel, MessageEvent
from app.message.service import send_chat_message, send_user_message, reply_subscribe_url

models.Base.metadata.create_all(bind=engine)
MessageRouter = APIRouter()
sent_message_factory = {
    constants.CHAT_ID: send_chat_message,
    constants.USER_ID: send_user_message
}


@MessageRouter.post("/send")
async def sent_user_alarm(message_model: MessageModel, db: Session = Depends(get_db)):
    """
    发送消息
    :param message_model:消息体
    :param db: 数据库连接依赖
    :return: 消息发送成功
    """
    if message_model.subscribe_url:
        return reply_subscribe_url(message_model.subscribe_url)

    message_event = MessageEvent(**json.loads(message_model.message))
    message_body = MessageBody()
    message_body.build_message(message_event, message_model.message_id)
    if not sent_message_factory.get(message_body.chat_type):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="没有这种会话类型")
    message = create_message(db, message_body)
    send_message = sent_message_factory.get(message.chat_type)
    await send_message(message)
    return {"status_code": status.HTTP_200_OK, "message": "消息全部发送成功"}

