---
ref: bolg
lang: zh
title: "bolg · Flask 全栈博客练手"
name: "bolg"
subtitle: "Flask 全栈博客练手"
description: "Flask 全栈博客入门项目:应用工厂模式组织代码,注册邮件激活、文章 CRUD 与搜索、个人中心、收藏、SQLAlchemy 分页与文件上传,四套环境配置一键切换"
category: fullstack
stack:
  - python
  - flask
  - jinja2
  - sqlalchemy
  - sqlite
status: archived
scrubbed: false
repoCleared: false
archivedAt: 2026-06-25
---
## 概览

`bolg`(README 中自称「博客」,命名疑为 blog 拼写)是一个基于 Flask 的**全栈博客系统练手项目**,
使用应用工厂模式组织代码,覆盖注册激活、文章发布、个人中心、收藏与搜索等常见博客能力,是 Flask
Web 开发入门阶段的学习产出。

**当前状态**:已归档,仅保留源码作为历史学习参考(部分功能代码覆盖度参差,README 标记了「待完成」清单)。

## 功能模块

| 模块 | 能力 |
| --- | --- |
| 👤 用户系统 | 注册(邮件激活)、登录、退出、用户状态维持(Flask-Login) |
| 📝 博客文章 | 发布 / 编辑 / 删除 / 详情 / 列表 / 搜索(导航栏 + 个人中心「自己的文章」筛选) |
| 🏠 个人中心 | 信息查看、改用户名、改密码、改邮箱、头像上传 |
| ⭐ 博客收藏 | 收藏 / 取消收藏、收藏管理 |
| 📄 分页 | 基于 SQLAlchemy `paginate`,每页条数在 `config.PAGE_NUM` 配置 |
| 📎 文件上传 | `app/static/upload/` 目录,头像等 |
| ✉️ 邮件 | 注册激活邮件,SMTP 凭据从环境变量读取 |

## 技术栈

| 层 | 选型 |
| --- | --- |
| 后端 | `Python 3` · `Flask`(应用工厂) |
| 用户态 | `Flask-Login` |
| 数据 | `Flask-SQLAlchemy` · `Flask-Migrate` + `Alembic` · `SQLite`(开发库 `dev_blog.sqlite` 随仓库归档) |
| 表单 | `Flask-WTF`(WTForms) |
| 模板 | `Jinja2`(目录式组织:`main / posts / owncenter / user / email / common`)+ 自定义分页宏 |
| 工程 | 多环境配置(`default / development / testing / production`,`FLASK_CONFIG` 切换) |
| 命令行 | `Flask-Script` 挂载 `db` 迁移命令 |

## 架构亮点

- **应用工厂模式**:`create_app(config_name)` 规避循环引用,扩展统一在 `extensions.py` 实例化
- **代码分层**:models / forms / views 各自成包,模板按业务域分目录组织
- **邮件激活流程**:注册邮件 + 激活链接,SMTP 凭据从环境变量读取(正确的做法)
- **多对多关系**:博客 ↔ 收藏用户,是 ORM 关系建模的实战样本
- **分页宏复用**:`page_macro.html` 封装分页组件,列表页统一调用
- **模板继承**:`templates/common/base.html` 作为全站骨架

## 学习收获

这个项目把 Flask 生态的核心扩展(Login / SQLAlchemy / Migrate / WTF)串了一遍,更重要的是养成了
"应用工厂 + 多环境配置 + 扩展集中实例化"的组织习惯,这套结构后来在规模更大的项目里依然适用。
README 里保留了「待完成」清单(评论与回复、`flask-restful` 等),功能完整度参差,恰好如实呈现了
Flask 入门阶段的真实水平;`SECRET_KEY` 明文硬编码属于练手常见做法,不可用于生产。

## 归档信息

- **归档日期**:2026-06-25
- **源码入口**:[`archived-projects/bolg/`](https://github.com/wychmod/archiving-project/tree/main/archived-projects/bolg)
- **归档说明**:[ARCHIVE.md](https://github.com/wychmod/archiving-project/blob/main/archived-projects/bolg/ARCHIVE.md)
