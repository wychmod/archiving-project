---
ref: ToDoList
lang: en
title: "ToDoList · A Django + React Todo Practice Project"
name: "ToDoList"
subtitle: "A Django + React Todo Practice Project"
description: "A full-stack todo practice project with Django REST framework and React — CRUD, completion marks, priorities, due dates, and priority sorting, with a React Bootstrap + Webpack frontend"
category: fullstack
stack:
  - python
  - django
  - drf
  - react
  - webpack
  - bootstrap
status: archived
scrubbed: false
repoCleared: false
archivedAt: 2026-06-23
---
## Overview

ToDoList is a **full-stack todo practice project** with a separated frontend and backend: Django plus
Django REST framework serve the API, while React with React Bootstrap renders the UI. It supports creating,
deleting, editing, completing, prioritizing, and sorting todo items by due date.

It is one of the earliest full-stack exercises in the archive (source committed in 2019), playing the role of
"the first step into decoupled frontend/backend development".

**Status**: Archived — source and history kept for reference.

## Feature List

| Module | Capability |
| --- | --- |
| ➕ Todo management | Create / delete / edit todo items |
| ☑️ Completion mark | Mark a todo as done in one click |
| 🔥 Priority | Set a priority per todo, with sorting by priority |
| ⏰ Due date | Set an expire date per todo |
| 📋 List view | List all todo items |

The project's `image/` directory keeps 8 real screen-recording GIFs (add, edit, delete, complete, set priority, sort, set due date, list), so the actual 2019 interactions can be reviewed directly in the archive.

## Tech Stack

| Layer | Choice |
| --- | --- |
| Backend | `Python 3` · `Django` (ORM / views / routing) · `Django REST framework` (serialization & REST API) |
| Frontend | `React ^16.8` · `React Router ^5` · `React Bootstrap ^1.0-beta` (Bootstrap 4) |
| Data fetching | `fetch` calling the backend REST API directly |
| Build | `Webpack 3` · Babel (babelify / babel-preset-react) |

## Project Structure

```
ToDoList/
├── ToDoListDjango/         # Django backend
│   ├── ToDoList/           # project config (settings / urls)
│   └── App/                # todo business app (models / views)
└── ToDoListReact/          # React frontend
    ├── webpack.config.js   # Webpack build config
    ├── index.html          # SPA entry page
    └── src/                # components / logic source
```

## Architecture Highlights

- **The smallest complete loop for a decoupled app**: one Todo resource walks the full textbook chain of Model → Serializer → View → fetch call → component rendering
- **A complete todo data model**: the three "business fields" — status, priority, and due date — run through both ends and drive UI sorting and filtering
- **Hand-rolled Webpack 3 build**: a frontend toolchain assembled by hand before scaffolding tools became the norm; compared with today's Vite / CRA it shows what a bundler actually does

## What It Taught Me

The project is small, but it walked the collaboration pattern of "frontend owns interaction, backend owns data":
from schema design and API conventions to component state synchronization, it became the baseline for every
full-stack project that followed. React 16.8 happens to be the first stable release with Hooks, so its component
style forms a clear historical contrast with today's ecosystem. Dependency versions are old; running it again
needs some environment work.

## Archive Info

- **Archived on**: 2026-06-23
- **Source**: [`archived-projects/ToDoList/`](https://github.com/wychmod/archiving-project/tree/main/archived-projects/ToDoList)
- **Archive note**: [ARCHIVE.md](https://github.com/wychmod/archiving-project/blob/main/archived-projects/ToDoList/ARCHIVE.md)
