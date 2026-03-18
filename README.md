# ai-dev-guide

一个用于教学的软件开发引导 skill。

它的目标是帮助学生：

- 从模糊想法整理出项目需求
- 生成 `docs/project.md`、`docs/structure.md`、`docs/tasks.md`
- 在开发阶段按任务推进
- 在开始编码前先做任务级代码拆解

---

## 安装到本地 OpenCode

推荐在 OpenCode 对话中输入下面这句请求，让模型执行安装：

```text
Fetch and follow instructions from https://raw.githubusercontent.com/gswapex/ai-dev-guide/refs/heads/SKILLS/.opencode/INSTALL.md
```

这会让 OpenCode 模型读取远程安装说明，并按其中步骤把这个 skill 安装到 OpenCode 原生的 `skills` 目录中，同时把 `/ai-dev-*` 命令安装到 OpenCode 原生的 `commands` 目录中。

首选安装说明：

- `https://raw.githubusercontent.com/gswapex/ai-dev-guide/refs/heads/SKILLS/.opencode/INSTALL.md`

---

## 基础安装指南

如果你希望手动安装这个 skill，可以按下面步骤操作：

1. 下载仓库 `SKILLS` 分支内容
2. 选择 skill 安装位置：
   - 全局安装：`~/.config/opencode/skills/ai-dev-guide`
   - 项目安装：`./.opencode/skills/ai-dev-guide`
3. 选择命令安装位置：
   - 全局安装：`~/.config/opencode/commands`
   - 项目安装：`./.opencode/commands`
4. 将以下文件和目录复制到目标 skill 位置：
   - `SKILL.md`
   - `AGENTS.md`
   - `references/`
   - `examples/`
   - `projects/`
5. 将以下命令文件复制到目标 command 位置：
   - `.opencode/commands/ai-dev-guide.md`
   - `.opencode/commands/ai-dev-start.md`
   - `.opencode/commands/ai-dev-init.md`
   - `.opencode/commands/ai-dev-chat-logs.md`
6. 确认目标 skill 目录下存在：

```text
SKILL.md
```

7. 确认目标 command 目录下存在：

```text
ai-dev-guide.md
ai-dev-start.md
ai-dev-init.md
ai-dev-chat-logs.md
```

8. 重启 OpenCode

如果不想手动复制，也可以使用备用脚本：

- `https://raw.githubusercontent.com/gswapex/ai-dev-guide/SKILLS/scripts/install-opencode-skill.ps1`

---

## 安装后检查

安装完成后，重启 OpenCode。

如果安装成功，OpenCode 将能够从本地原生 skills 目录发现这个 skill，并在需要时使用其中的：

- `SKILL.md`
- `AGENTS.md`
- `references/*`
- `projects/*`

OpenCode 原生技能发现路径是：

- `~/.config/opencode/skills/<name>/SKILL.md`
- `./.opencode/skills/<name>/SKILL.md`

OpenCode 原生命令发现路径是：

- `~/.config/opencode/commands/<name>.md`
- `./.opencode/commands/<name>.md`

---

## 使用方式

安装完成后，在 OpenCode 中使用这个 skill 时，主流程会先检查当前项目里是否存在：

- `docs/project.md`
- `docs/structure.md`
- `docs/tasks.md`

然后进入对应流程：

- 都不存在：进入项目需求引导
- 只有 `docs/project.md`：补生成结构文档和任务清单
- 三个都存在：进入任务开发流程

可手动触发的快捷命令包括：

- `/ai-dev-guide`
- `/ai-dev-start`
- `/ai-dev-init`
- `/ai-dev-chat-logs`

---

## 更新方式

继续使用同一条安装指令即可：

```text
Fetch and follow instructions from https://raw.githubusercontent.com/gswapex/ai-dev-guide/refs/heads/SKILLS/.opencode/INSTALL.md
```

如果模型无法自动完成复制安装，再使用备用脚本：

- `https://raw.githubusercontent.com/gswapex/ai-dev-guide/SKILLS/scripts/install-opencode-skill.ps1`

---

## 说明

- 本 skill 本身是教学流程资产，不是业务项目代码仓库
- 聊天记录导出到用户当前工作空间，不写回 skill 仓库
- `records/` 是本地忽略目录，不进入 Git
