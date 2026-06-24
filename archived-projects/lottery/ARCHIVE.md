# 归档说明

## 基本信息

- 原仓库：git@github.com:wychmod/Lottery.git
- 归档目录：archived-projects/lottery/
- 归档日期：2026-06-25
- 导入提交：9583fc9fb2fdb694b98b1b702b69b81860223294
- 提交日期：2022-10-24
- 提交说明：项目初始? by wychmod
- 当前状态：已归档，仅保留源码作为历史学习参考

## 项目简介

`Lottery`(抽奖系统)是一个**DDD 分层架构 + 多模块 Maven 项目骨架**的初始化仓库,用于演示如何用 Spring Boot + Dubbo + MyBatis 搭建一个面向领域驱动的抽奖系统工程的目录结构与依赖组织。

> ⚠️ **重要:此仓库只包含 Maven 工程结构与 pom.xml 依赖声明,不含任何 Java 业务源代码**。所有 6 个 module 目录下都只有 `pom.xml`,没有 `src/` 目录,也没有任何 `.java` 文件。换言之,这是一个**纯脚手架/项目模板**,没有可运行的抽奖业务实现。

典型的 DDD 四层 + RPC + 公共层共 6 个 Maven 子模块:

```
Lottery/
├── lottery-application/        # 应用层 — 用例编排
├── lottery-domain/             # 领域层 — 聚合根、领域服务、领域事件
├── lottery-infrastructure/     # 基础设施层 — 持久化、Redis、第三方交互
├── lottery-interfaces/         # 接口层 — Web 控制器、对外 API
├── lottery-rpc/                # RPC 层 — Dubbo 服务接口与实现
└── lottery-common/             # 公共层 — 常量、工具、通用 DTO
```

## 技术栈

### 运行时

- Java 8
- Spring Boot 2.3.5(根 parent)
- Spring 4.3.24.RELEASE
- Spring Web Starter(`spring-boot-starter-web`,已排除嵌入式 tomcat,改为外部 tomcat 部署)
- Spring Thymeleaf Starter

### 数据访问

- MyBatis 3.3.0 + MyBatis Spring Boot Starter 2.1.4
- MySQL Connector 5.1.34
- Commons-DBCP2 2.6.0(连接池)
- Redis(spring.redis 1.8.4)

### 微服务 / RPC

- **Dubbo 2.6.6** — RPC 框架(由独立 `lottery-rpc` 模块承接)
- **ZooKeeper 3.4.14** — Dubbo 注册中心
- Netty 4.1.36.Final

### Web 视图层

- JSP + JSTL 1.2(传统 servlet 视图)
- Tomcat Embed Jasper 9.0.2(JSP 引擎)
- Servlet API 4.0

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

- **DDD 分层架构在 Maven 多模块工程中的落地**:application / domain / infrastructure / interfaces + rpc + common 的职责切分
- **Dubbo + ZooKeeper 微服务 RPC 体系**:有专门的 `lottery-rpc` 模块承载服务接口与实现,与 Web 接口层解耦
- **外部 Tomcat 部署模式**:Spring Boot 默认内嵌 Tomcat,这里通过 `exclusions` 移除嵌入式 Tomcat 并显式引入 `spring-boot-starter-tomcat` + `tomcat-embed-jasper`,适配传统 JSP 部署
- **依赖集中管控**:所有依赖版本号集中在根 `pom.xml` 的 `<properties>` 里统一管理(典型的"父 POM 统一版本"模式)
- **JSP + Thymeleaf 双模板引擎并存**:Thymeleaf 由 starter 引入,JSP 由手动引入,可能在迁移期同时使用
- **MyBatis + Dubbo + Redis 的"老牌"技术栈组合**:非常具有 2020-2022 年时代特征

## 归档备注

本目录保留从原仓库导入时的项目文件,不包含原仓库的 `.git` 目录。

原仓库**只有 2 个 commit**,均为项目初始化(最后 commit `9583fc9 "项目初始? by wychmod"`,前一个 `bf0d5c0 "项目初始?"`),无后续迭代。默认分支为 `221024_wychmod_initProject`(日期_作者_动作的命名规则),已用 `git subtree add --squash --prefix=archived-projects/lottery ... 221024_wychmod_initProject` 导入。

虽然命名为「Lottery 抽奖系统」,但**当前不含任何抽奖业务实现代码**,6 个 module 仅有空 `pom.xml`。它的价值在于:

- 作为「DDD + Spring Boot + Dubbo 多模块项目」的工程模板,展示依赖组织与目录约定
- 作为「Dubbo 2.6 + ZooKeeper 老牌微服务技术栈」的历史样本(2022 年前后的主流选型,如今已逐步被 Spring Cloud / Nacos / Spring Cloud Alibaba 等取代)
- 配合 `wiki` / `bolg` 一起回顾个人技术栈演进路径

如需运行或扩展,需要自行在各 module 下补全 `src/main/java/...` 业务代码;依赖版本停留在 2020 年水平(Spring Boot 2.3.5、Dubbo 2.6.6),需按目标环境调整。`mysql-connector-java` 5.x 与 MySQL 8 服务端需要兼容设置(否则会因认证协议问题连接失败)。