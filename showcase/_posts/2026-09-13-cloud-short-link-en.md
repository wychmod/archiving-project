---
title: cloud-short-link · A Cloud-Native Short Link System on Spring Cloud Alibaba
date: 2026-09-13 12:00:00 +0800
lang: en
ref: cloud-short-link
categories: [Enterprise Architecture]
tags: [Java, Spring Cloud Alibaba, Nacos, Sharding-JDBC, Microservices]
description: A cloud-native short link system on Spring Cloud Alibaba with eight Maven modules spanning account, link, gateway, and data services — MurmurHash32 + Base62 codes, Sharding-JDBC sharding, JWT auth, Nacos discovery, Redisson locks, and XXL-Job
---

## Overview

`cloud-short-link` is a **cloud-native short link generation and management system built on Spring Cloud
Alibaba**. Its eight-module Maven layout covers accounts, link groups, short code generation and resolution,
gateway routing, database sharding, object storage, SMS notification, and distributed locking.

The core of short code generation lives in the `ShortLinkComponent` of the `cloud-link` module:
**MurmurHash32 hashing + Base62 encoding + a sharding suffix** — a non-cryptographic hash for speed and
distribution, where seven Base62 characters give roughly 3.5 trillion combinations, enough headroom for a
short link space.

**Status**: Archived (**credentials scrubbed**) — kept for reference. The import preserved the **full commit
history (44 commits)** after scrubbing credentials from every commit.

## Module Breakdown

| Module | Port | Responsibility |
| --- | --- | --- |
| `cloud-account` | 8001 | Account service: registration / login / JWT / SMS verification codes / file upload (OSS) / traffic stats / login interceptor |
| `cloud-link` | 8001* | Short link core: link group CRUD, short code generation and lookup, custom sharding strategy |
| `cloud-data` | 8002 | Data service (module scaffold, awaiting business logic) |
| `cloud-gateway` | 8888 | Spring Cloud Gateway (registered with Nacos, routing to each service) |
| `cloud-shop` | 8001* | Shop service (module scaffold) |
| `cloud-common` | — | Shared utilities (JWT / JsonData / IDUtil), enums, exception hierarchy, RedisTemplate, Snowflake config |
| `cloud-app` / `cloud-short-link` | — | Generic entry skeleton / future short-link module (create-table SQL only) |

> \* `cloud-link` / `cloud-shop` / `cloud-account` config files all say 8001; real deployments override via `--server.port=` or Nacos config.

## Core Capabilities

- **Account system**: phone + verification code registration, email/password login, JWT authentication (HS256 with a custom secret, 7-day expiry), and a `LoginInterceptor` that resolves the token into a `LoginUser`
- **Short code generation**: MurmurHash32 + Base62 + a sharding suffix; `ShortLinkDO` carries `code` (unique index), `sign` (MD5 for fast lookup), `expired`, `state` (lock/active), and `link_type` (FIRST/SECOND/THIRD membership tiers — a pre-embedded commercialization hook)
- **Database sharding**: custom Sharding-JDBC 4.1.1 algorithms implementing a two-dimensional "DB prefix + table suffix" split on the short code — spreading write load while keeping precise per-code routing
- **SMS and uploads**: `SmsComponent` over the Aliyun SMS API with a `SendCodeEnum` scenario enum; `FileServiceImpl` uploads avatars through Aliyun OSS
- **Captcha and locks**: Kaptcha image captcha; Redisson 3.10 distributed locks; XXL-Job 2.3 distributed scheduling
- **Unified response envelope**: `JsonData` wraps business results (BizCode) and pairs with a global exception handler

## Tech Stack

| Layer | Choice |
| --- | --- |
| Runtime | `Java 11` · `Spring Boot 2.5.5` · `Spring Cloud 2020.0.4` · `Spring Cloud Alibaba 2021.1` |
| Registry / config | `Nacos` · `Spring Cloud Gateway` (port 8888) |
| Persistence | `MyBatis Plus 3.4` · `MySQL` · `Druid 1.1.16` pool |
| Sharding | `Sharding-JDBC 4.1.1` (custom sharding algorithms) |
| Auth / locks | `JWT (jjwt 0.7)` · `Redisson 3.10` |
| Scheduling | `XXL-Job 2.3` |
| Cloud services | Aliyun `OSS SDK 3.10` (uploads) · Aliyun SMS · `Kaptcha` captcha |

## Architecture Highlights

- **Eight microservice modules**: `account`, `link` (the core), `data`, `gateway`, `shop`, `app`, `common`, and `short-link`
- **MurmurHash32 + Base62 codes**: `encodeToBase62(murmurHash32(param))` combined with a database prefix and a random table suffix — MurmurHash over MD5 for a non-cryptographic hash that is fast and evenly distributed
- **Custom sharding algorithms**: `CustomDBPreciseShardingAlgorithm` / `CustomTablePreciseShardingAlgorithm` implement the "DB prefix + random table" strategy
- **A JWT login chain**: HS256 issuance with a `LoginInterceptor` that resolves the token and injects a `LoginUser`
- **Maven multi-module engineering**: the parent POM unifies `spring.boot.version` / `spring.cloud.version` / `alibaba.cloud.version`, inherited by child modules via `dependencyManagement`
- **Code organization convention**: Controller → Service/Manager → Mapper → DO/VO, with each module's own `application.yml` pulling shared config from Nacos
- **Complete infrastructure**: Redisson distributed locks, XXL-Job scheduling, OSS avatar upload, and traffic statistics models (`TrafficDO` / `TrafficTaskDO`)

## What It Taught Me

This is the **most microservice-heavy** project in the archive: service boundaries, gateway routing, a config
center, a sharding strategy, distributed locks, and job scheduling — all applied inside one real business case
(short links), with the Spring Boot 2.5 / Spring Cloud 2020 / Alibaba 2021 version matrix worked out first-hand.
The core Java code runs to 100+ classes, concentrated in `cloud-account` and `cloud-link`. Its full 44-commit
history also makes it a sample of "a microservice project from zero to one".

## Archive Info

- **Archived on**: 2026-09-13 (full-history re-import)
- **Source**: [`archived-projects/cloud-short-link/`](https://github.com/wychmod/archiving-project/tree/main/archived-projects/cloud-short-link)
- **Archive note**: [ARCHIVE.md](https://github.com/wychmod/archiving-project/blob/main/archived-projects/cloud-short-link/ARCHIVE.md)
- **⚠️ Security**: OSS keys, MySQL/Redis passwords, SMS app-code, Nacos password, and public IPs were once committed in plaintext; every occurrence was replaced with placeholders via `git filter-repo` before the import
