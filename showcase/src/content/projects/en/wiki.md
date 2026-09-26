---
ref: wiki
lang: en
title: "wiki · A Spring Boot + Vue 3 Full-Stack Knowledge Base"
name: "wiki"
subtitle: "A Spring Boot + Vue 3 Full-Stack Knowledge Base"
description: "A Spring Boot + Vue 3 knowledge base organized as ebook → category → doc — rich-text editing, tree categories, IP-limited likes, RocketMQ-decoupled WebSocket notifications, Redis sessions, and scheduled snapshots"
category: enterprise
stack:
  - java
  - spring-boot
  - vue3
  - redis
  - websocket
  - mybatis
status: archived
scrubbed: false
repoCleared: false
archivedAt: 2026-06-25
---
## Overview

`wiki` is a **full-stack knowledge base / document management system** practice project that organizes
content as "ebook → category → document", combined with rich-text editing, document likes, reading
statistics, and WebSocket notifications — a small Yuque / Confluence-style knowledge base.

What makes it special is its commit history: from July to November 2021 you can watch a **single CRUD grow
into a complete system** — adding Redis session state, AOP logging, integrating then removing an MQ, adding
WebSocket, adding scheduled jobs. It is a great reference for "how a small full-stack project evolves step by step".

**Status**: Archived — source kept for reference.

## Feature Modules

| Module | Capability |
| --- | --- |
| 📚 Ebook management | CRUD, paginated listing, filtering by category |
| 🌲 Category management | Tree-structured categories with parent-child levels and cascading disable / delete |
| 📄 Document management | Tree document nodes, wangEditor rich-text editing, content preview, document snapshot tables |
| 👍 Document likes | One like per IP per document per day, with +1 reading counts |
| 🔔 WebSocket notifications | Like events pushed to the liked author (initially decoupled via RocketMQ, later removed as unnecessary) |
| 👤 User system | Registration, login, password reset, custom exceptions for duplicate usernames, session state in Redis |
| ⏰ Scheduled jobs | Snapshot tables refreshed on a schedule with book reading counts and like totals |
| 🧾 AOP logging | Log trace ids propagated into async threads for production troubleshooting |
| 📦 Unified responses | `CommonResp<T>` + business code system + global exception handling |

## Tech Stack

| Layer | Choice |
| --- | --- |
| Backend | `Java 8` · `Spring Boot 2.4` · `Spring AOP` · `Spring Validation` |
| Persistence | `MyBatis` + `MyBatis Generator` (generates CRUD straight from SQL tables) · `MySQL 8` · `PageHelper` |
| Middleware | `Redis` (sessions / like counters) · `WebSocket` (notifications) · `Fastjson` (Long-precision fix) |
| Frontend | `Vue 3` + `TypeScript` · `Vue Router 4` · `Vuex 4` · `Ant Design Vue 2` · `Axios 0.21` |
| Rich text | `wangEditor 4.6.3` |
| Build | `Vue CLI 4.5` |

## Architecture Highlights

- **A three-level content model**: ebook → category → document, with tree categories supporting parent-child levels and cascading disable/delete
- **Session state in Redis with an interceptor**, plus a unified `CommonResp<T>` wrapper and business code system
- **AOP logging with a trace id** propagated into async threads to make production issues traceable
- **WebSocket notifications**: like events pushed to authors, after a deliberate "add MQ, then remove MQ" trade-off
- **Scheduled jobs and snapshot tables**: book reading counts and like totals refreshed on a schedule
- **Frontend/backend details**: CORS, token consistency, and fixing the Long-precision loss (parsing JSON numbers as strings first)
- **Engineering habits**: `.http` files with the IntelliJ HTTP Client for API self-testing, and clean package layout (controller / service / mapper / req / resp / aspect / job / websocket)

## What It Taught Me

This project made "middleware choices must serve the real scenario" concrete for the first time: introducing
and then removing the MQ was itself an exercise in architectural judgment. Recursive tree handling (disabling
nodes, cascading deletes, load ordering), Redis sessions, AOP propagation, and scheduled jobs all kept coming
back in later enterprise work.

## Archive Info

- **Archived on**: 2026-06-25
- **Source**: [`archived-projects/wiki/`](https://github.com/wychmod/archiving-project/tree/main/archived-projects/wiki)
- **Archive note**: [ARCHIVE.md](https://github.com/wychmod/archiving-project/blob/main/archived-projects/wiki/ARCHIVE.md)
- **Schema**: `doc/all.sql` can be imported directly to initialize the database
