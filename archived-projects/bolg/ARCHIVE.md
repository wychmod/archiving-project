# 归档说明

## 基本信息

- 原仓库：git@github.com:wychmod/bolg.git
- 归档目录：archived-projects/bolg/
- 归档日期：2026-06-25
- 导入提交：10ce081c3e9a17de1e5e201881468fcb52dc883f
- 提交日期：2026-02-07
- 提交说明：bolg
- 当前状态：已归档，仅保留源码作为历史学习参考

## 项目简介

`bolg`(README 中自称「博客」,命名疑为 blog 拼写)是一个基于 Flask 的全栈博客系统练手项目,使用应用工厂(Application Factory)模式组织代码,涵盖注册激活、文章发布、个人中心、收藏与搜索等常见博客系统能力,作为 Flask Web 开发入门阶段的学习产出。

主要功能模块:

- **用户系统**:注册(邮件激活)、登录、退出、用户状态维持(Flask-Login)
- **博客文章**:发布 / 编辑 / 删除 / 详情 / 列表 / 搜索(导航栏 + 个人中心「自己的文章」筛选)
- **个人中心**:信息查看、改用户名、改密码、改邮箱、头像上传(已规划,代码覆盖度参差)
- **博客收藏**:收藏 / 取消收藏、收藏管理(部分实现,README 标记「待完成」)
- **分页**:基于 SQLAlchemy `paginate`,每页条数在 `config.PAGE_NUM` 配置(默认 2 条)
- **文件上传**:`app/static/upload/` 目录,头像等
- **邮件**:注册激活邮件(`app/email.py`),支持从环境变量读取 SMTP 凭据
- **多环境配置**:`default / development / testing / production` 四套,通过 `FLASK_CONFIG` 切换

## 技术栈

### 后端

- Python 3
- Flask(应用工厂模式 `create_app`)
- Flask-Login — 用户状态维持
- Flask-SQLAlchemy — ORM
- Flask-Migrate + Alembic — 数据库迁移
- Flask-WTF — 表单(WTForms)
- Flask-Script — 自定义命令行(看 `manage.py`,目前用于挂载 `db` 迁移命令)
- SQLite — 开发数据库(`app/dev_blog.sqlite`,随仓库归档)

### 前端

- Jinja2 模板(目录式组织:`main / posts / owncenter / user / email / common`)
- 原生 HTML / CSS / JS(无前端框架)
- 静态资源:`app/static/{css,img,js,upload}/`

### 工程实践

- 应用工厂模式 `create_app(config_name)`(在 `app/__init__.py`)
- 配置类多环境拆分(`app/config.py`,Config + DevelopmentConfig / TestingConfig / ProductionConfig)
- 第三方扩展统一在 `app/extensions.py` 实例化,避免循环引用
- 模型拆分到 `app/models/`,表单拆分到 `app/forms/`,视图拆分到 `app/views/`
- 数据库迁移目录 `migrations/`,由 Flask-Migrate 维护
- SMTP 凭据通过环境变量读取,不在代码里硬编码(但开发环境的数据库 URI 注释里残留了 MySQL 账号,实际未启用)

## 学习重点

- Flask 应用工厂模式的实际搭建(规避循环引用)
- Flask-Login 的用户加载、会话维持与登录保护
- Flask-SQLAlchemy 的多对多关系(博客 ↔ 收藏用户)
- Flask-Migrate / Alembic 的迁移生成与升级
- Flask-WTF 的表单验证与 CSRF
- 邮件发送与激活流程
- Jinja2 模板继承(看 `templates/common/base.html`)+ 自定义宏(看 `templates/common/page_macro.html` 分页宏)
- 多环境配置拆分

## 归档备注

本目录保留从原仓库导入时的项目文件,**包含 `app/dev_blog.sqlite` 开发期数据库**,与代码一并归档;不包含 `venv/` 虚拟环境目录(`.gitignore` 已忽略)。

原仓库只有一个 commit `bolg`,提交于 2026-02-07,无后续迭代。分支名为 `master`,已用 `git subtree add --squash --prefix=archived-projects/bolg ... master` 导入。

README 里「五、待完成」清单列出了博客管理(分页/搜索/删除确认)、个人中心(改用户名/密码/邮箱/头像)、博客收藏、评论与回复、`flask-restful` 等条目,实际代码已覆盖大部分但功能完整度参差,可作为「Flask 入门阶段产物」的样本参考。

`config.py` 中 `SECRET_KEY = '21s34desxas'` 为明文硬编码,属于练手项目常见做法,不可用于生产环境;SMTP 凭据从环境变量读取是正确的做法。