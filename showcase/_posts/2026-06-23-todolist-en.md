---
title: ToDoList · A Django + React Todo Practice Project
date: 2026-06-23 10:00:00 +0800
lang: en
ref: ToDoList
categories: [Full-stack Practice]
tags: [Python, Django, DRF, React, Webpack]
description: A full-stack todo practice project with Django REST framework and React — CRUD, priorities, due dates
---

## Overview

ToDoList is a **full-stack todo practice project** with a separated frontend and backend: Django plus
Django REST framework serve the API, while React with React Bootstrap renders the UI. It supports creating,
deleting, editing, completing, prioritizing, and sorting todo items by due date.

It is one of the earliest full-stack exercises in the archive (source committed in 2019), playing the role of
"the first step into decoupled frontend/backend development".

**Status**: Archived — source and history kept for reference.

## Tech Stack

| Layer | Choice |
| --- | --- |
| Backend | `Python` · `Django` · `Django REST framework` |
| Frontend | `React` · `React Bootstrap` |
| Build | `Webpack` |

## Architecture Highlights

- **The smallest complete loop for a decoupled app**: DRF serializers, REST endpoints, and React components consuming them — textbook layering
- **A complete todo data model**: status, priority, and due date fields drive UI sorting and filtering
- **Hand-rolled Webpack build**: a frontend toolchain assembled before scaffolding tools became the norm

## What It Taught Me

The project is small, but it walked the collaboration pattern of "frontend owns interaction, backend owns data":
from schema design and API conventions to component state synchronization, it became the baseline for every
full-stack project that followed. Dependency versions are old; running it again needs some environment work.

## Archive Info

- **Archived on**: 2026-06-23
- **Source**: [`archived-projects/ToDoList/`](https://github.com/wychmod/archiving-project/tree/main/archived-projects/ToDoList)
- **Archive note**: [ARCHIVE.md](https://github.com/wychmod/archiving-project/blob/main/archived-projects/ToDoList/ARCHIVE.md)
