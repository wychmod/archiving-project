# 归档说明

## 基本信息

- 原仓库：git@github.com:wychmod/huawei-alarm.git
- 归档目录：archived-projects/huawei-alarm/
- 归档日期：2026-06-28
- 导入分支：`main`(源仓库唯一分支)
- 导入提交(源仓库原始 HEAD)：`f1fb6f202c6abc0e8f8898b5ef79a41d9382a659`
- 导入提交(归档仓库 squash)：`9405ef3506ad3b16c402eda01addd95267f4e7e4`
- **导入方式**：源仓库 `f1fb6f2` 把真实飞书 `app_secret` 与数据库密码明文提交进了 `config-{dev,prod}.ini`,直接 `git subtree add` 会把凭证冻结进归档仓库的 history blob 里,触发 GitHub Push Protection。owner 授权后,**先在临时克隆里把凭证替换为占位符并独立 commit**,再以这个脱敏后的 HEAD 作为 subtree 源导入归档仓库,因此归档仓库 history 中**不含**任何真实凭证。
- 当前状态：已归档,仅保留源码作为历史学习参考

## 项目简介

`huawei-alarm` 是一个**华为云 AOM(Application Operations Management)告警 → 飞书(Lark)机器人**的 webhook 通知桥。

部署形态上是一个 FastAPI HTTP 服务,作为华为云 SMN(消息通知服务)消息模板里配置的 HTTP/HTTPS 订阅端点。华为云 AOM 触发告警后,SMN 会把告警 JSON 通过 HTTP POST 推到这个服务的 `/message/send` 接口,服务解析后:

1. 把告警数据落库(PostgreSQL,`message_body` 表)用于审计/重放
2. 处理 SMN 订阅确认请求(`subscribe_url` 字段,直接 GET 回去完成订阅)
3. 按 `chat_type` 字段(`chat_id` / `user_id`)选择发送目标:
   - 群消息:根据 `chat_id` 注解里的群名查 Feishu 群列表,匹配到 `chat_id` 后发到对应群
   - 私聊:根据 `principal` / `participator`(邮箱或手机号)查 Feishu 通讯录,拿到 `user_id` 后发对应人的私聊
4. 按 `type` 字段(`interactive` / `text`)选择消息卡片模板(`BaseTextMessage` / `UserAlarmInteractive` / `ChatAlarmInteractive`)
5. 标题渲染为 `[严重级别]云服务器{资源提供方}通知:[{告警规则名}]告警规则`,内容渲染为 `**可能原因**:{alarm_probableCause_zh_cn}`,并附带 `redirect_url` 跳转链接(默认跳华为云控制台)

整体就是一个轻量的"云监控告警 → 团队 IM"的中间桥,替代了企业微信/钉钉告警机器人在飞书生态中的同位能力。

## 技术栈

### 运行时

- Python 3.x
- FastAPI 0.x(ASGI Web 框架,`/message/send` 单接口)
- Uvicorn(reload 模式启动)
- Pydantic(请求/响应 schema 校验 + 类型提示)

### 数据访问

- SQLAlchemy ORM(declarative_base + sessionmaker,`expire_on_commit=True`)
- PostgreSQL(`postgresql://` URL,`pgsql` 段配置)
- 自动建表:`Base.metadata.create_all(bind=engine)`,启动时同步到 `message_body` 表

### HTTP 客户端

- `requests`(同步,Feishu OpenAPI 调用)
- `aiohttp`(已 import 但在主流程中未直接使用,可能是早期异步版本残留)

### 飞书 OpenAPI 集成(`app/message/service.py`)

- `tenant_access_token` 获取与缓存(`service_cache` dict,带过期时间,30 分钟 TTL)
- 群消息发送(`im/v1/messages?receive_id_type=chat_id`)
- 用户私聊发送(`im/v1/messages?receive_id_type=user_id`)
- 群列表查询(`im/v1/chats?page_size=20`,按群名匹配 `chat_id`,带本地缓存)
- 通讯录批量查询(`contact/v3/users/batch_get_id`,按邮箱+手机双通道查询)

### 配置管理

- `configparser`(标准库)+ `lru_cache` 缓存配置对象
- `env` 环境变量切换 `config-dev.ini` / `config-prod.ini`
- 强类型方法:`getboolean`(pgsql.echo)、`getint`(pgsql.port)

### 消息模板(`app/config/message_template_config.py`)

- 抽象基类 + 三种具体卡片:`BaseTextMessage` / `UserAlarmInteractive` / `ChatAlarmInteractive`
- 时间字段做了时区处理:群消息用 UTC,私聊用 `+8h` 偏移

## 项目结构

```
huawei-alarm/
├── main.py                              # FastAPI 入口,mount /message 路由
├── config-dev.ini                       # 开发环境配置(飞书凭证 + PG 连接;**凭证已脱敏**)
├── config-prod.ini                      # 生产环境配置(**凭证已脱敏**)
├── README.md                            # 完整部署文档(华为云告警规则配置教程)
├── app/
│   ├── common/
│   │   ├── constants.py                 # 常量(chat_type / message_type / cache keys)
│   │   └── databases.py                 # SQLAlchemy engine + SessionLocal + get_db
│   ├── config/
│   │   ├── global_config.py             # ConfigSetting + GlobalConfig 单例
│   │   └── message_template_config.py   # 飞书消息卡片模板基类与具体实现
│   └── message/
│       ├── main.py                      # APIRouter + POST /message/send 入口
│       ├── models.py                    # MessageBody ORM 模型 + build_message()
│       ├── schemas.py                   # Pydantic 消息 schema(MessageModel / MessageEvent)
│       ├── crud.py                      # 数据库 CRUD(get_message / create_message)
│       └── service.py                   # Feishu API 调用(get_tenant_access_token / send_*_message / get_chat_id)
└── img/                                 # README 文档配套截图(告警规则 / 行动规则 / 主题策略 等)
```

## 学习重点

- **云监控告警 → IM 通知的桥接模式**:典型场景,核心是订阅确认 + 消息解析 + 模板渲染 + 目标分发(群/人)
- **SMN HTTP 订阅确认机制**:`subscribe_url` 字段出现时,直接 GET 回去完成订阅(不调用 Feishu)
- **飞书 OpenAPI 鉴权与缓存**:`tenant_access_token` 全局缓存 + 过期时间检查
- **Pydantic + SQLAlchemy 协同**:schema 校验 → ORM model 构建 → crud 落库 → service 转发
- **按字段动态分派**:`sent_message_factory` dict(`chat_id` → `send_chat_message`,`user_id` → `send_user_message`)+ `template` if-elif 选择具体卡片类
- **配置驱动开发**:INI 文件 + `lru_cache` 单例 + `env` 环境变量切换
- **FastAPI 最佳实践**:`Depends(get_db)` 注入 session、`APIRouter` 拆分、`reload=True` 开发热重载

## 归档备注

本目录保留从原仓库导入时的项目文件,代码量约 270 行(去除配置与 README),是一个**结构完整、依赖清晰、目标单一**的小型 FastAPI 服务。

依赖版本未在 `requirements.txt` 中显式锁定,主要依赖:`fastapi`、`uvicorn`、`sqlalchemy`、`pydantic`、`requests`、`aiohttp`、`psycopg2`(推断,可能用 `psycopg2-binary`)。运行时需准备 PostgreSQL 实例与可达的飞书 OpenAPI 网络环境。

README 文档完整覆盖了华为云侧的告警规则 / 行动规则 / 主题策略 / 消息模板 / 订阅者配置流程,配套 `img/` 目录有 9 张操作截图,新接手者可以直接照着走完配置。

### ⚠️ 凭证轮换(已脱敏,仍需 owner 处理)

归档仓库中的 `config-dev.ini` / `config-prod.ini` 已经把以下字段替换为占位符:

| 字段 | 占位符 |
| --- | --- |
| 飞书 `app_id` | `<YOUR_LARK_APP_ID>` |
| 飞书 `app_secret` | `<YOUR_LARK_APP_SECRET>` |
| PostgreSQL `passwd` | `<YOUR_PG_PASSWORD>` |

> **原仓库 `f1fb6f2` 的真实凭证仍保留在源仓库 history 中**,本归档仓库的 history 已经过脱敏(临时克隆里改占位符后 commit,再以新 HEAD 做 subtree add),但源仓库侧需要 owner 自行处理:

1. 飞书开放平台后台**轮换**该 `app_id` 对应的 `app_secret`(原 `pCnXOXalUX0k5FhP4TEffLTuE4AqLN8D` 视为已泄漏,作废)
2. 检查并更换 PostgreSQL 实例上同密码账户的密码(原 `123456` 视为已泄漏)
3. 如果计划把本归档项目作为参考运行,先在两份 INI 中填入真实凭证再启动
4. `config-prod.ini` 当前内容与 `config-dev.ini` 完全一致(都已是占位符版本),按生产规范应该是不同的实际凭证
