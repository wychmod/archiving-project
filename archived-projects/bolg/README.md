<div align="center">

# 📝 bolg

### 基于 Flask 应用工厂模式的全栈博客系统

[![Status](https://img.shields.io/badge/status-archive-lightgrey.svg)](#-归档状态)
[![Python](https://img.shields.io/badge/python-3-3776AB.svg?logo=python&logoColor=white)](https://www.python.org)
[![Flask](https://img.shields.io/badge/flask-000000.svg?logo=flask&logoColor=white)](https://flask.palletsprojects.com)
[![SQLAlchemy](https://img.shields.io/badge/sqlalchemy-orm-D71F00.svg)](https://www.sqlalchemy.org)
[![Jinja2](https://img.shields.io/badge/jinja2-templates-B41717.svg)](https://jinja.palletsprojects.com)
[![SQLite](https://img.shields.io/badge/sqlite-dev-db-003B57.svg?logo=sqlite&logoColor=white)](https://www.sqlite.org)

**一个把"入门项目"写出了工程味道的 Flask 博客:应用工厂模式、扩展统一实例化、模型/表单/视图分层拆分、四套环境配置切换——注册邮件激活到文章 CRUD 的完整业务闭环。**

[功能](#-核心功能) · [技术栈](#-技术栈) · [架构](#️-工程架构) · [快速开始](#-快速开始) · [结构](#-项目结构) · [归档状态](#-归档状态)

</div>

---

## 📑 目录

- [项目概述](#-项目概述)
- [核心功能](#-核心功能)
- [技术栈](#-技术栈)
- [工程架构](#️-工程架构)
- [项目结构](#-项目结构)
- [快速开始](#-快速开始)
- [学习价值](#-学习价值)
- [已知限制](#️-已知限制)
- [归档状态](#-归档状态)
- [License](#-license)

---

## 📖 项目概述

`bolg`(「博客」,命名疑为 blog 拼写)是一个 Flask 全栈博客练手项目:用户侧覆盖**注册邮件激活 → 登录 → 发文 → 检索 → 收藏**的完整使用旅程,工程侧则系统地实践了 Flask 社区推荐的**应用工厂(Application Factory)模式**。

| 维度 | 说明 |
| --- | --- |
| **产品形态** | 服务端渲染 Web 应用(Jinja2 模板) |
| **目标场景** | 个人博客:写作、检索、收藏、个人中心 |
| **工程模式** | Application Factory + 扩展集中初始化 + 分层包结构 |
| **配置体系** | default / development / testing / production 四套,`FLASK_CONFIG` 切换 |
| **最佳用途** | Flask 工程化组织的入门范本 |

---

## ✨ 核心功能

| 模块 | 能力 |
| --- | --- |
| 👤 **用户系统** | 注册(邮件激活链接)、登录、退出,基于 Flask-Login 维持会话 |
| ✍️ **文章发布** | 发布 / 编辑 / 删除 / 详情 / 列表,基于 SQLAlchemy `paginate` 分页(每页条数由 `config.PAGE_NUM` 配置) |
| 🔍 **文章搜索** | 导航栏全局搜索 + 个人中心「自己的文章」筛选 |
| ⭐ **博客收藏** | 收藏 / 取消收藏,博客与收藏用户的多对多关系 |
| 🧑‍💼 **个人中心** | 信息查看、修改用户名 / 密码 / 邮箱 |
| 🖼️ **文件上传** | 头像等文件上传至 `app/static/upload/` |
| 📧 **邮件服务** | 注册激活邮件(`app/email.py`),SMTP 凭据从环境变量读取 |
| 🧩 **模板体系** | Jinja2 模板继承(`common/base.html`)+ 自定义分页宏(`common/page_macro.html`) |

---

## 🧱 技术栈

### 后端

| 类别 | 选型 | 用途 |
| --- | --- | --- |
| 语言 | Python 3 | 主开发语言 |
| Web 框架 | Flask | 应用工厂模式 `create_app(config_name)` |
| 会话 | Flask-Login | 用户状态维持、登录保护 |
| ORM | Flask-SQLAlchemy | 数据模型与持久化 |
| 迁移 | Flask-Migrate + Alembic | 数据库版本管理(`migrations/`) |
| 表单 | Flask-WTF(WTForms) | 表单验证与 CSRF 防护 |
| 命令行 | Flask-Script | `manage.py` 挂载 db 迁移命令 |
| 数据库 | SQLite | 开发数据库 |

### 前端

| 类别 | 选型 | 用途 |
| --- | --- | --- |
| 模板 | Jinja2 | 目录式组织:main / posts / owncenter / user / email / common |
| 样式 | 原生 HTML / CSS / JS | 无前端框架 |

---

## 🏗️ 工程架构

```
create_app(config_name)          # app/__init__.py — 应用工厂入口
        │
        ▼
┌──────────────────────────────────────────────┐
│  extensions.py — 扩展统一实例化               │
│  db / login_manager / mail ...               │
│  (规避循环引用的关键设计)                      │
└──────────────────┬───────────────────────────┘
                   ▼
┌──────────────────────────────────────────────┐
│  config.py — 四套环境配置类                   │
│  Config → Development / Testing / Production │
└──────────────────┬───────────────────────────┘
                   ▼
┌────────────┬───────────────┬────────────────┐
│  models/   │    forms/     │    views/      │
│  db_base   │    user       │    main        │
│  user      │    posts      │    user        │
│  posts     │               │    posts       │
│            │               │    owncenter   │
└────────────┴───────────────┴────────────────┘
                   ▼
        migrations/ (Alembic 版本链)
```

---

## 📂 项目结构

```
bolg/
├── README.md               # 本文件
├── ARCHIVE.md              # 归档档案
├── manage.py               # 命令行入口(Flask-Script)
├── test.py
├── 发表博客插件              # 配套 HTML 笔记文档
│
├── app/
│   ├── __init__.py         # create_app 应用工厂
│   ├── config.py           # 四套环境配置
│   ├── extensions.py       # 扩展统一实例化
│   ├── email.py            # SMTP 邮件发送
│   ├── models/             # 数据模型(db_base / user / posts)
│   ├── forms/              # WTForms 表单(user / posts)
│   ├── views/              # 蓝图视图(main / user / posts / owncenter)
│   ├── static/
│   │   ├── css/ img/
│   │   └── upload/         # 头像等上传文件目录
│   └── templates/
│       ├── common/         # base.html 模板继承 + 分页宏
│       ├── email/          # 激活邮件模板
│       ├── main/ posts/    # 博客页面
│       ├── owncenter/      # 个人中心
│       └── user/           # 登录 / 注册
│
└── migrations/             # Flask-Migrate / Alembic 迁移链
```

---

## 🚀 快速开始

> ⚠️ **归档快照**:原仓库未附带依赖锁定文件,以下仅供历史参考;生产环境不可直接使用(见已知限制)。

```bash
# 1) 环境准备
python3 -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
pip install flask flask-login flask-sqlalchemy flask-migrate flask-wtf

# 2) 邮件凭据(注册激活邮件依赖 SMTP)
export MAIL_USERNAME=<your_smtp_account>
export MAIL_PASSWORD=<your_smtp_password>

# 3) 环境切换
export FLASK_CONFIG=development   # default / development / testing / production

# 4) 初始化数据库并启动
python manage.py db upgrade       # Alembic 迁移至最新版本
python manage.py runserver
```

---

## 💡 学习价值

- **应用工厂模式的完整落地**:`create_app(config_name)` 如何配合延迟初始化的扩展规避循环引用——这是 Flask 从"单文件脚本"迈向"可维护工程"的第一课
- **扩展集中管理**:`extensions.py` 单点实例化所有第三方扩展,视图与模型只做导入
- **多环境配置类**:Config 基类 + Development / Testing / Production 子类的继承式配置
- **SQLAlchemy 多对多**:博客 ↔ 收藏用户的关联表设计
- **迁移链管理**:Alembic 生成、审查、升级的完整流程
- **模板工程化**:继承块 + 宏(分页)复用,告别复制粘贴式模板

---

## ⚠️ 已知限制

| # | 问题 | 说明 |
| --- | --- | --- |
| 1 | `SECRET_KEY` 明文硬编码于 `config.py` | 练手项目常见做法,**不可用于生产** |
| 2 | 部分功能完整度参差 | 收藏管理、个人中心部分子功能为半成品,见原 README「待完成」清单 |
| 3 | 分页默认每页 2 条 | `config.PAGE_NUM` 演示用取值 |
| 4 | 未附带依赖锁定文件 | 依赖版本需自行确认 |

---

## 🗄️ 归档状态

| 项 | 内容 |
| --- | --- |
| 原仓库 | `git@github.com:wychmod/bolg.git` |
| 归档日期 | 2026-06-25 |
| 快照基线 | master 分支,commit `10ce081`(2026-02-07 "bolg",唯一提交) |
| 当前状态 | **已归档,只读快照**,仅保留源码作为历史学习参考 |

详细档案(功能覆盖度、学习重点)见 [`ARCHIVE.md`](./ARCHIVE.md)。

---

## 📜 License

原仓库未附带 LICENSE 文件。本项目仅用于学习与历史归档参考。
