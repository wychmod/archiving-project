---
title: db-router-springboot-starter · An Annotation-Driven Sharding Middleware
date: 2026-09-13 14:00:00 +0800
lang: en
ref: db-router-springboot-starter
categories: [Enterprise Architecture]
tags: [Java, Spring Boot Starter, MyBatis, AOP, Database Sharding]
description: An annotation-driven DB/table routing middleware shipped as a Spring Boot Starter — HashMap-style hash spreading, AOP, ThreadLocal, and a MyBatis interceptor
---

## Overview

`db-router-springboot-starter` is an **annotation-driven database/table sharding middleware** delivered as a
Spring Boot Starter. Built on the same core idea as the JDK `HashMap` (hash spreading with a perturbation
function), it distributes routing keys evenly across databases and tables:

- **Database routing**: an AOP aspect intercepts the `@DBRouter` annotation, reads the routing field from the
  method arguments, computes the target database with a perturbed hash, stores it in a `ThreadLocal`, and lets
  `DynamicDataSource` (`AbstractRoutingDataSource`) switch the datasource by key
- **Table routing**: a MyBatis interceptor (`StatementHandler.prepare`) rewrites table names at the SQL level
  for DAOs marked with `@DBRouterStrategy(splitTable = true)`, using the table index in the `ThreadLocal`
  (for example `user` → `user_003`)

It is the **actual artifact** that the [Lottery system](/posts/lottery-a-ddd-layered-lottery-system-with-dubbo-and-self-built-sharding/)
in this archive depends on as `db-router-springboot-starter:1.0-SNAPSHOT` — the two projects form a complete
"middleware + consumer" pair.

**Status**: Archived (full commit history). The original repository was reset for reuse, so this copy is the
only remaining version of the code.

## Tech Stack

| Layer | Choice |
| --- | --- |
| Runtime | `Java 8` · `Spring Boot 2.3.5` |
| Auto-configuration | `spring-boot-autoconfigure` + `spring.factories` |
| Aspects | `Spring AOP` |
| Data access | `MyBatis 2.1.4` (interceptor) · `MySQL Connector 8` · `Spring JDBC` |
| Utilities | `commons-beanutils` (argument reflection) · `fastjson` |
| Tests | `JUnit 4.12` |

## Architecture Highlights

- **Transparent, annotation-driven routing**: `@DBRouter(key = "uId")` marks the routing argument — zero intrusion into business code
- **A perturbed-hash router**: `DBRouterStrategyHashCode` borrows the spreading idea from the JDK `HashMap` for even distribution
- **A ThreadLocal context**: `DBContextHolder` carries the DB/table index through the request thread, bridging the aspect and the interceptor
- **SQL table rewriting as a MyBatis plugin**: `DynamicMybatisPlugin` performs the regex replacement during `StatementHandler.prepare`
- **Starter auto-configuration**: `spring.factories` registers `DataSourceAutoConfig`, and `EnvironmentAware` parses multi-datasource YAML

## What It Taught Me

This project explains **how middleware is actually built**: one annotation, two interception points
(method aspect and SQL preparation), one ThreadLocal context, and one dynamic datasource — a minimal but
working sharding solution. Having understood it, reading a mature framework like Sharding-JDBC becomes
clearer: you can see what problem each of its layers solves.

## Archive Info

- **Archived on**: 2026-09-13 (all six commits imported)
- **Source**: [`archived-projects/db-router-springboot-starter/`](https://github.com/wychmod/archiving-project/tree/main/archived-projects/db-router-springboot-starter)
- **Archive note**: [ARCHIVE.md](https://github.com/wychmod/archiving-project/blob/main/archived-projects/db-router-springboot-starter/ARCHIVE.md)
