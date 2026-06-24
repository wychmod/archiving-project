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
└── archived-projects/   # 曾独立维护的项目快照
```

### 2.1 分类定义

| 目录 | 适用场景 | 期望生命周期 |
| --- | --- | --- |
| `archived-projects/` | 曾经独立维护、现已不再迭代但值得保留的项目 | 永久保留,只读 |

### 2.2 单项目目录要求

每个子项目目录**必须**包含一个 `ARCHIVE.md`(项目级,不是仓库根级),用于记录:

- 项目原始名称与简介
- 技术栈
- 学习重点 / 解决的问题
- 当前状态(已归档 / 可运行 / 仅源码 / 待整理)
- 原始来源仓库 URL 与导入时间

---

## 3. 工作流

### 3.1 迁入新项目

按以下顺序操作,不要跳步:

1. **确认分类**:目标目录固定为 `archived-projects/<name>/`(本仓库只承担历史项目归档职责)
2. **拉取代码**:使用 `git subtree add` 或 `git remote add` + `git pull`,保留原始 commit 历史
3. **写入项目 ARCHIVE**:在子项目根目录新建 `ARCHIVE.md`,字段参考 §2.2
4. **更新根 README 的项目清单**:在 `README.md` 的清单表中追加一行
5. **提交**:commit message 建议使用 `archive: import <project-name> from <source-url>`

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
| `fix:` | 修复归档项目源码(需要 owner 授权) | `fix(ToDoList): correct django version pin` |

---

## 5. 禁止动作清单

- ❌ 运行 `git filter-repo` / `git filter-branch` 改写历史
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
