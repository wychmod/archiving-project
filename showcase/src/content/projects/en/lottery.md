---
ref: lottery
lang: en
title: "Lottery · A DDD-Layered Lottery System with Dubbo and Self-Built Sharding"
name: "Lottery"
subtitle: "A DDD-Layered Lottery System with Dubbo and Self-Built Sharding"
description: "A complete lottery system on DDD layering + Spring Boot + Dubbo RPC — strategy, activity, and award domains, snowflake/shortcode/random ID generation, and a self-built sharding router, with a four-chapter course kit"
category: enterprise
stack:
  - java
  - ddd
  - dubbo
  - spring-boot
  - database-sharding
status: archived
scrubbed: false
repoCleared: false
archivedAt: 2026-06-25
---
## Overview

`Lottery` is a **complete lottery system built on DDD layering + Spring Boot + Dubbo RPC + a self-built
sharding router**, originating from a Java实战 (hands-on) course. It contains six DDD-layered Maven modules,
implements the full lottery business flow plus a homegrown middleware, and ships with a four-chapter
Markdown course, SQL scripts, XMind maps, slides, and Excel sheets.

At archive time I deliberately kept the **final development branch** `221102_wychmod_dbRouter` (instead of the
default branch with only an empty skeleton), so what is archived is the truly complete version of this project.

**Status**: Archived — source and course material kept for reference.

## Tech Stack

| Layer | Choice |
| --- | --- |
| Runtime | `Java 8` · `Spring Boot 2.3.5` |
| Persistence | `MyBatis 3.3` · `MySQL` · `DBCP2` |
| RPC | `Dubbo 2.6.6` + `ZooKeeper 3.4.14` |
| In-house middleware | `DBRouter` (annotation-driven sharding) |
| Others | `Redis` · `Thymeleaf` + `JSP` · `JUnit 4` |

## Architecture Highlights

### Three business domains

- **Strategy domain**: single-item and overall probability algorithms organized with the template method pattern
- **Activity domain**: a seven-state activity state machine (Editing / Open / Doing / Close / Arraignment / Pass / Refuse)
- **Award domain**: four award types (redeem code / physical / description / coupon) distributed via simple factory plus strategy

### Shared capabilities

- **ID generators**: snowflake, short code, and random numeric, selected dynamically through the `IdContext` strategy context
- **Self-built sharding**: `@DBRouter(key = "uId")` plus `@DBRouterStrategy(splitTable = true)` routes on a user-id hash across databases and tables
- **RPC call chains**: Dubbo 2.6.6 with a ZooKeeper registry for service publishing and consuming, with cross-process calls from the interfaces layer to the rpc layer
- **State machine engineering**: seven state event classes extending `AbstractState`, a `StateConfig` state mapping, and `StateHandlerImpl` driving the flow

### Development timeline

The original repository held 10 branches, all named `date_author_action` — a classic "daily feature branch"
workflow. From `221024_wychmod_initProject` (empty skeleton) → `221026_wychmod_strategy` (strategy domain) →
`221029_wychmod_award` (award domain) → `221030_wychmod_activity` (activity domain) →
`221031_wychmod_IdGenerator` (ID generators) → `221102_wychmod_dbRouter` (sharding), twelve complete commits
show how the project grew a full architecture day by day.

## What It Taught Me

This is one of the **most architecture-dense** projects in the archive: DDD layering in practice
(application / domain / infrastructure / interfaces / rpc / common modules), design patterns composed inside
real business flows (template method + strategy + simple factory + state machine), and the internals of
annotation-driven middleware — all in one runnable system. The bundled four-chapter notes, three SQL scripts,
four XMind mind maps, and the PPT / Excel data dictionary let you read it from design to implementation end to end.

Dependency versions sit at 2020–2022 levels; re-running it needs environment adjustments (for example, the
MySQL Connector 5.x versus MySQL 8 `caching_sha2_password` authentication compatibility). The create-table
scripts under `doc/assets/sql/lottery.sql` can be imported directly to initialize a database.

## Archive Info

- **Archived on**: 2026-06-25
- **Source**: [`archived-projects/lottery/`](https://github.com/wychmod/archiving-project/tree/main/archived-projects/lottery)
- **Archive note**: [ARCHIVE.md](https://github.com/wychmod/archiving-project/blob/main/archived-projects/lottery/ARCHIVE.md)
- **Course kit**: `doc/notes/` (four chapters) · `doc/assets/sql/` schema · `doc/assets/xmind/` mind maps
- **Companion middleware**: [db-router-springboot-starter](/en/projects/db-router-springboot-starter/) is the actual `db-router-springboot-starter:1.0-SNAPSHOT` this project depends on
