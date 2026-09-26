---
ref: db-router-springboot-starter
lang: zh
title: "db-router-springboot-starter · 注解式分库分表中间件"
name: "db-router-springboot-starter"
subtitle: "注解式分库分表中间件"
description: "以 Spring Boot Starter 形态提供的注解式分库分表路由中间件:AOP 拦截 @DBRouter 注解 + 扰动哈希 + ThreadLocal + 动态数据源切换,MyBatis 拦截器改写表名;Lottery 系统所依赖的 1.0-SNAPSHOT 本体"
category: enterprise
stack:
  - java
  - spring-boot-starter
  - mybatis
  - aop
  - database-sharding
status: archived
scrubbed: false
repoCleared: true
archivedAt: 2026-09-13
---
## 概览

`db-router-springboot-starter` 是一个**注解式分库分表路由中间件**,以 Spring Boot Starter 形态提供。
基于 JDK HashMap 的核心设计原理(哈希散列 + 扰动函数),把路由键均匀散列到多个库表中:

- **分库**:AOP 拦截 `@DBRouter` 注解 → 读取入参中的路由字段 → 扰动哈希计算目标库 → 写入 ThreadLocal
  → `DynamicDataSource`(AbstractRoutingDataSource)按 key 切换数据源
- **分表**:MyBatis 拦截器(`StatementHandler.prepare`)拦截 SQL,对标注 `@DBRouterStrategy(splitTable = true)`
  的 DAO,按 ThreadLocal 中的表索引正则改写表名(如 `user` → `user_003`)

它是归档仓库中 [Lottery 抽奖系统](/projects/lottery/)
所依赖的 `db-router-springboot-starter:1.0-SNAPSHOT` 的**本体**——两个项目构成"中间件 + 消费方"的完整对照样本。

**当前状态**:已归档(完整提交历史),原仓库已清空复用为本目录是代码唯一保留副本。

## 工程结构

```
src/main/java/com/wychmod/middleware/db/router/
├── DBRouterJoinPoint.java       # @Aspect 切面:拦截 @DBRouter,读入参路由键
├── DBContextHolder.java         # ThreadLocal 上下文(dbKey / tbKey)
├── DBRouterConfig.java          # dbCount / tbCount / routerKey 配置 Bean
├── annotation/
│   ├── DBRouter.java            # 路由注解(key=分库分表字段,可空回退 routerKey)
│   └── DBRouterStrategy.java    # 分表标记(splitTable)
├── config/
│   └── DataSourceAutoConfig.java # EnvironmentAware 解析 yml 多数据源并装配全部 Bean
├── dynamic/
│   ├── DynamicDataSource.java   # AbstractRoutingDataSource,determineCurrentLookupKey
│   └── DynamicMybatisPlugin.java # MyBatis 拦截器,正则改写 SQL 表名
├── strategy/
│   ├── IDBRouterStrategy.java   # 路由策略接口
│   └── impl/DBRouterStrategyHashCode.java # 扰动哈希路由实现
└── util/PropertyUtil.java
resources/META-INF/spring.factories  # EnableAutoConfiguration → DataSourceAutoConfig
```

`img/` 目录还带一张类图(Bean 装配关系)和一张时序图(路由执行流程),可直接对照阅读。

## 技术栈

| 层 | 选型 |
| --- | --- |
| 运行时 | `Java 8` · `Spring Boot 2.3.5` |
| 自动装配 | `spring-boot-autoconfigure` + `spring.factories` |
| 切面 | `Spring AOP` |
| 数据访问 | `MyBatis 2.1.4`(拦截器) · `MySQL Connector 8` · `Spring JDBC` |
| 工具 | `commons-beanutils`(入参反射) · `fastjson` |
| 测试 | `JUnit 4.12` |

## 架构亮点

- **注解驱动的透明路由**:`@DBRouter(key = "uId")` 标注入参字段,业务代码零侵入;key 留空时回退全局 `routerKey`
- **扰动哈希路由实现**:`DBRouterStrategyHashCode` 复用 JDK HashMap 的散列思想,保证均匀分布
- **ThreadLocal 生命周期管理**:切面 `finally` 中强制 `clear()`,规避线程复用下的内存泄漏与串库
- **MyBatis 插件改写表名**:`DynamicMybatisPlugin` 在 `StatementHandler.prepare` 阶段经 `MetaObject` 反射读取 `BoundSql`,正则捕获表名并追加分表后缀
- **Starter 自动装配**:`spring.factories` 注册 `DataSourceAutoConfig`,`EnvironmentAware` 解析 yml 多数据源,`@ConditionalOnMissingBean` 保留用户替换能力

## 学习收获

这个项目把"中间件是怎么写出来的"讲透了:**一处注解 + 两个拦截点(方法切面 / SQL 阶段)+ 一个
ThreadLocal 上下文 + 一个动态数据源**,就是一个最小可用的分库分表方案。理解它之后再回看 Sharding-JDBC
这类成熟框架,就能看清它们每一层在解决什么问题。

## 归档信息

- **归档日期**:2026-09-13(完整 6 个 commit 导入)
- **源码入口**:[`archived-projects/db-router-springboot-starter/`](https://github.com/wychmod/archiving-project/tree/main/archived-projects/db-router-springboot-starter)
- **归档说明**:[ARCHIVE.md](https://github.com/wychmod/archiving-project/blob/main/archived-projects/db-router-springboot-starter/ARCHIVE.md)
