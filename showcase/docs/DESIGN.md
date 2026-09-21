# Archiving Project · 展示站设计文档

> 站点目录:`showcase/` · 部署地址:`https://wychmod.github.io/archiving-project/`
> 主题:**Jekyll Theme Chirpy v7.6**(一比一复刻 https://chirpy.cotes.page/)
> 定稿日期:2026-09-21 · 状态:**待开发**

---

## 1. 目标与范围

| 项 | 决定 |
| --- | --- |
| 视觉 | 严格 1:1 复刻 Chirpy 官方 Demo(深色/浅色双主题、侧边栏、卡片式文章流、标签/分类页、搜索) |
| 部署 | GitHub Pages,仓库内 `showcase/` 目录为站点源码,baseurl 由部署工作流自动处理为 `/archiving-project` |
| 双语 | 站点默认中文;11 个归档项目每个都有中/英两篇文章,UI 语言随文章自动切换 |
| 额外 | 侧边栏底部加一个轻量中/英切换入口(相对 Demo 的唯一可见差异,约一行文字);另覆盖 `update-list.html` 修复「最近更新」面板的中英排序(§5.3,非样式差异) |
| 不动的东西 | `archived-projects/`、根 `README.md`、`AGENTS.md`、`CLAUDE.md` 零改动;不改归档项目源码 |
| 不做的事 | 不做评论区、不做统计埋点、不做 PWA 定制、不引入 npm 构建链 |

### 为什么站点不放在仓库根目录

根目录被 11 个归档项目 + 3 份协作文档占据。Jekyll 站点放根目录会把归档源码卷入构建,且 `_config.yml`
与归档项目可能冲突。因此:

- 站点源码独立在 `showcase/`,Jekyll `source` 指向它
- 构建产物、缓存、Gem 环境全部隔离在 `showcase/` 内
- 归档仓库的"只读快照"性质不受任何影响(符合 `AGENTS.md` §3 精神:不做跨子目录改动)

---

## 2. 目录结构

```
archiving-project/
├── AGENTS.md                     # 不动
├── CLAUDE.md                     # 不动
├── README.md                     # 不动
├── .github/
│   └── workflows/
│       └── pages-deploy.yml      # GitHub Actions:构建 + 部署到 Pages(仓库根,唯一工作流目录)
├── archived-projects/            # 不动(11 个只读快照)
└── showcase/                     # ← 新增:展示站
    ├── docs/
    │   └── DESIGN.md             # 本文件
    ├── _config.yml               # 站点配置(中文默认、双语、baseurl 占位)
    ├── _data/
    │   ├── contact.yml           # 社交/联系入口(侧边栏)
    │   └── share.yml             # 文章分享按钮
    ├── _includes/
    │   ├── sidebar.html          # 主题侧边栏副本(< 7.6 版本),在 </aside> 前插入 lang-switch
    │   └── lang-switch.html      # 中/英切换逻辑:按 ref 找译文,无译文回退该语言首页
    ├── _plugins/
    │   └── posts-lastmod-hook.rb # 主题 starter 自带的 lastmod 钩子
    ├── _tabs/                    # 导航页(首页由 index.html 提供)
    │   ├── about.md              # 关于:归档仓库自述
    │   ├── archives.md           # 归档
    │   ├── categories.md         # 分类
    │   └── tags.md               # 标签
    ├── _posts/
    │   ├── 2026-06-25-<ref>-zh.md   # 11 篇中文(ref=目录名)
    │   └── 2026-06-25-<ref>-en.md   # 11 篇英文(ref 与中文成对)
    ├── assets/
    │   ├── css/
    │   │   └── jekyll-theme-chirpy.scss  # 主题样式副本 + 自定义走末尾挂载点
    │   └── img/
    │       └── avatar.png        # 侧边栏头像(256px)
    ├── index.html                # Jekyll 入口(首页 = 文章流)
    ├── Gemfile                   # jekyll-theme-chirpy ~> 7.6
    └── .gitignore                # 忽略 _site/ .jekyll-cache/ vendor/ .bundle/
```

---

## 3. 部署设计(GitHub Pages)

### 3.1 工作流

采用 Chirpy Starter 官方工作流(`pages-deploy.yml`),关键点:

- 触发:push 到 `main`,且 `paths` 限定为 `showcase/**` 与工作流自身——归档目录变更不触发站点重建
- 构建源:`showcase/`(通过 `source:` 指定给 `jekyll b`)
- baseurl:由 `actions/configure-pages` 自动输出 `base_path`(`/archiving-project`),构建时自动追加;
  **本地预览不追加**(`_config.yml` 保持 `baseurl: ""`,资源路径一律走 `relative_url`,两种环境自适应)
- 部署:`actions/deploy-pages`,以 artifact 方式发布(GitHub Pages 的 "GitHub Actions" 源)

### 3.2 一次性人工操作(已完成后记录)

1. 仓库 Settings → Pages → Source 选择 **GitHub Actions** ✅(2026-09-21)
2. 首次 push 后到 Actions 标签页确认工作流运行成功
3. 访问 https://wychmod.github.io/archiving-project/ 验证

> 注:首次部署曾因 Pages 开关晚于 push 打开而失败一次("Setup Pages" 步骤),重触发构建后即成功——属预期时序现象,非配置问题。

### 3.3 部署边界

- 站点是公开的,与归档仓库公开状态一致
- 归档仓库根 `README.md` 的「快速跳转」导航条新增"在线展示站"链接(一行),已完成

---

## 4. 双语机制(核心设计)

### 4.1 原理

Chirpy v7 的 `_includes/lang.html` 按 `page.lang` → `site.lang` → `en` 的优先级解析语言:

```liquid
{% if site.data.locales[page.lang] %}{% assign lang = page.lang %}
{% elsif site.data.locales[site.lang] %}{% assign lang = site.lang %}
{% else %}{% assign lang = 'en' %}{% endif %}
```

因此:

- `_config.yml` 设 `lang: zh-CN` → **站点默认中文**(侧边栏 首页/归档/关于、日期格式、搜索提示等全部中文)
- 英文文章 front matter 写 `lang: en` → 该文界面全英文(Posted on、标签、目录标题等)
- 中文文章 front matter 写 `lang: zh-CN` → 界面中文
- 两种语言的文章天然混在同一个首页/归档/标签流里,无需路由改造

### 4.2 文章配对规范

每篇文章 front matter 固定字段:

```yaml
---
title: Lottery · DDD 抽奖系统
date: 2026-06-25 10:00:00 +0800
lang: zh-CN            # 或 en:该文界面语言
ref: lottery           # 中英配对键:同 ref 的两篇互为译文
categories: [企业级架构]
tags: [Java, DDD, Dubbo, 分库分表]
description: 一句话摘要(出现在卡片与 SEO meta)
---
```

- `ref` 是 Jekyll 社区的 i18n 约定字段,Chirpy 不消费它,但它是中英配对的可检索依据
- **`ref` 值固定取 `archived-projects/` 下的目录名**(如 `cloud-short-link`),保持全仓库单一命名来源
- 英文文章 `categories`/`tags` 用英文写法,保证英文标签页干净
- 正文素材只能取自该项目 `ARCHIVE.md` / `README.md`,不编造、不夸大;涉及凭证脱敏的项目在正文显式标注「已脱敏」

**文件名规范**:`showcase/_posts/YYYY-MM-DD-<ref>-zh.md` 与 `showcase/_posts/YYYY-MM-DD-<ref>-en.md`,
日期取该项目的归档日期(`git log` 中 `archive:` 提交的日期)。

**排序稳定性**:中文篇 `date` 用 `10:00:00`,英文篇用 `09:00:00`(同一天)。首页按时间倒序时
每个项目固定"中文卡片在前、英文卡片紧随其后",避免同秒导致顺序随机。

### 4.3 UI 语言包

- 直接复用主题内置 `zh-CN.yml` / `en.yml`(Chirpy 官方维护,含简体中文全套文案)
- `_data/locales/` 下的同名文件会**覆盖**主题内置版本,本项目仅放最小覆盖文件(如需要个性化措辞时)
- 不新增语言,不碰其它 locale

---

## 5. 侧边栏语言切换(唯一自研组件)

### 5.1 交互

- 位置:侧边栏底部 footer 区域(与主题切换按钮同一水平带下方)
- 形态:一个克制的文字链接,当前语言显示 `EN`(表示"点击去英文"),英文界面显示 `中文`
- 行为:点击切换到"同 `ref` 的另一语言文章";在没有对应译文时(如 about 页)回退到该语言的站点首页
- 样式:沿用主题 CSS 变量,不引入新颜色

### 5.2 实现要点

`_includes/lang-switch.html`:

1. 读取当前页 `page.lang` 与 `page.ref`
2. 遍历 `site.posts`,找出 `ref` 相同、`lang` 不同的那篇,取其 URL
3. 无匹配时输出对应语言的首页链接
4. 挂载方式:`showcase/_includes/sidebar.html` 是主题侧边栏模板的副本(与 gem 7.6 逐行一致),
   仅在 `</aside>` 前追加一行 `{% include lang-switch.html %}`。Jekyll 优先使用站点内的 `_includes`,
   因此无需覆盖整页布局
5. 样式:并入 `assets/css/jekyll-theme-chirpy.scss` 的官方自定义挂载点(主题文件末尾的
   `/* append your custom style below */`),沿用主题 CSS 变量,不引入新颜色

> 风险提示:覆盖主题的 `sidebar.html` / 样式表意味着 Chirpy 大版本升级时需要重新比对。升级策略见 §8。

### 5.3 站点级覆盖:`update-list.html`(最近更新面板)

`_includes/update-list.html` 覆盖主题同名 include(2026-09-21 引入),逻辑与主题 7.6 原版一致,
仅修复一个排序缺陷:

- **问题**:中英两篇常在同一提交中更新,`_plugins/posts-lastmod-hook.rb` 会给它们相同的
  `last_modified_at`;主题原版在时间戳完全平局时按 `datetime::index` 字符串序排序,结果不稳定,
  会出现英文篇排在中文篇前面的情况
- **修复**:排序键改为 `datetime::lang_rank::index`,`lang_rank` 中文篇为 1、英文篇为 0,
  保证同一更新时间下中文篇始终排在英文篇前面(与「站点展示以中文为主」的定位一致)
- **行为差异**:仅影响「最近更新」面板的排序稳定性,不改变面板展示 5 篇文章的数量与样式

---

## 6. 内容规划(11 个项目 × 2 语言 = 22 篇)

### 6.1 分类(两侧同构)

| 分类(中) | Category(EN) | 项目 |
| --- | --- | --- |
| AI 与 LLM 应用 | AI & LLM | ChatGPT-Next-Web · TokenBridge |
| 全栈练手 | Full-stack Practice | ToDoList · 1802axf · bolg |
| 企业级架构 | Enterprise Architecture | wiki · Lottery · db-router-springboot-starter · cloud-short-link |
| 工具与垂直领域 | Tools & Verticals | huawei-alarm · ascvd · ESContentGen |

### 6.2 文章模板(每篇统一结构)

1. **概览** —— 一句话定位 + 状态徽章(已归档/已脱敏)
2. **技术栈** —— 表格或行内徽章
3. **架构亮点** —— 2-3 条,取自各项目 `ARCHIVE.md` / `README.md`(不编造)
4. **学习收获** —— 该归档在技术演化里的位置
5. **归档信息** —— 来源与导入时间、目录链接(指向 GitHub 上的 `archived-projects/<name>/`)

素材来源:各项目 `ARCHIVE.md`、项目 `README.md`、根 `README.md` 项目清单。**不重写、不夸大**,
与仓库文档口径一致(符合"每份归档回答三个问题"的仓库定位)。

> **流程约束**:新增归档项目时,`AGENTS.md` §3.1 第 6 步强制要求同步本展示站
> (新增中英两篇文章)。即"归档未同步展示站 = 归档未完成"。

### 6.3 站内其它页面

| 页面 | 内容 |
| --- | --- |
| 首页 | 文章流:22 篇中英混合,卡片式(日期、分类、标签、摘要、阅读时长) |
| 关于 | 归档仓库自述:是什么/解决什么问题/不是什么(取自根 README「关于本仓库」,精简版) |
| 归档 | Chirpy 时间线归档页,呈现"归档时间线"叙事 |
| 分类 | 4 个分类(中英各一套标签页) |
| 标签 | 技术栈标签(Java/Python/React/…),中英各一套 |

---

## 7. 本地预览方案

本机无 Ruby,且直连 GitHub Releases 下载受限。实际采用的预览链路:

1. **便携版 Ruby 3.4**(免安装、免提权):从镜像或代理获取 `rubyinstaller-3.4.10-1-x64.7z`
   (官方 SHA256 校验通过),解压到 `D:\idea\ruby-portable\rubyinstaller-3.4.10-1-x64`
2. `cd showcase && bundle install`(`.bundle/config` 已配置清华 gem 镜像)
3. `bundle exec jekyll s` → http://127.0.0.1:4000/(本地 `baseurl` 为空,无需前缀)
4. 若需模拟线上子路径:`bundle exec jekyll s --baseurl /archiving-project`

> 该 Ruby 为便携目录,不注册进系统环境变量;CI 侧固定使用 `ruby/setup-ruby@v1` 的 `3.4`。

---

## 8. 风险与对策

| 风险 | 影响 | 对策 |
| --- | --- | --- |
| Chirpy 需要 JS/CSS 构建产物 | 官方 Starter 默认跑 `npm run build` | 选用 gem 内置的预编译资源,工作流不跑 npm;若个别资源缺失,固定主题版本并回收构建步骤 |
| `google_fonts` 外链在部分网络环境慢 | 首屏字体加载慢 | 保留默认(与 Demo 一致);如需自托管再切换 theme 的 `assets.self_host` 开关 |
| 覆盖 `sidebar.html` 与样式表带来的升级成本 | 主题升级需 diff | 与主题版本一起锁定在 Gemfile;升级时用本文件 §5.2 的挂载点清单核对(两处:`sidebar.html` 的 include 行、scss 末尾的 custom 段) |
| 中英文章同日发布 | 首页卡片顺序不稳定 | 中文篇 `10:00:00`、英文篇 `09:00:00`(中文在前、英文紧随,见 §4.2) |
| Pages 首次部署需人工开启 | 站点 404 | §3.2 已列一次性操作 |
| 归档项目里可能存在 `_posts`/`_config.yml` 同名文件 | Jekyll source 污染 | source 限定 `showcase/`,归档目录不在构建范围内;`exclude` 再加一道保险 |

---

## 9. 开发顺序(提交粒度)

| # | 提交 | 内容 |
| --- | --- | --- |
| 1 | `docs(showcase): add site design doc` | 本文件 |
| 2 | `chore(showcase): scaffold chirpy site` | 站点骨架 + 配置 + 工作流(此时可本地渲染出空站) |
| 3 | `feat(showcase): bilingual posts for 11 projects` | 22 篇文章 + 封面图 + about/首页文案 |
| 4 | `feat(showcase): sidebar language switcher` | 自研切换组件 + 布局挂载 |
| 5 | `docs(showcase): local preview & deploy guide` | 预览/部署操作说明(showcase 内 README) |
| 6 | 根 README 加一行展示页链接(经确认) | — |

---

## 10. 待办清单(开发阶段)

- [ ] 安装 Ruby 3.4(需你确认)
- [ ] 搭骨架:`showcase/` 下 Chirpy Starter 结构 + 本地渲染验证
- [ ] 配置 `_config.yml`(标题、tagline、avatar、baseurl、lang、social)
- [ ] 替换 favicon 与站点图标
- [ ] 写 22 篇文章(素材来自 ARCHIVE.md/README,不编造)
- [ ] 画/选 11 张项目封面图(或统一用主题默认卡片样式)
- [ ] 实现 `lang-switch.html` 并挂载
- [ ] 本地全量预览:中英切换、深浅主题、移动端布局
- [ ] 推送并验证 Actions 部署
- [ ] 开启 Pages(GitHub Actions 源)
