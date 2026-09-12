<div align="center">

# 🔗 cloud-short-link

### 基于 Spring Cloud Alibaba 的云原生短链接微服务系统

[![Status](https://img.shields.io/badge/status-archive-lightgrey.svg)](#-归档状态)
[![Java](https://img.shields.io/badge/java-11-007396.svg?logo=openjdk&logoColor=white)](https://www.java.com)
[![Spring Boot](https://img.shields.io/badge/spring%20boot-2.5.5-6DB33F.svg?logo=springboot&logoColor=white)](https://spring.io)
[![Spring Cloud](https://img.shields.io/badge/spring%20cloud-2020.0.4-6DB33F.svg?logo=spring&logoColor=white)](https://spring.io/projects/spring-cloud)
[![Spring Cloud Alibaba](https://img.shields.io/badge/sc%20alibaba-2021.1-FF6A00.svg)](https://sca.aliyun.com)
[![Sharding-JDBC](https://img.shields.io/badge/sharding--jdbc-4.1.1-7B68EE.svg)](https://shardingsphere.apache.org)
[![Nacos](https://img.shields.io/badge/nacos-registry-269B44.svg?logo=alibabacloud&logoColor=white)](https://nacos.io)

**8 模块 Maven 微服务工程:MurmurHash32 + Base62 生成短链、Sharding-JDBC 自研分库分表、Nacos 服务发现、Gateway 网关、JWT 鉴权、Redisson 分布式锁、XXL-Job 调度、阿里云 OSS / SMS 集成——一套打通云原生中间件的全景实战。**

[功能](#-核心能力) · [技术栈](#-技术栈) · [架构](#️-系统架构) · [快速开始](#-快速开始) · [结构](#-项目结构) · [归档状态](#-归档状态)

</div>

---

## 📑 目录

- [项目概述](#-项目概述)
- [核心能力](#-核心能力)
- [技术栈](#-技术栈)
- [系统架构](#️-系统架构)
- [项目结构](#-项目结构)
- [快速开始](#-快速开始)
- [学习价值](#-学习价值)
- [已知限制](#️-已知限制)
- [归档状态](#-归档状态)
- [License](#-license)

---

## 📖 项目概述

`cloud-short-link` 是一个**云原生短链接生成与管理系统**,采用 8 模块 Maven 多模块架构,涵盖账户体系、链接分组、短链生成与解析、网关路由、分库分表、对象存储、短信通知、分布式锁等完整微服务能力。业务集中在 `cloud-account` 与 `cloud-link` 两个模块,其余模块为后续扩展预留的脚手架。

| 维度 | 说明 |
| --- | --- |
| **产品形态** | 微服务集群(网关统一入口 + 多业务服务) |
| **核心场景** | 短链生成 / 解析、链接分组管理、账户与流量体系 |
| **中间件面** | Nacos · Gateway · Sharding-JDBC · Redisson · XXL-Job · Kaptcha |
| **云服务面** | 阿里云 OSS(文件) · 阿里云 SMS(短信) |
| **最佳用途** | Spring Cloud Alibaba 微服务架构的全景学习样本 |

---

## ✨ 核心能力

| 模块 | 能力 |
| --- | --- |
| 🔗 **短链生成** | `MurmurHash32 + Base62` 编码,拼接分库分表后缀生成全局短码(`ShortLinkComponent`) |
| 🗄️ **分库分表** | Sharding-JDBC 4.1.1 自研精确分片算法,DB 前缀(`0/1/a`)+ 随机表后缀(0-9)二维分片 |
| 👤 **账户体系** | 手机号 + 验证码注册、邮箱密码登录、JWT(HS256,7 天过期)鉴权,`LoginInterceptor` 注入 `LoginUser` |
| 🗂️ **链接分组** | `LinkGroup` 模型(标题 + accountNo)CRUD,短链按组归属 |
| 🛡️ **短链状态** | `code` 唯一索引、`sign`(MD5 快速查找)、`state`(lock/active)、`link_type` 三级会员等级预埋 |
| 📱 **短信通知** | `SmsComponent` + 阿里云短信 API,`SendCodeEnum` 场景枚举 |
| ☁️ **文件上传** | Aliyun OSS 客户端(`OSSConfig`),用户头像上传 |
| 📊 **流量统计** | `TrafficDO` / `TrafficTaskDO` 模型与 Mapper |
| 🔒 **分布式锁** | Redisson 3.10.1 |
| ⏰ **任务调度** | XXL-Job 2.3.0 分布式调度 |
| 🚪 **API 网关** | Spring Cloud Gateway(8888),基于 Nacos 服务发现转发 |
| 🧩 **通用组件** | 统一响应 `JsonData`、全局异常处理、雪花算法、Kaptcha 图形验证码 |

### 短链生成核心

```java
// MurmurHash32 + Base62 编码 + 分库分表后缀(ShortLinkComponent)
String code = encodeToBase62(CommonUtil.murmurHash32(param));
return ShardingDBConfig.getDBPrefix() + code + ShardingTableConfig.getRandomTableSuffix();
```

- **MurmurHash32**:非加密哈希,速度快、散列均匀,适合"短文本 → 短码"映射
- **Base62**:0-9 a-z A-Z 共 62 字符,7 位约 3.5 万亿组合
- **二维分片**:DB 前缀 + 随机表后缀,既分散写压力,又支持按 code 精准路由

---

## 🧱 技术栈

| 类别 | 选型 | 版本 | 用途 |
| --- | --- | --- | --- |
| 语言 | Java | 11 | 主开发语言 |
| 框架 | Spring Boot | 2.5.5 | 应用基座 |
| 微服务 | Spring Cloud | 2020.0.4 | 微服务套件 |
| 微服务(国产) | Spring Cloud Alibaba | 2021.1 | Nacos / Sentinel / Seata 集成 |
| 注册/配置中心 | Nacos | — | 服务发现 + 配置中心 |
| 网关 | Spring Cloud Gateway | — | 统一入口(8888) |
| ORM | MyBatis Plus | 3.4.0 | 增强持久层 |
| 连接池 | Druid | 1.1.16 | 数据库连接池 |
| 分库分表 | Sharding-JDBC | 4.1.1 | 自研精确分片算法 |
| 鉴权 | JWT(jjwt) | 0.7.0 | HS256 token 签发与校验 |
| 分布式锁 | Redisson | 3.10.1 | 并发控制 |
| 调度 | XXL-Job | 2.3.0 | 分布式任务调度 |
| 对象存储 | Aliyun OSS SDK | 3.10.2 | 头像 / 文件上传 |
| 短信 | Aliyun SMS | — | 验证码短信 |
| 验证码 | Kaptcha | 1.1.0 | 图形验证码 |
| 工具 | Lombok / Commons Lang3 / Commons Codec | 1.18.16 / 3.9 / 1.15 | 代码与工具库 |
| 测试 | JUnit | 4.12 | 单元测试 |

**数据存储**:MySQL 8.x(账户/短链/流量) · Redis(Jedis,验证码/token/锁) · 阿里云 OSS。

---

## 🏗️ 系统架构

```
                    ┌─────────────────────┐
                    │  客户端(Web/H5/App)  │
                    └──────────┬──────────┘
                               ▼
              ┌────────────────────────────────┐
              │   cloud-gateway  (8888)         │
              │   Spring Cloud Gateway          │
              │   基于 Nacos 服务发现路由          │
              └───────┬──────────────┬─────────┘
                      ▼              ▼
      ┌───────────────────────┐  ┌──────────────────────┐
      │  cloud-account (8001)  │  │  cloud-link (8001*)  │
      │  注册/登录/JWT/验证码    │  │  短链生成与解析核心     │
      │  OSS 上传 / 流量统计    │  │  ShortLinkComponent   │
      │  SmsComponent          │  │  自研分库分表 strategy  │
      └───────────┬───────────┘  └───────────┬──────────┘
                  ▼                          ▼
      ┌──────────────────────────────────────────────┐
      │   cloud-common:JWT / JsonData / 雪花ID /      │
      │   LoginInterceptor / 全局异常 / 枚举体系        │
      └──────────────────────────────────────────────┘
                  ▼                ▼             ▼
            ┌─────────┐    ┌──────────┐   ┌────────────┐
            │ MySQL 8 │    │  Redis   │   │ 阿里云      │
            │ (分库分表)│    │ (锁/缓存) │   │ OSS / SMS  │
            └─────────┘    └──────────┘   └────────────┘

      cloud-data(8002)/ cloud-shop / cloud-app:扩展预留脚手架
```

> *`cloud-link` / `cloud-shop` / `cloud-account` 的配置均写 8001,实际部署需以 `--server.port=` 或 Nacos 配置覆盖。

---

## 📂 项目结构

```
cloud-short-link/
├── pom.xml                     # 父 POM(8 模块聚合,三件套版本统一管理)
│
├── cloud-common/               # 公共组件
│   └── config/ constant/ enums/ exception/
│   └── interceptor/ model/ utils/   # JWTUtil / JsonData / 雪花ID ...
│
├── cloud-account/              # 账户服务(8001)
│   └── component/ config/ controller/
│   └── manage/ mapper/ model/ service/   # 注册登录 / OSS / SMS / 流量
│
├── cloud-link/                 # 短链核心(8001*)
│   └── component/              # ShortLinkComponent(生成核心)
│   └── controller/ manage/ mapper/ model/ service/ vo/
│   └── strategy/               # 自研分片:ShardingDBConfig /
│                               #   ShardingTableConfig / Custom*Algorithm
├── cloud-gateway/              # 网关(8888)
├── cloud-data/                 # 数据服务(脚手架)
├── cloud-shop/                 # 商城服务(脚手架)
├── cloud-app/                  # 通用应用入口骨架
└── cloud-short-link/           # 预留模块(仅含建表 SQL)
    ├── link_group_table.sql    # link_group 建表脚本
    └── short_link_table.sql    # short_link 建表脚本
```

---

## 🚀 快速开始

> ⚠️ **归档快照**:依赖锁定在 2021 年水平;配置文件中的凭证均为占位符,运行前需自行填充。

```bash
# 1) 基础设施准备
#    Nacos(注册+配置中心)、MySQL(按 SQL 脚本建库表)、Redis
#    阿里云 OSS / SMS 凭证(可选,涉及上传与短信功能时)

# 2) 替换各模块 application.yml 中的占位符:
#    <YOUR_NACOS_PASSWORD> / <YOUR_DB_PASSWORD> / <YOUR_REDIS_PASSWORD>
#    <YOUR_SMS_APP_CODE> / <YOUR_ALIYUN_OSS_ACCESS_KEY_SECRET>

# 3) 构建
mvn clean package -DskipTests

# 4) 启动(注意端口覆盖)
java -jar cloud-gateway/target/*.jar --server.port=8888
java -jar cloud-account/target/*.jar --server.port=8001
java -jar cloud-link/target/*.jar    --server.port=8002

# 5) 通过网关 http://localhost:8888 访问各服务接口
```

---

## 💡 学习价值

- **Spring Cloud Alibaba 三件套版本对应关系**:Spring Boot 2.5 + Spring Cloud 2020 + Alibaba 2021 的兼容矩阵与真实配置
- **Maven 多模块工程组织**:父 POM 统一版本管理、`dependencyManagement` 继承、仓库镜像配置
- **短链算法选型思维**:为什么选 MurmurHash(快、散列均匀)而非 MD5(慢、加密开销),Base62 的空间估算
- **Sharding-JDBC 自研分片**:`PreciseShardingAlgorithm` 实现,DB 前缀 + 表后缀的二维分片设计
- **JWT 鉴权闭环**:签发 → 拦截器解析 → `LoginUser` 注入 → 7 天过期的完整链路
- **云服务集成**:OSS 客户端 Bean 化、SMS 异步发送、Kaptcha 验证码
- **商业预埋设计**:`link_type` 三级会员等级字段,体会业务扩展性的预留方式
- **分层惯例**:Controller → Service/Manager → Mapper → DO/VO 的一致组织

---

## ⚠️ 已知限制

| # | 问题 | 说明 |
| --- | --- | --- |
| 1 | 凭证均为占位符 | 源仓库曾明文提交 7 处凭证,归档时已统一脱敏为 `<YOUR_...>`(详见 ARCHIVE.md 脱敏清单);**源仓库侧凭证视为已泄漏,如曾使用请立即轮换** |
| 2 | 部分模块为脚手架 | `cloud-data` / `cloud-shop` / `cloud-app` / 根级 `cloud-short-link` 待业务填充 |
| 3 | 端口冲突 | 三个服务配置均写 8001,部署时需显式覆盖 |
| 4 | MySQL Connector 5.x 兼容性 | 连接 MySQL 8 服务端需处理 `caching_sha2_password` 认证问题 |

---

## 🗄️ 归档状态

| 项 | 内容 |
| --- | --- |
| 原仓库 | `git@github.com:wychmod/cloud-short-link.git` |
| 归档日期 | 2026-06-28 |
| 导入方式 | 临时克隆脱敏(7 处凭证替换占位符)后 subtree 导入,归档 history 中不含真实凭证 |
| 当前状态 | **已归档,只读快照**,仅保留源码作为历史学习参考 |

详细档案(模块明细、脱敏清单、owner 紧急动作建议)见 [`ARCHIVE.md`](./ARCHIVE.md)。

---

## 📜 License

原仓库未附带 LICENSE 文件。本项目仅用于学习与历史归档参考。
