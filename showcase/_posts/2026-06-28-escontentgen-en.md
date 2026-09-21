---
title: ESContentGen · An Electron Desktop App Skeleton
date: 2026-06-28 16:00:00 +0800
lang: en
ref: ESContentGen
categories: [Tools & Verticals]
tags: [Electron, Node.js, Desktop App, electron-builder]
description: An Electron three-tier skeleton — main process, renderer, and preload with a two-way IPC channel plus cross-platform packaging config
---

## Overview

`ESContentGen` is an **Electron desktop application skeleton**, positioned as a "desktop content generation
tool". The current commit only completes the project scaffold and base architecture — the core business
features were never built. It is a starter template rather than a shippable product.

**Status**: Archived (scaffold stage; business logic never unfolded).

## Tech Stack

| Layer | Choice |
| --- | --- |
| Runtime | `Electron 35` · `Node.js` |
| UI | Plain `HTML` / `CSS` / `JavaScript` (no framework) |
| Packaging | `electron-builder 24` (Windows NSIS / macOS DMG / Linux AppImage & deb) |
| Environment | `cross-env` for `NODE_ENV` injection |

## Architecture Highlights

- **The standard three-tier layout**: entry (`index.js`) → preload (`preload.js`) → main process (`src/main/`) plus renderer (`src/renderer/`)
- **A two-way IPC channel**: the `message-from-renderer` / `message-from-main` request-response pattern
- **Cross-platform packaging config**: Windows, macOS, and Linux targets with their icon fields in electron-builder
- **Environment-driven dev mode**: `yarn dev` injects `NODE_ENV`, and the main process opens DevTools accordingly

## What It Taught Me

As a skeleton its value is having fixed the minimal complete shape of an Electron project. It also keeps two
instructive pitfalls on record: `preload.js` mentions `contextBridge` in comments but never calls it (the API
breaks with context isolation enabled), and the ico/icns/png icons referenced by electron-builder are missing
(packaging fails out of the box).

## Archive Info

- **Archived on**: 2026-06-28
- **Source**: [`archived-projects/ESContentGen/`](https://github.com/wychmod/archiving-project/tree/main/archived-projects/ESContentGen)
- **Archive note**: [ARCHIVE.md](https://github.com/wychmod/archiving-project/blob/main/archived-projects/ESContentGen/ARCHIVE.md)
