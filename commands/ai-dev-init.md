# 指令：/ai-dev-init

承接已经完成的需求引导结果，生成标准开发文档，并切换到开发模式。

适合已经完成 `/ai-dev-guide` 或其他引导流程、现在准备正式开始开发的用户。

## 你的任务

根据当前对话里已经确认的项目信息，执行完整初始化流程：

1. 检查信息是否足够生成文档
2. 在当前项目中生成 `docs/project.md`
3. 识别课程类型
4. 在当前项目中生成 `docs/structure.md`
5. 如果是 Spring Boot 项目，额外在当前项目中生成 `docs/architecture.md`
6. 在当前项目中生成 `docs/tasks.md`
7. 输出当前任务清单，并询问从哪个任务开始

## 信息检查规则

生成前至少确认这些信息：

- 项目名称
- 技术栈或课程类型
- 目标用户
- 解决的问题
- 核心功能（3～5 个）
- 主要使用流程
- 需要记住的信息
- 第一版不做什么

如果缺失关键信息：

- 不要直接跳过
- 先用最少的问题补齐
- 一次只问一个问题

## 生成规则

- `docs/project.md`：在当前项目中生成，套用 `references/templates.md` 中「零、project.md 模板」
- `docs/structure.md`：在当前项目中生成，套用 `references/templates.md` 中「一、structure.md 模板」
- `docs/architecture.md`：仅 Spring Boot 项目在当前项目中生成，套用 `references/templates.md` 中「二、architecture.md 模板」
- `docs/tasks.md`：在当前项目中生成，套用 `references/templates.md` 中「三、tasks.md 模板」

## 行为规则（必须遵守）

- 这是“进入开发前的初始化命令”，不是继续从零引导
- 这是“完整初始化命令”，不是只导出 `project.md`
- 不要在文档未生成前直接开始写代码
- 生成完成后必须列出任务清单
- 生成完成后必须询问用户想从哪个任务开始

## 完成后说

Spring Boot 项目输出：

> 文档已生成：
> ✅ 当前项目/docs/project.md
> ✅ 当前项目/docs/structure.md
> ✅ 当前项目/docs/architecture.md
> ✅ 当前项目/docs/tasks.md
>
> 当前任务清单：
> 1. [任务1]
> 2. [任务2]
> 3. [任务3]
>
> 你想从哪个任务开始？

其他课程输出：

> 文档已生成：
> ✅ 当前项目/docs/project.md
> ✅ 当前项目/docs/structure.md
> ✅ 当前项目/docs/tasks.md
>
> 当前任务清单：
> 1. [任务1]
> 2. [任务2]
> 3. [任务3]
>
> 你想从哪个任务开始？
