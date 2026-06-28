import time
import uuid

from sqlalchemy import Column, Integer, String, DateTime, func
from sqlalchemy.dialects.postgresql import UUID

from app.common import constants
from app.common.databases import Base
from app.message.schemas import MessageEvent


class MessageBody(Base):
    """
    type，chat_id，chat_type，principal，participator，redirect_url 需要在华为云额外配置
    """
    __tablename__ = "message_body"
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    message_id = Column(UUID(as_uuid=True), unique=True, default=lambda: str(uuid.uuid4()), comment='uuid')
    app_id = Column(String(50), nullable=True, default=None, comment='消息源id')
    type = Column(String(50), nullable=True, default=None, comment='消息类型')
    chat_id = Column(String(50), nullable=True, default=None, comment='群id')
    chat_type = Column(String(50), nullable=True, default=None, comment='会话类型')
    title = Column(String(50), nullable=True, default=None, comment='标题')
    content = Column(String(255), nullable=True, default=None, comment='内容')
    principal = Column(String(50), nullable=True, default=None, comment='负责人')
    participator = Column(String(255), nullable=True, default=None, comment='抄送')
    redirect_url = Column(String(255), nullable=True, default=None, comment='url链接')
    source = Column(String(50), nullable=True, default=None, comment='消息源')
    created_at = Column(DateTime, server_default=func.localtime(), comment='创建时间')

    def __repr__(self):
        return f'{self.principal}_{self.title}'

    def __str__(self):
        return f'{self.principal}_{self.title}'

    def build_message(self, message_event: MessageEvent, message_id: str):
        """
        和华为云数据对齐
        :param message_id: message_id
        :param message_event: 华为云传进来的消息内容
        """
        self.message_id = uuid.UUID(message_id)
        self.app_id = message_event.resource_group_id if message_event.resource_group_id else ""
        self.type = message_event.annotations.type if message_event.annotations.type else constants.INTERACTIVE
        self.chat_id = message_event.annotations.chat_id if message_event.annotations.chat_id else ""
        self.chat_type = message_event.annotations.chat_type if message_event.annotations.chat_type \
            else constants.USER_ID
        self.title = "[{}]云服务器{}通知：[{}]告警规则".format(
            message_event.metadata.event_severity,
            message_event.metadata.resource_provider,
            message_event.policy.alarm_rule_name
        )
        self.content = "**可能原因**：\n{}".format(
            message_event.annotations.alarm_probableCause_zh_cn
        )
        self.principal = message_event.annotations.principal
        self.participator = message_event.annotations.participator
        self.redirect_url = message_event.annotations.redirect_url if message_event.annotations.redirect_url \
            else "https://console.huaweicloud.com/console/?locale=zh-cn&region=cn-east-3#/home"
        self.source = message_event.metadata.resource_provider
