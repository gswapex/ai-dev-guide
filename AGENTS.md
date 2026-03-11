# AGENTS.md — 操作规程

> 控制 AI 在 OpenCode 中的全部行为。
> 引导流程见 references/guide.md
> 兜底逻辑见 references/fallback.md
> 文档模板见 references/templates.md

---

## 一、启动检测

每次会话开始，按顺序检测：

```
docs/project.md    是否存在？
docs/structure.md  是否存在？
docs/tasks.md      是否存在？
```

### 情况 A：三个文件都不存在
→ 读取 references/guide.md，启动引导流程。

### 情况 B：project.md 存在，structure.md / tasks.md 不存在
→ AI 主动提示：

> 「我看到你已经有 project.md 了。
> 是否现在根据它生成系统结构文档和开发任务清单？
> 生成后就可以开始开发了。」

→ 学生确认后，执行【文档生成流程】。

### 情况 C：三个文件都存在
→ 直接进入开发模式，读取 tasks.md，询问：

> 「当前任务清单：
> [列出 tasks.md 内容]
> 你想从哪个任务开始？」

---

## 二、引导流程

读取 references/guide.md 执行。
遇到学生异常回答，读取 references/fallback.md 执行对应情况。

引导完成后，AI 主动提示：

> 「你的需求已整理完成 🎉
>
> 现在我可以帮你：
> 1. 把需求保存为 docs/project.md
> 2. 自动生成系统结构文档（docs/structure.md）
> 3. 自动生成开发任务清单（docs/tasks.md）
>
> 现在生成吗？」

---

## 三、文档生成流程

学生确认后，按以下步骤执行：

**Step 1：写入 docs/project.md**
把引导过程中整理好的内容写入文件。

**Step 2：识别课程类型**
读取 project.md 中的「技术栈」字段，对照 references/templates.md 中的识别规则确定课程类型。

**Step 3：生成 docs/structure.md**
套用 references/templates.md 中对应课程的 structure 模板，填入 project.md 的内容后写入。

**Step 4：生成 docs/tasks.md**
根据 project.md 的核心功能列表，套用 references/templates.md 中的 tasks 模板，生成 3～5 个任务后写入。

**Step 5：完成提示**

> 「文档已生成：
> ✅ docs/project.md
> ✅ docs/structure.md
> ✅ docs/tasks.md
>
> 当前任务清单：
> 1. [任务1]
> 2. [任务2]
> 3. [任务3]
>
> 你想从哪个任务开始？」

---

## 四、开发行为约束

### 必须遵守
- 每次只做 tasks.md 中的一个任务
- 任务完成后将状态更新为 ✅，再询问下一个
- 遇到 project.md 未说明的需求，先列出问题再处理
- 不超出 project.md 定义的功能范围

### 禁止事项
- 不擅自增加新功能或新页面
- 不引入 project.md 未提及的第三方库
- 没有 project.md 时不开始写代码
- 不跳过 structure.md 直接开发

### 信息不足时
> 「project.md 中没有说明 [问题]，我有两个方案：
> A. [方案A]
> B. [方案B]
> 你倾向哪个？」

---

## 五、任务状态更新规则

每完成一个任务，AI 必须：

1. 将 tasks.md 中该任务状态改为 ✅
2. 更新「当前进度」中的已完成数量
3. 输出提示：

> 「✅ 任务 [N] 完成：[任务名]
>
> 进度：[已完成] / [总数]
>
> 下一个任务：[任务N+1]
> 现在开始吗？」
