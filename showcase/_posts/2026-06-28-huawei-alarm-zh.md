---
title: huawei-alarm · 华为云告警 → 飞书机器人通知桥
date: 2026-06-28 13:00:00 +0800
lang: zh-CN
ref: huawei-alarm
categories: [工具 / 垂直领域系统]
tags: [Python, FastAPI, PostgreSQL, 飞书 OpenAPI, Webhook]
description: 华为云 AOM 告警经 SMN 推送至 FastAPI,解析后分发到飞书群或私聊的通知桥(已脱敏)
---

## 概览

`huawei-alarm` 是一个**华为云 AOM 告警 → 飞书(Lark)机器人的 webhook 通知桥**。部署形态是一个
FastAPI HTTP 服务,作为华为云 SMN 消息模板里配置的 HTTP/HTTPS 订阅端点:AOM 触发告警后,SMN 把
告警 JSON 推到这个服务,服务解析后落库并分发到飞书群或私聊。

它替代了企业微信/钉钉告警机器人在飞书生态中的同位能力,是"云监控告警 → 团队 IM"的轻量桥接方案。

**当前状态**:已归档(**已脱敏**)——原仓库配置文件中的真实凭证在导入时已替换为占位符。

## 技术栈

| 层 | 选型 |
| --- | --- |
| 运行时 | `Python 3` · `FastAPI` · `Uvicorn` |
| 校验 | `Pydantic` |
| 数据 | `SQLAlchemy` + `PostgreSQL`(`message_body` 表) |
| 集成 | `requests` 调用飞书 OpenAPI |
| 配置 | `configparser` + `lru_cache` 单例,`env` 切换 dev/prod |

## 架构亮点

- **SMN 订阅确认机制**:收到含 `subscribe_url` 的请求时直接 GET 回去完成订阅,不调用飞书
- **按字段动态分派**:`chat_type`(`chat_id` / `user_id`)决定发群还是发人,`type`(`interactive` / `text`)选择卡片模板
- **飞书 OpenAPI 鉴权与缓存**:`tenant_access_token` 全局缓存 + 过期时间检查(30 分钟 TTL)
- **告警落库**:`message_body` 表保留全量告警数据,支持审计与重放
- **模板化消息**:抽象基类 + 三种卡片(`BaseTextMessage` / `UserAlarmInteractive` / `ChatAlarmInteractive`),时间字段区分时区处理

## 学习收获

这个项目把"第三方 webhook 集成"的典型套路走了一遍:订阅确认、签名与 token 缓存、按字段分派、
模板渲染、落库审计。代码量约 270 行,结构完整、依赖清晰、目标单一,是小型 FastAPI 服务的良好样板。

## 归档信息

- **归档日期**:2026-06-28
- **源码入口**:[`archived-projects/huawei-alarm/`](https://github.com/wychmod/archiving-project/tree/main/archived-projects/huawei-alarm)
- **归档说明**:[ARCHIVE.md](https://github.com/wychmod/archiving-project/blob/main/archived-projects/huawei-alarm/ARCHIVE.md)
- **⚠️ 安全说明**:归档配置中的飞书 `app_id` / `app_secret`、PostgreSQL 密码均已替换为 `<YOUR_*>` 占位符,不含任何真实凭证
