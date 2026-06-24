# 归档说明

## 基本信息

- 原仓库：git@github.com:wychmod/wiki.git
- 归档目录：archived-projects/wiki/
- 归档日期：2026-06-25
- 导入提交：4da2ce2696d410fae9f95090a9756ddf7946d91e
- 提交日期：2021-11-03
- 提交说明：完整修改
- 当前状态：已归档，仅保留源码作为历史学习参考

## 项目简介

`wiki` 是一个全栈知识库 / 文档管理系统的练手项目。系统以「电子书 (Ebook) → 分类 (Category) → 文档 (Doc)」三层结构组织内容，配合富文本编辑、文档点赞、阅读统计和 WebSocket 实时通知，形成一个类语雀 / Confluence 的小型知识库。

主要功能模块：

- **电子书管理**：电子书的增删改查、列表分页、按分类筛选
- **分类管理**：树形分类结构，支持父子层级、级联禁用 / 删除
- **文档管理**：树形文档节点，支持富文本编辑（wangEditor）、内容预览、文档快照表
- **文档点赞**：同一 IP 一天只能对同一文档点赞一次，阅读量 +1 统计
- **WebSocket 实时通知**：点赞事件通过 RocketMQ 解耦后由 WebSocket 推送给被点赞作者（后因场景不需要又去掉了 MQ）
- **用户系统**：注册、登录、密码重置、自定义异常（用户名重复校验）、登录态用 Redis 存储
- **定时任务**：定时刷新电子书阅读量、点赞数等汇总信息到快照表
- **AOP / 日志**：日志流水号透传到异步线程，方便生产运维定位
- **统一响应封装**：`CommonResp<T>` + 业务码体系 + 全局异常处理

## 技术栈

### 后端

- Java 8
- Spring Boot 2.4.0
- Spring MVC / Spring AOP / Spring Validation
- MyBatis + MyBatis Generator（自动生成 mapper / domain / xml）
- MySQL 8.0.22
- MyBatis PageHelper 分页插件
- Redis（登录态、点赞计数）
- WebSocket（实时通知）
- RocketMQ（已注释掉，最初用于点赞通知解耦，最终改为直接异步推送 WS）
- Fastjson 1.2.70（前后端 Long 类型精度丢失修复）
- Logback + 日志流水号

### 前端（`web/` 目录）

- Vue 3 + TypeScript
- Vue Router 4 + Vuex 4
- Ant Design Vue 2.2.x
- Axios 0.21
- wangEditor 4.6.3（富文本编辑器）
- Vue CLI 4.5（构建工具）

### 工程实践

- Maven 多模块无关，单 module 但结构清晰（controller / service / mapper / domain / req / resp / aspect / filter / interceptor / job / util / websocket / exception / config）
- 全局统一返回结构、统一的业务异常体系
- MyBatis Generator 模板化生成持久层
- HTTP 测试用例（`.http` 文件，配合 IntelliJ HTTP Client）

## 学习重点

- Spring Boot 全栈项目的常规分层与配置
- MyBatis Generator 的接入与使用，能从 SQL 表直接生成 CRUD
- 树形数据的递归处理（禁用节点、级联删除、加载顺序控制）
- 登录态在 Redis 中的存储与拦截器实现
- WebSocket 与业务系统的集成：连接管理、消息推送
- MQ 在小项目里的取舍：是否真的需要解耦
- AOP 在日志场景的实战（流水号、异步线程透传）
- 定时任务（`@Scheduled`）的使用与电子书快照表设计
- 前后端协同：跨域、token 一致性、Long 类型精度丢失（前端 JSON parse 改字符串再转）
- 富文本编辑器与后端内容存储的衔接

## 归档备注

本目录保留从原仓库导入时的项目文件，不包含原仓库的 `.git` 目录。

原仓库 README 仅有一行 `# wiki知识仓库`，作为项目说明一并保留；前端 `web/` 子目录另有一份 Vue CLI 默认生成的 `README.md`。

提交历史完整覆盖从 2021-07（分类管理、用户表）到 2021-11-03（最后一次提交「完整修改」）的迭代过程，能清晰看到从单一 CRUD → 加 Redis 登录 → 加 AOP 日志 → 集成 MQ → 又移除 MQ → 加 WebSocket → 加定时任务的演进轨迹，非常适合作为「小型全栈项目逐步迭代」的参考样本。

Spring Boot 停在 2.4.0（2020 年末版本），依赖（Vue 3.1、Vue CLI 4.5、Ant Design Vue 2.2、TypeScript 4.1、MySQL Connector 8.0.22）也比较早期；如需重新运行需要按当时版本准备 JDK 1.8 + Node 环境 + MySQL 8。`doc/all.sql` 提供完整建表脚本，可直接导入。

代码中包含历史配置（如 `application.properties` 中的本地数据库账号密码、MyBatis Generator 配置），属于学习项目常见做法，不可直接用于生产环境。