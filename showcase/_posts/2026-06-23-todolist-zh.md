---
title: ToDoList · Django + React 待办事项全栈练习
date: 2026-06-23 11:00:00 +0800
lang: zh-CN
ref: ToDoList
categories: [全栈练手]
tags: [Python, Django, DRF, React, Webpack]
description: Django + React 全栈待办练习:CRUD、优先级、到期时间与排序
---

## 概览

ToDoList 是一个**待办事项全栈练习项目**,前后端分离:Django + Django REST framework 提供 API,
React + React Bootstrap 负责界面。支持新增、删除、编辑、完成标记、优先级、到期时间与按优先级排序。

它是归档序列里最早的全栈练习之一(源码提交于 2019 年),承担"前后端分离起步"的角色。

**当前状态**:已归档,仅保留源码与历史学习参考。

## 技术栈

| 层 | 选型 |
| --- | --- |
| 后端 | `Python` · `Django` · `Django REST framework` |
| 前端 | `React` · `React Bootstrap` |
| 构建 | `Webpack` |

## 架构亮点

- **前后端分离的最小闭环**:DRF 序列化器 + REST 接口 + React 组件消费,教科书式的分层
- **完整的待办数据模型**:任务状态、优先级、到期时间三类字段驱动界面排序与筛选
- **Webpack 手工构建**:在没有脚手架盛行的年代搭起前端工程化链路

## 学习收获

项目不大,但把"前端管交互、后端管数据"的协作模式走通了:从模型设计、API 约定到组件状态同步,
是后续所有全栈项目的基线。早期依赖版本较旧,重跑需要先整理运行环境。

## 归档信息

- **归档日期**:2026-06-23
- **源码入口**:[`archived-projects/ToDoList/`](https://github.com/wychmod/archiving-project/tree/main/archived-projects/ToDoList)
- **归档说明**:[ARCHIVE.md](https://github.com/wychmod/archiving-project/blob/main/archived-projects/ToDoList/ARCHIVE.md)
