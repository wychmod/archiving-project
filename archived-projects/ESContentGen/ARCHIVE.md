# 归档说明

## 基本信息

- 原仓库:git@github.com:wychmod/ESContentGen.git
- 归档目录:archived-projects/ESContentGen/
- 归档日期:2026-06-28
- 原始 HEAD:7c440cda29a0700e92ad65033ef6b999d7609131
- 原始分支:main
- 当前状态:已归档,仅保留源码作为历史学习参考(脚手架阶段,业务逻辑尚未展开)

## 项目简介

`ESContentGen` 是一个基于 **Electron** 的桌面应用初始化骨架,从 package.json 的 `keywords` (`electron` / `content` / `generator`) 与 `description` ("一个基于Electron的内容生成应用") 看,定位是"桌面端的内容生成工具",但当前提交只完成了项目脚手架与基础架构,核心业务功能尚未实现。

代码体量小,主要构成:

- **入口层**:`index.js` 引导、`preload.js` 提供版本信息回填
- **主进程**:`src/main/main.js` —— 创建 `BrowserWindow`、加载渲染进程 HTML、根据 `NODE_ENV` 切换是否打开 DevTools
- **渲染进程**:`src/renderer/index.html` + `styles/index.css` + `scripts/renderer.js` —— 一个"开始使用"卡片页面 + 按钮点击日志
- **IPC 通道**:`message-from-renderer` / `message-from-main` 双向通道已在主进程注册,渲染进程通过 `window.electron.send` 调用(注意 `preload.js` 当前**尚未**通过 `contextBridge` 暴露该 API,存在上下文隔离风险)
- **打包配置**:`build/electron-builder.js` —— Windows NSIS / macOS DMG / Linux AppImage & deb 全平台配置

## 技术栈

### 运行时

- Electron `^35.1.4`
- Node.js(由 Electron 内嵌)
- 原生 HTML / CSS / JavaScript(无前端框架)

### 工具链

- electron-builder `^24.6.4` —— 多平台打包(Win NSIS / macOS DMG / Linux AppImage & deb)
- cross-env `^7.0.3` —— 跨平台 `NODE_ENV` 注入
- yarn(以 `yarn.lock` 为包管理证据)

### 工程结构

```
ESContentGen/
├── index.js                # 应用入口,require 主进程
├── preload.js              # 预加载脚本(版本信息回填)
├── package.json
├── yarn.lock
├── .gitignore
├── assets/
│   └── icon.svg            # 仅 SVG 图标(win/mac/linux ico/png/icns 缺失)
├── build/
│   └── electron-builder.js # 打包配置
└── src/
    ├── main/main.js        # 主进程
    └── renderer/
        ├── index.html
        ├── styles/index.css
        └── scripts/renderer.js
```

## 学习重点

- **Electron 三段式架构**:`index.js` → `preload.js` → `src/main/main.js` + `src/renderer/` 的标准分层
- **主进程 / 渲染进程职责划分**:主进程管窗口生命周期,渲染进程管 UI,IPC 管通信
- **IPC 通道设计**:`ipcMain.on('message-from-renderer', ...)` + `event.reply('message-from-main', ...)` 的请求/响应模式
- **`BrowserWindow` 的 `webPreferences`**:本项目 `nodeIntegration: true` + `contextIsolation: false`,是较早期的写法,生产环境应改为 `contextIsolation: true` + `contextBridge.exposeInMainWorld`
- **electron-builder 多平台配置**:Win / macOS / Linux 三套 `target` 与 icon 字段,以及 `directories.output / buildResources` 路径约定
- **`process.env.NODE_ENV` 驱动开发模式**:`yarn dev` 通过 `cross-env` 注入环境变量,主进程据此开启 DevTools

## 归档备注

本仓库仅有一个 squash commit,原始 HEAD `7c440cda29a0700e92ad65033ef6b999d7609131`,无任何后续迭代。

代码处于**脚手架阶段**,页面只有一个"开始使用"按钮,功能完整度接近零,可作为"Electron 项目起步模板"的样本参考,而非可交付的桌面产品。

存在的小问题(供后续复用模板时注意):

- `preload.js` 注释里写了 `contextBridge.exposeInMainWorld` 的写法,但实际并未调用,导致 `renderer.js` 的 `window.electron.send` 在 `contextIsolation: true` 时会失效
- `assets/` 目录只有 `icon.svg`,`electron-builder.js` 中 `win.icon` / `mac.icon` / `linux.icon` 引用的 `icon.ico` / `icon.icns` / `icon.png` 实际不存在,打包会失败
- License 为 **ISC**(子项目独立声明),与本归档仓库根目录的 MIT 不同

无凭证 / 敏感信息需要脱敏。