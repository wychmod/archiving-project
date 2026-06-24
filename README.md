# Archiving Project

> A single source of truth for retired side projects and historical learning archives.

[![Status](https://img.shields.io/badge/status-archive-blueviolet.svg)](#)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](#)
[![Maintained](https://img.shields.io/badge/maintained-yes-success.svg)](#)

一个用于集中归档个人 GitHub 历史学习项目、练手项目、实验项目和不再单独维护的旧项目的仓库。所有需要保留但不适合继续分散维护的项目,都会迁入此处并登记在册,作为个人学习路径与技术积累的可检索索引。

---

## 目录

- [设计理念](#设计理念)
- [项目清单](#项目清单)
- [目录结构](#目录结构)
- [分类说明](#分类说明)
- [如何归档新项目](#如何归档新项目)
- [面向 AI Agent](#面向-ai-agent)
- [License](#license)

---

## 设计理念

- **集中即索引**:统一入口,降低历史项目的检索成本。
- **保真优先**:归档以保留原始结构与提交历史为前提,迁移过程尽量做到零侵入。
- **状态透明**:每个项目都有显式的维护状态与原始来源,避免日后重复排查。
- **可读胜过完整**:根级 `README.md` 只做高阶概览,详细规范下沉到 `AGENTS.md` / `CLAUDE.md`。

---

## 项目清单

| 项目名称 | 目录 | 简介 | 技术栈 | 状态 |
| --- | --- | --- | --- | --- |
| ChatGPT-Next-Web | [`archived-projects/ChatGPT-Next-Web/`](./archived-projects/ChatGPT-Next-Web) | 跨平台私人 ChatGPT Web UI,支持一键部署、PWA、桌面客户端、本地会话存储和多语言界面 | Next.js · React · TypeScript · Sass · Zustand · Tauri · Docker/Vercel | 已归档 |
| ToDoList | [`archived-projects/ToDoList/`](./archived-projects/ToDoList) | 待办事项全栈练习项目,Django + React,支持 CRUD、优先级、到期时间与排序 | Python · Django · DRF · React · React Bootstrap · Webpack | 已归档 |
| 1802axf(爱先蜂) | [`archived-projects/1802axf/`](./archived-projects/1802axf) | Django 课设项目,O2O 闪送超市 Demo,含主页/闪送超市/购物车/我的四个主模块,支持登录注册、商品分类、购物车与下单 | Python · Django 1.11.4 · SQLite · jQuery · Bootstrap · Swiper | 已归档 |
| wiki(知识库) | [`archived-projects/wiki/`](./archived-projects/wiki) | 全栈知识库/文档管理系统,Spring Boot + Vue 3 + Ant Design Vue,以「电子书→分类→文档」三层结构组织内容,支持富文本编辑、树形分类、文档点赞、WebSocket 实时通知、阅读量统计与定时快照 | Java 8 · Spring Boot 2.4 · MyBatis · MySQL 8 · Redis · WebSocket · PageHelper · Vue 3 · TypeScript · Ant Design Vue · wangEditor | 已归档 |
| bolg(博客) | [`archived-projects/bolg/`](./archived-projects/bolg) | Flask 全栈博客练手项目,应用工厂模式,含注册激活、文章 CRUD、个人中心、收藏、搜索、分页与文件上传 | Python · Flask · Flask-Login · Flask-SQLAlchemy · Flask-Migrate · Flask-WTF · Jinja2 · SQLite | 已归档 |
| Lottery(抽奖系统) | [`archived-projects/lottery/`](./archived-projects/lottery) | DDD 四层架构 + Spring Boot + Dubbo RPC + 自研分库分表中间件的完整抽奖系统,含抽奖策略/活动/奖品三大领域 + ID 生成器 + dbRouter 注解路由;配套 4 章笔记 + SQL + XMind + PPT + Excel 教学资料 | Java 8 · Spring Boot 2.3 · MyBatis · Dubbo 2.6 · ZooKeeper · MySQL · Redis · JSP | 已归档 |

> 完整归档规范、提交规范与禁止动作见 [`AGENTS.md`](./AGENTS.md)。

---

## 目录结构

```
archiving-project/
├── README.md                   # 本文件,项目门面
├── AGENTS.md                   # 通用 AI Agent 操作规范
├── CLAUDE.md                   # Claude 偏好补充
└── archived-projects/          # 历史归档项目
    ├── ChatGPT-Next-Web/       # ARCHIVE.md · 跨平台 ChatGPT Web UI
    ├── ToDoList/               # ARCHIVE.md · Django + React 待办事项
    ├── 1802axf/                # ARCHIVE.md · Django 课设 O2O 闪送超市
    ├── wiki/                   # ARCHIVE.md · Spring Boot + Vue 知识库
    ├── bolg/                   # ARCHIVE.md · Flask 全栈博客
    └── lottery/                # ARCHIVE.md · DDD + Dubbo 抽奖系统
```

---

## 分类说明

| 分类 | 用途 |
| --- | --- |
| `archived-projects/` | 曾独立维护,现已不再迭代但值得保留历史记录的项目 |

---

## 如何归档新项目

1. 将项目迁入 `archived-projects/<name>/`
2. 使用 `git subtree add` 导入,保留原始提交历史
3. 在子项目根目录新建 `ARCHIVE.md`,记录项目用途、技术栈、学习重点、当前状态与原始来源
4. 在本文件的「项目清单」表格追加一行
5. 提交,建议使用 `archive: import <name> from <source-url>`

详细工作流、字段模板与提交规范见 [`AGENTS.md`](./AGENTS.md) §3 与 §4。

---

## 面向 AI Agent

本仓库配备面向 AI agent 的协作文件,用于让自动化工具(代码助手、检索 agent、迁移脚本等)在改动前先理解约定:

- [`AGENTS.md`](./AGENTS.md) — 通用规范,适用于所有 `AGENTS.md` 消费者
- [`CLAUDE.md`](./CLAUDE.md) — Claude / Anthropic 系 agent 专属偏好补充

---

## License

MIT License. 归档项目各自的 License 沿用其原始仓库声明,详见各子项目目录中的 `LICENSE` 文件(若有)。
