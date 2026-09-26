---
ref: ChatGPT-Next-Web
lang: zh
title: "ChatGPT-Next-Web · 跨平台私人 ChatGPT Web UI"
name: "ChatGPT-Next-Web"
subtitle: "跨平台私人 ChatGPT Web UI"
description: "基于 Next.js + React + TypeScript 的跨平台私人 ChatGPT Web UI:一键部署、PWA、Tauri 桌面客户端、本地会话存储、多语言界面与自定义模型配置"
category: ai-llm
stack:
  - nextjs
  - react
  - typescript
  - tauri
  - pwa
status: archived
scrubbed: false
repoCleared: false
archivedAt: 2026-06-23
---
## 概览

ChatGPT Next Web 是一个**跨平台私人 ChatGPT Web UI** 项目:一份代码同时覆盖浏览器、PWA 与桌面客户端
(Tauri),支持一键部署,会话数据默认保存在本地。

它是我接触 LLM 应用工程化的起点项目——不是"调个 API 试试",而是把一个对话产品该有的工程细节
(流式响应、本地持久化、多端分发、主题与多语言)完整走了一遍。

**当前状态**:已归档,仅保留源码与历史学习参考。

## 核心能力

| 模块 | 能力 |
| --- | --- |
| 💬 对话核心 | 基于 OpenAI API 的流式对话,支持自定义模型参数与 API Key 配置 |
| 🖥️ 桌面客户端 | `src-tauri/` 提供 Tauri(Rust) 桌面壳,可打包 Windows / macOS / Linux 原生应用 |
| 📱 PWA 支持 | 渐进式 Web 应用,可安装到桌面与移动端主屏 |
| 🔐 本地优先 | 会话数据存于浏览器 LocalStorage,无服务端存储、无账号体系 |
| 🌍 多语言界面 | 内置多语言切换(含简体中文,随快照保留 `README_CN.md`) |
| 📝 Markdown 渲染 | 对话内容完整 Markdown 渲染、代码高亮 |
| 🎭 角色预设 | 内置 Prompt 模板与面具角色体系,预设数据由 `scripts/fetch-prompts.mjs` 同步 |
| 🐳 容器化 | 提供 `Dockerfile` 与 `docker-compose.yml`,开箱即可自托管 |
| ▲ Vercel 部署 | `vercel.json` 就绪,fork 后一键部署自有实例 |

## 技术栈

| 层 | 选型 |
| --- | --- |
| 前端框架 | `Next.js ^13.4`(App Router、SSR / 静态导出)+ `React ^18.2` + `TypeScript 5.2` |
| 状态管理 | `Zustand ^4.3`(轻量 Store:会话 / 配置 / masking) |
| 样式 | `Sass` |
| 桌面端 | `Tauri`(基于 Rust 的轻量壳,`tauri.conf.json` 声明窗口与打包目标) |
| 分发 | `Docker` / `Vercel` 一键部署,`PWA`;包管理 `yarn` 锁定依赖 |

## 架构亮点

- **一份代码、四端分发**:Web、PWA、桌面(Tauri)、Docker 自部署,构建与部署链路高度收敛
- **本地会话存储**:对话数据留在浏览器本地,服务端只做转发,隐私边界清晰
- **多语言界面 + Markdown 渲染**:面向不同语言用户的开箱体验
- **自定义模型配置**:接入点、模型名、Prompt 均可配置,不锁定单一供应商
- **App Router 工程范式**:`app/` 承载入口与 API 路由,页面与接口同仓演进

## 学习收获

这个项目在归档序列里承担"LLM 应用起点"的角色:它示范了一个现代 LLM 前端产品的完整骨架
(流式输出、会话管理、跨端打包),也让我理解了 Tauri 相对 Electron 的取舍——用 Rust 壳换来
小体积与原生性能。归档的是上游 `Yidadaa/ChatGPT-Next-Web` 2023-12 版本的个人 fork 快照,
未做二次开发,功能描述均来自快照内真实代码。后续的 AI 类尝试都可以在它的结构上做对照。

## 归档信息

- **归档日期**:2026-06-23
- **源码入口**:[`archived-projects/ChatGPT-Next-Web/`](https://github.com/wychmod/archiving-project/tree/main/archived-projects/ChatGPT-Next-Web)
- **归档说明**:[ARCHIVE.md](https://github.com/wychmod/archiving-project/blob/main/archived-projects/ChatGPT-Next-Web/ARCHIVE.md)
