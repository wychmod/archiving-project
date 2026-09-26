# AGENTS.md

本仓库的 AI Agent 操作规范。所有由 AI agent 执行的操作(代码修改、文件迁移、提交、信息检索)在动手前请先通读本文件。

> 适用读者:OpenCode、Claude Code、Codex、Cursor、Ader、Devin、Gemini CLI 等所有 `AGENTS.md` 规范的消费者。
>
> 如果你来自 Anthropic 系的 agent,请同时阅读 [`CLAUDE.md`](./CLAUDE.md) 以了解本仓库对你额外的偏好设置。

---

## 0. 跨文档一致性

本文件、`README.md`、`CLAUDE.md` 三者共同构成仓库的协作规范,职责如下:

- `README.md` — 对外门面,项目清单 + 分类说明 + 归档工作流概览
- `AGENTS.md`(本文件)— 权威规范源,所有细化的流程、提交、字段模板都在这里
- `CLAUDE.md` — Anthropic 系 agent 的补充偏好,只写 AGENTS.md 没覆盖的部分

**修改任一份时,必须同步检查并按需更新另外两份**,重点关注以下联动点:

- 目录结构与分类定义(本文件 §2 / §2.1 ↔ `README.md` 目录结构图与分类说明表 ↔ `CLAUDE.md` §4.2)
- 子项目元信息文件名约定(`ARCHIVE.md` ↔ README 表格 ↔ CLAUDE.md §4.2/§4.3)
- 展示站定义与归档流程的第 6 步(本文件 §2.2/§3.1 ↔ README 目录结构图 ↔ CLAUDE.md §4.2)
- 提交前缀示例(本文件 §4 ↔ 实际 commit history)
- 角色描述与红线(本文件 §1 ↔ `CLAUDE.md` §1/§6)

冲突优先级:`AGENTS.md` > `CLAUDE.md` > `README.md`。

---

## 1. 仓库性质

这是一个**纯归档仓库**(archive-only),不是开发项目。子目录中保存的是历史上从其他仓库导入的代码,默认状态是只读快照。任何改动都需要遵循"迁移 → 标记 → 记录"三步走(详见 §5)。

**严禁**:

- 跨子目录重构或批量修改源代码。
- 删除或重写历史提交。
- 在没有 owner 授权的情况下修改归档项目的源代码。

---

## 2. 目录约定

```
archiving-project/
├── README.md            # 项目门面(对外展示,内容精炼)
├── AGENTS.md            # 本文件,通用 agent 规范
├── CLAUDE.md            # Claude 专属偏好
├── archived-projects/   # 曾独立维护的项目快照
└── showcase/            # 展示站源码(Astro 静态站点,部署到 GitHub Pages)
```

### 2.1 分类定义

| 目录 | 适用场景 | 期望生命周期 |
| --- | --- | --- |
| `archived-projects/` | 曾经独立维护、现已不再迭代但值得保留的项目 | 永久保留,只读 |
| `showcase/` | 归档仓库的对外展示站(Astro + Node 构建,输出静态站点到 GitHub Pages) | 持续维护,随归档同步 |

### 2.2 单项目目录要求

每个子项目目录**必须**包含一个 `ARCHIVE.md`(项目级,不是仓库根级),用于记录:

- 项目原始名称与简介
- 技术栈
- 学习重点 / 解决的问题
- 当前状态(已归档 / 可运行 / 仅源码 / 待整理)
- 原始来源仓库 URL 与导入时间

每个子项目目录同时**必须**包含一个 `.gitignore`,至少覆盖 §3.1 所列的禁止入库类别。

### 2.3 展示站元信息约定

`showcase/` 是归档仓库的对外展示站,基于 **Astro**(详见 [`showcase/docs/DESIGN-V2.md`](./showcase/docs/DESIGN-V2.md);V1 设计 [`DESIGN.md`](./showcase/docs/DESIGN.md) 中 §4.2/§6.2 的内容层规范继续有效)。归档每发生一次,展示站**必须**同步更新。每个归档项目在展示站中对应**一篇内容条目的中英两版本**,文件位于:

```
showcase/src/content/projects/zh/<ref>.md
showcase/src/content/projects/en/<ref>.md
```

front matter 由 `showcase/src/content.config.ts` 的 Zod schema 约束,字段定义如下:

```yaml
---
ref: lottery                        # 中英配对键,= archived-projects/ 下的目录名
lang: zh                            # zh | en
title: Lottery · DDD 抽奖系统        # 英文篇用对应英文标题
name: Lottery                       # 卡片/封面上的短名
subtitle: DDD 四层架构抽奖系统         # 详情页副标题
description: 一句话摘要               # 出现在卡片、SEO meta 与 RSS
category: enterprise                # ai-llm | fullstack | enterprise | tools
stack: [java, ddd, dubbo, spring-boot, database-sharding]   # 规范键,与语言无关
status: archived                    # archived | runnable | wip
scrubbed: false                     # 凭证是否已脱敏
repoCleared: false                  # 原始仓库是否已清空
archivedAt: 2026-06-25              # 归档日期,决定时间线与排序
commitCount: 53                     # 可选,原仓库提交数
---
```

字段约束:

- `ref` = `archived-projects/` 下的目录名;同一 `ref` 的中英两条互为译文,缺任一条会直接构建失败
- `lang` 决定条目归属哪个 locale 目录,两个目录各存一份,不再靠文件名后缀区分
- `category` 必须是四个规范键之一;新增分类需同时改 `src/data/taxonomy.ts` 与本文档
- `stack` 使用 `src/data/taxonomy.ts` 中的**规范键**(小写连字符),不要写显示名;展示名由 `stackLabel()` 按语言解析。新键需先加入字典
- `status` 的语义:已归档 / 可运行 / 待整理,对应界面上的状态印章
- `archivedAt` 决定时间线分组与「按归档时间」排序,新增条目务必填对
- 正文素材只能取自该项目 `ARCHIVE.md` / `README.md`,不编造、不夸大
- 涉及凭证脱敏的项目,`scrubbed: true`,并在正文中显式标注「已脱敏」(同根 README 惯例)
- 正文内跨项目链接写**不带部署 base** 的路径(如 `/projects/lottery/`;英文篇写 `/en/projects/lottery/`),base 由构建期插件统一补全

> 历史遗留的 91 条旧 URL 重定向表在 `showcase/redirects.mjs`,由 `scripts/gen-redirects.py` 生成并已冻结,**不要手工编辑**。

### 2.4 展示站本地构建与校验

展示站是 Astro 静态站点,工作目录固定为 `showcase/`,运行时为 Node 22。

| 目的 | 命令 |
| --- | --- |
| 安装依赖 | `npm ci` |
| 开发服务器 | `npm run dev` |
| 生产构建(输出 `showcase/dist/`) | `npm run build` |
| 本地预览构建产物 | `npm run preview` |
| **一键校验**(类型 + 构建 + 令牌 + 内链) | `npm run verify` |
| 类型检查(内容 schema / 组件 props) | `npm run check` |
| 校验内链是否都在部署 base 内 | `npm run check:links` |
| 校验设计令牌是否存在未定义引用 | `npm run check:tokens` |
| 构建 / 预览**根域**版本(base 为空) | `npm run build:root` / `npm run preview:root` |

约定:

- **base 由 `scripts/astro-with-base.mjs` 统一注入**,`dev` / `build` / `preview` 默认都用 `/archiving-project`(CI 里则用 `configure-pages` 传入的值)。不要绕过它直接跑 `astro build`——除非确实要根域版本,那用 `build:root`
- **构建与预览的 base 必须一致**。不带 base 构建、却按 `/archiving-project/` 提供服务,会让全部样式与脚本 404,页面"整站没样式"——看起来像 CSS 坏了,其实是配置不匹配。`npm run preview` 会先检查 `dist/` 自报的 base 是否与将要服务的 base 一致,不一致直接报错退出
- base 在 **Node 里**设置而非 shell,因此 **不需要**任何 `MSYS_NO_PATHCONV=1` 前缀;这同时绕开了 Windows/Git Bash 把 `/archiving-project` 改写成 `C:/…` 的问题(`astro.config.mjs` 与 `check-links.mjs` 仍保留守卫,防止有人手写环境变量)
- **`check:links` 的 base 来源**:不带参数时从产物里的 `<meta name="site-base">` 自检测(与刚构建的东西天然一致);CI 则**显式传入** `configure-pages` 的 `base_path`,以断言「构建确实用了预期的 base」——这才是更强的检查,否则一个悄悄丢了 base 的构建会自证清白
- **改动样式后请跑 `npm run check:tokens`**:`var(--x)` 引用不存在的令牌会静默失效(整条声明被丢弃),不报错
- **改动链接或 base 逻辑后请跑 `npm run check:links`**:它会扫描 `dist/` 里所有 HTML,任何跑出 base 的内链都会失败
- 新增/修改内容后必须 `npm run build` 通过——Zod schema 会校验 front matter,`ref` 缺任一侧语言会直接失败
- **`public/.nojekyll` 必须保留且保持为空**:GitHub Pages 若对产物跑 Jekyll,会跳过所有 `_` 开头的路径,`_astro/`(全部样式与脚本)会被整体删掉。当前 `actions/deploy-pages` 流程不跑 Jekyll(线上已验证 `_astro/` 可正常访问),此文件是兜底,不要「清理」掉
- 部署由 `.github/workflows/pages-deploy.yml` 负责(Ruby/Jekyll 三段式已废弃),`PAGES_BASE_PATH` 取自 `configure-pages` 的 `base_path`

---

## 3. 工作流

### 3.1 迁入新项目

按以下顺序操作,不要跳步:

1. **确认分类**:目标目录固定为 `archived-projects/<name>/`(本仓库只承担历史项目归档职责)
2. **拉取代码**:使用 `git subtree add` 或 `git remote add` + `git pull`,保留原始 commit 历史
3. **归档前清理**:剔除下方所列的禁止入库文件,并确认或补充子项目 `.gitignore`。注意:subtree 导入的 squash 提交会原样携带源仓库根目录内容,若源仓库本身已提交这些文件,需先在源仓库清理后重新导入,或在导入后经 owner 授权用 `git filter-repo` 清除(见 §5)
4. **写入项目 ARCHIVE**:在子项目根目录新建 `ARCHIVE.md`,字段参考 §2.2
5. **更新根 README 的项目清单**:在 `README.md` 的清单表中追加一行
6. **同步展示站**:在 `showcase/src/content/projects/{zh,en}/` 下为该归档项目新增**中英两条内容条目**(front matter 与素材规范见 §2.3),`ref` 与目录名一致,`category` / `stack` / `status` / `archivedAt` 按 §2.3 填写。站点未上线前此步只落地内容文件,不执行部署
7. **提交**:commit message 建议使用 `archive: import <project-name> from <source-url>`;展示站的改动可与本次归档同一提交,也可单独提交(`feat(showcase): add <project-name> posts`),但**不得**遗漏

> 展示站同步是归档流程的一部分(而非可选动作):归档项目而不更新展示站,视为归档未完成。

> **禁止入库的文件类别**(清理对象,本地保留即可):
>
> - 虚拟环境 / 依赖目录:`venv/`、`node_modules/`
> - 构建产物:`build/`、`dist/`、webpack bundle 产物、Django `collectstatic` 输出(如 `static/admin/`)
> - Python 缓存:`__pycache__/`、`*.pyc`
> - IDE / 编辑器配置:`.idea/`、`.vscode/`
> - 本地数据库文件:`*.sqlite`、`*.sqlite3`

### 3.2 检索与查询

- 查找某类项目 → 先用 `rg` / `Grep` 在 `archived-projects/` 中按技术栈关键词扫
- 了解项目用途 → 读对应子目录的 `README.md`,不要直接读源码
- 全量清单 → 读根 `README.md` 的项目清单表格

### 3.3 修复与改动

如必须修改归档项目源码:

- 优先在小范围、明确必要的修复内进行
- 在子项目 `README.md` 的"当前状态"字段追加修改记录(日期 + 原因)
- 不要重写依赖版本,不要升级框架
- 如需对项目做大幅重构,建议在仓外新建一个独立项目而不是在归档上动刀

---

## 4. 提交规范

提交信息遵循 Conventional Commits:

| 前缀 | 用途 | 示例 |
| --- | --- | --- |
| `archive:` | 导入历史项目 | `archive: import ToDoList from git@github.com:wychmod/ToDoList.git` |
| `docs:` | 仅修改文档(README/AGENTS/CLAUDE) | `docs: refine root README layout` |
| `chore:` | 维护性操作(目录结构、.gitignore) | `chore: add archived-projects/.gitkeep` |
| `feat(showcase):` | 展示站功能与内容(内容条目、组件、样式) | `feat(showcase): add lottery entries` |
| `refactor(showcase):` | 展示站结构性改造(框架替换、目录重组) | `refactor(showcase): rebuild on Astro, drop Jekyll` |
| `fix:` | 修复归档项目源码(需要 owner 授权) | `fix(ToDoList): correct django version pin` |
| `chore(showcase):` | 展示站维护性操作(依赖、CI、脚本) | `chore(showcase): pin node 22 in deploy workflow` |

---

## 5. 禁止动作清单

- ❌ 未经 owner 明确授权运行 `git filter-repo` / `git filter-branch` 改写历史;授权执行前必须先做 `git bundle` 全量备份(2026-09-13 已在授权下完成一次全库清理:清除 venv / 构建产物 / collectstatic / bundle.js / `.pyc` / `.idea` / sqlite,pack 体积 23.0 MiB → 11.8 MiB)
- ❌ 删除归档项目目录
- ❌ 在根目录直接放源代码,绕过分类目录
- ❌ 不更新根 README 就提交新项目
- ❌ 在归档项目里引入新的 build/test 工具链

> **已授权的结构性变更记录**
> - 2026-09-13 — 全库清理(见上):清除 venv / 构建产物 / collectstatic / bundle.js / `.pyc` / `.idea` / sqlite,pack 23.0 MiB → 11.8 MiB
> - 2026-09-26 — 展示站脱框架(owner 授权):删除 `showcase/` 下全部 Jekyll 源文件 43 个(`_config.yml` / `_posts/` / `_tabs/` / `_includes/` / `_data/` / `_plugins/` / `Gemfile*` / `assets/` / `index.html` / `serve.cmd` / `.nojekyll`)及未跟踪的 `_site/`、`.jekyll-cache/`(备份:临时目录 `archiving-project-legacy-backup/legacy-site-and-cache.tar.gz`);同期将 `archived-projects/` 中既有项目内容迁移为 `showcase/src/content/projects/{zh,en}/`,URL 迁移由 91 条重定向兜底

---

## 6. 信息查询速查表

| 想做什么 | 看哪里 |
| --- | --- |
| 这个仓库是什么 | `README.md` |
| 仓库怎么用 / 怎么归档 | 本文件 §1-§5 |
| Claude 特别要做的事 | `CLAUDE.md` |
| 某个归档项目的细节 | `archived-projects/<name>/ARCHIVE.md` |
| 仓库目前归档了哪些 | `README.md` 的项目清单表格 |
| 展示站怎么改 / 新增归档怎么补文章 | 本文件 §2.3 + `showcase/docs/DESIGN-V2.md` |
| 展示站上线状态与部署方式 | `showcase/docs/DESIGN-V2.md` §8.4 + 本文件 §2.4 |
| 展示站本地怎么跑 / 怎么校验 | 本文件 §2.4 |
