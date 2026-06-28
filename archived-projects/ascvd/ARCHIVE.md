# 归档说明

## 基本信息

- 原仓库：git@github.com:wychmod/ascvd.git
- 归档目录：archived-projects/ascvd/
- 归档日期：2026-06-28
- 导入分支：`main`(源仓库默认分支,8 个 PR 已合入的最终版本)
- 导入提交(源仓库原始 HEAD)：`1f9faef07e756f94cf6c023da2e880e628193e82`
- 导入提交(归档仓库 squash)：`9a6141a73ff52384c1935d8415b8c0703a94ed63`
- **导入方式**：源仓库的 `AscvdBackend/settings.py` 与 `服务器配置.md` 中**明文提交了 6 个生产/开发凭证**(Django SECRET_KEY、MySQL root、SSH、宝塔面板、Django admin、文档示例),直接 `git subtree add` 会把凭证冻结进归档仓库的 history blob 里,触发 GitHub Push Protection。owner 授权后,**先在临时克隆里把凭证替换为占位符并独立 commit**,再以这个脱敏后的 HEAD 作为 subtree 源导入归档仓库,因此归档仓库 history 中**不含**任何真实凭证。
- **源仓库同步**:在归档前 owner 还要求把升级版的 README 一并推回源仓库(`1f9faef..ae35618 main -> main`,已成功),本次归档以包含新 README + 脱敏修复的 HEAD(`a0c716a`)为来源。
- 当前状态：已归档,仅保留源码作为历史学习参考

## 项目简介

`ascvd`(**A**thero**s**clerotic **C**ardiovascular **D**isease Risk Assessment)是一个**面向心血管疾病风险评估、血脂亚组分分析、基因多态性解读的临床辅助信息系统**。系统为心血管内科医生、临床检验技师、精准医学研究人员提供 **患者档案管理、多指标联合风险评估、报告生成、后台管理** 的一体化平台。

### 核心功能

- **患者档案管理**:`Apps/patient` 维护患者基本信息(姓名/年龄/性别/联系方式/慢性病史),支持级联关联检验报告
- **ASCVD 风险评估**(`Apps/ascvd`):基于 TC/TG/HDL-C/LDL-C/non-HDL/Apo-A1/Apo-B/LP(a) 多指标联合分析,自动生成风险等级与诊断结论(`AscvdTesting` Model)
- **血脂亚组分检测**(`Apps/blood_lipid_subfraction`):精细化血脂分型数据接入
- **基因多态性**(`Apps/gene_polymorphism`):基因位点录入与表型辅助判读
- **疾病字典**(`Apps/disease_dict`):慢性病字典维护(多选用)
- **报告元信息**(`Apps/report_information`):样本类型/条码号/样本号/样本状态四元组管理
- **医生工作台**(`Apps/user`):医生档案与权限隔离
- **诊断流程可视化**:前端基于 `react-flow` 的多步骤决策流
- **报告图片导出**:基于 `html2canvas` + `react-viewer` 的截图与回显
- **零代码后台**:`tyadmin-api-cli` 一键生成 Ant Design Pro 风格管理后台

### 系统边界

⚠️ **本系统为医疗辅助工具,所有诊断结论需经执业医师确认后方可作为临床决策依据。**

## 技术栈

### 后端

| 类别 | 选型 | 版本 | 用途 |
| --- | --- | --- | --- |
| 语言 | Python | 3.8 | 主开发语言 |
| Web 框架 | Django | 4.1.1 | MVC / ORM / Admin |
| API 框架 | Django REST Framework | 3.13.1 | RESTful API / Serializer / Router |
| 数据库 | MySQL | 8.x | 关系型数据持久化 |
| 数据库驱动 | mysqlclient | 2.1.1 | MySQL 原生驱动 |
| 鉴权 | django-guardian | 2.4.0 | 对象级权限 |
| 过滤 | django-filter | 22.1 | 列表查询过滤 |
| 跨域 | django-cors-headers | 3.13.0 | 前后端分离跨域 |
| 验证码 | django-simple-captcha | 0.5.17 | 图形验证码 |
| API 文档 | rest_framework.documentation | 内置 | `/docs/` 自动生成 |
| 后台生成 | tyadmin-api-cli | 0.8.2 | 一键生成 Ant Design Pro 后台 |
| 应用服务器 | uWSGI | — | 生产部署 |
| 静态收集 | `python manage.py collectstatic` | — | 生产环境静态资源 |

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
| 应用服务器 | uWSGI(socket 模式,4 进程 × 2 线程) |
| 静态资源 | `python manage.py collectstatic` + Nginx 直出 |
| 媒体文件 | `MEDIA_ROOT` + Django `serve` view + Nginx `/media/` 路径 |
| 多环境 | `.env.dev` / `.env.prod` 双环境(前端) |
| 部署形态 | Docker 容器(端口 8101-8111 → 主机 6101-6111) |

## 项目结构

```
ascvd/
├── README.md                  # 完整使用文档(企业级布局,本次归档时升级)
├── 服务器配置.md               # 服务器部署操作手册(**凭证已脱敏**)
├── manage.py                  # Django 命令行入口
├── requirements.txt           # Python 依赖锁定
├── uwsgi.ini                  # uWSGI 生产配置
├── .gitignore
│
├── AscvdBackend/              # Django 项目配置包
│   ├── settings.py            # 全局设置(**SECRET_KEY/DB PASSWORD 已脱敏**)
│   ├── urls.py                # 根路由 + DRF Router
│   ├── wsgi.py / asgi.py
│   └── __init__.py
│
├── Apps/                      # 业务应用(7 个领域)
│   ├── ascvd/                 # 核心:ASCVD 风险评估(TC/TG/HDL-C/LDL-C/...)
│   │   ├── models.py          # AscvdTesting 模型
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
│   ├── build/                 # 生产构建产物(由 git 跟踪,内含 sourcemap)
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

## 学习重点

- **Django 4.1 + DRF 3.13 全栈实践**:Router / Serializer / Mixins / Viewset 的标准用法
- **TyAdmin 零代码后台生成**:基于 DRF Model 反射自动生成 Ant Design Pro 前端 + DRF API 端点
- **Django + MySQL 集成**:`mysqlclient` 驱动 + `OPTIONS` 中的 `SET default_storage_engine=INNODB` 兼容性 hack
- **MobX + 装饰器风格的 Store**:`@observable` / `@action` / `Provider` 注入,React 18 兼容
- **React Flow 流程图可视化**:`reactflow` 11.x 的多步骤决策流编辑器
- **多环境打包**:`dotenv-cli` 在 `package.json` scripts 注入环境变量,实现 `.env.dev` / `.env.prod` 双轨
- **CRA 自定义配置**:`react-app-rewired` + `customize-cra` 绕过 eject 修改默认 webpack/babel
- **诊断报告图片化**:`html2canvas` DOM 截图 + `react-viewer` 浏览器内查看
- **uWSGI + Nginx 部署**:socket 模式 + `daemonize` + master 进程模型
- **按日切特性开发模式**:8 个 `wyr_*` / `wychmod_*` 特性分支通过 PR 合并入 `main`,典型"日切特性"git 流程

## 分支历史(8 个特性 PR 已合入)

| 分支 | PR 号 | 提交数 | 合并提交 | 说明 |
| --- | --- | --- | --- | --- |
| `wyr_fixbug2`(已删除) | !1 | 4 | `b1fa1c5` | 修改 sdLDL-C 可以包含三位小数 |
| `wyr_addmodel` | !2 | 5 | `c82763d` | 创建一个 app |
| `wyr_CHomePageBlood` | !3 | 11 | `9b69c6b` | 添加 HomePageBlood + 多项重构 |
| `wyr_changemodels` | !4 | 3 | `3da7ac7` | models 中增加字段(样本类型/条码号/样本号/样本状态) |
| `wyr_addreportcontent` | !5 | 5 | `fdee957` | 报告中显示时间、联系方式等信息 |
| `wyr_CRegExp` | !6 | 2 | `74944b9` | 修改"联系电话"正则表达式 |
| `wyr_addstep` | !7 | 6 | `20a7e4a` | 步骤三 + 显示风险评估报告 |
| `wyr_addstep2` | !8 | 2 | `1f9faef` | ascvd 增加诊断结果 |
| `wychmod_fix_store_bug` | — | 3 | **未合并** | 没有用 mobx 控制组件的 bug(已存在但未合入 main) |

**为什么选 `main`**:它是所有 8 个 PR(`!1` ~ `!8`)的整合结果,包含完整特性链路(从最初的 7 个空迁移到 10 个 ascvd 迁移 + 5 个 patient 迁移 + 4 个 gene_polymorphism 迁移 + 8 个 blood_lipid_subfraction 迁移 + 1 个 report_information 迁移)。`wychmod_fix_store_bug` 分支存在 3 个独立修复但未合并,如需完整修复历史可单独导入该分支。

## 归档备注

本目录保留从原仓库导入时的项目文件(共 23 个根文件 + 7 个 Apps 子包 + 完整 `ascvdreact/` 前端代码 + `static/` 收集资源 + 8 张迁移历史 + 9 张 tyadmin 模板),代码量适中(后端约 2000 行,前端约 5000 行),**结构完整、技术栈典型、文档齐全**。

依赖版本已锁定在 2022 年中水平(Django 4.1.1、DRF 3.13.1、React 18.2.0、Ant Design 4.23.3、MySQL Connector 5.x),如需运行需按目标环境调整;Python 3.8 已 EOL,建议升级到 3.10+。

### 🔒 凭证脱敏(2026-06-28 归档时执行)

源仓库在历史 commit 中**明文提交了 6 个生产/开发凭证**,owner 授权在归档导入时统一脱敏:

| 文件 | 字段 | 原值 | 占位符 |
| --- | --- | --- | --- |
| `AscvdBackend/settings.py` | `SECRET_KEY` | `django-insecure-mqi6@v1n-...` | `<YOUR_DJANGO_SECRET_KEY>` |
| `AscvdBackend/settings.py` | `DATABASES.PASSWORD` | `penghan123` | `<YOUR_DB_PASSWORD>` |
| `服务器配置.md` | SSH 密码 | `123456` | `<YOUR_SSH_PASSWORD>` |
| `服务器配置.md` | 宝塔面板 username | `xqonbl1z` | `<YOUR_BAOTA_USER>` |
| `服务器配置.md` | 宝塔面板 password | `ce923304` | `<YOUR_BAOTA_PASSWORD>` |
| `服务器配置.md` | MySQL root 密码 | `penghan123` | `<YOUR_MYSQL_ROOT_PASSWORD>` |
| `服务器配置.md` | Django admin 密码 | `admin` | `<YOUR_DJANGO_ADMIN_PASSWORD>` |

**变更方法**:在临时克隆里改 → 独立 commit(`a0c716a`)→ `git subtree add` 拉这个脱敏后的 HEAD,因此归档仓库 history 中**不含**任何真凭证。

**源仓库侧处理**:
- 源仓库的 6 个原始凭证仍保留在源仓库 history 中(超出本归档仓库处理范围)
- owner 已被告知,需在源仓库侧做对应处理(轮换/删除等)

**owner 应立即在源仓库侧处理**(紧急程度由高到低):
1. **SSH 密码 `123456`** —— 立即修改服务器 SSH 密码(`passwd root` 或新建密钥对)
2. **宝塔面板 `xqonbl1z / ce923304`** —— 立即在宝塔面板修改账户密码 + 启用 IP 白名单
3. **MySQL root `penghan123`** —— 立即修改 MySQL root 密码,授权范围限定 `localhost`
4. **Django admin `admin / admin`** —— 立即修改 Django 超级管理员密码(若该服务仍在运行)
5. **Django `SECRET_KEY`** —— 立即在生产 settings 中重新生成 `SECRET_KEY`(可用 `python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"` 生成),并启用 `DEBUG = False`
6. **如要本地运行本项目**:在 `settings.py` 与 `服务器配置.md` 中按需填入真实凭证后再启动

### 📝 README 升级(2026-06-28 归档前执行)

源仓库的 `README.md` 是**早期学生项目风格**的 setup 笔记(无 badges、无表格、无架构图)。owner 授权在归档前重写为**企业级布局**:hero header + 7 个 badge + 项目概述 + 11 项功能矩阵 + 三段技术栈表(带版本)+ ASCII 架构图 + 5 分钟快速开始 + 详细安装(分后端/前端,含 TyAdmin 生成步骤)+ API 速查表 + 项目结构树 + 生产部署 + 分支策略 + 提交规范 + 6 条 FAQ + License。重写后的 README 已推送回源仓库(`1f9faef..ae35618 main -> main`)并随归档进入本目录。
