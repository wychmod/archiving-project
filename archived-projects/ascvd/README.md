<div align="center">

# 🫀 ASCVD Risk Assessment Platform

### 动脉粥样硬化性心血管疾病风险评估与报告系统

[![Status](https://img.shields.io/badge/status-archive-lightgrey.svg)](#)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](#)
[![Python](https://img.shields.io/badge/python-3.8+-3776AB.svg?logo=python&logoColor=white)](https://www.python.org)
[![Django](https://img.shields.io/badge/django-4.1.1-092E20.svg?logo=django&logoColor=white)](https://www.djangoproject.com)
[![DRF](https://img.shields.io/badge/DRF-3.13.1-ff1709.svg)](https://www.django-rest-framework.org)
[![React](https://img.shields.io/badge/react-18.2.0-61DAFB.svg?logo=react&logoColor=black)](https://react.dev)
[![Ant Design](https://img.shields.io/badge/antd-4.23.3-0170FE.svg?logo=antdesign&logoColor=white)](https://ant.design)
[![MySQL](https://img.shields.io/badge/MySQL-8.x-4479A1.svg?logo=mysql&logoColor=white)](https://www.mysql.com)

**面向临床检验与精准医学场景的 ASCVD 风险评估、血脂亚组分分析、基因多态性解读一体化平台。**

[功能](#-核心功能) · [技术栈](#-技术栈) · [快速开始](#-快速开始) · [API 文档](#-api-速查) · [部署](#-生产部署) · [架构](#-系统架构)

</div>

---

## 📑 目录

- [项目概述](#-项目概述)
- [核心功能](#-核心功能)
- [技术栈](#-技术栈)
- [系统架构](#-系统架构)
- [快速开始](#-快速开始)
- [详细安装](#-详细安装)
- [API 速查](#-api-速查)
- [项目结构](#-项目结构)
- [生产部署](#-生产部署)
- [开发规范](#-开发规范)
- [FAQ](#-faq)
- [License](#-license)

---

## 🩺 项目概述

**ASCVD**(Atherosclerotic Cardiovascular Disease,动脉粥样硬化性心血管疾病)是全球范围内导致死亡的主要原因之一。本平台为临床医生与检验医师提供 **风险评估、血脂亚组分解析、基因多态性辅助判读、电子化报告生成** 的一体化信息系统。

| 维度 | 说明 |
| --- | --- |
| **目标用户** | 心血管内科医生、临床检验技师、精准医学研究人员 |
| **核心场景** | 心血管风险评估、血脂精细分型、基因多态性检测、报告归档 |
| **数据形态** | 结构化检验指标(TC/TG/HDL-C/LDL-C 等) + 报告结论 + 诊断截图 |
| **部署形态** | 前后端分离 SPA(React) + RESTful API(Django) + 关系型数据库(MySQL) |
| **管理后台** | 集成 TyAdmin 一键生成 Ant Design Pro 风格后台(无代码) |

> ⚠️ **免责声明**:本系统为医疗辅助工具,所有诊断结论需经执业医师确认后方可作为临床决策依据。

---

## ✨ 核心功能

| 模块 | 能力 |
| --- | --- |
| 👤 **患者信息管理** | 增删改查患者档案(姓名/年龄/性别/联系方式/既往病史),支持级联关联检验报告 |
| 🧪 **ASCVD 风险评估** | 多指标联合分析(TC / TG / HDL-C / LDL-C / non-HDL / Apo-A1 / Apo-B / Lp(a)),自动生成风险等级与诊断结论 |
| 🩸 **血脂亚组分检测** | 精细化血脂分型数据接入、报告生成与历史追溯 |
| 🧬 **基因多态性分析** | 基因位点录入、表型辅助判读、报告归档 |
| 📋 **疾病字典** | 慢性疾病字典维护(用于多选、慢性病历史标注) |
| 📄 **报告信息** | 检验样本元信息(样本类型/条码号/样本号/样本状态)四元组管理 |
| 🖼️ **诊断图片导出** | 基于 `html2canvas` + `react-viewer` 的报告截图与回显 |
| 🔀 **可视化诊断流程** | 基于 `react-flow` 的多步骤决策流(信息 → 检验 → 报告) |
| 👨‍⚕️ **医生工作台** | 医生档案、权限隔离、操作审计 |
| 🛠️ **自动化后台** | TyAdmin 零代码生成 Ant Design Pro 风格后台 + DRF 文档站点 |

---

## 🧱 技术栈

### 后端

| 类别 | 选型 | 版本 | 用途 |
| --- | --- | --- | --- |
| 语言 | Python | 3.8+ | 主开发语言 |
| Web 框架 | Django | 4.1.1 | MVC / ORM / Admin |
| API 框架 | Django REST Framework | 3.13.1 | RESTful API、Serializer、Router |
| 数据库 | MySQL | 8.x | 关系型数据持久化 |
| 鉴权 | django-guardian | 2.4.0 | 对象级权限 |
| 过滤 | django-filter | 22.1 | 列表查询过滤 |
| 跨域 | django-cors-headers | 3.13.0 | 前后端分离跨域处理 |
| 验证码 | django-simple-captcha | 0.5.17 | 图形验证码 |
| API 文档 | rest_framework.documentation | 内置 | `/docs/` 自动生成 |
| 后台生成 | tyadmin-api-cli | 0.8.2 | 一键生成 Ant Design Pro 后台 |
| WSGI | uWSGI | — | 生产部署应用服务器 |
| 静态收集 | python manage.py collectstatic | — | 生产环境静态资源 |

### 前端

| 类别 | 选型 | 版本 | 用途 |
| --- | --- | --- | --- |
| 框架 | React | 18.2.0 | UI 框架 |
| 构建 | react-scripts (CRA) | 5.0.1 | 构建工具链 |
| 路由 | react-router / react-router-dom | 6.4.2 | 单页路由 |
| 状态管理 | MobX / mobx-react | 6.6.2 / 7.5.3 | 装饰器风格 Store |
| UI 库 | Ant Design | 4.23.3 | 企业级组件 |
| 流程图 | reactflow | 11.1.0 | 诊断流程可视化 |
| HTTP 客户端 | axios | 0.27.2 | API 调用 |
| 截图 | html2canvas | 1.4.1 | 报告导出图片 |
| 图片浏览 | react-viewer | 3.2.2 | 图片放大/旋转 |
| 唯一 ID | uuid | 9.0.0 | 客户端标识生成 |
| 样式预处理 | node-sass / sass-loader | 7.0.3 / 13.0.2 | SCSS |
| 环境切换 | dotenv-cli | 6.0.0 | `.env.dev` / `.env.prod` 多环境打包 |
| 自定义构建 | react-app-rewired + customize-cra | 2.2.1 / 1.0.0 | 修改 CRA 默认配置 |

### 基础设施

| 类别 | 选型 |
| --- | --- |
| 反向代理 | Nginx |
| 应用服务器 | uWSGI(socket 模式) |
| 进程管理 | uWSGI master + 4 进程 × 2 线程 |
| 静态资源 | `python manage.py collectstatic` + Nginx 直出 |
| 多环境 | `.env.dev` / `.env.prod` 双环境(前端),`config-dev.ini` / `config-prod.ini`(后端) |

---

## 🏗️ 系统架构

```
┌─────────────────────────────────────────────────────────────────┐
│                         客户端浏览器                              │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │   React SPA (ascvdreact/)                                │  │
│  │   ┌────────┐ ┌────────┐ ┌──────────┐ ┌────────────┐      │  │
│  │   │ Pages  │ │Stores  │ │Flowchart │ │UI(antd)    │      │  │
│  │   │        │ │(MobX)  │ │(react-   │ │            │      │  │
│  │   │        │ │        │ │ flow)    │ │            │      │  │
│  │   └────────┘ └────────┘ └──────────┘ └────────────┘      │  │
│  └──────────────────────────┬───────────────────────────────┘  │
└─────────────────────────────┼───────────────────────────────────┘
                              │  HTTP / JSON
                              │  (Axios)
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      Nginx 反向代理                              │
│   /         →  uwsgi_pass(8000)        (后端 API + 文档)        │
│   /static/  →  静态资源直出                                      │
│   /media/   →  媒体文件直出                                      │
└─────────────────────────────┬───────────────────────────────────┘
                              │  uwsgi 协议
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│             Django 4.1.1 + DRF 3.13.1 (uWSGI)                   │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │   URL Router (DefaultRouter)                             │  │
│  │   ├── /Patient/                → Apps.patient            │  │
│  │   ├── /AscvdTesting/           → Apps.ascvd              │  │
│  │   ├── /DiseaseDict/            → Apps.disease_dict       │  │
│  │   ├── /BloodLipid/             → Apps.blood_lipid_…      │  │
│  │   ├── /GenePolymorphism/       → Apps.gene_polymorphism  │  │
│  │   ├── /ReportInformation/      → Apps.report_information │  │
│  │   ├── /admin/                  → Django Admin            │  │
│  │   ├── /xadmin/                 → TyAdmin 后台            │  │
│  │   └── /docs/                   → DRF 自动文档            │  │
│  └──────────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │   Apps Layer (Domain Models + Viewsets + Serializers)    │  │
│  │   ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐ ┌───────┐ │  │
│  │   │ patient│ │  ascvd │ │disease │ │ blood  │ │ gene  │ │  │
│  │   │        │ │        │ │ _dict  │ │  lipid │ │ poly  │ │  │
│  │   └────────┘ └────────┘ └────────┘ └────────┘ └───────┘ │  │
│  └──────────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │   ORM Layer  (Django ORM)                                │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────┬───────────────────────────────────┘
                              │  MySQL Protocol
                              ▼
              ┌──────────────────────────────┐
              │      MySQL 8.x               │
              │   数据库: django_ascvd        │
              └──────────────────────────────┘
```

---

## 🚀 快速开始

> **TL;DR** — 5 分钟在本地把前后端跑起来。

```bash
# 1) 克隆
git clone git@github.com:wychmod/ascvd.git
cd ascvd

# 2) 后端:虚拟环境 + 依赖
conda create -n ascvd_python python=3.8
conda activate ascvd_python
pip install -r requirements.txt -i https://pypi.douban.com/simple/

# 3) 配置数据库(默认 MySQL,需先建库 django_ascvd)
#    编辑 AscvdBackend/settings.py 中的 DATABASES 段

# 4) 迁移 + 超级用户
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser

# 5) 生成 TyAdmin 后台(首次运行)
python manage.py init_admin && python manage.py gen_all
cd tyadmin && npm install && npm run build && cd ..

# 6) 启动后端
python manage.py runserver 8000

# 7) 启动前端(新终端)
cd ascvdreact
npm install        # 或 cnpm install / yarn install
npm run start:dev
```

访问:

- 前端开发页:<http://localhost:3000>
- API 根:<http://localhost:8000/>
- DRF 接口文档:<http://localhost:8000/docs/>
- Django Admin:<http://localhost:8000/admin/>
- TyAdmin:<http://localhost:8000/xadmin/>

---

## 📖 详细安装

### 后端环境

#### 1. Python 虚拟环境

```bash
# 推荐 conda(也可使用 venv / virtualenv)
conda create -n ascvd_python python=3.8
conda activate ascvd_python
pip install -r requirements.txt -i https://pypi.douban.com/simple/
```

#### 2. 数据库配置

在 MySQL 中创建数据库:

```sql
CREATE DATABASE django_ascvd DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

编辑 `AscvdBackend/settings.py`:

```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': "django_ascvd",
        'USER': "root",
        'PASSWORD': "<YOUR_DB_PASSWORD>",   # 替换为你的密码
        'HOST': "127.0.0.1",
        'OPTIONS': {'init_command': 'SET default_storage_engine=INNODB;'}
    }
}
```

#### 3. 首次运行 — TyAdmin 后台生成

> ⚠️ **关键步骤**:`tyadmin_api` 在第一次运行前**需要注释掉**,否则会因为缺少生成代码而无法启动。

**Step A — 注释掉 tyadmin 相关引用**

```python
# AscvdBackend/settings.py
INSTALLED_APPS = [
    ...,
    'captcha',
    'tyadmin_api_cli',
    # 'tyadmin_api',  # 第一次运行先注释掉
    'user.apps.UserConfig',
    ...,
]
```

```python
# AscvdBackend/urls.py
# from tyadmin_api.views import AdminIndexView  # 第一次运行先注释掉
urlpatterns = [
    ...,
    path('admin/', admin.site.urls),
    # re_path('^xadmin/.*', AdminIndexView.as_view()),  # 第一次运行先注释掉
    # path('api/xadmin/v1/', include('tyadmin_api.urls')),  # 第一次运行先注释掉
    path('docs/', include_docs_urls(title='ascvd接口文档')),
    ...,
]
```

**Step B — 生成后台前端代码**

```bash
python manage.py init_admin
python manage.py gen_all
cd tyadmin && npm install && npm run build && cd ..
```

**Step C — 取消注释**(恢复完整 URL 与 App 注册)

将 Step A 中注释的代码取消注释,使得 `/xadmin/` 可访问。

#### 4. 迁移与初始化

```bash
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

### 前端环境

```bash
# 1) 安装 Node.js(建议 LTS,>=16)
# 2) 配置 npm 国内源(可选)
npm config set registry https://registry.npmmirror.com

# 3) 安装依赖
cd ascvdreact
npm install   # 或 cnpm install / yarn install

# 4) 多环境启动
npm run start:dev   # 读取 .env.dev
npm run start:prod  # 读取 .env.prod

# 5) 多环境打包
npm run build:dev   # 产物在 build/,上传到后端 static 目录
npm run build:prod
```

> 💡 **PyCharm 用户**:`package.json` 右键 → `Show npm Scripts` 可视化点击启动。

---

## 🔌 API 速查

> 完整接口定义可在运行后访问 <http://localhost:8000/docs/> 查看 DRF 自动文档。

| Endpoint | Methods | Model | 说明 |
| --- | --- | --- | --- |
| `/Patient/` | GET / POST | `PatientProfile` | 患者档案 CRUD |
| `/AscvdTesting/` | GET / POST | `AscvdTesting` | ASCVD 风险评估报告创建与查询 |
| `/DiseaseDict/` | GET / POST | `DiseaseDict` | 疾病字典维护 |
| `/BloodLipid/` | GET / POST | `BloodLipid` | 血脂亚组分报告 |
| `/GenePolymorphism/` | GET / POST | `GenePolymorphism` | 基因多态性记录 |
| `/ReportInformation/` | GET / POST | `ReportInformation` | 报告元信息(样本类型 / 条码号 / 样本号 / 样本状态) |
| `/admin/` | GET / POST | — | Django 原生 Admin |
| `/xadmin/` | GET / POST | — | TyAdmin 自动生成后台 |
| `/docs/` | GET | — | DRF 接口文档 |
| `/api-auth/` | GET | — | DRF 登录鉴权 |
| `/media/<path>` | GET | — | 媒体文件(诊断截图等)直出 |

### 请求示例 — 创建 ASCVD 报告

```http
POST /AscvdTesting/
Content-Type: application/json

{
  "patient": 1,
  "tc": 5.2,
  "tg": 1.5,
  "HDL_C": 1.3,
  "LDL_C": 3.1,
  "non_HDL": 3.9,
  "Apo_A1": 1.4,
  "Apo_B": 0.9,
  "LP_a": 18.0,
  "conclusion": "中危",
  "conclusion_img": "<file>"
}
```

---

## 📂 项目结构

```
ascvd/
├── README.md                  # 本文件
├── 服务器配置.md               # 服务器部署操作手册
├── manage.py                  # Django 命令行入口
├── requirements.txt           # Python 依赖锁定
├── uwsgi.ini                  # uWSGI 生产配置
├── .gitignore
│
├── AscvdBackend/              # Django 项目配置包
│   ├── settings.py            # 全局设置
│   ├── urls.py                # 根路由 + DRF Router
│   ├── wsgi.py / asgi.py
│   └── __init__.py
│
├── Apps/                      # 业务应用(7 个领域)
│   ├── ascvd/                 # 核心:ASCVD 风险评估
│   │   ├── models.py          # AscvdTesting(TC/TG/HDL-C/LDL-C/...)
│   │   ├── views.py           # AscvdTestingCreateViewset
│   │   ├── serializer.py
│   │   └── migrations/        # 10 次 schema 演进
│   ├── patient/               # 患者档案
│   ├── user/                  # 医生工作台
│   ├── disease_dict/          # 疾病字典
│   ├── blood_lipid_subfraction/   # 血脂亚组分
│   ├── gene_polymorphism/     # 基因多态性
│   └── report_information/    # 报告元信息
│
├── ascvdreact/                # React 前端
│   ├── package.json
│   ├── public/
│   ├── build/                 # 生产构建产物(由 git 跟踪)
│   └── src/
│       ├── App.js / index.js  # 路由与启动
│       ├── components/        # 业务组件
│       │   ├── ascvd/         # ASCVD 模块(content / flow / steps)
│       │   ├── bloodFat/      # 血脂亚组分模块
│       │   ├── genePolymorphism/  # 基因多态性模块
│       │   ├── report/        # 报告模块
│       │   ├── information/   # 基本信息
│       │   ├── header/ footer/
│       │   └── store/         # MobX Store + axios
│       ├── constants/         # 常量
│       ├── utils/             # 工具(Provider/ImgTransform/DataFormat)
│       └── assets/            # 静态资源
│
├── tyadmin/                   # TyAdmin 自动生成后台(勿手改)
├── tyadmin_api/               # TyAdmin 自动生成 API(勿手改)
├── static/                    # 收集的静态资源(rest_framework / admin)
├── media/                     # 上传的媒体(诊断截图等)
└── templates/                 # TyAdmin 模板
```

---

## 🌐 生产部署

> 完整步骤见 [`服务器配置.md`](./服务器配置.md)。

### 部署栈

```
Nginx (80/443)
    │
    ├── /            → uwsgi_pass 127.0.0.1:8102  (Django + DRF)
    ├── /static/     → alias  /root/ascvdProject/ascvd/static/
    └── /media/      → alias  /root/ascvdProject/ascvd/media/

uWSGI (8102,4 进程 × 2 线程)
    │
    └── Django 4.1.1 + DRF 3.13.1

MySQL 8.x (3306)
```

### 部署步骤概览

1. 服务器创建 `ascvd` 数据库,导入迁移
2. 拉取代码到 `/root/ascvdProject/ascvd/`
3. 配置 Python 虚拟环境与依赖
4. `python manage.py collectstatic` 收集静态资源
5. 前端 `npm run build:prod`,产物拷贝到后端 `static/` 或由 Nginx 直出
6. 启动 `uwsgi --ini uwsgi.ini`(daemonize)
7. 配置 Nginx 反向代理 + HTTPS(可选)
8. 验证:`http://<server>:8000/docs/` 可见 DRF 文档

### 演示环境

| 服务 | 地址 |
| --- | --- |
| 主页 | <http://222.31.135.49:6103/> |
| API | <http://222.31.135.49:6104/> |
| 后台 | <http://222.31.135.49:6104/xadmin> |

---

## 🛠️ 开发规范

### 分支策略(按日切特性)

```
main
 ├── wychmod_fix_store_bug        # Bugfix(未合并,需评审)
 ├── wyr_addmodel                 # 创建一个 app(已合并 !2)
 ├── wyr_CHomePageBlood           # 主页 + 血脂(已合并 !3)
 ├── wyr_changemodels             # model 字段扩展(已合并 !4)
 ├── wyr_addreportcontent         # 报告时间/联系方式(已合并 !5)
 ├── wyr_CRegExp                  # 联系电话正则(已合并 !6)
 ├── wyr_addstep                  # 步骤三 + 报告(已合并 !7)
 ├── wyr_addstep2                 # 诊断结果(已合并 !8)
 └── <your-feature-branch>        # 新特性分支
```

### 提交规范

遵循 Conventional Commits:

| 前缀 | 用途 | 示例 |
| --- | --- | --- |
| `add:` | 新增功能 | `add: 新增GenePolymorphism的数据仓库。` |
| `fix:` | 修复缺陷 | `fix: 多余引用元素` |
| `!N` (PR 号) | PR 合并标记 | `!8 ascvd增加诊断结果 Merge pull request !8 from wyr/wyr_addstep2` |

### PR 流程

1. 从 `main` 拉新分支:`git checkout -b <type>/<short-desc>`
2. 提交并 push 分支:`git push origin <branch>`
3. 在 GitHub 创建 PR,详细描述改动与截图
4. 管理员审核通过后 merge 入 `main`

---

## ❓ FAQ

**Q1: 启动时报 `No module named 'tyadmin_api'` 错误?**

第一次运行需要先注释掉 `AscvdBackend/settings.py` 与 `AscvdBackend/urls.py` 中的 tyadmin 相关引用,执行 `python manage.py init_admin && python manage.py gen_all` 生成代码后再取消注释。

**Q2: 数据库迁移失败?**

确保 MySQL 已建库 `django_ascvd`,字符集 `utf8mb4`,且 `OPTIONS` 中设置了 `SET default_storage_engine=INNODB;`(与 `db.sqlite3` 之外的第三方 migration 兼容)。

**Q3: 前端跨域报错?**

后端使用 `django-cors-headers` 解决跨域,确认 `CORS_ALLOWED_ORIGINS` 配置包含前端地址。前端 axios 也可使用 `http-proxy-middleware` 在 `setupProxy.js` 中配置代理。

**Q4: npm install 失败?**

建议使用国内镜像:`npm config set registry https://registry.npmmirror.com`,或使用 `cnpm install` / `yarn install`。

**Q5: 报告图片无法显示?**

确认 `MEDIA_ROOT` 与 `MEDIA_URL` 已配置,且 `urls.py` 中 `re_path(r'^media/(?P<path>.*)', serve, ...)` 已注册。生产环境需要 Nginx 配置 `/media/` 路径别名。

**Q6: 如何添加新的检验项目?**

1. 在 `Apps/<your_app>/models.py` 定义 Model
2. `python manage.py makemigrations && python manage.py migrate`
3. 实现 `serializers.py` + `viewsets.py`
4. 在 `AscvdBackend/urls.py` 的 `router.register(...)` 中注册
5. 前端 `components/store/` 添加对应的 MobX Store 与 API 调用

---

## 📜 License

MIT License. 详细见根目录 `LICENSE`(若有)。

本项目仅用于学习与历史归档参考,所有医疗相关数据由 owner 自行负责脱敏与合规处理。
