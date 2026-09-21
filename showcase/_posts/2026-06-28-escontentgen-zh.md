---
title: ESContentGen · Electron 桌面应用骨架
date: 2026-06-28 17:00:00 +0800
lang: zh-CN
ref: ESContentGen
categories: [工具 / 垂直领域系统]
tags: [Electron, Node.js, 桌面应用, electron-builder]
description: Electron 桌面应用初始化骨架:主进程/渲染进程/preload 三段式架构 + IPC 双向通道,electron-builder 全平台打包(Win NSIS / macOS DMG / Linux AppImage & deb),脚手架阶段、业务逻辑尚未展开
---

## 概览

`ESContentGen` 是一个基于 **Electron 的桌面应用初始化骨架**,定位是"桌面端的内容生成工具",
但当前提交只完成了项目脚手架与基础架构,核心业务功能尚未实现——是一个"起步模板"而非可交付产品。

**当前状态**:已归档(脚手架阶段,业务逻辑尚未展开)。

## 工程结构

```
ESContentGen/
├── index.js                # 应用入口,require 主进程
├── preload.js              # 预加载脚本(版本信息回填)
├── assets/icon.svg         # 仅 SVG 图标(win/mac/linux ico/png/icns 缺失)
├── build/electron-builder.js
└── src/
    ├── main/main.js        # 主进程:创建 BrowserWindow、加载页面、按 NODE_ENV 开关 DevTools
    └── renderer/           # "开始使用"卡片页 + 按钮点击日志
```

## 技术栈

| 层 | 选型 |
| --- | --- |
| 运行时 | `Electron ^35.1.4` · 内嵌 `Node.js` |
| 界面 | 原生 `HTML` / `CSS` / `JavaScript`(无前端框架) |
| 打包 | `electron-builder ^24.6.4`(Win NSIS / macOS DMG / Linux AppImage & deb) |
| 环境 | `cross-env ^7.0.3` 注入 `NODE_ENV`;`yarn.lock` 锁定依赖 |

## 架构亮点

- **三段式标准分层**:入口(`index.js`)→ 预加载(`preload.js`)→ 主进程(`src/main/`)+ 渲染进程(`src/renderer/`),主进程管窗口生命周期,渲染进程管 UI,IPC 管通信
- **IPC 双向通道**:`message-from-renderer` / `message-from-main` 请求-响应模式,渲染进程通过 `window.electron.send` 调用
- **全平台打包配置**:electron-builder 的 Win / macOS / Linux 三套 target 与图标字段,以及 `directories.output / buildResources` 路径约定
- **环境驱动开发模式**:`yarn dev` 注入 `NODE_ENV`,主进程据此决定是否打开 DevTools

## 学习收获

作为骨架项目,它的价值在"把 Electron 工程的最小完备结构固定下来":三段式架构、IPC 通道设计、
`BrowserWindow` 的 `webPreferences` 都有实例可查。同时它保留了两个值得注意的坑点作为反面教材:
`preload.js` 注释里写了 `contextBridge` 用法但实际未调用,而 `nodeIntegration: true` +
`contextIsolation: false` 是较早期写法,生产环境应改为 `contextIsolation: true` +
`contextBridge.exposeInMainWorld`;`electron-builder` 引用的 ico/icns/png 图标实际缺失,直接打包会失败。
仓库仅有一个 squash commit,是"Electron 项目起步模板"的样本,而非可交付的桌面产品。

## 归档信息

- **归档日期**:2026-06-28
- **源码入口**:[`archived-projects/ESContentGen/`](https://github.com/wychmod/archiving-project/tree/main/archived-projects/ESContentGen)
- **归档说明**:[ARCHIVE.md](https://github.com/wychmod/archiving-project/blob/main/archived-projects/ESContentGen/ARCHIVE.md)
