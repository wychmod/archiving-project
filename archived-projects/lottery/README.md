<div align="center">

# 🎰 Lottery

### DDD 四层架构 + Dubbo RPC + 自研分库分表的完整抽奖系统

[![Status](https://img.shields.io/badge/status-archive-lightgrey.svg)](#-归档状态)
[![Java](https://img.shields.io/badge/java-8-007396.svg?logo=openjdk&logoColor=white)](https://www.java.com)
[![Spring Boot](https://img.shields.io/badge/spring%20boot-2.3.5-6DB33F.svg?logo=springboot&logoColor=white)](https://spring.io)
[![Dubbo](https://img.shields.io/badge/dubbo-2.6.6-C71F2E.svg?logo=apache&logoColor=white)](https://dubbo.apache.org)
[![ZooKeeper](https://img.shields.io/badge/zookeeper-3.4.14-3F72AF.svg?logo=apache&logoColor=white)](https://zookeeper.apache.org)
[![MyBatis](https://img.shields.io/badge/mybatis-3.3.0-000000.svg)](https://mybatis.org)
[![MySQL](https://img.shields.io/badge/mysql-5.x--connector-4479A1.svg?logo=mysql&logoColor=white)](https://www.mysql.com)

**一个把 DDD 从口号落到代码的抽奖系统:策略 / 活动 / 奖品三大领域 + 雪花算法 ID 生成器 + 注解式分库分表自研中间件,并附带 4 章笔记、SQL、XMind、PPT、Excel 的全套教学资料。**

[领域](#-业务领域) · [技术栈](#-技术栈) · [架构](#️-系统架构) · [快速开始](#-快速开始) · [教学资料](#-教学资料doc) · [归档状态](#-归档状态)

</div>

---

## 📑 目录

- [项目概述](#-项目概述)
- [业务领域](#-业务领域)
- [技术栈](#-技术栈)
- [系统架构](#️-系统架构)
- [项目结构](#-项目结构)
- [快速开始](#-快速开始)
- [教学资料(doc)](#-教学资料doc)
- [学习价值](#-学习价值)
- [已知限制](#️-已知限制)
- [归档状态](#-归档状态)
- [License](#-license)

---

## 📖 项目概述

`Lottery` 是一个基于 **DDD 四层架构 + Spring Boot + Dubbo RPC + 自研分库分表路由** 的完整抽奖系统实战项目,源自 Java 实战课程(`doc/notes/` 4 章笔记配套 PPT / XMind / Excel / SQL 教学资料)。

本归档选取原仓库 `221102_wychmod_dbRouter` 分支——开发链路的**最终分支**,包含全部特性的完整实现 + 自研 dbRouter 中间件。原仓库按 `日期_作者_动作` 命名的 10 个分支(从 `initProject` 空骨架到 `dbRouter` 完整实现)记录了典型的"按日切特性"开发轨迹。

| 维度 | 说明 |
| --- | --- |
| **产品形态** | DDD 六模块 Maven 工程 + Dubbo RPC 服务 |
| **业务范围** | 抽奖策略、抽奖活动、奖品发放、ID 生成、分库分表 |
| **工程亮点** | 自研 `@DBRouter` 注解式分库分表中间件 |
| **配套资料** | 4 章笔记 + 3 份 SQL + 4 个 XMind + 1 份 PPT + 2 份 Excel |
| **最佳用途** | DDD 落地 / 设计模式实战 / 中间件原理的全链路学习 |

---

## ✨ 业务领域

| 领域 | 能力 | 设计模式 |
| --- | --- | --- |
| 🎯 **抽奖策略(strategy)** | 单项概率 / 总体概率随机算法,模板方法组织抽奖流程 | 模板方法 + 策略 |
| 🎪 **抽奖活动(activity)** | 7 态活动状态机(Editing / Open / Doing / Close / Arraignment / Pass / Refuse),活动部署与参与 | 状态机(AbstractState 继承 + StateConfig 映射 + StateHandlerImpl 驱动) |
| 🎁 **奖品发放(award)** | 四种奖品类型:兑换码 / 实物 / 描述 / 优惠券,统一分发 | 简单工厂 + 策略 |
| 🆔 **ID 生成(support/ids)** | 雪花算法(SnowFlake)、短码(ShortCode)、随机数字(RandomNumeric),`IdContext` 上下文动态选择 | 策略 + 上下文 |
| 🗄️ **分库分表(自研中间件)** | `@DBRouter(key = "uId")` + `@DBRouterStrategy(splitTable = true)` 注解,按用户 ID 哈希路由到不同库表 | Spring AOP + DataSource 代理 |

---

## 🧱 技术栈

### 运行时

| 类别 | 选型 | 版本 |
| --- | --- | --- |
| 语言 | Java | 8 |
| 框架 | Spring Boot | 2.3.5 |
| Web | Spring Web Starter + Thymeleaf + JSP/JSTL(Servlet 4.0) | — |

### 数据访问

| 类别 | 选型 | 版本 |
| --- | --- | --- |
| ORM | MyBatis + MyBatis Spring Boot Starter | 3.3.0 / 2.1.4 |
| 数据库 | MySQL(Connector 5.1.34) | 5.x Connector |
| 连接池 | Commons-DBCP2 | 2.6.0 |
| 缓存 | Redis(spring.redis) | 1.8.4 |

### 微服务 / RPC

| 类别 | 选型 | 版本 |
| --- | --- | --- |
| RPC | Dubbo | 2.6.6 |
| 注册中心 | ZooKeeper | 3.4.14 |
| 通信 | Netty | 4.1.36.Final |

### 自研中间件

| 名称 | 说明 |
| --- | --- |
| **DBRouter** | 基于 `DataSource` 代理的注解式分库分表路由(`com.wychmod.middleware.db.router`),支持按哈希字段分库与分表 |

### 工具与日志

Fastjson 1.2.58/1.2.60 · Jackson 2.5.4 · Commons-Lang3 3.8 · Dom4j 1.6.1 · XStream 1.4.10 · SLF4J 1.7.7 · Logback 1.0.9 · JUnit 4.12

---

## 🏗️ 系统架构

```
┌──────────────────────────────────────────────────────────────┐
│                     DDD 六模块 Maven 工程                      │
│                                                              │
│  ┌─────────────┐   调用   ┌─────────────────────────────┐    │
│  │ interfaces   │ ──────▶ │  application(应用层)         │    │
│  │ 接口/DTO装配  │         │  抽奖流程编排 / 活动部署       │    │
│  └─────────────┘         └──────────────┬──────────────┘    │
│         ▲                               ▼                    │
│  ┌──────┴───────┐         ┌─────────────────────────────┐   │
│  │ rpc(Dubbo)   │         │  domain(领域层)              │   │
│  │ 服务发布/消费  │ ◀────── │  strategy / activity / award │   │
│  └──────────────┘         │  support/ids(ID 生成)         │   │
│                           └──────────────┬──────────────┘   │
│  ┌─────────────┐                         ▼                  │
│  │ common       │         ┌─────────────────────────────┐   │
│  │ 通用工具/常量  │         │  infrastructure(基础设施层)   │   │
│  └─────────────┘          │  DAO + Repository 实现        │   │
│                           └──────────────┬──────────────┘   │
└──────────────────────────────────────────┼──────────────────┘
                                           ▼
                      ┌────────────────────────────────┐
                      │  自研 DBRouter 中间件            │
                      │  @DBRouter(key="uId")           │
                      │  Spring AOP + DataSource 代理    │
                      └───────────────┬────────────────┘
                                      ▼ 对多个库表哈希路由
                   ┌──────────┐  ┌──────────┐  ┌──────────┐
                   │ 库0/表0-9 │  │ 库1/表0-9 │  │ 库a/表0-9 │
                   └──────────┘  └──────────┘  └──────────┘

       RPC 通信链路:Dubbo 2.6.6 + ZooKeeper 注册中心
```

---

## 📂 项目结构

```
lottery/
├── README.md                    # 本文件
├── ARCHIVE.md                   # 归档档案(含原仓库 10 分支演进表)
├── pom.xml                      # 父 POM(六模块聚合)
├── mvnw / mvnw.cmd              # Maven Wrapper
│
├── lottery-application/         # 应用层:流程编排
├── lottery-domain/              # 领域层:strategy / activity / award / support
├── lottery-infrastructure/      # 基础设施层:DAO + Repository
├── lottery-interfaces/          # 接口层:DTO 装配 / 触发
├── lottery-rpc/                 # RPC 层:Dubbo 服务发布与消费
├── lottery-common/              # 通用组件
│
└── doc/                         # 配套教学资料(见下节)
    ├── notes/                   # 4 章 Markdown 笔记
    └── assets/
        ├── sql/                 # lottery.sql / lottery_01 / lottery_02
        ├── xmind/               # 4 个思维导图
        ├── ppt/                 # 系统架构 PPT
        ├── excel/               # 数据字典 / 学习路径
        └── img/  _media/        # 配套插图
```

---

## 🚀 快速开始

> ⚠️ **归档快照**:依赖停留在 2020-2022 年水平,仅供历史学习参考。

```bash
# 1) 环境准备:JDK 1.8 + Maven 3 + MySQL + Redis + ZooKeeper

# 2) 初始化数据库
#    导入 doc/assets/sql/lottery.sql(及 lottery_01 / lottery_02 增量脚本)
#    注意:MySQL Connector 5.1.34 连 MySQL 8 服务端需处理
#    caching_sha2_password 认证兼容设置

# 3) 构建
mvn clean package -DskipTests

# 4) 阅读(推荐顺序)
#    doc/notes/ 第 01 章 → 02 章(DDD+RPC 架构) → 03 章(RPC 调用)
#    → 04 章(活动领域策略与库表),对照 doc/assets/xmind/ 思维导图
```

---

## 📚 教学资料(doc)

本项目最大特色之一:**从设计到实现全链路可对照阅读**的完整教学资料。

| 资料 | 内容 |
| --- | --- |
| 📝 `notes/` 4 章笔记 | 01 开篇与学习路径 · 02 搭建 DDD + RPC 分布式架构 · 03 跑通广播模式 RPC 调用 · 04 抽奖活动领域策略玩法与库表设计 |
| 🗃️ `assets/sql/` | `lottery.sql` + `lottery_01.sql` + `lottery_02.sql` 建表脚本 |
| 🧠 `assets/xmind/` | 4 个思维导图(项目学习路径 / 业务流程 / 抽奖系统 / 课程介绍) |
| 📊 `assets/ppt/` | 系统架构讲解 PPT |
| 📈 `assets/excel/` | 数据字典、学习路径 Excel |

---

## 💡 学习价值

- **DDD 完整落地**:application / domain / infrastructure / interfaces / rpc / common 六模块中,聚合根、值对象、仓储的实际写法
- **领域服务中的设计模式群**:模板方法(抽奖流程)+ 策略(单项/总体概率)+ 简单工厂(四种奖品)+ 上下文(ID 生成),每个模式都有真实业务落点
- **活动状态机的工程实现**:7 状态 × event 继承体系 + `StateConfig` 映射 + `StateHandlerImpl` 流程驱动
- **注解驱动自研中间件**:`@DBRouter` 如何借 Spring AOP + DataSource 代理实现透明分库分表——中间件原理的最佳入门材料
- **RPC 调用链**:Dubbo 服务发布、消费,interfaces 层跨进程调用 rpc 层的完整链路
- **按日切特性开发范本**:原仓库 10 个分支记录了从空骨架到分库分表的每日演进(见 ARCHIVE.md 分支表)

---

## ⚠️ 已知限制

| # | 问题 | 说明 |
| --- | --- | --- |
| 1 | 依赖版本老旧 | Spring Boot 2.3.5 / Dubbo 2.6.6 / ZooKeeper 3.4.14 / MySQL Connector 5.x,重运行需按目标环境调整 |
| 2 | MySQL 驱动兼容 | Connector 5.x 连 MySQL 8 需处理 `caching_sha2_password` 认证 |
| 3 | 含 IDE 工程配置 | 目录中保留 `.idea/`,仅供还原开发环境参考 |

---

## 🗄️ 归档状态

| 项 | 内容 |
| --- | --- |
| 原仓库 | `git@github.com:wychmod/Lottery.git` |
| 归档日期 | 2026-06-25 |
| 归档分支 | `221102_wychmod_dbRouter`(完整实现分支;默认分支为空骨架,曾误归档并已 revert 纠正) |
| 快照基线 | 2022-11-02 「add: 实现和使用分库分表」 |
| 当前状态 | **已归档,只读快照**,仅保留源码与教学资料作为历史学习参考 |

详细档案(分支演进表、归档纠错记录)见 [`ARCHIVE.md`](./ARCHIVE.md)。

---

## 📜 License

原仓库未附带 LICENSE 文件。本项目及配套教学资料仅用于学习与历史归档参考。
