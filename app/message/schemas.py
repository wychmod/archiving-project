from typing import Optional, Union

from fastapi import Query
from pydantic import BaseModel


class MessageCreate(BaseModel):
    app_id: Optional[str] = Query("", max_length=50)
    chat_id: Optional[str] = Query("", max_length=50)
    type: Optional[str] = Query("", max_length=50)
    chat_type: Optional[str] = Query("", max_length=50)
    title: Optional[str] = Query("", max_length=50)
    content: Optional[str] = Query("", max_length=255)
    principal: Optional[str] = Query("", max_length=50)
    participator: Optional[str] = Query("", max_length=255)
    redirect_url: Optional[str] = Query("", max_length=255)
    source: Optional[str] = Query("", max_length=50)


class MessageAnnotations(BaseModel):
    alarm_probableCause_zh_cn: Optional[str]
    alarm_fix_suggestion_zh_cn: Optional[str]
    message: Optional[str]
    principal: Optional[str] = ""
    participator: Optional[str] = ""
    chat_type: Optional[str] = ""
    chat_id: Optional[str]
    type: Optional[str]
    redirect_url: Optional[str]


class MessageMetadata(BaseModel):
    event_name: Optional[str]
    event_severity: Optional[str]
    event_type: Optional[str]
    resource_provider: Optional[str]
    resource_type: Optional[str]
    resource_id: Optional[str]


class MessagePolicy(BaseModel):
    alarm_rule_name: Optional[str]
    bind_notification_rule_id: Optional[str]


class MessageEvent(BaseModel):
    resource_group_id: Optional[str]
    starts_at: Optional[int]
    ends_at: Optional[int]
    timeout: Optional[int]
    resource_group_id: Optional[str]
    metadata: Optional[MessageMetadata]
    annotations: Optional[MessageAnnotations]
    policy: Optional[MessagePolicy]


class MessageModel(BaseModel):
    subscribe_url: Optional[str]
    signature: Optional[str]
    subject: Optional[str]
    message_id: Optional[str]
    signature_version: Optional[str]
    type: Optional[str]
    message: Optional[str]
    unsubscribe_url: Optional[str]
    signing_cert_url: Optional[str]
    timestamp: Optional[str]
