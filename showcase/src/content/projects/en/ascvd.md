---
ref: ascvd
lang: en
title: "ascvd · A Cardiovascular Risk Assessment System"
name: "ascvd"
subtitle: "A Cardiovascular Risk Assessment System"
description: "A clinical decision-support system for cardiovascular care — multi-marker ASCVD risk scoring, lipid subfraction testing, gene polymorphism interpretation, and report generation, with a Django + DRF backend and a React + MobX + React Flow frontend (credentials scrubbed)"
category: tools
stack:
  - python
  - django
  - drf
  - react
  - mobx
  - healthcare-it
status: archived
scrubbed: true
repoCleared: false
archivedAt: 2026-06-28
---
## Overview

`ascvd` (**A**thero**s**clerotic **C**ardio**v**ascular **D**isease risk assessment) is a clinical support
information system for **cardiovascular risk assessment, blood-lipid subfraction analysis, and gene
polymorphism interpretation**. It provides cardiologists, clinical lab technicians, and precision-medicine
researchers with an integrated platform: patient records, multi-indicator joint risk assessment, report
generation, and back-office management.

> ⚠️ This system is a medical aid tool; every diagnostic conclusion requires confirmation by a licensed
> physician before it can inform clinical decisions.

**Status**: Archived (**credentials scrubbed** + upgraded README) — the six credentials committed in
plaintext in the original repository were replaced with placeholders during import.

## Core Features

| Module | Capability |
| --- | --- |
| 👤 Patient records | `Apps/patient` keeps name / age / sex / contact / chronic history, cascading into lab reports |
| ❤️ ASCVD risk assessment | `Apps/ascvd` analyzes TC/TG/HDL-C/LDL-C/non-HDL/Apo-A1/Apo-B/LP(a) jointly to generate a risk level and diagnostic conclusion (`AscvdTesting` model) |
| 🧪 Lipid subfractions | `Apps/blood_lipid_subfraction` ingests fine-grained lipoprotein subfraction data |
| 🧬 Gene polymorphism | `Apps/gene_polymorphism` records gene loci with phenotype-assisted interpretation |
| 📋 Report metadata | `Apps/report_information` manages the sample-type / barcode / sample-number / sample-status quadruple |
| 🩺 Physician workspace | `Apps/user` physician profiles with permission isolation |
| 📖 Disease dictionary | `Apps/disease_dict` chronic-disease dictionary (multi-select) |
| 🔄 Visual diagnostic flows | a multi-step decision flow built on `react-flow` |
| 🖼️ Report image export | `html2canvas` capture with `react-viewer` in-browser inspection |
| ⚙️ Zero-code back office | `tyadmin-api-cli` generates an Ant Design Pro style admin in one command |

## Tech Stack

| Layer | Choice |
| --- | --- |
| Backend | `Python 3.8` · `Django 4.1` · `Django REST Framework 3.13` (Router / Serializer / Viewset) |
| Data | `MySQL 8` · `mysqlclient 2.1.1` (with a `SET default_storage_engine=INNODB` compatibility hack) |
| Permissions / filtering | `django-guardian 2.4` (object-level) · `django-filter 22.1` · `django-simple-captcha` |
| Frontend | `React 18.2` · `MobX 6` (decorator stores) · `Ant Design 4.23` · `React Flow 11` · `axios` |
| Build | `react-app-rewired` + `customize-cra` (customizing CRA without ejecting) |
| Admin | `TyAdmin 0.8` (zero-code Ant Design Pro style back office) |
| Deploy | `uWSGI` (socket mode, 4 processes × 2 threads) + `Nginx` + Docker (ports 8101-8111 → host 6101-6111) |

## Architecture Highlights

- **Seven business apps as domain slices**: patient records / risk assessment / lipid subfractions / gene polymorphism / disease dictionary / report metadata / physician workspace, with the core ascvd app evolving through 10 migrations
- **Multi-indicator joint risk assessment**: TC/TG/HDL-C/LDL-C/non-HDL/Apo-A1/Apo-B metrics feed a risk level and diagnostic conclusion
- **Visual diagnostic flows**: a multi-step decision flow built on React Flow
- **Report image export**: `html2canvas` DOM capture with `react-viewer` for in-browser inspection
- **Zero-code back office**: TyAdmin reflects over DRF models to generate the admin UI
- **Multi-environment builds**: `dotenv-cli` injects `.env.dev` / `.env.prod` tracks
- **Enterprise deployment path**: collectstatic with Nginx static serving, media files via Django `serve` plus Nginx `/media/`

## What It Taught Me

This is the most business-heavy project in the archive: healthcare domain modeling (indicators to
conclusions), object-level permissions, flow visualization, report export, and an enterprise deployment
path (uWSGI + Nginx + static asset serving). The "daily feature branch" git workflow — eight feature
branches merged into `main` via pull requests — is preserved in the history too: from an sdLDL-C precision
fix to the risk-report step, each PR maps to one clear business increment; a ninth unmerged MobX store
fix branch stands as a "written but never merged" contrast. Roughly 2,000 backend and 5,000 frontend
lines, with dependencies locked at mid-2022 levels.

## Archive Info

- **Archived on**: 2026-06-28
- **Source**: [`archived-projects/ascvd/`](https://github.com/wychmod/archiving-project/tree/main/archived-projects/ascvd)
- **Archive note**: [ARCHIVE.md](https://github.com/wychmod/archiving-project/blob/main/archived-projects/ascvd/ARCHIVE.md)
- **⚠️ Security**: SECRET_KEY, database password, SSH, and Baota panel credentials in `settings.py` and the deploy docs are `<YOUR_*>` placeholders; the README was rewritten to an enterprise layout before archiving
