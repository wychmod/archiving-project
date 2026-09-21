---
title: Lottery · DDD 四层架构抽奖系统
date: 2026-06-25 13:00:00 +0800
lang: zh-CN
ref: lottery
categories: [企业级 / 中台架构]
tags: [Java, DDD, Dubbo, Spring Boot, 分库分表]
description: 基于 DDD 四层架构 + Spring Boot + Dubbo RPC 的完整抽奖系统:策略/活动/奖品三大业务领域、雪花/短码/随机数 ID 生成器、自研分库分表路由,附 4 章笔记与全套教学资料
---

## 概览

`Lottery` 是一个基于 **DDD 四层架构 + Spring Boot + Dubbo RPC + 自研分库分表路由**的完整抽奖系统,
源自 Java 实战课程。项目包含 6 个 DDD 分层 Maven module,实现了完整的抽奖业务链路与自研中间件,
并附带 4 章 Markdown 笔记 + SQL + XMind + PPT + Excel 全套教学资料。

归档时特意选择了开发链路的**最终分支** `221102_wychmod_dbRouter`(而非仅含空骨架的默认分支),
保证归档的是这个项目的真正"完整版本"。

**当前状态**:已归档,仅保留源码与教学资料作为历史学习参考。

## 技术栈

| 层 | 选型 |
| --- | --- |
| 运行时 | `Java 8` · `Spring Boot 2.3.5` |
| 持久化 | `MyBatis 3.3` · `MySQL` · `DBCP2` |
| RPC | `Dubbo 2.6.6` + `ZooKeeper 3.4.14` |
| 自研中间件 | `DBRouter`(注解式分库分表) |
| 其他 | `Redis` · `Thymeleaf` + `JSP` · `JUnit 4` |

## 架构亮点

### 三大业务领域

- **抽奖策略域**:单项概率 / 总体概率随机算法,模板方法模式组织抽奖流程
- **抽奖活动域**:7 状态活动状态机(Editing / Open / Doing / Close / Arraignment / Pass / Refuse)
- **奖品发放域**:四种奖品类型(兑换码 / 实物 / 描述 / 优惠券),简单工厂 + 策略模式分发

### 通用能力

- **ID 生成器**:雪花算法 / 短码 / 随机数字,通过策略上下文 `IdContext` 动态选择
- **自研分库分表**:`@DBRouter(key = "uId")` 注解 + `@DBRouterStrategy(splitTable = true)`,基于用户 ID 哈希路由到不同库表
- **RPC 调用链**:Dubbo 2.6.6 + ZooKeeper 注册中心的服务发布与消费,interfaces 层与 rpc 层的跨进程通信
- **状态机工程实现**:7 个状态 event 类继承 `AbstractState`,`StateConfig` 状态映射,`StateHandlerImpl` 流程驱动

### 开发脉络

原仓库共 10 个分支,均按 `日期_作者_动作` 命名,是典型的"按日切特性"开发模式:从 `221024_wychmod_initProject`
(空骨架)→ `221026_wychmod_strategy`(策略域)→ `221029_wychmod_award`(发奖域)→ `221030_wychmod_activity`
(活动域)→ `221031_wychmod_IdGenerator`(ID 生成器)→ `221102_wychmod_dbRouter`(分库分表),共 12 个完整提交,
能清楚看到项目如何一天天长出完整架构。

## 学习收获

这是归档序列里**架构含量最高**的项目之一:DDD 的分层落地(application / domain / infrastructure /
interfaces / rpc / common 六模块)、设计模式在真实业务里的组合使用(模板方法 + 策略 + 简单工厂 + 状态机)、
注解驱动中间件的实现原理,都在一个可运行的业务里集中呈现。配套的 4 章笔记、3 个 SQL 脚本、4 个 XMind
思维导图与 PPT / Excel 数据字典,使它可以"从设计到实现"全链路对照阅读。

依赖版本停留在 2020-2022 年水平,重跑需要按目标环境调整(例如 MySQL Connector 5.x 与 MySQL 8 的
`caching_sha2_password` 认证兼容);`doc/assets/sql/lottery.sql` 等建表脚本可直接导入初始化数据库。

## 归档信息

- **归档日期**:2026-06-25
- **源码入口**:[`archived-projects/lottery/`](https://github.com/wychmod/archiving-project/tree/main/archived-projects/lottery)
- **归档说明**:[ARCHIVE.md](https://github.com/wychmod/archiving-project/blob/main/archived-projects/lottery/ARCHIVE.md)
- **教学资料**:`doc/notes/` 四章笔记 · `doc/assets/sql/` 建表脚本 · `doc/assets/xmind/` 思维导图
- **配套中间件**:[db-router-springboot-starter]({% link _posts/2026-09-13-db-router-springboot-starter-zh.md %}) 是本项目依赖的 `db-router-springboot-starter:1.0-SNAPSHOT` 本体
