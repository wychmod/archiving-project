---
title: ESContentGen · An Electron Desktop App Skeleton
date: 2026-06-28 16:00:00 +0800
lang: en
ref: ESContentGen
categories: [Tools & Verticals]
tags: [Electron, Node.js, Desktop App, electron-builder]
description: An Electron desktop app skeleton — main/renderer/preload three-tier architecture with a two-way IPC channel and electron-builder packaging for Windows NSIS, macOS DMG, and Linux AppImage & deb; scaffold stage, business logic not yet started
---

## Overview

`ESContentGen` is an **Electron desktop application skeleton**, positioned as a "desktop content generation
tool". The current commit only completes the project scaffold and base architecture — the core business
features were never built. It is a starter template rather than a shippable product.

**Status**: Archived (scaffold stage; business logic never unfolded).

## Project Structure

```
ESContentGen/
├── index.js                # app entry, requires the main process
├── preload.js              # preload script (version info backfill)
├── assets/icon.svg         # SVG icon only (win/mac ico/png/icns missing)
├── build/electron-builder.js
└── src/
    ├── main/main.js        # main process: creates the BrowserWindow, loads the page, toggles DevTools by NODE_ENV
    └── renderer/           # a "get started" card page plus a click log
```

## Tech Stack

| Layer | Choice |
| --- | --- |
| Runtime | `Electron ^35.1.4` · embedded `Node.js` |
| UI | Plain `HTML` / `CSS` / `JavaScript` (no framework) |
| Packaging | `electron-builder ^24.6.4` (Windows NSIS / macOS DMG / Linux AppImage & deb) |
| Environment | `cross-env ^7.0.3` for `NODE_ENV` injection; dependencies locked with `yarn.lock` |

## Architecture Highlights

- **The standard three-tier layout**: entry (`index.js`) → preload (`preload.js`) → main process (`src/main/`) plus renderer (`src/renderer/`); the main process owns the window lifecycle, the renderer owns the UI, IPC owns communication
- **A two-way IPC channel**: the `message-from-renderer` / `message-from-main` request-response pattern, invoked from the renderer via `window.electron.send`
- **Cross-platform packaging config**: Windows, macOS, and Linux targets with their icon fields, plus the `directories.output / buildResources` path conventions in electron-builder
- **Environment-driven dev mode**: `yarn dev` injects `NODE_ENV`, and the main process opens DevTools accordingly

## What It Taught Me

As a skeleton its value is having fixed the minimal complete shape of an Electron project: the three-tier
architecture, IPC channel design, and `BrowserWindow` `webPreferences` all have concrete examples to consult.
It also keeps two instructive pitfalls on record: `preload.js` mentions `contextBridge` in comments but never
calls it, and `nodeIntegration: true` + `contextIsolation: false` is an older style — production should use
`contextIsolation: true` plus `contextBridge.exposeInMainWorld`; and the ico/icns/png icons referenced by
electron-builder are missing, so packaging fails out of the box. The repo has a single squash commit — a sample
"Electron starter template", not a shippable desktop product.

## Archive Info

- **Archived on**: 2026-06-28
- **Source**: [`archived-projects/ESContentGen/`](https://github.com/wychmod/archiving-project/tree/main/archived-projects/ESContentGen)
- **Archive note**: [ARCHIVE.md](https://github.com/wychmod/archiving-project/blob/main/archived-projects/ESContentGen/ARCHIVE.md)
