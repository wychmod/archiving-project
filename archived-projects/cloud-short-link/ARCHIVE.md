# 归档说明

## 基本信息

- 原仓库：git@github.com:wychmod/cloud-short-link.git
- 归档目录：archived-projects/cloud-short-link/
- 归档日期：2026-06-28
- 导入分支：`main`(源仓库唯一分支)
- 导入提交(源仓库原始 HEAD)：`63e483306746d7cff85db4fb994e4751a90853f8`
- 导入提交(归档仓库 squash)：`6674213349f8bd81f2f8a14d63c794016cdf05eb`
- **导入方式**:源仓库的 `application.yml` 中**明文提交了 7 处生产/开发凭证**(Aliyun OSS AccessKey Secret、MySQL root、Redis、SMS app-code、5 个模块的 Nacos 默认凭证),直接 `git subtree add` 会把凭证冻结进归档仓库的 history blob 里,触发 GitHub Push Protection。owner 授权后,**先在临时克隆里把凭证替换为占位符并独立 commit**,再以这个脱敏后的 HEAD 作为 subtree 源导入归档仓库,因此归档仓库 history 中**不含**任何真实凭证。
- 当前状态:已归档,仅保留源码作为历史学习参考

## 项目简介

`cloud-short-link` 是一个**基于 Spring Cloud Alibaba 的云原生短链接生成与管理系统**,采用 8 模块 Maven 多模块架构,涵盖账户体系、链接分组、短链生成与解析、网关路由、分库分表、对象存储、短信通知、分布式锁等完整微服务能力。

### 业务核心 — 短链生成流程

短链的生成是项目的核心能力,实现在 `cloud-link` 模块的 `ShortLinkComponent` 中:

```java
// MurmurHash32 + Base62 编码 + 分库分表后缀
String code = encodeToBase62(CommonUtil.murmurHash32(param));
return ShardingDBConfig.getDBPrefix() + code + ShardingTableConfig.getRandomTableSuffix();
```

- **MurmurHash32**:非加密型哈希算法,速度快、散列性好,适合短链这种"短文本 → 短码"映射
- **Base62 编码**:0-9 a-z A-Z 共 62 字符,7 位长度约 3.5 万亿组合,足够覆盖短链空间
- **分库分表**:`ShardingDBConfig` 维护库前缀列表(`0/1/a`),`ShardingTableConfig` 随机表后缀(0-9),通过 Sharding-JDBC 自定义算法(`CustomDBPreciseShardingAlgorithm` / `CustomTablePreciseShardingAlgorithm`)路由到具体库表

### 模块划分

| 模块 | 端口 | 职责 |
| --- | --- | --- |
| `cloud-app` | — | 通用应用入口骨架 |
| `cloud-common` | — | 公共工具类(JWT / JsonData / CheckUtil / TimeUtil / IDUtil)、枚举(AuthType / BizCode / SendCode / ShortLinkState)、异常体系、RedisTemplate 配置、雪花算法配置 |
| `cloud-account` | 8001 | 账户服务:注册 / 登录 / JWT / 短信验证码 / 文件上传(OSS) / 流量统计 / 登录拦截器 |
| `cloud-link` | 8001* | 短链核心:链接分组 CRUD、短链生成与查询、自研分库分表策略 |
| `cloud-data` | 8002 | 数据服务(模块脚手架,待业务填充) |
| `cloud-gateway` | 8888 | Spring Cloud Gateway 网关(注册到 Nacos,转发到各微服务) |
| `cloud-shop` | 8001* | 商城服务(模块脚手架,待业务填充) |
| `cloud-short-link` | — | 未来短链服务模块(根目录,仅含 2 张建表 SQL,Java 代码未开始) |

> *注:`cloud-link` / `cloud-shop` / `cloud-account` 的 `server.port` 配置文件都写了 8001,**实际部署**时应该通过 `--server.port=` 或 Nacos 配置覆盖。源仓库的 pom.xml 注释暗示后续会用 Nacos 配置中心统一管理。

### 核心能力

- **账户体系**:手机号 + 验证码注册、邮箱密码登录、JWT token 鉴权(HS256 + 自定义 SECRET,7 天过期)、`LoginInterceptor` 拦截器解析 token 注入 `LoginUser`
- **链接分组**:`LinkGroup` 模型(标题 + accountNo),支持增删改查
- **短链生成**:MurmurHash32 + Base62 + 分库分表后缀;`ShortLinkDO` 含 `code`(唯一索引)、`sign`(MD5 用于快速查找)、`expired`、`state`(lock/active)、`link_type`(FIRST/SECOND/THIRD 会员等级)
- **分库分表**:基于 Sharding-JDBC 4.1.1 的自研分片算法(`strategy/CustomDBPreciseShardingAlgorithm` / `CustomTablePreciseShardingAlgorithm`)
- **短信通知**:`SmsComponent` + `NotifyServiceImpl`,基于阿里云短信 API,支持 `SendCodeEnum` 场景枚举
- **文件上传**:`FileServiceImpl` 走 Aliyun OSS(`OSSConfig` + `accessKeyId` / `accessKeySecret`),支持用户头像上传
- **流量统计**:`TrafficDO` / `TrafficTaskDO` 模型 + `TrafficMapper` / `TrafficTaskMapper`
- **验证码**:`CaptchaConfig` + Kaptcha 图形验证码
- **分布式锁**:Redisson 3.10.1
- **分布式任务调度**:XXL-Job 2.3.0
- **网关**:Spring Cloud Gateway 8888 端口,基于 Nacos 服务发现

## 技术栈

### 运行时

| 类别 | 选型 | 版本 | 用途 |
| --- | --- | --- | --- |
| 语言 | Java | 11 | 主开发语言 |
| Web 框架 | Spring Boot | 2.5.5 | 应用框架 |
| 微服务 | Spring Cloud | 2020.0.4 | 微服务套件 |
| 微服务(国产) | Spring Cloud Alibaba | 2021.1 | Nacos / Sentinel / Seata 集成 |
| 服务发现 / 配置 | Nacos | — | 注册中心 + 配置中心(本次脱敏后为占位符) |
| 网关 | Spring Cloud Gateway | — | API 网关(8888 端口) |
| 持久化 | MyBatis Plus | 3.4.0 | ORM 增强(分页、代码生成) |
| 连接池 | Druid | 1.1.16 | 数据库连接池 |
| 鉴权 | JWT (jjwt) | 0.7.0 | HS256 token 签发与校验 |
| 分布式锁 | Redisson | 3.10.1 | 分布式锁 |
| 分库分表 | Sharding-JDBC | 4.1.1 | 透明分库分表 |
| 定时任务 | XXL-Job | 2.3.0 | 分布式任务调度 |
| 对象存储 | Aliyun OSS SDK | 3.10.2 | 阿里云 OSS 客户端(头像/文件上传) |
| 短信 | Aliyun SMS | — | 阿里云短信 API |
| 验证码 | Kaptcha | 1.1.0 | 图形验证码生成 |
| 工具 | Lombok | 1.18.16 | 编译期代码生成 |
| 工具 | Commons Lang3 | 3.9 | 字符串/日期工具 |
| 工具 | Commons Codec | 1.15 | Hex/Base64 编解码 |
| 测试 | JUnit | 4.12 | 单元测试 |

### 数据存储

| 类别 | 选型 | 用途 |
| --- | --- | --- |
| 关系数据库 | MySQL 8.x(推断) | 账户/短链/流量数据 |
| 缓存 | Redis(Jedis) | 验证码、token 缓存、分布式锁 |
| 对象存储 | 阿里云 OSS | 用户头像、附件 |

## 项目结构

```
cloud-short-link/
├── pom.xml                     # 父 POM(8 模块聚合,版本统一管理)
├── .gitignore
├── link_group_table.sql        # link_group 表结构(根目录,SQL 漂移)
├── short_link_table.sql        # short_link 表结构(根目录,SQL 漂移)
│
├── cloud-app/                  # 通用应用入口
│   ├── pom.xml
│   └── src/main/java/.../Main.java
│
├── cloud-common/               # 公共组件
│   ├── pom.xml
│   └── src/main/java/com/wychmod/
│       ├── config/             # RedisTemplate / RestTemplate / SnowFlake 配置
│       ├── constant/           # RedisKey 常量
│       ├── enums/              # AuthType / BizCode / SendCode / ShortLinkState
│       ├── exception/          # BizException + 全局异常处理器
│       ├── interceptor/        # LoginInterceptor
│       ├── model/              # LoginUser
│       └── utils/              # JWTUtil / JsonData / JsonUtil / CheckUtil / CommonUtil / IDUtil / TimeUtil
│
├── cloud-account/              # 账户服务(8001)
│   ├── pom.xml
│   └── src/main/
│       ├── java/com/wychmod/
│       │   ├── AccountApplication.java
│       │   ├── component/      # SmsComponent
│       │   ├── config/         # Captcha / Interceptor / OSS / Sms / ThreadPoolTask
│       │   ├── controller/     # Account / Notify
│       │   ├── manage/         # AccountManager(接口) + Impl
│       │   ├── mapper/         # Account / Traffic / TrafficTask Mapper
│       │   ├── model/          # Account / Traffic / TrafficTask DO
│       │   └── service/        # Account / File / Notify Service + Impl
│       └── resources/
│           ├── application.yml
│           └── mapper/         # AccountMapper.xml
│
├── cloud-link/                 # 短链核心(8001*)
│   ├── pom.xml
│   └── src/main/
│       ├── java/com/wychmod/
│       │   ├── LinkApplication.java
│       │   ├── component/      # ShortLinkComponent(短链生成核心)
│       │   ├── config/         # InterceptorConfig
│       │   ├── controller/     # LinkApi / LinkGroup / ShortLink Controller
│       │   ├── manage/         # LinkGroup / ShortLink Manager
│       │   ├── mapper/         # LinkGroup / ShortLink Mapper
│       │   ├── model/          # LinkGroup / ShortLink DO
│       │   ├── service/        # LinkGroup / ShortLink Service
│       │   ├── strategy/       # 自研分库分表算法(ShardingDBConfig / ShardingTableConfig / CustomDB* / CustomTable*)
│       │   └── vo/             # LinkGroup / ShortLink VO
│       └── resources/application.yml
│
├── cloud-data/                 # 数据服务(8002)
│   ├── pom.xml
│   └── src/main/resources/application.yml
│
├── cloud-gateway/              # 网关(8888)
│   ├── pom.xml
│   └── src/main/resources/application.yml
│
├── cloud-shop/                 # 商城服务(8001*)
│   ├── pom.xml
│   └── src/main/resources/application.yml
│
└── cloud-short-link/           # 未来短链服务(根模块同名,无 pom.xml)
    ├── link_group_table.sql
    └── short_link_table.sql
```

## 学习重点

- **Spring Cloud Alibaba 微服务架构实战**:8 模块聚合、Nacos 服务发现/配置、Spring Cloud Gateway 网关、Spring Boot 2.5 + Spring Cloud 2020 + Spring Cloud Alibaba 2021 三件套的版本对应关系
- **Maven 多模块工程组织**:父 POM 版本统一管理(`spring.boot.version` / `spring.cloud.version` / `alibaba.cloud.version`)、子模块 `dependencyManagement` 继承、`maven-ali` 仓库镜像配置
- **短链生成核心算法**:MurmurHash32 + Base62 + 分库分表后缀——理解为什么选 MurmurHash(非加密但快、散列均匀)而不是 MD5(慢、有加密开销)
- **分库分表自研策略**:Sharding-JDBC 的 `PreciseShardingAlgorithm` 自定义实现,基于业务字段(短链 code / 账户号)哈希路由
- **JWT 鉴权闭环**:`JWTUtil` 签发 HS256 token + `LoginInterceptor` 解析 token 注入 `LoginUser` + 7 天过期
- **Aliyun OSS / SMS 集成**:`OSSConfig` 加载 accessKey 注入 OSSClient Bean,`SmsComponent` 异步发送短信
- **统一响应体**:`JsonData` 包装业务结果(成功/失败/BizCode),与全局异常处理器 `CustomExceptionHandler` 配合
- **分片键设计**:短链 code 的"DB 前缀 + table 后缀"二维分片,既分散写压力,又支持按 code 精准路由
- **会员等级字段**:`link_type` 三级(FIRST/SECOND/THIRD),实际是商业化的预埋设计
- **代码组织惯例**:Controller → Service/Manager → Mapper → DO/VO,每个模块独立 `application.yml` 通过 Nacos 拉共享配置

## 归档备注

本目录保留从原仓库导入时的项目文件(共 8 个 Maven 模块 + 2 张 SQL + 1 个父 POM),核心 Java 代码约 100+ 个类,业务集中在 `cloud-account` 和 `cloud-link` 两个模块,其他模块是脚手架或仅含配置。

依赖版本锁定在 2021 年中水平(Spring Boot 2.5.5、Spring Cloud 2020.0.4、Alibaba Cloud 2021.1),Java 11 编译。如需运行需准备:
- Nacos 服务(地址 + 凭证)
- MySQL 实例 + 三个库(`cloud_account` 等,根据业务实际创建)
- Redis 实例
- 阿里云 OSS + 短信 API 凭证
- 公网可达的部署环境

### 🔒 凭证脱敏(2026-06-28 归档时执行)

源仓库在历史 commit 中**明文提交了 7 处生产/开发凭证**,owner 授权在归档导入时统一脱敏:

| 文件 | 字段 | 原值 | 占位符 |
| --- | --- | --- | --- |
| `cloud-account/application.yml` | Nacos password | `nacos`(默认) | `<YOUR_NACOS_PASSWORD>` |
| `cloud-account/application.yml` | MySQL `root` 密码 | `penghan123` | `<YOUR_DB_PASSWORD>` |
| `cloud-account/application.yml` | Redis 密码 | `penghan123` | `<YOUR_REDIS_PASSWORD>` |
| `cloud-account/application.yml` | SMS app-code | `1b146795e5bf4cc5aed60190f7c7f0fd` | `<YOUR_SMS_APP_CODE>` |
| `cloud-account/application.yml` | **Aliyun OSS access-key-secret** | `TB1ueNM4g9T5eewsdKtFSqmYoqx7g7` | `<YOUR_ALIYUN_OSS_ACCESS_KEY_SECRET>` |
| `cloud-shop/application.yml` | Nacos password | `nacos` | `<YOUR_NACOS_PASSWORD>` |
| `cloud-link/application.yml` | Nacos password | `nacos` | `<YOUR_NACOS_PASSWORD>` |
| `cloud-data/application.yml` | Nacos password | `nacos` | `<YOUR_NACOS_PASSWORD>` |
| `cloud-gateway/application.yml` | Nacos password | `nacos` | `<YOUR_NACOS_PASSWORD>` |

**变更方法**:在临时克隆里改 → 独立 commit(`1253044`)→ `git subtree add` 拉这个脱敏后的 HEAD,因此归档仓库 history 中**不含**任何真凭证。

### ⚠️ owner 紧急程度(高危 → 低危)

| # | 凭证 | 紧急度 | 建议 |
| --- | --- | --- | --- |
| 1 | **Aliyun OSS access-key-secret** | 🔴 **立即** | 到阿里云 RAM 控制台**禁用**该 AccessKey,然后重新生成。泄漏 = 任何人都能读写 `wychmod-link` bucket |
| 2 | MySQL `root/penghan123` | 🔴 **立即** | 改 MySQL 密码,授权限 `localhost` 或内网段;关闭公网 3306 |
| 3 | Redis `117.72.218.181:6379 penghan123` | 🔴 **立即** | 同上,改密码 + 限制内网访问 |
| 4 | Nacos `nacos/nacos` 默认 | 🟠 高 | 改 Nacos 鉴权 + 不暴露公网(8848 端口扫描重灾区) |
| 5 | SMS app-code | 🟡 中 | 阿里云短信控制台重置 app-code |

**⚠️ 同源风险**:源仓库的 `git log` 早期 commit 同样包含这些真凭证。彻底清除需 `git filter-repo` 改写 history(本次归档仓库禁用,源仓库由 owner 自行决定)。
