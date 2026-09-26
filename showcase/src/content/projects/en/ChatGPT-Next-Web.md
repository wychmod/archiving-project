---
ref: ChatGPT-Next-Web
lang: en
title: "ChatGPT-Next-Web · A Cross-Platform Private ChatGPT Web UI"
name: "ChatGPT-Next-Web"
subtitle: "A Cross-Platform Private ChatGPT Web UI"
description: "A cross-platform private ChatGPT web UI built on Next.js + React + TypeScript — one-click deploy, PWA, Tauri desktop client, local session storage, i18n, and custom model config"
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
## Overview

ChatGPT Next Web is a **cross-platform private ChatGPT web UI**: a single codebase covering the browser,
PWA, and a desktop client (Tauri), with one-click deployment and conversation data kept locally.

It is where my LLM application engineering started — not just "call an API and see", but a full pass over the
engineering details a chat product actually needs: streaming responses, local persistence, multi-target
distribution, theming, and internationalization.

**Status**: Archived — source and commit history kept for reference.

## Core Capabilities

| Module | Capability |
| --- | --- |
| 💬 Chat core | Streaming conversation over the OpenAI API, with custom model parameters and API key config |
| 🖥️ Desktop client | `src-tauri/` provides a Tauri (Rust) shell that packages native Windows / macOS / Linux apps |
| 📱 PWA support | Progressive Web App, installable to desktop and mobile home screens |
| 🔐 Local-first | Session data lives in browser LocalStorage — no server-side storage, no account system |
| 🌍 Multilingual UI | Built-in language switching (Simplified Chinese included; `README_CN.md` kept with the snapshot) |
| 📝 Markdown rendering | Full Markdown rendering and code highlighting for conversations |
| 🎭 Role presets | Built-in prompt templates and mask personas, synced via `scripts/fetch-prompts.mjs` |
| 🐳 Containerized | `Dockerfile` and `docker-compose.yml` included — self-hosting works out of the box |
| ▲ Vercel deploy | `vercel.json` ready; fork and one-click deploy your own instance |

## Tech Stack

| Layer | Choice |
| --- | --- |
| Frontend | `Next.js ^13.4` (App Router, SSR / static export) + `React ^18.2` + `TypeScript 5.2` |
| State | `Zustand ^4.3` (lightweight stores for sessions / config / masking) |
| Styling | `Sass` |
| Desktop | `Tauri` (a lightweight Rust-based shell; `tauri.conf.json` declares window and build targets) |
| Distribution | `Docker` / `Vercel` one-click deploy, `PWA`; dependencies locked with `yarn` |

## Architecture Highlights

- **One codebase, four targets**: Web, PWA, desktop (Tauri), and self-hosted Docker — build and deploy paths stay converged
- **Local session storage**: conversations live in the browser; the server only relays requests, keeping the privacy boundary clear
- **Multilingual UI with Markdown rendering**: a usable out-of-the-box experience for non-English users
- **Configurable model endpoints**: endpoint, model name, and prompt are all configurable, with no vendor lock-in
- **App Router engineering pattern**: `app/` hosts both entry points and API routes, pages and endpoints evolving in one repo

## What It Taught Me

In the archive this project plays the role of "the starting point for LLM applications": it demonstrates the
complete skeleton of a modern LLM frontend (streaming output, session management, cross-platform packaging),
and it taught me the trade-offs of Tauri against Electron — a Rust shell buys small size and native performance.
This is a personal fork snapshot of upstream `Yidadaa/ChatGPT-Next-Web` at its 2023-12 baseline, with no
secondary development; all capability descriptions come from the real code in the snapshot. Later AI experiments
can be compared against its structure.

## Archive Info

- **Archived on**: 2026-06-23
- **Source**: [`archived-projects/ChatGPT-Next-Web/`](https://github.com/wychmod/archiving-project/tree/main/archived-projects/ChatGPT-Next-Web)
- **Archive note**: [ARCHIVE.md](https://github.com/wychmod/archiving-project/blob/main/archived-projects/ChatGPT-Next-Web/ARCHIVE.md)
