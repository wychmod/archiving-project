<div align="center">

# 🛒 1802axf(爱先蜂)

### 基于 Django 的 O2O 闪送超市电商 Demo

[![Status](https://img.shields.io/badge/status-archive-lightgrey.svg)](#-归档状态)
[![Python](https://img.shields.io/badge/python-2%2F3-3776AB.svg?logo=python&logoColor=white)](https://www.python.org)
[![Django](https://img.shields.io/badge/django-1.11.4-092E20.svg?logo=django&logoColor=white)](https://www.djangoproject.com)
[![jQuery](https://img.shields.io/badge/jquery-3.1.1-0769AD.svg?logo=jquery&logoColor=white)](https://jquery.com)
[![Bootstrap](https://img.shields.io/badge/bootstrap-3.x-7952B3.svg?logo=bootstrap&logoColor=white)](https://getbootstrap.com)
[![SQLite](https://img.shields.io/badge/sqlite-default-db-003B57.svg?logo=sqlite&logoColor=white)](https://www.sqlite.org)

**复刻"爱鲜蜂"模式的 O2O 闪送超市课设:主页 / 闪送超市 / 购物车 / 我的四大模块,覆盖登录注册、商品分类、购物车与下单的完整电商旅程,并做了移动端 H5 适配。**

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

`1802axf`(axf 取自「爱先蜂」拼音首字母)是 1802 期 Django 课程的结课设计,模仿「爱鲜蜂」实现一个 **O2O 闪送超市电商 Demo**。产品分四大页面,围绕"浏览商品 → 加入购物车 → 下单"的主干流程展开,并附带商品数据初始化脚本。

| 维度 | 说明 |
| --- | --- |
| **产品形态** | 服务端渲染 Web 应用(Django 模板 + jQuery) |
| **目标场景** | O2O 闪送超市:商品浏览、分类筛选、购物车、下单 |
| **用户体系** | 注册 / 登录 / 收货地址 / 订单 / 评价 |
| **终端适配** | 移动端 H5(viewport / rem / 底部固定 Tab Bar) |
| **项目年代** | 2019-05(Django 1.11.4 时代) |
| **最佳用途** | Django MTV 模式的教学对照样本 |

---

## ✨ 核心功能

| 模块 | 能力 |
| --- | --- |
| 🏠 **主页** | 轮播图(Swiper)、导航、必买推荐、便利店入口 |
| 🏪 **闪送超市** | 商品分类展示与筛选 |
| 🛒 **购物车** | 商品增删改查、数量联动、下单 |
| 👤 **我的** | 登录 / 注册、收货地址管理、订单列表、商品评价、头像文件上传 |
| 🔐 **认证拦截** | 登录状态判断与未登录拦截跳转 |
| 🗃️ **数据初始化** | 附带商品数据插入脚本(`商品数据插入2` / `插入数据` / `数据`) |

---

## 🧱 技术栈

| 类别 | 选型 | 版本 | 用途 |
| --- | --- | --- | --- |
| 语言 | Python | 2/3 兼容写法 | 主开发语言 |
| Web 框架 | Django | 1.11.4 | MTV 架构、ORM、模板、会话 |
| 数据库 | SQLite | Django 默认 | 数据持久化 |
| 模板 | Django Templates | — | 模板继承 + `{% load static %}` 静态加载 |
| DOM 操作 | jQuery | 3.1.1 | 购物车联动与页面交互 |
| UI 框架 | Bootstrap | 3.x | 页面栅格与组件 |
| 轮播 | Swiper | — | 主页轮播图 |
| 基础 | HTML5 / CSS3 | — | 移动端 H5 适配 |

---

## 🏗️ 工程架构

```
axf/                             # Django 项目根
├── axf/                         # 项目配置包(settings / urls)
├── App/                         # 唯一业务应用
│   ├── models.py                # 数据模型层
│   │   ├── AbstractUser 扩展     #   自定义用户(增加 icon 头像字段)
│   │   ├── Common 抽象基类       #   抽离轮播/导航/必买/便利店公共字段
│   │   └── 商品 / 类别 / 购物车 / 订单
│   ├── views/                   # 基于函数的视图(FBV)
│   │   ├── 主页 / 市场 / 购物车 / 我的
│   │   └── 登录拦截装饰器
│   ├── urls.py                  # 应用路由
│   └── admin.py                 # 后台注册
├── templates/                   # Jinja 风格 Django 模板(继承体系)
└── static/                      # 静态资源(css / js / img)
```

---

## 📂 项目结构

```
1802axf/
├── README.md            # 本文件
├── ARCHIVE.md           # 归档档案
├── axf项目规划.md        # 项目规划文档(需求与页面设计)
├── 商品数据插入2         # 商品数据初始化脚本
├── 插入数据             # 数据初始化脚本
├── 数据                 # 商品数据
│
└── axf/                 # Django 工程
    ├── manage.py        # 命令行入口
    ├── axf/             # settings / urls 配置包
    ├── App/             # 业务应用(见上方工程架构)
    ├── templates/       # 四大页面模板
    └── static/          # jQuery / Bootstrap / Swiper 等静态资源
```

---

## 🚀 快速开始

> ⚠️ **归档快照**:Django 1.11.4 发布于 2017 年、2020 年已停止官方支持,如需运行请自行准备与其兼容的旧版 Python 环境。

```bash
# 1) 环境准备(需旧版 Python + Django 1.11.4)
pip install django==1.11.4

# 2) 初始化数据
python manage.py makemigrations App
python manage.py migrate
# 按需导入根目录中的商品数据脚本

# 3) 创建管理员并启动
python manage.py createsuperuser
python manage.py runserver       # http://127.0.0.1:8000
```

建议使用移动端模拟器(浏览器 DevTools 设备模式)访问,体验 H5 移动端适配。

---

## 💡 学习价值

- **Django MTV 全流程**:Models、函数视图(views)、Templates 三层的标准协作方式
- **自定义用户模型**:继承 `AbstractUser` 扩展 `icon` 头像字段,而非重造用户表
- **抽象基类复用**:`Common` 抽象基类抽离轮播图 / 导航 / 必买 / 便利店的公共字段,体会 ORM 继承映射
- **关系设计实战**:商品类别 ↔ 商品(一对多)、用户 ↔ 购物车 / 订单(多对多)
- **认证与会话**:登录状态判断、登录拦截装饰器、图形验证码
- **模板继承体系**:`{% block %}` / `{% url %}` / `{% load static %}` 的工程化使用
- **移动端 H5 适配**:viewport、rem 布局、底部固定 Tab Bar 的经典做法

---

## ⚠️ 已知限制

| # | 问题 | 说明 |
| --- | --- | --- |
| 1 | Django 1.11.4 已 EOL | 2020 年停止官方支持,存在已知安全漏洞,不可用于生产 |
| 2 | `SECRET_KEY` 明文硬编码 | `settings.py` 中明文,历史课设常见做法 |
| 3 | 单应用巨型结构 | 全部业务集中在 `App/`,未按领域拆分 |
| 4 | 数据脚本为根目录散文件 | `商品数据插入2` / `插入数据` / `数据` 需手工导入 |

---

## 🗄️ 归档状态

| 项 | 内容 |
| --- | --- |
| 原仓库 | `git@github.com:wychmod/1802axf.git` |
| 归档日期 | 2026-06-24 |
| 快照基线 | 2019-05-20(原始提交) |
| 当前状态 | **已归档,只读快照**,仅保留源码作为历史学习参考 |

详细档案见 [`ARCHIVE.md`](./ARCHIVE.md);产品规划见 [`axf项目规划.md`](./axf项目规划.md)。

---

## 📜 License

原仓库未附带 LICENSE 文件。本项目仅用于学习与历史归档参考。
