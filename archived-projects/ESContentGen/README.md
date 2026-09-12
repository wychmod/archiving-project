<div align="center">

# ⚡ ESContentGen

### 基于 Electron 的跨平台桌面应用骨架

[![Status](https://img.shields.io/badge/status-archive-lightgrey.svg)](#-归档状态)
[![Electron](https://img.shields.io/badge/electron-35-47848F.svg?logo=electron&logoColor=white)](https://www.electronjs.org)
[![Node](https://img.shields.io/badge/node.js-runtime-339933.svg?logo=nodedotjs&logoColor=white)](https://nodejs.org)
[![electron-builder](https://img.shields.io/badge/electron--builder-24-3A80F7.svg)](https://www.electron.build)
[![License](https://img.shields.io/badge/license-ISC-lightgrey.svg)](#-license)

**一套三进程分层清晰、全平台打包配置就绪的 Electron 起步模板:主进程 / 渲染进程 / preload 三段式架构 + IPC 双向通道 + Win / macOS / Linux 三端构建声明。**

[架构](#️-三进程架构) · [技术栈](#-技术栈) · [快速开始](#-快速开始) · [打包](#-全平台打包) · [已知限制](#️-已知限制) · [归档状态](#-归档状态)

</div>

---

## 📑 目录

- [项目概述](#-项目概述)
- [三进程架构](#️-三进程架构)
- [核心能力](#-核心能力)
- [技术栈](#-技术栈)
- [项目结构](#-项目结构)
- [快速开始](#-快速开始)
- [全平台打包](#-全平台打包)
- [学习价值](#-学习价值)
- [已知限制](#️-已知限制)
- [归档状态](#-归档状态)
- [License](#-license)

---

## 📖 项目概述

`ESContentGen`(Electron **S**hell + **Content** **Gen**erator)定位是"桌面端的内容生成工具"(见 `package.json` 的 `keywords` 与 `description`),当前提交完成了**完整的工程脚手架与基础架构**,业务逻辑尚未展开。

它的价值不在功能体量,而在于**用最少的代码(约 10 个文件)把 Electron 应用该有的工程要素全部摆到了正确的位置**——非常适合作为新桌面项目的起步模板,或作为理解 Electron 进程模型的对照样本。

| 维度 | 说明 |
| --- | --- |
| **产品形态** | Windows / macOS / Linux 桌面应用(Electron) |
| **当前阶段** | 脚手架完成,业务功能未实现 |
| **代码体量** | 入口 + preload + 主进程 + 渲染进程,共约 10 个文件 |
| **渲染层** | 原生 HTML / CSS / JavaScript,零前端框架依赖 |
| **最佳用途** | Electron 项目起步模板 / 进程模型教学样本 |

---

## 🏗️ 三进程架构

```
┌──────────────────────────────────────────────────────┐
│  index.js(应用入口)                                  │
│  require 主进程模块,启动 Electron 生命周期            │
└────────────────────────┬─────────────────────────────┘
                         ▼
┌──────────────────────────────────────────────────────┐
│  src/main/main.js(主进程)                            │
│  ├── 创建 BrowserWindow(webPreferences 配置)         │
│  ├── 加载 src/renderer/index.html                    │
│  └── 依据 NODE_ENV 决定是否打开 DevTools              │
│                                                      │
│  IPC(主进程侧)                                       │
│  ├── ipcMain.on('message-from-renderer', ...)        │
│  └── event.reply('message-from-main', ...)           │
└────────────────────────┬─────────────────────────────┘
                         │  ipcRenderer.send / on
                         ▼
┌──────────────────────────────────────────────────────┐
│  src/renderer/(渲染进程)                              │
│  ├── index.html      "开始使用"卡片页面                │
│  ├── styles/index.css 页面样式                        │
│  └── scripts/renderer.js  按钮事件 → IPC 发送          │
└──────────────────────────────────────────────────────┘

preload.js — 预加载脚本,负责版本信息回填
```

---

## ✨ 核心能力

| 模块 | 能力 |
| --- | --- |
| 🪟 **窗口生命周期** | `BrowserWindow` 创建、加载渲染层、按环境开关 DevTools |
| 🔁 **IPC 双向通道** | `message-from-renderer` / `message-from-main` 请求-响应式通道已在主进程注册 |
| 🌍 **环境切换** | `cross-env` 注入 `NODE_ENV`,`yarn dev` 自动开启 DevTools |
| 📦 **全平台打包声明** | electron-builder 配置 Windows NSIS / macOS DMG / Linux AppImage & deb |
| 🖼️ **版本信息回填** | preload 脚本读取进程版本并回显到页面 |

---

## 🧱 技术栈

| 类别 | 选型 | 版本 | 用途 |
| --- | --- | --- | --- |
| 运行时 | Electron | ^35.1.4 | 桌面应用框架(Chromium + Node) |
| 打包 | electron-builder | ^24.6.4 | 三平台安装包构建 |
| 环境注入 | cross-env | ^7.0.3 | 跨平台 `NODE_ENV` 设置 |
| 渲染层 | 原生 HTML / CSS / JS | — | 无框架,保持模板轻量 |
| 包管理 | yarn | yarn.lock | 依赖锁定 |

---

## 📂 项目结构

```
ESContentGen/
├── index.js                # 应用入口,require 主进程
├── preload.js              # 预加载脚本(版本信息回填)
├── package.json            # scripts: dev / start / build / pack
├── yarn.lock
├── .gitignore
│
├── assets/
│   └── icon.svg            # SVG 图标(win/mac/linux 位图图标缺失,见已知限制)
│
├── build/
│   └── electron-builder.js # 三平台打包配置
│
└── src/
    ├── main/
    │   └── main.js         # 主进程:窗口 + IPC 注册
    └── renderer/
        ├── index.html
        ├── styles/index.css
        └── scripts/renderer.js
```

---

## 🚀 快速开始

> ⚠️ **归档快照**:仅供历史学习参考;复用为模板时请先阅读下方[已知限制](#️-已知限制)。

```bash
# 1) 安装依赖
yarn install

# 2) 开发模式(自动打开 DevTools)
yarn dev

# 3) 直接启动
yarn start

# 4) 打包安装包(需先补齐图标文件,见已知限制)
yarn build     # 按 build/electron-builder.js 输出三平台安装包
yarn pack      # 仅打包目录(不生成安装包),用于快速验证
```

---

## 📦 全平台打包

`build/electron-builder.js` 已声明三平台目标:

| 平台 | Target | 说明 |
| --- | --- | --- |
| Windows | NSIS | 标准 Windows 安装向导 |
| macOS | DMG | 磁盘映像分发 |
| Linux | AppImage + deb | 通用镜像与 Debian 系安装包 |

`directories.output / buildResources` 路径约定已按 electron-builder 社区惯例配置,新增图标或签名配置时按既有字段扩展即可。

---

## 💡 学习价值

- **Electron 标准分层**:`index.js → preload.js → 主进程 + 渲染进程` 的三段式组织,一个模板看清职责边界
- **IPC 请求-响应模式**:`ipcMain.on` + `event.reply` 的双向通信写法
- **`webPreferences` 的时代演进**:本项目使用 `nodeIntegration: true` + `contextIsolation: false` 的早期写法,与当前主流的 `contextIsolation: true` + `contextBridge.exposeInMainWorld` 形成鲜明对照——这正是它作为教学样本的价值
- **electron-builder 配置结构**:三平台 target、icon 字段、输出目录约定
- **环境驱动的开发体验**:`cross-env` + `NODE_ENV` 控制 DevTools 开关的最小实现

---

## ⚠️ 已知限制

复用此模板前需要注意以下真实存在的问题(均可在代码中验证):

| # | 问题 | 影响 |
| --- | --- | --- |
| 1 | `preload.js` 注释中写了 `contextBridge.exposeInMainWorld` 用法但**并未实际调用**,`renderer.js` 依赖的 `window.electron.send` 在 `contextIsolation: true` 下会失效 | 上下文隔离风险 |
| 2 | `assets/` 仅有 `icon.svg`,而 `electron-builder.js` 中 `win.icon / mac.icon / linux.icon` 引用的 `icon.ico / .icns / .png` **实际不存在** | 直接执行 `yarn build` 会打包失败 |
| 3 | 业务功能未实现,页面仅一个"开始使用"按钮 | 定位为模板,非可交付产品 |

---

## 🗄️ 归档状态

| 项 | 内容 |
| --- | --- |
| 原仓库 | `git@github.com:wychmod/ESContentGen.git` |
| 归档日期 | 2026-06-28 |
| 快照基线 | main 分支,commit `7c440cd`(唯一提交) |
| 当前状态 | **已归档,只读快照**,仅保留源码作为历史学习参考 |

详细档案(逐文件说明、学习重点)见 [`ARCHIVE.md`](./ARCHIVE.md)。

---

## 📜 License

ISC License(子项目独立声明,与归档仓库根目录的 MIT 不同)。本项目仅用于学习与历史归档参考。
