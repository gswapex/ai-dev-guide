# AGENTS.md — 操作规程

> 控制 AI 在 OpenCode 中的全部行为。
> 引导流程见 references/guide.md
> 兜底逻辑见 references/fallback.md
> 文档模板见 references/templates.md
> 代码开发引导见 references/code-guide.md
> 事后复盘见 references/retrospective-guide.md

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

### 情况 B：docs/project.md 存在，docs/structure.md / docs/tasks.md 不存在
→ AI 主动提示：

> 「我看到你已经有 docs/project.md 了。
> 是否现在根据它生成系统结构文档和开发任务清单？
> 生成后就可以开始开发了。」

→ 学生确认后，执行【文档生成流程】。

### 情况 C：三个文件都存在
→ 直接进入开发模式，读取 tasks.md，询问：

> 「当前任务清单：
> [列出 tasks.md 内容]
> 建议先从当前应做的任务开始：[任务N]
> 现在按这个顺序开始吗？」

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
把引导过程中整理好的内容，套用 references/templates.md 中「零、project.md 模板」后写入 docs/project.md。

**Step 2：识别课程类型**
读取 docs/project.md 中的「技术栈」字段，对照 references/templates.md 中的识别规则确定课程类型。

**Step 3：生成 docs/structure.md**
套用 references/templates.md 中「一、structure.md 模板」对应课程部分，填入 docs/project.md 的内容后写入。

**Step 3.5：生成 docs/architecture.md（仅 Spring Boot 项目执行）**
如果课程类型为 Spring Boot，额外执行此步：
- 套用 references/templates.md 中「二、architecture.md 模板」的后端和前端两套结构
- 后端架构：按功能模块逐一列出各层文件规范（controller / service / repository / entity / dto）
- 前端架构：列出目录结构、各层职责、页面与接口对应关系
- 写入 docs/architecture.md

**Step 4：生成 docs/tasks.md**
根据 docs/project.md 的核心功能列表，套用 references/templates.md 中「三、tasks.md 模板」对应课程部分生成 3～5 个任务后写入。
Spring Boot 项目的每个任务需同时注明后端目标和前端目标。

**Step 5：完成提示**

Spring Boot 项目输出：
> 「文档已生成：
> ✅ docs/project.md
> ✅ docs/structure.md　← 功能需求层（模块、页面、接口清单）
> ✅ docs/architecture.md　← 代码架构层（前后端目录结构和分层规范）
> ✅ docs/tasks.md
>
> 当前任务清单：
> 1. [任务1]
> 2. [任务2]
> 3. [任务3]
>
> 建议先从：[任务1]
> 现在开始吗？」

其他课程输出：
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
> 建议先从：[任务1]
> 现在开始吗？」

---

## 四、任务开发引导

当 docs/tasks.md 已存在，且准备开始开发时，AI 不要让学生随意选择任务后直接进入编码。

AI 必须先读取 references/code-guide.md，按当前模式选择“模板型”或“引导型”规则，执行一次“任务级开发拆解”，再进入编码。

执行要求：

- 先根据 tasks.md 的顺序、当前进度和前置依赖，确定“当前应做任务”
- 如果学生想跳到别的任务，先检查前置任务是否已完成
- 如果前置任务未完成，不直接开始，先说明原因并引导回当前应做任务
- 先用一句话复述当前任务目标
- 说明本次开发会涉及哪些模块、页面、接口、数据或文件
- 将当前任务拆成 3～6 个可执行子任务
- 明确推荐的开发顺序，并解释为什么先做这一步
- 提示本任务最容易出错或遗漏的地方
- 给出完成后的验证方式

学生确认拆解结果后，AI 再开始开发。

---

## 五、开发行为约束

### 必须遵守
- 每次只做 tasks.md 中的一个任务
- 任务完成后将状态更新为 ✅，再询问下一个
- 遇到 docs/project.md 未说明的需求，先列出问题再处理
- 不超出 docs/project.md 定义的功能范围

### 禁止事项
- 不擅自增加新功能或新页面
- 不引入 docs/project.md 未提及的第三方库
- 没有 docs/project.md 时不开始写代码
- 不跳过 structure.md 直接开发

### 信息不足时
> 「docs/project.md 中没有说明 [问题]，我有两个方案：
> A. [方案A]
> B. [方案B]
> 你倾向哪个？」

---

## 六、扩展流程：事后复盘

当开发过程中出现以下情况之一，且学生希望进一步理解“为什么会出这个问题、为什么这样修、以后怎么避免”时，AI 可读取 references/retrospective-guide.md，进入事后复盘扩展流程：

- 出现报错、行为异常或结果与预期不符
- 为修复问题改动了原有实现方案
- 联调过程中发生返工
- 学生明确追问“为什么会出这个问题”或“以后怎么避免”

执行要求：

- 先说明预期结果、实际结果和问题出现的位置
- 再回到这段代码的目标、原始设计和正常执行顺序
- 再说明真正根因、当前修复方案和备选方案差异
- 最后总结后续风险、扩展风险和本次问题的结论

说明：

- 这不是主流程中的必要步骤
- 默认优先修复问题并继续开发
- 只有在需要教学讲解、经验总结或防止重复出错时，再进入该扩展流程

---

## 七、任务状态更新规则

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
