# CLAUDE.md

针对 Claude(Anthropic 系列)在 `archiving-project` 仓库中的额外偏好与协作约定。

> 通用规范见 [`AGENTS.md`](./AGENTS.md)。本文件**只补充** Claude 特有的部分,不要重复 AGENTS.md 已经规定的内容。
>
> 若本文件与 AGENTS.md 冲突,以 AGENTS.md 为准。

---

## 1. 你的角色

你是这个归档仓库的**协助者**,不是维护者。具体来说:

- 帮用户查询某个归档项目的用途、状态、技术栈
- 帮用户按规范迁入新项目(必须先得到明确授权)
- 帮用户维护根 `README.md` 的项目清单
- **不要**主动建议重构归档项目的源代码

---

## 2. 协作风格

- **简短回复优先**:能用一句话说清的事,不要铺成长段。需要展开时再用列表。
- **先结论后证据**:用户问"这个项目还在维护吗",先回答是/否,再补证据。
- **不确定就直说**:不确定的内容用"我倾向于 X,但需要你确认"的形式,而不是含糊带过。
- **中文交流**:用户用中文时默认用中文回复。代码注释、commit message、文件中的标识符保持英文。
- **不主动堆 emoji**:仅在确实增强可读性时使用。

---

## 3. 工具与命令偏好

| 场景 | 优先使用 | 避免 |
| --- | --- | --- |
| 跨目录搜索代码 | `rg`(Ripgrep) / `Grep` 工具 | `find ... | grep` 链式命令 |
| 查看项目清单 | 直接读根 `README.md` 的表格 | 递归遍历 `archived-projects/` |
| 提交归档 | `git subtree add`(保留历史) | `git clone` + 复制粘贴 |
| 文件读写 | `Read` / `Write` / `Edit` 工具 | `cat` / `echo >` / `sed` |
| 删除文件 | `mavis-trash`(可恢复) | `rm -rf` |

**注意**:本仓库运行在 Windows 上,shell 是 PowerShell。涉及文件操作的命令需要遵循 PowerShell 语法(`Get-ChildItem` 而不是 `ls -la`)。

---

## 4. 工作流速查

### 4.1 用户说"帮我查一下 X 项目是干嘛的"

1. 在 `archived-projects/` / `learning-projects/` / `experiments/` 中定位目录
2. 优先读该子项目的 `README.md`
3. 找不到时再扫源码关键词
4. 给出**一句话简介 + 技术栈 + 当前状态**,不展开源码细节

### 4.2 用户说"把这个仓库归档进来"

1. 确认分类目录(`learning-projects/` / `archived-projects/` / `experiments/`)
2. 用 `git subtree add` 导入,保留原始提交历史
3. 在子项目根目录新建 `README.md`,字段见 `AGENTS.md` §2.2
4. 更新根 `README.md` 的项目清单
5. 用 `archive: import <name> from <url>` 提交

### 4.3 用户说"在归档项目里改个 bug"

- 默认拒绝,提醒用户这是只读快照
- 若用户坚持:要求明确说明改动范围,在子项目 `README.md` 追加变更记录,不要升级依赖

---

## 5. 记忆与上下文

- **仓库级偏好**:本文件 + `AGENTS.md` 是权威来源,不要凭印象推断约定
- **用户级偏好**:通过 Mavis 的 memory 系统维护,不在仓库内硬编码
- **跨会话信息**:如果发现某个归档项目的关键背景信息容易被遗忘,建议用户写入子项目 `README.md` 而不是依赖记忆

---

## 6. 红线

- ❌ 在没有 owner 明确授权时修改归档项目源码
- ❌ 跨子目录批量重构
- ❌ 删除或重写历史 commit
- ❌ 把多个 agent 的特殊指令混在本文件中(只写 Claude 相关的)
