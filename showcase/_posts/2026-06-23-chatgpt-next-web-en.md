---
title: ChatGPT-Next-Web · A Cross-Platform Private ChatGPT Web UI
date: 2026-06-23 09:00:00 +0800
lang: en
ref: ChatGPT-Next-Web
categories: [AI / LLM]
tags: [Next.js, React, TypeScript, Tauri, PWA]
description: A cross-platform private ChatGPT web UI with one-click deploy, PWA, desktop client, and local session storage
---

## Overview

ChatGPT Next Web is a **cross-platform private ChatGPT web UI**: a single codebase covering the browser,
PWA, and a desktop client (Tauri), with one-click deployment and conversation data kept locally.

It is where my LLM application engineering started — not just "call an API and see", but a full pass over the
engineering details a chat product actually needs: streaming responses, local persistence, multi-target
distribution, theming, and internationalization.

**Status**: Archived — source and commit history kept for reference.

## Tech Stack

| Layer | Choice |
| --- | --- |
| Frontend | `Next.js` + `React` + `TypeScript` |
| State | `Zustand` |
| Styling | `Sass` |
| Desktop | `Tauri` (a lightweight Rust-based shell) |
| Distribution | `Docker` / `Vercel` one-click deploy, `PWA` |

## Architecture Highlights

- **One codebase, four targets**: Web, PWA, desktop (Tauri), and self-hosted Docker — build and deploy paths stay converged
- **Local session storage**: conversations live in the browser; the server only relays requests, keeping the privacy boundary clear
- **Multilingual UI with Markdown rendering**: a usable out-of-the-box experience for non-English users
- **Configurable model endpoints**: endpoint, model name, and prompt are all configurable, with no vendor lock-in

## What It Taught Me

In the archive this project plays the role of "the starting point for LLM applications": it demonstrates the
complete skeleton of a modern LLM frontend (streaming output, session management, cross-platform packaging),
and it taught me the trade-offs of Tauri against Electron. Later AI experiments can be compared against its structure.

## Archive Info

- **Archived on**: 2026-06-23
- **Source**: [`archived-projects/ChatGPT-Next-Web/`](https://github.com/wychmod/archiving-project/tree/main/archived-projects/ChatGPT-Next-Web)
- **Archive note**: [ARCHIVE.md](https://github.com/wychmod/archiving-project/blob/main/archived-projects/ChatGPT-Next-Web/ARCHIVE.md)
