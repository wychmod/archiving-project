import json

import uvicorn
from fastapi import FastAPI
from app.message.main import MessageRouter

app = FastAPI()

app.include_router(MessageRouter, prefix='/message', tags=['消息管理'])

if __name__ == '__main__':
    uvicorn.run('main:app', reload=True)
