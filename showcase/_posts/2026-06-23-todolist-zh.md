---
title: ToDoList · Django + React 待办事项全栈练习
date: 2026-06-23 11:00:00 +0800
lang: zh-CN
ref: ToDoList
categories: [全栈练手]
tags: [Python, Django, DRF, React, Webpack]
description: Django REST framework + React 的全栈待办练习:任务 CRUD 与完成标记、优先级、到期时间、按优先级排序,前端以 React Bootstrap + Webpack 构建
---

## 概览

ToDoList 是一个**待办事项全栈练习项目**,前后端分离:Django + Django REST framework 提供 API,
React + React Bootstrap 负责界面。支持新增、删除、编辑、完成标记、优先级、到期时间与按优先级排序。

它是归档序列里最早的全栈练习之一(源码提交于 2019 年),承担"前后端分离起步"的角色。

**当前状态**:已归档,仅保留源码与历史学习参考。

## 功能清单

| 模块 | 能力 |
| --- | --- |
| ➕ 待办管理 | 新增 / 删除 / 编辑待办事项 |
| ☑️ 完成标记 | 一键标记待办为已完成 |
| 🔥 优先级 | 为待办设置优先级,并支持按优先级排序 |
| ⏰ 到期时间 | 为待办设置 expire date |
| 📋 列表展示 | 列出所有待办事项 |

项目 `image/` 目录保留了 8 段真实操作 GIF(添加、编辑、删除、标记完成、设置优先级、排序、设置到期时间、列表展示),可以在归档目录里直接对照 2019 年的实际交互效果。

## 技术栈

| 层 | 选型 |
| --- | --- |
| 后端 | `Python 3` · `Django`(ORM / 视图 / 路由) · `Django REST framework`(序列化与 RESTful 接口) |
| 前端 | `React ^16.8` · `React Router ^5` · `React Bootstrap ^1.0-beta`(Bootstrap 4) |
| 数据请求 | `fetch` 直接调用后端 REST API |
| 构建 | `Webpack 3` · Babel(babelify / babel-preset-react) |

## 项目结构

```
ToDoList/
├── ToDoListDjango/         # Django 后端
│   ├── ToDoList/           # 项目配置(settings / urls)
│   └── App/                # 待办事项业务应用(models / views)
└── ToDoListReact/          # React 前端
    ├── webpack.config.js   # Webpack 构建配置
    ├── index.html          # SPA 入口页
    └── src/                # 组件 / 逻辑源码
```

## 架构亮点

- **前后端分离的最小闭环**:一个 Todo 资源走完 Model → Serializer → View → fetch 调用 → 组件渲染的教科书式链路
- **完整的待办数据模型**:任务状态、优先级、到期时间三类"业务字段"贯穿前后端,驱动界面排序与筛选
- **Webpack 3 手工构建**:在没有脚手架盛行的年代手工搭起前端工程化链路,对照如今的 Vite / CRA 能看清打包器到底做了什么

## 学习收获

项目不大,但把"前端管交互、后端管数据"的协作模式走通了:从模型设计、API 约定到组件状态同步,
是后续所有全栈项目的基线。React 16.8 恰是引入 Hooks 的首个稳定版本,组件写法与当下生态
形成了清晰的历史对照。早期依赖版本较旧,重跑需要先整理运行环境。

## 归档信息

- **归档日期**:2026-06-23
- **源码入口**:[`archived-projects/ToDoList/`](https://github.com/wychmod/archiving-project/tree/main/archived-projects/ToDoList)
- **归档说明**:[ARCHIVE.md](https://github.com/wychmod/archiving-project/blob/main/archived-projects/ToDoList/ARCHIVE.md)
