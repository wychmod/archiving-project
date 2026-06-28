from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

from app.config.global_config import configs

# 数据库配置
SQLALCHEMY_DATABASE_URL = 'postgresql://{}:{}@{}:{}/{}'.format(
    configs.PGSQL_USER,
    configs.PGSQL_PASSWD,
    configs.PGSQL_HOST,
    configs.PGSQL_PORT,
    configs.PGSQL_DBNAME
)


engine = create_engine(
    SQLALCHEMY_DATABASE_URL, echo=configs.PGSQL_ECHO
)

SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False, expire_on_commit=True)

Base = declarative_base(name='Base')


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()