---
title: cloud-short-link · Spring Cloud Alibaba 云短链
date: 2026-09-13 13:00:00 +0800
lang: zh-CN
ref: cloud-short-link
categories: [企业级 / 中台架构]
tags: [Java, Spring Cloud Alibaba, Nacos, Sharding-JDBC, 微服务]
description: Spring Cloud Alibaba 云原生短链系统,8 个 Maven 模块覆盖账户/短链/网关/数据服务:MurmurHash32 + Base62 短码生成、Sharding-JDBC 自研分库分表、JWT 鉴权、Nacos 注册中心、Redisson 分布式锁与 XXL-Job
---

## 概览

`cloud-short-link` 是一个基于 **Spring Cloud Alibaba 的云原生短链接生成与管理系统**,采用 8 模块
Maven 多模块架构,涵盖账户体系、链接分组、短链生成与解析、网关路由、分库分表、对象存储、短信通知、
分布式锁等完整微服务能力。

短链生成的核心在 `cloud-link` 模块的 `ShortLinkComponent`:**MurmurHash32 哈希 + Base62 编码 + 分库
分表后缀**——非加密哈希保证速度与散列性,7 位 Base62 约 3.5 万亿组合,足够覆盖短链空间。

**当前状态**:已归档(**已脱敏**),仅保留源码作为历史学习参考。归档时以**完整提交历史(44 commits)**
导入,并在导入前对全部历史做了凭证脱敏。

## 模块划分

| 模块 | 端口 | 职责 |
| --- | --- | --- |
| `cloud-account` | 8001 | 账户服务:注册 / 登录 / JWT / 短信验证码 / 文件上传(OSS) / 流量统计 / 登录拦截器 |
| `cloud-link` | 8001* | 短链核心:链接分组 CRUD、短链生成与查询、自研分库分表策略 |
| `cloud-data` | 8002 | 数据服务(模块脚手架,待业务填充) |
| `cloud-gateway` | 8888 | Spring Cloud Gateway 网关(注册到 Nacos,转发到各微服务) |
| `cloud-shop` | 8001* | 商城服务(模块脚手架) |
| `cloud-common` | — | 公共工具(JWT / JsonData / IDUtil)、枚举、异常体系、RedisTemplate、雪花算法配置 |
| `cloud-app` / `cloud-short-link` | — | 通用入口骨架 / 未来短链服务模块(仅含建表 SQL) |

> \* `cloud-link` / `cloud-shop` / `cloud-account` 的配置文件都写了 8001,实际部署需通过 `--server.port=` 或 Nacos 配置覆盖。

## 核心能力

- **账户体系**:手机号 + 验证码注册、邮箱密码登录、JWT token 鉴权(HS256 + 自定义 SECRET,7 天过期)、`LoginInterceptor` 解析 token 注入 `LoginUser`
- **短链生成**:MurmurHash32 + Base62 + 分库分表后缀;`ShortLinkDO` 含 `code`(唯一索引)、`sign`(MD5 快速查找)、`expired`、`state`(lock/active)、`link_type`(FIRST/SECOND/THIRD 会员等级——商业化的预埋设计)
- **分库分表**:Sharding-JDBC 4.1.1 自研分片算法,短链 code 的"DB 前缀 + table 后缀"二维分片,既分散写压力,又支持按 code 精准路由
- **短信与上传**:`SmsComponent` 基于阿里云短信 API + `SendCodeEnum` 场景枚举;`FileServiceImpl` 走 Aliyun OSS 支持头像上传
- **验证码与锁**:Kaptcha 图形验证码;Redisson 3.10 分布式锁;XXL-Job 2.3 分布式任务调度
- **统一响应体**:`JsonData` 包装业务结果(BizCode),与全局异常处理器配合

## 技术栈

| 层 | 选型 |
| --- | --- |
| 运行时 | `Java 11` · `Spring Boot 2.5.5` · `Spring Cloud 2020.0.4` · `Spring Cloud Alibaba 2021.1` |
| 注册/配置 | `Nacos` · `Spring Cloud Gateway`(8888 端口网关) |
| 持久化 | `MyBatis Plus 3.4` · `MySQL` · `Druid 1.1.16` 连接池 |
| 分库分表 | `Sharding-JDBC 4.1.1`(自研分片算法) |
| 鉴权/锁 | `JWT (jjwt 0.7)` · `Redisson 3.10` |
| 调度 | `XXL-Job 2.3` |
| 云服务 | 阿里云 `OSS SDK 3.10`(文件上传) · 阿里云短信 · `Kaptcha` 验证码 |

## 架构亮点

- **8 模块微服务切分**:`account`(账户) · `link`(短链核心) · `data` · `gateway` · `shop` · `app` · `common` · `short-link`
- **MurmurHash32 + Base62 短码**:`encodeToBase62(murmurHash32(param))` 拼上库前缀与随机表后缀——选 MurmurHash 而非 MD5,图的是非加密哈希快、散列均匀
- **自研分片算法**:`CustomDBPreciseShardingAlgorithm` / `CustomTablePreciseShardingAlgorithm` 实现"库前缀 + 随机表"策略
- **JWT 登录链路**:HS256 签发 + `LoginInterceptor` 解析注入 `LoginUser`
- **Maven 多模块工程**:父 POM 统一管理 `spring.boot.version` / `spring.cloud.version` / `alibaba.cloud.version`,子模块 `dependencyManagement` 继承
- **代码组织惯例**:Controller → Service/Manager → Mapper → DO/VO,每个模块独立 `application.yml` 通过 Nacos 拉共享配置
- **基础设施齐备**:Redisson 分布式锁、XXL-Job 调度、OSS 头像上传、流量统计模型(`TrafficDO` / `TrafficTaskDO`)

## 学习收获

这是归档序列里**微服务含量最高**的项目:服务拆分边界、网关路由、配置中心、分库分表策略、
分布式锁与任务调度,全部在一个真实业务(短链)里落地;Spring Boot 2.5 + Spring Cloud 2020 +
Alibaba 2021 三件套的版本对应关系也在这里踩实。核心 Java 代码约 100+ 个类,业务集中在
`cloud-account` 和 `cloud-link` 两个模块。完整 44 个 commit 的历史让它同时是
"微服务项目从 0 到 1 的演进样本"。

## 归档信息

- **归档日期**:2026-09-13(全历史重导入)
- **源码入口**:[`archived-projects/cloud-short-link/`](https://github.com/wychmod/archiving-project/tree/main/archived-projects/cloud-short-link)
- **归档说明**:[ARCHIVE.md](https://github.com/wychmod/archiving-project/blob/main/archived-projects/cloud-short-link/ARCHIVE.md)
- **⚠️ 安全说明**:OSS AccessKey、MySQL/Redis 密码、短信 app-code、Nacos 密码、公网 IP 等在原仓库历史中曾明文提交,全历史导入前已由 `git filter-repo` 逐条替换为占位符
