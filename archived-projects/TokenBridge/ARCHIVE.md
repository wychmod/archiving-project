# 归档说明

## 基本信息

- 原仓库:git@github.com:wychmod/TokenBridge.git(项目与 GitHub 仓库原名 `localgateway`,后随代码提交 `c0ac37e` 更名为 `TokenBridge`,旧地址自动重定向;仓库已于 2026-09-22 清空为空提交)
- 归档目录:archived-projects/TokenBridge/
- 归档日期:2026-09-22
- 导入分支:`master`(源仓库主分支;另两个分支 `codex/ai`、`codex/token-usage-recalc` 均已完全合入 master,无独有提交)
- 导入提交:完整 `master` 提交历史(53 个 commit:自 `b8174d2 chore: initialize localgateway project baseline` 起,至 `07393da docs(readme): 标记项目归档并推荐 CC Switch 与 TokenTracker 替代方案` 止)
- 导入方式:`git subtree add`(**不带 --squash,保留完整提交历史**)
- 当前状态:已归档(owner 于 2026-09 主动停止开发,原 README 顶部已带归档声明并推荐替代方案)
- **特别说明:原仓库将在归档完成后清空,本目录是该代码的唯一保留副本**
- 历史清洁度:导入前已对全历史扫描——无 `.idea/`、构建产物、本地数据库文件入库;无真实密钥(`configs/config.example.yaml` 中仅含示例占位密码),无需脱敏处理

## 项目简介

`TokenBridge` 是一个面向本地部署、团队内网和私有化场景的 **AI 网关管理平台**,定位为"本地 AI 网关 + 路由控制平面 + 可观测控制台 + 桌面可分发"的统一体:

- **双协议网关**:同时提供 OpenAI 兼容(`/v1/chat/completions`)与 Anthropic 兼容(`/v1/messages`)接口,支持非流式与最小 SSE 流式透传
- **本地密钥隔离**:客户端只持有 Local Key,上游 Provider Key 不向业务应用扩散,由网关统一保管(AES-256-GCM 加密存储)
- **规则化路由**:模型别名映射、通配规则、Provider 优先级、Provider Chain 与 Fallback Chain,支持路由模拟
- **自动故障转移**:上游 `429`/`5xx`/网络类错误时按备用链路切换,Fallback 链路写入请求日志与 Trace metadata
- **可观测控制台**:React + TypeScript 管理后台,含 Dashboard KPI、7 日费用趋势、失败告警、备用切换分析、日志检索与 CSV 导出
- **桌面交付**:Wails v2 内嵌 WebView 桌面版 + Windows 托盘常驻版,单实例 Mutex、开机自启、AI 统计浮窗、前端产物 Go embed 后单二进制分发

开发时间线:2026-04-19 以 `localgateway` 起步 → 2026-04-22 引入 Wails 桌面支持 → 2026-05-13 更名 TokenBridge → 2026-05-17 桌面 AI 统计浮窗 → 2026-06-17 开机自启动 → 2026-09-11 标记归档并推荐 [CC Switch](https://github.com/farion1231/cc-switch)(Provider 切换)与 [TokenTracker](https://github.com/xiufengsun/TokenTracker)(Token 用量统计)作为替代方案。

## 技术栈

### 后端(已对照 go.mod 核实)

- Go 1.22.0
- `go-chi/chi/v5` v5.0.12 + `go-chi/cors` v1.2.1(HTTP 路由)
- `rs/zerolog` v1.33.0(结构化日志)· `spf13/viper` v1.19.0(配置)
- `gorm.io/gorm` v1.25.10 + `glebarez/sqlite` v1.11.0(**纯 Go SQLite 驱动,免 CGO**)
- `getlantern/systray` v1.2.2 —— 经 `replace` 指向 `third_party/systray` 本地 vendored fork
- Wails v2.12.0(桌面运行时,间接引入 WebView2)

### 前端管理后台(`web/admin/`)

- React 18 · TypeScript 5.6 · Vite 5 · React Router
- Recharts(图表)· Zustand(状态)· Framer Motion(动效)· Lucide React(图标)
- `scripts/sync-embed.mjs` 将构建产物同步到 Go embed 目录

### 构建与 CI

- GitHub Actions(`.github/workflows/build-desktop.yml`):Windows exe + macOS app 双端产物,`v*` tag 或手动触发
- PowerShell 打包脚本(`build/package.ps1` 便携包 / `build/desktop.ps1` 桌面版)

## 项目结构

```
TokenBridge/
├── cmd/tokenbridge/          # 浏览器 / 托盘版入口(HTTP Server、Windows 单实例、自动打开后台)
├── main.go                   # Wails 桌面版薄入口
├── internal/
│   ├── app/                  # 应用装配:路径解析、配置加载、SQLite 初始化、Router 挂载
│   ├── server/               # HTTP Router、OpenAI/Claude 兼容网关、Admin API handler
│   ├── provider/             # Provider CRUD、优先级、连接测试、模型发现
│   ├── routing/              # 模型别名、通配规则、Provider Chain、Fallback Chain、路由模拟
│   ├── auth/                 # Local Key 服务
│   ├── pricing/              # 模型单价同步与费用估算(内置定价 JSON)
│   ├── usage/                # 用量记录与 Provider/Model/Key 维度分析
│   ├── requestlog/           # Trace、日志查询、失败趋势、CSV 导出
│   ├── admin/                # Dashboard / Analytics / 告警聚合
│   ├── desktop/              # Wails 桌面壳、托盘、AI 统计浮窗、自启动、单实例
│   └── storage/              # SQLite / GORM 初始化
├── web/admin/                # React + TypeScript 管理后台(7 个页面)
├── third_party/systray/      # vendored fork(go.mod replace 指向)
├── build/                    # 图标、资源、打包脚本、Go embed 目标
├── configs/                  # YAML 配置模板
├── migrations/               # 数据库迁移
├── AGENTS.md                 # 项目级 Agent 规范(cmd/ + internal/ 结构约束)
├── DESIGN.md                 # Notion 风格设计系统规范
└── wails.json                # Wails 配置
```

## 学习重点

- **本地 AI 网关的完整形态**:一个端口同时兼容 OpenAI 与 Anthropic 两种协议,鉴权 → 路由 → 转发 → Fallback → 用量落库 → Trace 返回的请求链路如何分层组织(`internal/server` + `internal/routing` + `internal/provider`)
- **Fallback Chain 的工程实现**:可重试错误分类(限流 / 5xx / 超时)、冷却时间、备用链路尝试,以及 Fallback 全过程如何沉淀到日志与 Trace metadata 供前端检索
- **密钥不扩散设计**:业务侧只拿 Local Key,上游 Key 由网关加密保管,Local Key 支持预算、过期、吊销、轮换
- **纯 Go SQLite 栈**:`glebarez/sqlite` + GORM 免 CGO 交叉编译,Wails 桌面 + SQLite 的单二进制交付范式
- **Wails v2 桌面化实践**:前端 Vite 产物经 `sync-embed.mjs` 同步到 Go embed、系统托盘(getlantern/systray 的 vendored fork)、Windows Mutex 单实例、Mica 半透明与原生浮窗
- **React 可观测控制台**:Dashboard 四类生产指标(Provider 健康 / 延迟 / 失败告警 / 备用切换)的数据来源与聚合方式

## 归档备注

- 原 README 已在归档前的最后一个提交(`07393da`)中自带归档声明与替代方案推荐,本归档仅新增本文件,未改动项目源码
- 无 LICENSE 文件;`internal/pricing/model_prices_and_context_window.json`(约 1.4 MB)为内置的模型定价快照,是仓库历史中最大的单体文件
- `data/`、`logs/`、`.learnings/`、`.workbuddy/`、`*.exe` 等本地状态从未入库(子项目 `.gitignore` 覆盖完整),归档树中不含任何运行时产物
- 原仓库远端仅 `master` 一个分支,两个 `codex/*` 本地分支均已合入,53 个 commit 即为全部历史
