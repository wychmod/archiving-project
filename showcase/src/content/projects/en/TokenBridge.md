---
ref: TokenBridge
lang: en
title: "TokenBridge · Local AI Gateway & Routing Control Plane"
name: "TokenBridge"
subtitle: "Local AI Gateway & Routing Control Plane"
description: "A local AI gateway management platform — OpenAI / Anthropic compatible endpoints, Local Key credential isolation, model-alias routing with Provider/Fallback Chains and automatic failover, a React observability console, and Wails desktop distribution as a single binary"
category: ai-llm
stack:
  - go
  - wails
  - react
  - typescript
  - sqlite
  - ai-gateway
status: archived
scrubbed: false
repoCleared: true
archivedAt: 2026-09-22
commitCount: 53
---
## Overview

`TokenBridge` (originally `localgateway`) is an **AI gateway management platform** for local deployment,
team intranets, and private environments — a unified combination of *local AI gateway + routing control
plane + observability console + desktop-ready distribution*:

- **Dual-protocol gateway**: serves both the OpenAI-compatible (`/v1/chat/completions`) and
  Anthropic-compatible (`/v1/messages`) endpoints, with non-streaming and minimal SSE stream pass-through
- **Local key isolation**: clients only hold a Local Key; upstream provider keys are kept inside the
  gateway (AES-256-GCM encrypted) and never spread across consumer applications
- **Rule-based routing**: model alias mapping, wildcard rules, provider priority, Provider Chains and
  Fallback Chains, plus a routing simulator
- **Observability console**: a React + TypeScript admin UI with Dashboard KPIs, 7-day cost trends,
  failure alerts, fallback-switch analytics, and CSV export

It sits in the same AI ecosystem as [ChatGPT-Next-Web](/en/projects/ChatGPT-Next-Web/)
in this archive, but from a complementary angle: one is an end-user LLM Web UI, the other is a governance
layer between applications and upstream providers.

**Current status**: archived (development stopped by the owner in 2026-09; the original README recommends
CC Switch / TokenTracker as replacements). Imported with its complete 53-commit history; the original
repository has been emptied and this archive is the sole surviving copy.

## Tech Stack

| Layer | Choices |
| --- | --- |
| Backend | `Go 1.22` · `chi v5` · `zerolog` · `viper` |
| Storage | `GORM` + `glebarez/sqlite` (pure-Go driver, no CGO) |
| Gateway protocols | OpenAI Chat Completions · Anthropic Claude Messages · SSE pass-through |
| Admin console | `React 18` · `TypeScript 5.6` · `Vite 5` · `Recharts` · `Zustand` |
| Desktop runtime | `Wails v2` · WebView2 · system tray (`third_party/systray` vendored fork) |
| CI/CD | GitHub Actions (Windows exe + macOS app builds) |

## Architecture Highlights

- **Engineering the Fallback Chain**: on upstream `429`/`5xx`/network errors the gateway walks the backup
  chain automatically; retryable-error classification, cooldowns, and every fallback attempt are persisted
  to request logs and trace metadata (`X-Request-Trace-Id`) for the Dashboard and Logs pages to query
- **Keys that don't spread**: consumers hold only Local Keys (with budget, expiry, revocation, rotation);
  the gateway stores upstream keys encrypted, and the request path is cleanly layered as
  auth → routing → forwarding → fallback → usage persistence → trace response
- **Single-binary desktop delivery**: Vite build output is synced into Go embed via `sync-embed.mjs`;
  a Wails desktop app plus a Windows tray-resident build with Mutex-based single instance, autostart,
  and a native AI-stats overlay — powered by a pure-Go SQLite driver for CGO-free cross compilation

## What I Learned

This project captures what full governance of an "AI access layer" looks like: when many tools and projects
need model APIs, a local gateway with routing, key management, failover, and observability is far more
manageable than scattering provider keys and retry logic through every codebase. Once you understand its
layered request path, mature gateways like LiteLLM or OneAPI map onto it layer by layer.

## Archive Info

- **Archived**: 2026-09-22 (complete 53-commit history imported, from `b8174d2` baseline to `07393da` archive marker)
- **Source entry**: [`archived-projects/TokenBridge/`](https://github.com/wychmod/archiving-project/tree/main/archived-projects/TokenBridge)
- **Archive notes**: [ARCHIVE.md](https://github.com/wychmod/archiving-project/blob/main/archived-projects/TokenBridge/ARCHIVE.md)
