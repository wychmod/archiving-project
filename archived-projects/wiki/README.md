<div align="center">

# 📚 wiki

### Spring Boot + Vue 3 的全栈知识库 / 文档管理系统

[![Status](https://img.shields.io/badge/status-archive-lightgrey.svg)](#-归档状态)
[![Java](https://img.shields.io/badge/java-8-007396.svg?logo=openjdk&logoColor=white)](https://www.java.com)
[![Spring Boot](https://img.shields.io/badge/spring%20boot-2.4.0-6DB33F.svg?logo=springboot&logoColor=white)](https://spring.io)
[![Vue](https://img.shields.io/badge/vue-3.1-4FC08D.svg?logo=vuedotjs&logoColor=white)](https://vuejs.org)
[![TypeScript](https://img.shields.io/badge/typescript-4.1-3178C6.svg?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Ant Design Vue](https://img.shields.io/badge/ant%20design%20vue-2.2-0170FE.svg)](https://antdv.com)
[![MySQL](https://img.shields.io/badge/mysql-8.0-4479A1.svg?logo=mysql&logoColor=white)](https://www.mysql.com)
[![Redis](https://img.shields.io/badge/redis-session-DC382D.svg?logo=redis&logoColor=white)](https://redis.io)

**一个类语雀 / Confluence 的知识库系统:「电子书 → 分类 → 文档」三层内容组织,树形文档 + wangEditor 富文本,WebSocket 实时点赞通知,定时快照统计——前后端分离全栈练手的完整样本。**

[功能](#-核心功能) · [技术栈](#-技术栈) · [架构](#️-系统架构) · [快速开始](#-快速开始) · [结构](#-项目结构) · [归档状态](#-归档状态)

</div>

---

## 📑 目录

- [项目概述](#-项目概述)
- [核心功能](#-核心功能)
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

`wiki` 是一个全栈知识库 / 文档管理系统的练手项目,以「**电子书(Ebook) → 分类(Category) → 文档(Doc)**」三层结构组织内容,配合富文本编辑、树形分类、文档点赞、阅读统计与 WebSocket 实时通知,形成一个小型但功能完备的类语雀 / Confluence 知识库。

提交历史完整覆盖 2021-07 至 2021-11 的迭代过程:从单一 CRUD → 加 Redis 登录 → 加 AOP 日志 → 集成 MQ → 又移除 MQ → 加 WebSocket → 加定时任务,**能清晰看到一个小型全栈项目逐步演进的完整轨迹**。

| 维度 | 说明 |
| --- | --- |
| **产品形态** | 前后端分离 SPA(Vue 3)+ RESTful API(Spring Boot) |
| **内容模型** | 电子书 → 分类(树形)→ 文档(树形)三层 |
| **实时能力** | WebSocket 点赞通知 + 阅读量统计 |
| **运维设施** | AOP 日志流水号、定时快照任务、统一响应封装 |
| **最佳用途** | 小型全栈项目从 0 到 1 的迭代参考样本 |

---

## ✨ 核心功能

| 模块 | 能力 |
| --- | --- |
| 📕 **电子书管理** | 增删改查、列表分页、按分类筛选 |
| 🗂️ **分类管理** | 树形分类,支持父子层级、级联禁用与级联删除 |
| 📄 **文档管理** | 树形文档节点、wangEditor 富文本编辑、内容预览、文档快照表 |
| 👍 **文档点赞** | 同一 IP 一天只能对同一文档点赞一次(Redis 计数),阅读量 +1 统计 |
| 🔔 **实时通知** | 点赞事件经 WebSocket 实时推送给被点赞作者(初期经 RocketMQ 解耦,后因场景不需要改为直接异步推送) |
| 👤 **用户系统** | 注册、登录、密码重置、用户名重复校验(自定义异常),登录态存 Redis |
| ⏰ **定时任务** | `@Scheduled` 定时刷新电子书阅读量、点赞数汇总到快照表 |
| 🧾 **AOP 日志** | 日志流水号透传到异步线程,生产运维友好 |
| 📦 **统一响应** | `CommonResp<T>` + 业务码体系 + 全局异常处理 |

---

## 🧱 技术栈

### 后端

| 类别 | 选型 | 版本 | 用途 |
| --- | --- | --- | --- |
| 语言 | Java | 8 | 主开发语言 |
| 框架 | Spring Boot | 2.4.0 | Web / AOP / Validation |
| ORM | MyBatis + MyBatis Generator | — | 持久层模板化生成(mapper / domain / xml) |
| 分页 | PageHelper | — | 物理分页插件 |
| 数据库 | MySQL | 8.0.22 | 关系型存储(`doc/all.sql` 提供建表脚本) |
| 缓存 | Redis | — | 登录态存储、点赞计数 |
| 实时通信 | WebSocket | — | 点赞事件实时推送 |
| 消息队列 | RocketMQ | 已注释 | 初期用于点赞解耦,最终移除(架构取舍记录) |
| 序列化 | Fastjson | 1.2.70 | 解决前后端 Long 精度丢失 |
| 日志 | Logback + 流水号 | — | AOP 切面 + 异步线程透传 |

### 前端(`web/`)

| 类别 | 选型 | 版本 | 用途 |
| --- | --- | --- | --- |
| 框架 | Vue 3 | ^3.1.4 | 组合式 API |
| 语言 | TypeScript | ~4.1.5 | 类型安全 |
| 路由 | Vue Router | ^4.0.0 | SPA 路由 |
| 状态 | Vuex | ^4.0.0 | 全局状态(用户/侧边栏) |
| UI 库 | Ant Design Vue | ^2.2.0-rc.1 | 企业级组件 |
| 富文本 | wangEditor | 4.6.3 | 文档编辑器 |
| HTTP | Axios | 0.21.0 | API 调用 |
| 构建 | Vue CLI | ~4.5.0 | 工程脚手架 |

---

## 🏗️ 系统架构

```
┌────────────────────────────────────────────────────────┐
│                 Vue 3 SPA(web/)                        │
│   Ant Design Vue  +  wangEditor  +  Vuex / Router      │
└──────────────────────────┬─────────────────────────────┘
                           │ Axios (token / 跨域处理)
                           ▼
┌────────────────────────────────────────────────────────┐
│            Spring Boot 2.4(controller/service)          │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌───────────┐  │
│  │ Ebook    │ │ Category │ │ Doc      │ │ User      │  │
│  │ 电子书    │ │ 树形分类  │ │ 树形文档  │ │ Redis 会话 │  │
│  └──────────┘ └──────────┘ └──────────┘ └───────────┘  │
│  ┌──────────────────────┐  ┌────────────────────────┐  │
│  │ WebSocket 推送        │  │ AOP 日志 + 定时快照 Job  │  │
│  │ (点赞实时通知)         │  │ (@Scheduled 汇总统计)   │  │
│  └──────────────────────┘  └────────────────────────┘  │
│         MyBatis(mapper/domain)  +  统一响应 CommonResp   │
└───────────────┬───────────────────────────┬────────────┘
                ▼                           ▼
        ┌──────────────┐            ┌──────────────┐
        │   MySQL 8    │            │    Redis     │
        │ (doc/all.sql)│            │  登录态/点赞  │
        └──────────────┘            └──────────────┘
```

---

## 📂 项目结构

```
wiki/
├── README.md               # 本文件
├── ARCHIVE.md              # 归档档案
├── pom.xml                 # Spring Boot 2.4.0
├── mvnw / mvnw.cmd         # Maven Wrapper
│
├── doc/
│   └── all.sql             # 完整建表脚本,可直接导入 MySQL
│
├── http/                   # IntelliJ HTTP Client 测试用例(.http)
│
├── src/main/java/.../      # 后端(单 module,分包清晰)
│   ├── controller/         # 电子书 / 分类 / 文档 / 用户接口
│   ├── service/            # 业务逻辑(树形递归 / 点赞 / 快照)
│   ├── mapper/  domain/    # MyBatis Generator 生成持久层
│   ├── req/  resp/         # 请求 / 响应 DTO
│   ├── aspect/             # AOP 日志流水号
│   ├── filter/  interceptor/
│   ├── job/                # @Scheduled 定时快照任务
│   ├── websocket/          # WS 连接管理与推送
│   ├── exception/  config/  util/
│   └── ...
│
└── web/                    # Vue 3 + TypeScript 前端
    ├── package.json
    ├── public/
    └── src/                # 视图 / 组件 / 状态 / 工具
```

---

## 🚀 快速开始

> ⚠️ **归档快照**:依赖停留在 2021 年版本(Spring Boot 2.4.0 / Vue 3.1 / Vue CLI 4.5),仅供历史学习参考。

```bash
# 1) 环境准备:JDK 1.8 + Maven 3 + Node(对应 Vue CLI 4.5 时代)+ MySQL 8 + Redis

# 2) 初始化数据库
mysql -u<user> -p < doc/all.sql
# 修改 application.properties 中的本地数据库配置

# 3) 启动后端
./mvnw spring-boot:run

# 4) 启动前端(新终端)
cd web
npm install
npm run serve            # 默认 http://localhost:8080
```

---

## 💡 学习价值

- **小型全栈项目的完整演进史**:git 历史即教程——从 CRUD 到 Redis 会话、AOP 日志、MQ 取舍、WebSocket、定时任务的每一步都有据可查
- **MyBatis Generator 工作流**:从 SQL 表直接生成 CRUD 持久层
- **树形数据的递归处理**:分类 / 文档的父子层级、级联禁用、级联删除与加载顺序控制
- **Redis 会话与拦截器**:登录态存储 + 拦截器校验的经典组合
- **WebSocket 与业务集成**:连接管理、按用户推送、点赞通知闭环
- **MQ 的取舍思维**:RocketMQ 引入又移除的过程,回答"小项目到底要不要上 MQ"
- **AOP 实战**:日志流水号生成与异步线程透传,生产可观测性的一角
- **前后端协同细节**:跨域、token 一致性、Long 精度丢失(JSON parse 改字符串再转)的踩坑实录

---

## ⚠️ 已知限制

| # | 问题 | 说明 |
| --- | --- | --- |
| 1 | 依赖版本老旧 | Spring Boot 2.4.0(2020 年末)、Vue CLI 4.5、Ant Design Vue 2.2 等,重运行需按当时版本准备环境 |
| 2 | 历史配置残留 | `application.properties` 含本地数据库账号、MyBatis Generator 配置,属学习项目常见做法,不可用于生产 |
| 3 | RocketMQ 代码已注释 | 保留作为架构取舍记录,如需启用需自行恢复依赖 |

---

## 🗄️ 归档状态

| 项 | 内容 |
| --- | --- |
| 原仓库 | `git@github.com:wychmod/wiki.git` |
| 归档日期 | 2026-06-25 |
| 快照基线 | 2021-11-03 「完整修改」 |
| 当前状态 | **已归档,只读快照**,仅保留源码作为历史学习参考 |

详细档案(功能明细、演进轨迹)见 [`ARCHIVE.md`](./ARCHIVE.md)。

---

## 📜 License

原仓库未附带 LICENSE 文件。本项目仅用于学习与历史归档参考。
