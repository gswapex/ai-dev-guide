---
name: ai-dev-guide
description: 当学生想把一个软件想法整理成可开发的项目文档、任务清单，或继续一个已经存在 docs/project.md、docs/structure.md、docs/tasks.md 的教学项目时使用。
---

# AI Dev Guide

这是教学流程的主入口。先判断当前项目文档状态，再决定是继续引导、生成文档，还是进入开发。

## 会话开始先做什么

每次会话开始，先按顺序检查：

1. `docs/project.md`
2. `docs/structure.md`
3. `docs/tasks.md`

然后按以下分支处理：

- 三个文件都不存在：读取 `references/guide.md`，开始需求引导
- 只有 `docs/project.md` 存在：询问是否立即生成 `docs/structure.md` 和 `docs/tasks.md`
- 三个文件都存在：读取 `docs/tasks.md`，进入开发模式并询问从哪个任务开始

详细规程见 `AGENTS.md`。

## 工作规则

- 一次只推进一个任务或一个问题
- 没有 `docs/project.md` 时不开始写代码
- 没有 `docs/structure.md` 时不直接进入开发
- 开发时不得超出 `docs/project.md` 定义的功能范围
- 每完成一个任务，必须更新 `docs/tasks.md` 中的状态和当前进度

## 何时读取其他文件

- 需要逐步提问和引导学生时：读取 `references/guide.md`
- 学生回答异常、跳步、说不清楚时：读取 `references/fallback.md`
- 需要生成 `project.md`、`structure.md`、`tasks.md` 时：读取 `references/templates.md`
- 学生主动要求走快捷入口时：读取 `commands/*.md`
- 学生要直接套用内置项目时：优先读取 `projects/*` 项目库中的对应项目目录
- 走引导流程需要示范项目文档时：读取 `examples/*.md`

## 关于 commands、projects 和 examples

- `commands/*.md` 是用户手动触发的快捷命令，不替代主流程
- `projects/*` 是内置项目库
- `projects/*` 下每个子目录代表一个可直接读取的项目模板包
- 项目库支持多个项目；当前只有一个项目目录时，也按“项目库”规则处理，不写死单个项目
- `/ai-dev-start` 优先从 `projects/*` 中选择并读取目标项目
- `examples/*.md` 是引导流程中的示范项目文档，用来展示整理完成后的文档效果

当前命令分工：

- `/ai-dev-guide`：完整教学模式，先体验案例，再过渡到自己的项目
- `/ai-dev-start`：从内置项目库中选择目标项目，或直接套用已明确的目标项目
- `/ai-dev-init`：承接已完成的引导结果，生成文档并进入开发
- `/ai-dev-chat-logs`：导出聊天记录到当前使用项目的 `records/chat-logs/`，不进入开发
