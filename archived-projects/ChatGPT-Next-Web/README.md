<div align="center">

# 💬 ChatGPT Next Web

### 跨平台私人 ChatGPT Web UI · 私有化部署学习快照

[![Status](https://img.shields.io/badge/status-archive-lightgrey.svg)](#-归档状态)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](#-license)
[![Next.js](https://img.shields.io/badge/next.js-13.4-black.svg?logo=nextdotjs&logoColor=white)](https://nextjs.org)
[![React](https://img.shields.io/badge/react-18.2-61DAFB.svg?logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/typescript-5.2-3178C6.svg?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Zustand](https://img.shields.io/badge/zustand-4.3-orange.svg)](https://github.com/pmndrs/zustand)
[![Tauri](https://img.shields.io/badge/tauri-desktop-24C8D8.svg?logo=tauri&logoColor=white)](https://tauri.app)

**一站式体验"现代全栈 Web + 桌面端"工程范式的完整参照系:Next.js App Router、Zustand 状态管理、Tauri 桌面打包、Docker / Vercel 双部署通道。**

[功能](#-核心能力) · [技术栈](#-技术栈) · [快速开始](#-快速开始) · [结构](#-项目结构) · [归档状态](#-归档状态)

</div>

---

## 📑 目录

- [项目概述](#-项目概述)
- [核心能力](#-核心能力)
- [技术栈](#-技术栈)
- [项目结构](#-项目结构)
- [快速开始](#-快速开始)
- [部署通道](#-部署通道)
- [学习价值](#-学习价值)
- [归档状态](#-归档状态)
- [License](#-license)

---

## 📖 项目概述

本目录是知名开源项目 **ChatGPT-Next-Web**(上游 `Yidadaa/ChatGPT-Next-Web`)的个人 fork 快照,归档目的为**学习其生产级工程实践**,并保留一份可私有化部署的完整源码。

| 维度 | 说明 |
| --- | --- |
| **产品形态** | Web 应用(Next.js) + 桌面客户端(Tauri) 双形态 |
| **目标场景** | 私人部署的 ChatGPT 网页客户端,支持自备 API Key |
| **隐私设计** | 数据全部存储在浏览器本地,不依赖服务端数据库 |
| **部署通道** | Vercel 一键部署 / Docker 自托管 / 静态导出三选一 |
| **工程亮点** | App Router、Zustand 轻量状态管理、Tauri(Rust) 桌面壳 |

> 本仓库为 fork 快照,代码以上游 2023-12 版本为基线,未做二次开发;功能描述均来自快照内真实代码。

---

## ✨ 核心能力

| 模块 | 能力 |
| --- | --- |
| 💬 **对话核心** | 基于 OpenAI API 的流式对话,支持自定义模型参数与 API Key 配置 |
| 🖥️ **桌面客户端** | `src-tauri/` 提供 Tauri(Rust) 桌面壳,可打包 Windows / macOS / Linux 原生应用 |
| 📱 **PWA 支持** | 渐进式 Web 应用,可安装到桌面与移动端主屏 |
| 🔐 **本地优先** | 会话数据存储于浏览器本地(LocalStorage),无服务端存储、无账号体系 |
| 🌍 **多语言界面** | 内置多语言切换(含简体中文,见 `README_CN.md`) |
| 📝 **Markdown 渲染** | 对话内容完整 Markdown 渲染、代码高亮 |
| 🎭 **角色预设** | 内置 Prompt 模板与面具角色体系(`scripts/fetch-prompts.mjs` 同步预设数据) |
| 🐳 **容器化** | 提供 `Dockerfile` 与 `docker-compose.yml`,开箱即可自托管 |
| ▲ **Vercel 部署** | `vercel.json` 就绪, forks 后一键部署自有实例 |

---

## 🧱 技术栈

### Web 端

| 类别 | 选型 | 版本 | 用途 |
| --- | --- | --- | --- |
| 元框架 | Next.js | ^13.4.9 | App Router、SSR / 静态导出 |
| UI 框架 | React | ^18.2.0 | 组件体系 |
| 语言 | TypeScript | 5.2.2 | 类型安全 |
| 状态管理 | Zustand | ^4.3.8 | 轻量 Store(会话/配置/ masking) |
| 样式 | Sass | — | 主题与样式组织 |

### 桌面端

| 类别 | 选型 | 用途 |
| --- | --- | --- |
| 框架 | Tauri(Rust) | 将 Web 应用打包为原生桌面客户端 |
| 配置 | `tauri.conf.json` | 窗口、图标、打包目标声明 |

### 部署设施

| 类别 | 选型 |
| --- | --- |
| 容器 | Dockerfile + docker-compose.yml |
| Serverless | vercel.json(Vercel 平台) |
| 包管理 | yarn(yarn.lock 锁定) |

---

## 📂 项目结构

```
ChatGPT-Next-Web/
├── README.md               # 本文件(归档说明版)
├── README_CN.md            # 上游原版中文说明(随快照保留)
├── package.json            # 脚本与依赖清单
├── next.config.mjs         # Next.js 配置
├── tsconfig.json
├── vercel.json             # Vercel 部署配置
├── Dockerfile              # Docker 镜像构建
├── docker-compose.yml      # 容器编排
│
├── app/                    # Next.js App Router 入口与 API 路由
├── src-tauri/              # Tauri 桌面客户端(Rust)
│   ├── Cargo.toml          # Rust 依赖
│   ├── tauri.conf.json     # 桌面端配置
│   └── src/                # Rust 源码
├── public/                 # 静态资源(PWA 图标等)
├── docs/                   # 项目文档与图片
└── scripts/                # 预设同步、代理初始化等辅助脚本
```

---

## 🚀 快速开始

> ⚠️ **归档快照**:依赖版本停留在 2023 年底(Next.js 13.4 / React 18.2),仅供历史学习参考;运行需自备 OpenAI API Key。

```bash
# 1) 安装依赖(Node.js 18+)
yarn install

# 2) 本地开发
yarn dev                 # http://localhost:3000

# 3) 生产构建(standalone 模式)
yarn build
yarn start

# 4) 桌面客户端(需 Rust 工具链)
yarn app:dev             # Tauri 开发模式
yarn app:build           # 打包桌面应用
```

在「设置」中填入自备的 OpenAI API Key 即可开始对话。

---

## 🐳 部署通道

| 通道 | 方式 | 说明 |
| --- | --- | --- |
| **Vercel** | fork 后在 Vercel 导入仓库 | `vercel.json` 已就绪,零配置部署 |
| **Docker** | `docker-compose up -d` | 自托管,适合有服务器的场景 |
| **静态导出** | `yarn export` | 纯静态产物,可托管到任意静态服务 |

---

## 💡 学习价值

- **Next.js 13 App Router 的真实工程用法**:服务端 API 路由(openai 代理)与客户端组件的边界划分
- **Zustand 状态管理范式**:相比 Redux 更轻的 Store 组织方式,适合中小型 SPA
- **Tauri 桌面化路径**:同一套 Web 代码如何被 Rust 壳复用为三平台桌面应用
- **隐私优先架构**:无数据库、无账号体系的纯客户端数据持久化设计
- **多通道部署工程化**:一份代码同时适配 Vercel / Docker / 静态导出的配置技巧

---

## 🗄️ 归档状态

| 项 | 内容 |
| --- | --- |
| 原仓库 | `git@github.com:wychmod/ChatGPT-Next-Web.git`(fork 自 Yidadaa/ChatGPT-Next-Web) |
| 归档日期 | 2026-06-23 |
| 快照基线 | 2023-12-06 "Initial commit" |
| 当前状态 | **已归档,只读快照**,仅保留源码和历史学习参考 |

详细档案(导入提交、技术栈明细)见 [`ARCHIVE.md`](./ARCHIVE.md);上游原版说明见 [`README_CN.md`](./README_CN.md)。

---

## 📜 License

MIT License,随上游项目声明(见 [`LICENSE`](./LICENSE))。本项目仅用于学习与历史归档参考。
