---
ref: TokenBridge
lang: zh
title: "TokenBridge · 本地 AI 网关与路由控制平面"
name: "TokenBridge"
subtitle: "本地 AI 网关与路由控制平面"
description: "本地 AI 网关管理平台:OpenAI / Anthropic 双协议兼容接口,Local Key 密钥隔离,模型别名 + Provider/Fallback Chain 路由与自动故障转移,React 可观测控制台,Wails 桌面版单二进制分发"
category: ai-llm
stack:
  - go
  - wails
  - react
  - typescript
  - sqlite
  - ai-gateway
status: archived
scrubbed: false
repoCleared: true
archivedAt: 2026-09-22
commitCount: 53
---
## 概览

`TokenBridge`(原名 `localgateway`)是一个面向本地部署、团队内网和私有化场景的 **AI 网关管理平台**,
定位为「本地 AI 网关 + 路由控制平面 + 可观测控制台 + 桌面可分发」的统一体:

- **双协议网关**:同时提供 OpenAI 兼容(`/v1/chat/completions`)与 Anthropic 兼容(`/v1/messages`)接口,
  支持非流式与最小 SSE 流式透传
- **本地密钥隔离**:客户端只持有 Local Key,上游 Provider Key 由网关统一保管(AES-256-GCM 加密存储),不向业务应用扩散
- **规则化路由**:模型别名映射、通配规则、Provider 优先级、Provider Chain 与 Fallback Chain,支持路由模拟
- **可观测控制台**:React + TypeScript 管理后台,含 Dashboard KPI、7 日费用趋势、失败告警、备用切换分析与 CSV 导出

它与归档仓库中的 [ChatGPT-Next-Web](/projects/ChatGPT-Next-Web/) 同属 AI 应用生态,
但视角互补:一个是面向终端用户的 LLM Web UI,一个是在应用与上游 Provider 之间的治理层。

**当前状态**:已归档(owner 于 2026-09 主动停止开发,原 README 已推荐 CC Switch / TokenTracker 替代方案)。
完整 53 个 commit 导入,原仓库已清空,本归档为唯一保留副本。

## 技术栈

| 层 | 选型 |
| --- | --- |
| 后端 | `Go 1.22` · `chi v5` · `zerolog` · `viper` |
| 存储 | `GORM` + `glebarez/sqlite`(纯 Go 驱动,免 CGO) |
| 网关协议 | OpenAI Chat Completions · Anthropic Claude Messages · SSE 透传 |
| 管理后台 | `React 18` · `TypeScript 5.6` · `Vite 5` · `Recharts` · `Zustand` |
| 桌面运行时 | `Wails v2` · WebView2 · 系统托盘(`third_party/systray` vendored fork) |
| CI/CD | GitHub Actions(Windows exe + macOS app 双端构建) |

## 架构亮点

- **Fallback Chain 的工程实现**:上游 `429`/`5xx`/网络类错误时按备用链路自动切换,可重试错误分类、冷却时间、
  备用尝试全过程沉淀到请求日志与 Trace metadata(`X-Request-Trace-Id`),供 Dashboard 与 Logs 页面检索
- **密钥不扩散设计**:业务侧只拿 Local Key(支持预算、过期、吊销、轮换),上游 Key 网关加密保管,
  请求链路为「鉴权 → 路由 → 转发 → Fallback → 用量落库 → Trace 返回」的清晰分层
- **桌面单二进制交付**:前端 Vite 产物经 `sync-embed.mjs` 同步到 Go embed,Wails 桌面版 + Windows 托盘常驻版,
  Windows Mutex 单实例、开机自启、AI 统计浮窗,纯 Go SQLite 驱动免 CGO 交叉编译

## 学习收获

这个项目展示了「AI 接入层」的完整治理形态:当多个工具、多个项目都要访问大模型 API 时,
一个具备路由、密钥管理、故障转移与可观测能力的本地网关,比在每处代码里散落 Provider Key 和重试逻辑可控得多。
理解它的请求链路分层之后,再看 Litellm、OneAPI 这类成熟网关,就能对上每一层在解决什么问题。

## 归档信息

- **归档日期**:2026-09-22(完整 53 个 commit 导入,自 `b8174d2` 初始化起至 `07393da` 归档标记止)
- **源码入口**:[`archived-projects/TokenBridge/`](https://github.com/wychmod/archiving-project/tree/main/archived-projects/TokenBridge)
- **归档说明**:[ARCHIVE.md](https://github.com/wychmod/archiving-project/blob/main/archived-projects/TokenBridge/ARCHIVE.md)
