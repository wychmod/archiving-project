from sqlalchemy.orm import Session

from app.message.models import MessageBody
from app.message.schemas import MessageCreate


def get_message(db: Session, id: int):
    """
    数据库查询接口
    :param db: 数据库连接实例
    :param id: 消息ID
    :return: MessageBody
    """
    return db.query(MessageBody).filter(MessageBody.id == id).first()


def get_message_by_uuid(db: Session, message_id: int):
    """
    数据库查询接口通过message_id
    :param db: 数据库连接实例
    :param message_id: 消息message_id
    :return: MessageBody
    """
    return db.query(MessageBody).filter(MessageBody.message_id == message_id).first()


def create_message(db: Session, message: MessageBody):
    """
    数据库插入接口
    :param db: 数据库连接实例
    :param message: 消息体
    :return: MessageBody
    """
    db.add(message)
    db.commit()
    db.refresh(message)
    return message
