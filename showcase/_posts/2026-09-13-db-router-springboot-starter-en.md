---
title: db-router-springboot-starter · An Annotation-Driven Sharding Middleware
date: 2026-09-13 14:00:00 +0800
lang: en
ref: db-router-springboot-starter
categories: [Enterprise Architecture]
tags: [Java, Spring Boot Starter, MyBatis, AOP, Database Sharding]
description: An annotation-driven sharding middleware shipped as a Spring Boot Starter — AOP interception of @DBRouter, hash spreading, ThreadLocal routing, dynamic data-source switching, and a MyBatis interceptor rewriting table names; the 1.0-SNAPSHOT artifact the Lottery system depends on
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

It is the **actual artifact** that the [Lottery system]({% link _posts/2026-06-25-lottery-en.md %})
in this archive depends on as `db-router-springboot-starter:1.0-SNAPSHOT` — the two projects form a complete
"middleware + consumer" pair.

**Status**: Archived (full commit history). The original repository was reset for reuse, so this copy is the
only remaining version of the code.

## Project Structure

```
src/main/java/com/wychmod/middleware/db/router/
├── DBRouterJoinPoint.java       # @Aspect intercepting @DBRouter, reading the routing key
├── DBContextHolder.java         # ThreadLocal context (dbKey / tbKey)
├── DBRouterConfig.java          # dbCount / tbCount / routerKey config bean
├── annotation/
│   ├── DBRouter.java            # routing annotation (key = sharding field, falls back to routerKey)
│   └── DBRouterStrategy.java    # table-split marker (splitTable)
├── config/
│   └── DataSourceAutoConfig.java # EnvironmentAware parsing of multi-datasource YAML, wiring every bean
├── dynamic/
│   ├── DynamicDataSource.java   # AbstractRoutingDataSource with determineCurrentLookupKey
│   └── DynamicMybatisPlugin.java # MyBatis interceptor rewriting SQL table names by regex
├── strategy/
│   ├── IDBRouterStrategy.java   # routing strategy interface
│   └── impl/DBRouterStrategyHashCode.java # perturbed-hash routing implementation
└── util/PropertyUtil.java
resources/META-INF/spring.factories  # EnableAutoConfiguration → DataSourceAutoConfig
```

The `img/` directory also includes a class diagram (bean wiring) and a sequence diagram (routing execution
flow) to read alongside the code.

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

- **Transparent, annotation-driven routing**: `@DBRouter(key = "uId")` marks the routing argument — zero intrusion into business code; an empty key falls back to the global `routerKey`
- **A perturbed-hash router**: `DBRouterStrategyHashCode` borrows the spreading idea from the JDK `HashMap` for even distribution
- **ThreadLocal lifecycle management**: the aspect force-clears the context in `finally`, avoiding memory leaks and cross-request contamination on thread reuse
- **SQL table rewriting as a MyBatis plugin**: `DynamicMybatisPlugin` reads `BoundSql` via `MetaObject` reflection during `StatementHandler.prepare`, capturing table names by regex and appending the split suffix
- **Starter auto-configuration**: `spring.factories` registers `DataSourceAutoConfig`, `EnvironmentAware` parses multi-datasource YAML, and `@ConditionalOnMissingBean` keeps user overrides possible

## What It Taught Me

This project explains **how middleware is actually built**: one annotation, two interception points
(method aspect and SQL preparation), one ThreadLocal context, and one dynamic datasource — a minimal but
working sharding solution. Having understood it, reading a mature framework like Sharding-JDBC becomes
clearer: you can see what problem each of its layers solves.

## Archive Info

- **Archived on**: 2026-09-13 (all six commits imported)
- **Source**: [`archived-projects/db-router-springboot-starter/`](https://github.com/wychmod/archiving-project/tree/main/archived-projects/db-router-springboot-starter)
- **Archive note**: [ARCHIVE.md](https://github.com/wychmod/archiving-project/blob/main/archived-projects/db-router-springboot-starter/ARCHIVE.md)
