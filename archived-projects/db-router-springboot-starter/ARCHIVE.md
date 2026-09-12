# 归档说明

## 基本信息

- 原仓库:git@github.com:wychmod/db-router-springboot-starter.git
- 归档目录:archived-projects/db-router-springboot-starter/
- 归档日期:2026-09-13
- 导入分支:`main`(源仓库唯一分支)
- 导入提交:完整 `main` 分支提交历史(6 个 commit:自 `7d550ca add: finish work` 起,至 `23f95b0 chore: untrack IDE config for archive import`)
- 导入方式:`git subtree add`(**不带 --squash,保留完整提交历史**);导入前已在临时克隆中将 `.idea/` 从全部历史中 filter-repo 清除(原始未清理历史完整保留于备份 bundle)
- 当前状态:已归档,仅保留源码作为历史学习参考
- **特别说明:原仓库将在归档完成后清空复用为新项目仓库,本目录是该代码的唯一保留副本**

## 项目简介

`db-router-springboot-starter` 是一个**注解式分库分表路由中间件**,以 Spring Boot Starter 形态提供。基于 JDK HashMap 的核心设计原理(哈希散列 + 扰动函数),把路由键均匀散列到多个库表中:

- **分库**:AOP 拦截 `@DBRouter` 注解 → 读取入参中的路由字段 → 扰动哈希计算目标库 → 写入 ThreadLocal → `DynamicDataSource`(AbstractRoutingDataSource)按 key 切换数据源
- **分表**:MyBatis 拦截器(`StatementHandler.prepare`)拦截 SQL,对标注 `@DBRouterStrategy(splitTable = true)` 的 DAO,按 ThreadLocal 中的表索引正则改写表名(如 `user` → `user_003`)

本中间件是归档仓库中 [Lottery(抽奖系统)](../lottery/ARCHIVE.md) 所依赖的 `com.wychmod:db-router-springboot-starter:1.0-SNAPSHOT` 的本体——两个项目构成"中间件 + 消费方"的完整对照样本。

## 技术栈

### 运行时

- Java 8
- Spring Boot 2.3.5.RELEASE(parent)
- spring-boot-autoconfigure + `spring.factories` 自动装配(入口:`DataSourceAutoConfig`)
- Spring AOP(切面拦截)

### 数据访问

- MyBatis Spring Boot Starter 2.1.4(拦截器基于 MyBatis Plugin 机制)
- MySQL Connector 8.0.23
- Spring JDBC(`AbstractRoutingDataSource` / `DataSourceTransactionManager` / `TransactionTemplate`)

### 工具与测试

- commons-beanutils 1.9.4(入参路由属性反射读取)
- commons-lang 2.6 · fastjson 1.2.75
- JUnit 4.12(ApiTest / IUserDao)

## 项目结构

```
db-router-springboot-starter/
├── pom.xml                          # 1.0-SNAPSHOT,带 source jar 附加与配置提示
├── README.md                        # 企业级说明(本归档重写)
├── img/
│   ├── img.png                      # 类图(Bean 装配关系)
│   └── img_1.png                    # 时序图(路由执行流程)
├── src/main/java/com/wychmod/middleware/db/router/
│   ├── DBRouterJoinPoint.java       # @Aspect 切面:拦截 @DBRouter,读入参路由键
│   ├── DBContextHolder.java         # ThreadLocal 上下文(dbKey / tbKey)
│   ├── DBRouterConfig.java          # dbCount / tbCount / routerKey 配置 Bean
│   ├── DBRouterBase.java
│   ├── annotation/
│   │   ├── DBRouter.java            # 路由注解(key=分库分表字段,可空回退 routerKey)
│   │   └── DBRouterStrategy.java    # 分表标记(splitTable)
│   ├── config/
│   │   └── DataSourceAutoConfig.java # EnvironmentAware 解析 yml 多数据源并装配全部 Bean
│   ├── dynamic/
│   │   ├── DynamicDataSource.java   # AbstractRoutingDataSource,determineCurrentLookupKey
│   │   └── DynamicMybatisPlugin.java # MyBatis 拦截器,正则改写 SQL 表名
│   ├── strategy/
│   │   ├── IDBRouterStrategy.java   # 路由策略接口
│   │   └── impl/DBRouterStrategyHashCode.java # 扰动哈希路由实现
│   └── util/PropertyUtil.java       # Environment 属性反射处理
└── src/main/resources/META-INF/
    └── spring.factories             # EnableAutoConfiguration → DataSourceAutoConfig
```

## 学习重点

- **Spring Boot Starter 的完整开发范式**:`spring.factories` 注册 + `@Configuration` + `EnvironmentAware` 读取自定义前缀配置 + `@ConditionalOnMissingBean` 保留替换能力
- **HashMap 扰动函数的工程复用**:`(size - 1) & (hash ^ (hash >>> 16))` 把路由键均匀散列到 `dbCount × tbCount` 槽位,再换算库/表索引
- **ThreadLocal 生命周期管理**:切面 `finally` 中强制 `clear()`,规避线程复用下的内存泄漏与串库
- **AbstractRoutingDataSource 动态切换**:`determineCurrentLookupKey` 返回 `db{idx}` 实现多数据源
- **MyBatis Plugin 拦截 SQL**:元对象 `MetaObject` 反射读取 `BoundSql`,正则捕获表名并追加分表后缀
- **注解驱动设计**:`@DBRouter`(可空 key 回退全局 `routerKey`)+ `@DBRouterStrategy(splitTable)` 的组合,业务侧零侵入

## 归档备注

- 源仓库在归档前仅做了一次 `.idea/` 移出跟踪的清理提交,业务代码与原始 HEAD `39ca700` 完全一致
- 原 README 中的配置前缀(`simple-db-router`)已与代码脱节,代码实际读取前缀为 `mini-db-router.jdbc.datasource.*`;本归档的 `README.md` 已按代码实测重写
- 无 LICENSE 文件;依赖版本停留在 2022 年水平
- 与归档仓库中 `lottery/` 的关系见各项目 README

### 归档纠错

首次归档误用 `--squash` 仅保留了 HEAD 快照,应用户要求改为**完整提交历史**导入。可追溯轨迹:squash 导入(`88db6ca` / `4279d06`)→ 移除快照(`8578b80`)→ 全历史重导入(`66dcb5d`)。重导入的历史中 `.idea/` 已通过 filter-repo 清除,符合归档规范 §3.1;原始未清理历史仅存于备份 bundle。
