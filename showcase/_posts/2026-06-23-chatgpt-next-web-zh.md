---
title: ChatGPT-Next-Web · 跨平台私人 ChatGPT Web UI
date: 2026-06-23 10:00:00 +0800
lang: zh-CN
ref: ChatGPT-Next-Web
categories: [AI / LLM 应用]
tags: [Next.js, React, TypeScript, Tauri, PWA]
description: 跨平台私人 ChatGPT Web UI:一键部署、PWA、桌面客户端、本地会话存储与多语言界面
---

## 概览

ChatGPT Next Web 是一个**跨平台私人 ChatGPT Web UI** 项目:一份代码同时覆盖浏览器、PWA 与桌面客户端
(Tauri),支持一键部署,会话数据默认保存在本地。

它是我接触 LLM 应用工程化的起点项目——不是"调个 API 试试",而是把一个对话产品该有的工程细节
(流式响应、本地持久化、多端分发、主题与多语言)完整走了一遍。

**当前状态**:已归档,仅保留源码与历史学习参考。

## 技术栈

| 层 | 选型 |
| --- | --- |
| 前端框架 | `Next.js` + `React` + `TypeScript` |
| 状态管理 | `Zustand` |
| 样式 | `Sass` |
| 桌面端 | `Tauri`(基于 Rust 的轻量壳) |
| 分发 | `Docker` / `Vercel` 一键部署,`PWA` |

## 架构亮点

- **一份代码、四端分发**:Web、PWA、桌面(Tauri)、Docker 自部署,构建与部署链路高度收敛
- **本地会话存储**:对话数据留在浏览器本地,服务端只做转发,隐私边界清晰
- **多语言界面 + Markdown 渲染**:面向不同语言用户的开箱体验
- **自定义模型配置**:接入点、模型名、Prompt 均可配置,不锁定单一供应商

## 学习收获

这个项目在归档序列里承担"LLM 应用起点"的角色:它示范了一个现代 LLM 前端产品的完整骨架
(流式输出、会话管理、跨端打包),也让我理解了 Tauri 相对 Electron 的取舍。
后续的 AI 类尝试都可以在它的结构上做对照。

## 归档信息

- **归档日期**:2026-06-23
- **源码入口**:[`archived-projects/ChatGPT-Next-Web/`](https://github.com/wychmod/archiving-project/tree/main/archived-projects/ChatGPT-Next-Web)
- **归档说明**:[ARCHIVE.md](https://github.com/wychmod/archiving-project/blob/main/archived-projects/ChatGPT-Next-Web/ARCHIVE.md)
