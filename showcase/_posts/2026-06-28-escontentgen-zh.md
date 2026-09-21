---
title: ESContentGen · Electron 桌面应用骨架
date: 2026-06-28 17:00:00 +0800
lang: zh-CN
ref: ESContentGen
categories: [工具 / 垂直领域系统]
tags: [Electron, Node.js, 桌面应用, electron-builder]
description: Electron 三段式架构骨架:主进程 / 渲染进程 / preload + IPC 双向通道 + 全平台打包配置
---

## 概览

`ESContentGen` 是一个基于 **Electron 的桌面应用初始化骨架**,定位是"桌面端的内容生成工具",
但当前提交只完成了项目脚手架与基础架构,核心业务功能尚未实现——是一个"起步模板"而非可交付产品。

**当前状态**:已归档(脚手架阶段,业务逻辑尚未展开)。

## 技术栈

| 层 | 选型 |
| --- | --- |
| 运行时 | `Electron 35` · `Node.js` |
| 界面 | 原生 `HTML` / `CSS` / `JavaScript`(无前端框架) |
| 打包 | `electron-builder 24`(Win NSIS / macOS DMG / Linux AppImage & deb) |
| 环境 | `cross-env` 注入 `NODE_ENV` |

## 架构亮点

- **三段式标准分层**:入口(`index.js`)→ 预加载(`preload.js`)→ 主进程(`src/main/`)+ 渲染进程(`src/renderer/`)
- **IPC 双向通道**:`message-from-renderer` / `message-from-main` 请求-响应模式
- **全平台打包配置**:electron-builder 的 Win / macOS / Linux 三套 target 与图标字段
- **环境驱动开发模式**:`yarn dev` 注入 `NODE_ENV`,主进程据此决定是否打开 DevTools

## 学习收获

作为骨架项目,它的价值在"把 Electron 工程的最小完备结构固定下来"。同时它保留了两个值得注意的
坑点作为反面教材:`preload.js` 注释里写了 `contextBridge` 用法但实际未调用(上下文隔离开启时会失效)、
`electron-builder` 引用的 ico/icns/png 图标实际缺失(直接打包会失败)。

## 归档信息

- **归档日期**:2026-06-28
- **源码入口**:[`archived-projects/ESContentGen/`](https://github.com/wychmod/archiving-project/tree/main/archived-projects/ESContentGen)
- **归档说明**:[ARCHIVE.md](https://github.com/wychmod/archiving-project/blob/main/archived-projects/ESContentGen/ARCHIVE.md)
