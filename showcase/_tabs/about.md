---
title: 关于
icon: fas fa-info-circle
order: 5
lang: zh-CN
ref: about
---

# 关于这个归档

`archiving-project` 是一个**纯归档仓库**:把所有"不再单独维护、但仍有学习与参考价值"的历史项目
集中沉淀到一个可检索的索引下。这里不追求数量,而是追求**每一份归档都能回答关于自身的三个问题**:

> **它是什么 · 为什么保留 · 现在还活着吗**

## 它解决什么问题

- **可检索** —— 翻找某段历史代码时,不再需要在几十个分散的 GitHub 仓库中大海捞针
- **可对照** —— 不同语言 / 框架 / 架构风格的尝试并列存放,形成技术演化的化石标本
- **可托底** —— 集中管理,降低历史项目散落带来的凭据泄露与归档丢失风险
- **可协作** —— 配套 AI Agent 规范文件,让自动化工具在改动前先理解约定

## 它不是什么

- 不是个人作品集主站
- 不是持续维护的开发项目(归档默认只读快照)
- 不是教程合集(每个子项目独立的 `ARCHIVE.md` 才是检索入口)

## 归档构成

当前收录 **12 个项目**,横跨 9+ 个技术栈,按场景分为四类:

| 分类 | 项目 |
| --- | --- |
| AI / LLM 应用 | ChatGPT-Next-Web · TokenBridge |
| 全栈练手 | ToDoList · 1802axf · bolg |
| 企业级 / 中台架构 | wiki · lottery · db-router-springboot-starter · cloud-short-link |
| 工具 / 垂直领域系统 | huawei-alarm · ascvd · ESContentGen |

每个项目的归档都通过 `git subtree` 迁入,提交历史完整保留,可逐 commit 回溯;
涉及真实凭证的项目在导入时已做脱敏处理。

## 关于本站

本站是归档仓库的对外展示页,使用 Jekyll + Chirpy 构建,部署在 GitHub Pages。
每篇文章都有中英两个版本,可通过页脚的语言入口互相跳转。

- **仓库地址**:[github.com/wychmod/archiving-project](https://github.com/wychmod/archiving-project)
- **规范文档**:[AGENTS.md](https://github.com/wychmod/archiving-project/blob/main/AGENTS.md)
- **站点设计**:[showcase/docs/DESIGN.md](https://github.com/wychmod/archiving-project/blob/main/showcase/docs/DESIGN.md)
