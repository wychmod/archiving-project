# 归档说明

## 基本信息

- 原仓库：git@github.com:wychmod/Lottery.git
- 归档目录：archived-projects/lottery/
- 归档日期：2026-06-25
- 导入分支：`221102_wychmod_dbRouter`(默认分支 `221024_wychmod_initProject` 仅含空骨架,**最初误用默认分支归档了一次,已通过两次 revert commit 回退**,详见本文件末尾「归档纠错」段)
- 导入提交：`a94ccb916abaee062abaa17a2a65dfc1de4464e4`
- 提交日期：2022-11-02
- 提交说明：add: 实现和使用分库分表
- 当前状态：已归档,仅保留源码与教学资料作为历史学习参考

## 项目简介

`Lottery` 是一个基于 **DDD 四层架构 + Spring Boot + Dubbo RPC + 自研分库分表路由** 的完整抽奖系统实战项目,源自 Java 实战课程(参考 `doc/notes/` 章节笔记,共 4 章,以及配套的 PPT / XMind / Excel / SQL 教学资料)。

包含 6 个 DDD 分层 Maven module,本分支(2022-11-02 dbRouter)实现了**完整的抽奖业务 + 自研 dbRouter 中间件**。完整功能模块:

### 业务领域

- **抽奖策略(`strategy` 域)**:单项概率 / 总体概率随机算法,模板方法模式组织抽奖流程
- **抽奖活动(`activity` 域)**:活动状态机(Editing / Open / Doing / Close / Arraignment / Pass / Refuse),活动部署与参与抽奖
- **奖品发放(`award` 域)**:四种奖品类型(兑换码 RedeemCode / 实物 Physical / 描述 Desc / 优惠券 Coupon),通过简单工厂 + 策略模式分发

### 通用能力

- **ID 生成(`support/ids` 域)**:雪花算法(SnowFlake)、短码(ShortCode)、随机数字(RandomNumeric),通过策略上下文 `IdContext` 动态选择
- **分库分表路由(自研中间件)**:`com.wychmod.middleware.db.router.annotation.DBRouter` 注解 + `DBRouterStrategy(splitTable = true)` 注解,基于用户 ID(`uId`)哈希路由到不同库表(`IUserStrategyExportDao` 等 DAO 上的应用)
- **RPC 通信**:Dubbo 2.6.6 + ZooKeeper 注册中心,服务发布与消费
- **数据访问**:MyBatis + DBCP2 连接池,数据库迁移走 Flyway / 手写 SQL(`doc/assets/sql/lottery.sql` 等)

### 教学资料(`doc/` 目录,完整配套)

- `notes/` — 4 章 Markdown 笔记:
  - 第 01 章:开篇介绍 — 怎么开始、都学完那些内容
  - 第 02 章:搭建 DDD + RPC 分布式架构
  - 第 03 章:通过广播模式 RPC 过程调用
  - 第 04 章:抽奖活动领域策略设计
- `assets/sql/` — `lottery.sql` / `lottery_01.sql` / `lottery_02.sql` 建表脚本
- `assets/xmind/` — 4 个思维导图(项目学习路径 / 业务流程 / 抽奖系统 / 课程介绍)
- `assets/ppt/` — 系统架构 PPT
- `assets/excel/` — 数据字典、学习路径 Excel
- `_media/` — 配套插图素材

## 技术栈

### 运行时

- Java 8
- Spring Boot 2.3.5(根 parent)
- Spring 4.3.24.RELEASE
- Spring Web Starter + Thymeleaf
- Servlet 4.0 + JSP + JSTL(传统视图层)

### 数据访问

- MyBatis 3.3.0 + MyBatis Spring Boot Starter 2.1.4
- MySQL Connector 5.1.34
- Commons-DBCP2 2.6.0(连接池)
- Redis(spring.redis 1.8.4)

### 微服务 / RPC

- **Dubbo 2.6.6** — RPC 框架
- **ZooKeeper 3.4.14** — Dubbo 注册中心
- Netty 4.1.36.Final

### 自研中间件

- **DBRouter**:基于 `DataSource` 代理的注解式分库分表路由(`com.wychmod.middleware.db.router` 包),支持基于哈希字段的分库与分表(注解 `@DBRouter(key = "uId")` + `@DBRouterStrategy(splitTable = true)`)

### 工具与辅助

- Fastjson 1.2.58 / 1.2.60(JSON 序列化)
- Jackson 2.5.4
- Commons-Lang3 3.8
- Dom4j 1.6.1
- XStream 1.4.10

### 日志

- SLF4J 1.7.7
- Logback 1.0.9

### 测试

- JUnit 4.12
- Spring Boot Test Starter

## 学习重点

- **DDD 完整落地**:application / domain / infrastructure / interfaces / rpc / common 六模块,聚合根(Aggregate)、值对象(Value Object)、仓储(Repository)的实际用法
- **领域服务中的设计模式**:抽奖算法的模板方法 + 策略模式(单项 vs 总体随机)、奖品发放的策略模式 + 简单工厂(四种 Goods 类型)、ID 生成器的策略模式
- **活动状态机的工程实现**:7 个状态 event 类继承 `AbstractState`,`StateConfig` 状态映射,`StateHandlerImpl` 流程驱动
- **注解驱动的自研中间件**:`@DBRouter` + `@DBRouterStrategy` 通过 Spring AOP + DataSource 代理实现透明分库分表
- **RPC 调用链**:Dubbo 服务发布、消费,接口层(interfaces)调用 RPC 层(rpc)的跨进程通信
- **MyBatis 数据持久化**:DAO 接口 + Repository 实现,与 PO 对象的层次划分
- **完整的实战课程配套**:4 章 Markdown 笔记 + 3 个 SQL + 4 个 XMind + 1 个 PPT + 2 个 Excel,从设计到实现全链路可对照阅读

## 归档备注

本目录保留从原仓库导入时的项目文件,**包含完整的 Java 业务源码、`doc/` 教学资料目录、`.idea/` 工程配置**(不包含 `target/` 构建产物)。

原仓库一共有 **10 个分支**(均按 `日期_作者_动作` 命名,典型的"按日切特性"开发模式):

| 分支 | 提交数累计 | 特性 |
| --- | --- | --- |
| `221024_wychmod_initProject` | 2 | 项目初始化(空骨架,**默认分支**) |
| `221024_wychmod_buildFramework` | 3 | 构建框架 |
| `221026_wychmod_strategy` | 4 | 抽奖策略领域开发 |
| `221026_wychmod_tableDesign` | 5 | 抽奖策略库表设计 |
| `221028_wychmod_strategy_finish` | 6 | 抽奖策略领域完成 |
| `221029_wychmod_award` | 7 | 简单工厂搭建发奖领域 |
| `221030_wychmod_activity` | 9 | 活动领域配置与状态 |
| `221031_wychmod_IdGenerator` | 10 | ID 生成器(雪花算法等) |
| **`221102_wychmod_dbRouter`** | **11** | **实现和使用分库分表(本次归档的分支)** |

**为什么选这个分支**:默认分支 `221024_wychmod_initProject` 仅含 6 个空 module 的 `pom.xml`,**没有任何 Java 业务代码**,作为归档价值有限;`221102_wychmod_dbRouter` 是开发链路的**最终分支**,包含了所有特性的完整实现 + 自研 dbRouter 中间件,是 Lottery 这个项目的真正"完整版本"。

依赖版本停留在 2020-2022 年水平(Spring Boot 2.3.5、Dubbo 2.6.6、ZooKeeper 3.4.14、MySQL Connector 5.x),如需运行需按目标环境调整:`mysql-connector-java` 5.x 与 MySQL 8 服务端需要兼容设置(否则会因为 caching_sha2_password 认证失败)。`doc/assets/sql/lottery.sql` 等 SQL 脚本可直接导入初始化数据库。

### 归档纠错

第一次归档错误地使用了默认分支 `221024_wychmod_initProject`,导入后归档目录仅有空骨架,通过两个 revert commit(`e521448` Revert archive + `21fd6e7` Revert merge)回退到干净状态,然后用 `221102_wychmod_dbRouter` 重新导入。这两个 revert commit 按 `AGENTS.md` §5 红线保留在历史中,作为"归档纠错"的可追溯记录。