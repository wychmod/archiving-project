# AGENTS.md

本仓库的 AI Agent 操作规范。所有由 AI agent 执行的操作(代码修改、文件迁移、提交、信息检索)在动手前请先通读本文件。

> 适用读者:OpenCode、Claude Code、Codex、Cursor、Ader、Devin、Gemini CLI 等所有 `AGENTS.md` 规范的消费者。
>
> 如果你来自 Anthropic 系的 agent,请同时阅读 [`CLAUDE.md`](./CLAUDE.md) 以了解本仓库对你额外的偏好设置。

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
├── learning-projects/   # 教程/课程/语言学习产出
├── archived-projects/   # 曾独立维护的项目快照
└── experiments/         # 临时验证、Demo、原型
```

### 2.1 分类定义

| 目录 | 适用场景 | 期望生命周期 |
| --- | --- | --- |
| `learning-projects/` | 为学某门语言、框架、工具或课程而写的项目 | 长期保留,可作为学习笔记回看 |
| `archived-projects/` | 曾经独立维护、现已不再迭代但值得保留的项目 | 永久保留,只读 |
| `experiments/` | 临时想法、技术调研、Demo、PoC | 评估后决定升级到 learning 或归档 |

### 2.2 单项目目录要求

每个子项目目录**必须**包含一个 `README.md`(项目级,不是仓库根级),用于记录:

- 项目原始名称与简介
- 技术栈
- 学习重点 / 解决的问题
- 当前状态(已归档 / 可运行 / 仅源码 / 待整理)
- 原始来源仓库 URL 与导入时间

---

## 3. 工作流

### 3.1 迁入新项目

按以下顺序操作,不要跳步:

1. **确认分类**:决定目标目录(`learning-projects/` / `archived-projects/` / `experiments/`)
2. **拉取代码**:使用 `git subtree add` 或 `git remote add` + `git pull`,保留原始 commit 历史
3. **写入项目 README**:在子项目根目录新建 `README.md`,字段参考 §2.2
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
- 如需重构,建议新建一个 `learning-projects/` 项目而不是在归档上动刀

---

## 4. 提交规范

提交信息遵循 Conventional Commits:

| 前缀 | 用途 | 示例 |
| --- | --- | --- |
| `archive:` | 导入历史项目 | `archive: import ToDoList from git@github.com:wychmod/ToDoList.git` |
| `docs:` | 仅修改文档(README/AGENTS/CLAUDE) | `docs: refine root README layout` |
| `chore:` | 维护性操作(目录结构、.gitignore) | `chore: add experiments/.gitkeep` |
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
| 某个归档项目的细节 | `archived-projects/<name>/README.md` |
| 仓库目前归档了哪些 | `README.md` 的项目清单表格 |
