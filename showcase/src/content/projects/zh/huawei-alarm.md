---
ref: huawei-alarm
lang: zh
title: "huawei-alarm · 华为云告警 → 飞书机器人通知桥"
name: "huawei-alarm"
subtitle: "华为云告警 → 飞书机器人通知桥"
description: "华为云 AOM 告警 → 飞书机器人的 webhook 通知桥:FastAPI 接收 SMN 推送,PostgreSQL 落库审计,自动处理 SMN 订阅确认,按群聊/私聊分发 interactive 卡片或文本消息(已脱敏)"
category: tools
stack:
  - python
  - fastapi
  - postgresql
  - lark-openapi
  - webhook
status: archived
scrubbed: true
repoCleared: false
archivedAt: 2026-06-28
---
## 概览

`huawei-alarm` 是一个**华为云 AOM 告警 → 飞书(Lark)机器人的 webhook 通知桥**。部署形态是一个
FastAPI HTTP 服务,作为华为云 SMN 消息模板里配置的 HTTP/HTTPS 订阅端点:AOM 触发告警后,SMN 把
告警 JSON 推到这个服务,服务解析后落库并分发到飞书群或私聊。

它替代了企业微信/钉钉告警机器人在飞书生态中的同位能力,是"云监控告警 → 团队 IM"的轻量桥接方案。

**当前状态**:已归档(**已脱敏**)——原仓库配置文件中的真实凭证在导入时已替换为占位符。

## 请求处理流程

SMN 把告警 JSON POST 到 `/message/send` 后,服务依次:

1. **落库**:告警数据写入 PostgreSQL `message_body` 表,用于审计 / 重放
2. **订阅确认**:请求含 `subscribe_url` 字段时,直接 GET 回去完成 SMN 订阅(不调用飞书)
3. **目标分发**:按 `chat_type` 选择发送目标——群消息按 `chat_id` 注解里的群名查飞书群列表匹配 `chat_id`;私聊按 `principal` / `participator`(邮箱或手机号)查通讯录批量接口拿 `user_id`
4. **模板选择**:按 `type` 字段(`interactive` / `text`)在 `BaseTextMessage` / `UserAlarmInteractive` / `ChatAlarmInteractive` 三种卡片中分派
5. **消息渲染**:标题渲染为 `[严重级别]云服务器{资源提供方}通知:[{告警规则名}]告警规则`,内容渲染 `**可能原因**:{alarm_probableCause_zh_cn}`,附带 `redirect_url` 跳转华为云控制台;群消息时间用 UTC、私聊用 `+8h` 偏移

## 技术栈

| 层 | 选型 |
| --- | --- |
| 运行时 | `Python 3` · `FastAPI` · `Uvicorn` |
| 校验 | `Pydantic`(请求/响应 schema) |
| 数据 | `SQLAlchemy`(declarative_base + sessionmaker)+ `PostgreSQL`,`create_all` 启动自动建表 |
| 集成 | `requests` 调用飞书 OpenAPI |
| 配置 | `configparser` + `lru_cache` 单例,`env` 切换 `config-dev.ini` / `config-prod.ini`,强类型 `getboolean` / `getint` |

## 架构亮点

- **SMN 订阅确认机制**:收到含 `subscribe_url` 的请求时直接 GET 回去完成订阅,不调用飞书
- **按字段动态分派**:`sent_message_factory` dict 把 `chat_id` / `user_id` 映射到发送函数,`template` if-elif 选择卡片类
- **飞书 OpenAPI 鉴权与缓存**:`tenant_access_token` 全局缓存 + 过期时间检查(30 分钟 TTL);群列表查询与通讯录批量查询均带本地缓存
- **告警落库**:`message_body` 表保留全量告警数据,支持审计与重放
- **模板化消息**:抽象基类 + 三种卡片(`BaseTextMessage` / `UserAlarmInteractive` / `ChatAlarmInteractive`),时间字段区分时区处理
- **FastAPI 最佳实践**:`Depends(get_db)` 注入 session、`APIRouter` 拆分路由

## 学习收获

这个项目把"第三方 webhook 集成"的典型套路走了一遍:订阅确认、token 缓存、按字段分派、
模板渲染、落库审计,以及 Pydantic schema 校验 → ORM model → crud 落库 → service 转发的协同。
代码量约 270 行,结构完整、依赖清晰、目标单一,是小型 FastAPI 服务的良好样板;配套 README 完整覆盖
华为云侧的告警规则 / 行动规则 / 主题策略 / 消息模板配置教程,9 张操作截图可直接照着走完配置。

## 归档信息

- **归档日期**:2026-06-28
- **源码入口**:[`archived-projects/huawei-alarm/`](https://github.com/wychmod/archiving-project/tree/main/archived-projects/huawei-alarm)
- **归档说明**:[ARCHIVE.md](https://github.com/wychmod/archiving-project/blob/main/archived-projects/huawei-alarm/ARCHIVE.md)
- **⚠️ 安全说明**:归档配置中的飞书 `app_id` / `app_secret`、PostgreSQL 密码均已替换为 `<YOUR_*>` 占位符,不含任何真实凭证
