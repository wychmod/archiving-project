---
title: huawei-alarm · A Huawei Cloud Alarm to Lark Notification Bridge
date: 2026-06-28 12:00:00 +0800
lang: en
ref: huawei-alarm
categories: [Tools & Verticals]
tags: [Python, FastAPI, PostgreSQL, Lark OpenAPI, Webhook]
description: A webhook bridge from Huawei Cloud AOM alarms to Lark bots — FastAPI receives SMN pushes, logs them to PostgreSQL for audit, auto-confirms SMN subscriptions, and dispatches interactive cards or text to groups or DMs (credentials scrubbed)
---

## Overview

`huawei-alarm` is a **webhook bridge from Huawei Cloud AOM alarms to a Lark (Feishu) bot**. It runs as a
small FastAPI HTTP service configured as the HTTP/HTTPS subscription endpoint of a Huawei Cloud SMN message
template: when AOM fires an alarm, SMN posts the alarm JSON to this service, which parses it, persists it,
and dispatches a notification to a Lark group or direct message.

It fills the same niche in the Lark ecosystem that WeCom/DingTalk alarm bots fill elsewhere — a lightweight
"cloud monitoring alarm → team IM" bridge.

**Status**: Archived (**credentials scrubbed**) — real credentials in the original config files were replaced
with placeholders during import.

## Request Flow

After SMN posts the alarm JSON to `/message/send`, the service:

1. **Persists** the alarm payload into the PostgreSQL `message_body` table for auditing and replay
2. **Confirms the subscription** — when the request carries a `subscribe_url` field, it GETs that URL directly to complete the SMN subscription (no Lark call involved)
3. **Dispatches the target** by `chat_type` — group messages look up the Lark chat list by the group name annotated in `chat_id` to resolve a `chat_id`; direct messages resolve a `user_id` via the batch contact lookup (`principal` / `participator` by email or phone)
4. **Selects the template** by the `type` field (`interactive` / `text`) among `BaseTextMessage` / `UserAlarmInteractive` / `ChatAlarmInteractive`
5. **Renders the message** — title as `[severity] cloud server {provider} notice: [{rule name}] alarm rule`, body as `**probable cause**: {alarm_probableCause_zh_cn}`, plus a `redirect_url` to the Huawei Cloud console; group messages use UTC times while direct messages use a `+8h` offset

## Tech Stack

| Layer | Choice |
| --- | --- |
| Runtime | `Python 3` · `FastAPI` · `Uvicorn` |
| Validation | `Pydantic` (request/response schemas) |
| Data | `SQLAlchemy` (declarative_base + sessionmaker) + `PostgreSQL`, with `create_all` auto-creating tables at startup |
| Integration | `requests` against the Lark OpenAPI |
| Config | `configparser` + `lru_cache` singletons, `env` switching `config-dev.ini` / `config-prod.ini`, typed `getboolean` / `getint` reads |

## Architecture Highlights

- **SMN subscription confirmation**: a request carrying `subscribe_url` is answered with a direct GET — no Lark call involved
- **Field-driven dispatch**: a `sent_message_factory` dict maps `chat_id` / `user_id` to send functions, and an if-elif chain picks the card class
- **Lark OpenAPI auth with caching**: `tenant_access_token` cached globally with expiry checks (30-minute TTL); both the chat-list query and the batch contact lookup keep local caches
- **Alarm persistence**: the `message_body` table keeps the full alarm payload for auditing and replay
- **Templated messages**: an abstract base class plus three cards (`BaseTextMessage` / `UserAlarmInteractive` / `ChatAlarmInteractive`), with timezone-aware time fields
- **FastAPI best practice**: `Depends(get_db)` session injection and `APIRouter` route separation

## What It Taught Me

The project walks the typical third-party webhook integration path: subscription confirmation, token caching,
field-based dispatch, template rendering, and persistence for audit — plus how Pydantic schema validation,
ORM models, CRUD, and the service layer cooperate. At roughly 270 lines of code it is structurally complete,
clearly scoped, and dependency-light — a good template for small FastAPI services. Its README fully covers the
Huawei Cloud side (alarm rules, action rules, topic policies, message templates, subscriber setup), and its 9
screenshots let a newcomer walk the whole configuration end to end.

## Archive Info

- **Archived on**: 2026-06-28
- **Source**: [`archived-projects/huawei-alarm/`](https://github.com/wychmod/archiving-project/tree/main/archived-projects/huawei-alarm)
- **Archive note**: [ARCHIVE.md](https://github.com/wychmod/archiving-project/blob/main/archived-projects/huawei-alarm/ARCHIVE.md)
- **⚠️ Security**: the archived configs carry `<YOUR_*>` placeholders for the Lark `app_id` / `app_secret` and the PostgreSQL password — no real credentials are included
