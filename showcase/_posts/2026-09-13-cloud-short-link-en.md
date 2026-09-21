---
title: cloud-short-link · A Cloud-Native Short Link System on Spring Cloud Alibaba
date: 2026-09-13 12:00:00 +0800
lang: en
ref: cloud-short-link
categories: [Enterprise Architecture]
tags: [Java, Spring Cloud Alibaba, Nacos, Sharding-JDBC, Microservices]
description: An eight-module cloud-native short link system with MurmurHash32 + Base62 codes, Sharding-JDBC sharding, JWT auth, OSS, and XXL-Job
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

## Tech Stack

| Layer | Choice |
| --- | --- |
| Runtime | `Java 11` · `Spring Boot 2.5.5` · `Spring Cloud 2020.0.4` · `Spring Cloud Alibaba 2021.1` |
| Registry / config | `Nacos` · `Spring Cloud Gateway` (port 8888) |
| Persistence | `MyBatis Plus 3.4` · `MySQL` · `Druid` |
| Sharding | `Sharding-JDBC 4.1.1` (custom sharding algorithms) |
| Auth / locks | `JWT (jjwt)` · `Redisson 3.10` |
| Scheduling | `XXL-Job 2.3` |
| Cloud services | Aliyun `OSS` (uploads) · Aliyun SMS · `Kaptcha` captcha |

## Architecture Highlights

- **Eight microservice modules**: `account`, `link` (the core), `data`, `gateway`, `shop`, `app`, `common`, and `short-link`
- **MurmurHash32 + Base62 codes**: `encodeToBase62(murmurHash32(param))` combined with a database prefix and a random table suffix
- **Custom sharding algorithms**: `CustomDBPreciseShardingAlgorithm` / `CustomTablePreciseShardingAlgorithm` implement the "DB prefix + random table" strategy
- **A JWT login chain**: HS256 issuance with a `LoginInterceptor` that resolves the token and injects a `LoginUser`
- **Complete infrastructure**: Redisson distributed locks, XXL-Job scheduling, OSS avatar upload, and traffic statistics models

## What It Taught Me

This is the **most microservice-heavy** project in the archive: service boundaries, gateway routing, a config
center, a sharding strategy, distributed locks, and job scheduling — all applied inside one real business case
(short links). Its full 44-commit history also makes it a sample of "a microservice project from zero to one".

## Archive Info

- **Archived on**: 2026-09-13 (full-history re-import)
- **Source**: [`archived-projects/cloud-short-link/`](https://github.com/wychmod/archiving-project/tree/main/archived-projects/cloud-short-link)
- **Archive note**: [ARCHIVE.md](https://github.com/wychmod/archiving-project/blob/main/archived-projects/cloud-short-link/ARCHIVE.md)
- **⚠️ Security**: OSS keys, MySQL/Redis passwords, SMS app-code, Nacos password, and public IPs were once committed in plaintext; every occurrence was replaced with placeholders via `git filter-repo` before the import
