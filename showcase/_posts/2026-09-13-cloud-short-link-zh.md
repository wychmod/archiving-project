---
title: cloud-short-link · Spring Cloud Alibaba 云短链
date: 2026-09-13 13:00:00 +0800
lang: zh-CN
ref: cloud-short-link
categories: [企业级 / 中台架构]
tags: [Java, Spring Cloud Alibaba, Nacos, Sharding-JDBC, 微服务]
description: 8 个 Maven 模块的云原生短链系统:MurmurHash32 + Base62 短码、Sharding-JDBC 分库分表、JWT 鉴权、OSS 与 XXL-Job
---

## 概览

`cloud-short-link` 是一个基于 **Spring Cloud Alibaba 的云原生短链接生成与管理系统**,采用 8 模块
Maven 多模块架构,涵盖账户体系、链接分组、短链生成与解析、网关路由、分库分表、对象存储、短信通知、
分布式锁等完整微服务能力。

短链生成的核心在 `cloud-link` 模块的 `ShortLinkComponent`:**MurmurHash32 哈希 + Base62 编码 + 分库
分表后缀**——非加密哈希保证速度与散列性,7 位 Base62 约 3.5 万亿组合,足够覆盖短链空间。

**当前状态**:已归档(**已脱敏**),仅保留源码作为历史学习参考。归档时以**完整提交历史(44 commits)**
导入,并在导入前对全部历史做了凭证脱敏。

## 技术栈

| 层 | 选型 |
| --- | --- |
| 运行时 | `Java 11` · `Spring Boot 2.5.5` · `Spring Cloud 2020.0.4` · `Spring Cloud Alibaba 2021.1` |
| 注册/配置 | `Nacos` · `Spring Cloud Gateway`(8888 端口网关) |
| 持久化 | `MyBatis Plus 3.4` · `MySQL` · `Druid` |
| 分库分表 | `Sharding-JDBC 4.1.1`(自研分片算法) |
| 鉴权/锁 | `JWT (jjwt)` · `Redisson 3.10` |
| 调度 | `XXL-Job 2.3` |
| 云服务 | 阿里云 `OSS`(文件上传) · 阿里云短信 · `Kaptcha` 验证码 |

## 架构亮点

- **8 模块微服务切分**:`account`(账户) · `link`(短链核心) · `data` · `gateway` · `shop` · `app` · `common` · `short-link`
- **MurmurHash32 + Base62 短码**:`encodeToBase62(murmurHash32(param))` 拼上库前缀与随机表后缀
- **自研分片算法**:`CustomDBPreciseShardingAlgorithm` / `CustomTablePreciseShardingAlgorithm` 实现"库前缀 + 随机表"策略
- **JWT 登录链路**:HS256 签发 + `LoginInterceptor` 解析注入 `LoginUser`
- **基础设施齐备**:Redisson 分布式锁、XXL-Job 调度、OSS 头像上传、流量统计模型

## 学习收获

这是归档序列里**微服务含量最高**的项目:服务拆分边界、网关路由、配置中心、分库分表策略、
分布式锁与任务调度,全部在一个真实业务(短链)里落地。完整 44 个 commit 的历史让它同时是
"微服务项目从 0 到 1 的演进样本"。

## 归档信息

- **归档日期**:2026-09-13(全历史重导入)
- **源码入口**:[`archived-projects/cloud-short-link/`](https://github.com/wychmod/archiving-project/tree/main/archived-projects/cloud-short-link)
- **归档说明**:[ARCHIVE.md](https://github.com/wychmod/archiving-project/blob/main/archived-projects/cloud-short-link/ARCHIVE.md)
- **⚠️ 安全说明**:OSS AccessKey、MySQL/Redis 密码、短信 app-code、Nacos 密码、公网 IP 等在原仓库历史中曾明文提交,全历史导入前已由 `git filter-repo` 逐条替换为占位符
