---
title: huawei-alarm · A Huawei Cloud Alarm to Lark Notification Bridge
date: 2026-06-28 12:00:00 +0800
lang: en
ref: huawei-alarm
categories: [Tools & Verticals]
tags: [Python, FastAPI, PostgreSQL, Lark OpenAPI, Webhook]
description: A webhook bridge that takes Huawei Cloud AOM alarms from SMN and dispatches them to Lark groups or DMs (credentials scrubbed)
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

## Tech Stack

| Layer | Choice |
| --- | --- |
| Runtime | `Python 3` · `FastAPI` · `Uvicorn` |
| Validation | `Pydantic` |
| Data | `SQLAlchemy` + `PostgreSQL` (the `message_body` table) |
| Integration | `requests` against the Lark OpenAPI |
| Config | `configparser` + `lru_cache` singletons, `env` switches dev/prod |

## Architecture Highlights

- **SMN subscription confirmation**: a request carrying `subscribe_url` is answered with a direct GET — no Lark call involved
- **Field-driven dispatch**: `chat_type` (`chat_id` / `user_id`) decides group versus direct message, while `type` (`interactive` / `text`) picks the card template
- **Lark OpenAPI auth with caching**: `tenant_access_token` cached globally with expiry checks (30-minute TTL)
- **Alarm persistence**: the `message_body` table keeps the full alarm payload for auditing and replay
- **Templated messages**: an abstract base class plus three cards (`BaseTextMessage` / `UserAlarmInteractive` / `ChatAlarmInteractive`), with timezone-aware time fields

## What It Taught Me

The project walks the typical third-party webhook integration path: subscription confirmation, token caching,
field-based dispatch, template rendering, and persistence for audit. At roughly 270 lines of code it is
structurally complete, clearly scoped, and dependency-light — a good template for small FastAPI services.

## Archive Info

- **Archived on**: 2026-06-28
- **Source**: [`archived-projects/huawei-alarm/`](https://github.com/wychmod/archiving-project/tree/main/archived-projects/huawei-alarm)
- **Archive note**: [ARCHIVE.md](https://github.com/wychmod/archiving-project/blob/main/archived-projects/huawei-alarm/ARCHIVE.md)
- **⚠️ Security**: the archived configs carry `<YOUR_*>` placeholders for the Lark `app_id` / `app_secret` and the PostgreSQL password — no real credentials are included
