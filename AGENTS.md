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
└── showcase/            # 展示站源码(Jekyll + Chirpy,部署到 GitHub Pages)
```

### 2.1 分类定义

| 目录 | 适用场景 | 期望生命周期 |
| --- | --- | --- |
| `archived-projects/` | 曾经独立维护、现已不再迭代但值得保留的项目 | 永久保留,只读 |
| `showcase/` | 归档仓库的对外展示站(GitHub Pages) | 持续维护,随归档同步 |

### 2.2 单项目目录要求

每个子项目目录**必须**包含一个 `ARCHIVE.md`(项目级,不是仓库根级),用于记录:

- 项目原始名称与简介
- 技术栈
- 学习重点 / 解决的问题
- 当前状态(已归档 / 可运行 / 仅源码 / 待整理)
- 原始来源仓库 URL 与导入时间

每个子项目目录同时**必须**包含一个 `.gitignore`,至少覆盖 §3.1 所列的禁止入库类别。

### 2.3 展示站元信息约定

`showcase/` 是归档仓库的对外展示站(设计说明见 [`showcase/docs/DESIGN.md`](./showcase/docs/DESIGN.md))。归档每发生一次,展示站**必须**同步更新。每个归档项目在展示站中对应**一篇文章的中英两版本**(文件位于 `showcase/_posts/`),front matter 固定字段如下:

```yaml
---
title: Lottery · DDD 抽奖系统          # 英文篇用对应英文标题
date: 2026-06-25 10:00:00 +0800        # 中文篇 10:00:00;英文篇 09:00:00(同日)
lang: zh-CN                            # 或 en:决定该文界面语言
ref: lottery                           # 中英配对键
categories: [企业级架构]                # 英文篇用英文分类
tags: [Java, DDD, Dubbo, 分库分表]      # 英文篇用英文标签
description: 一句话摘要                 # 出现在卡片与 SEO meta
---
```

字段约束:

- `ref` 值 = `archived-projects/` 下的目录名;同一 `ref` 的中英两篇互为译文
- 两篇的 `date` 同日、中文篇晚于英文篇(保证首页"中在前、英紧随")
- 正文素材只能取自该项目 `ARCHIVE.md` / `README.md`,不编造、不夸大
- 涉及凭证脱敏的项目,在正文中显式标注「已脱敏」(同根 README 惯例)
- 英文篇标题/分类/标签使用英文写法(分类对照表见 DESIGN.md §6.1)

---

## 3. 工作流

### 3.1 迁入新项目

按以下顺序操作,不要跳步:

1. **确认分类**:目标目录固定为 `archived-projects/<name>/`(本仓库只承担历史项目归档职责)
2. **拉取代码**:使用 `git subtree add` 或 `git remote add` + `git pull`,保留原始 commit 历史
3. **归档前清理**:剔除下方所列的禁止入库文件,并确认或补充子项目 `.gitignore`。注意:subtree 导入的 squash 提交会原样携带源仓库根目录内容,若源仓库本身已提交这些文件,需先在源仓库清理后重新导入,或在导入后经 owner 授权用 `git filter-repo` 清除(见 §5)
4. **写入项目 ARCHIVE**:在子项目根目录新建 `ARCHIVE.md`,字段参考 §2.2
5. **更新根 README 的项目清单**:在 `README.md` 的清单表中追加一行
6. **同步展示站**:在 `showcase/_posts/` 中为该归档项目新增**中英两篇文章**(front matter 与素材规范见 §2.3),英文篇的分类/标签使用英文写法,`ref` 与目录名一致。站点未上线前此步只落地文章文件,不执行部署
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
| `feat(showcase):` | 展示站功能与内容(文章、组件、样式) | `feat(showcase): add lottery posts` |
| `fix:` | 修复归档项目源码(需要 owner 授权) | `fix(ToDoList): correct django version pin` |

---

## 5. 禁止动作清单

- ❌ 未经 owner 明确授权运行 `git filter-repo` / `git filter-branch` 改写历史;授权执行前必须先做 `git bundle` 全量备份(2026-09-13 已在授权下完成一次全库清理:清除 venv / 构建产物 / collectstatic / bundle.js / `.pyc` / `.idea` / sqlite,pack 体积 23.0 MiB → 11.8 MiB)
- ❌ 删除归档项目目录
- ❌ 在根目录直接放源代码,绕过分类目录
- ❌ 不更新根 README 就提交新项目
- ❌ 在归档项目里引入新的 build/test 工具链

---

## 6. 信息查询速查表

| 想做什么 | 看哪里 |
| --- | --- |
| 这个仓库是什么 | `README.md` |
| 仓库怎么用 / 怎么归档 | 本文件 §1-§5 |
| Claude 特别要做的事 | `CLAUDE.md` |
| 某个归档项目的细节 | `archived-projects/<name>/ARCHIVE.md` |
| 仓库目前归档了哪些 | `README.md` 的项目清单表格 |
| 展示站怎么改 / 新增归档怎么补文章 | 本文件 §2.3 + `showcase/docs/DESIGN.md` |
| 展示站上线状态与部署方式 | `showcase/docs/DESIGN.md` §3 |
