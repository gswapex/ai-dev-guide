# 小米之家门店管理系统 - 项目模板

> AI 使用本模板时，按此文件指引操作。

---

## 项目概述

- **项目名称**：小米之家门店管理系统（Mi Store Management System）
- **技术栈**：Spring Boot + MySQL + React/Vue
- **项目类型**：前后端分离的门店管理后台
- **核心模块**：用户权限 / 商品管理 / 库存管理 / 销售订单 / 会员管理 / 报表统计

---

## 文档读取顺序

当学生选择使用本项目模板时，AI 按以下顺序读取：

### 1. 需求定义（第一步）
- `小米之家门店管理系统需求文档.md` — 完整功能需求，理解项目要做什么

### 2. 架构设计（第二步）
- `database-schema.md` — 数据库表结构（建表 SQL 位于 `sql/init.sql`）
- `api-design-doc.md` — API 接口设计
- `springboot-xiaomi-architecture.md` — Spring Boot 代码架构

### 3. 任务执行（第三步）
- `dev-task-breakdown.md` — 开发任务详细拆解
- `api-test-cases.md` — 接口测试用例
- `structure.md` — 系统结构（AI 生成）
- `tasks.md` — 开发任务清单（AI 生成）

### 4. 辅助参考
- `ui-interaction.md` — 页面交互设计
- `product-story.md` — 产品故事
- `how-to-ask-ai-coding.md` — 如何向 AI 提问

---

## 目录结构

```
projects/xiaomi-store/
├── README.md                          # AI 指引文件
├── sql/                               # 数据库初始化脚本
│   ├── init.js                        # 初始化数据库和表
│   ├── seed.js                        # 插入模拟数据
│   ├── init.sql                       # 建表 SQL（14 张表）
│   ├── init-data.sql                  # 模拟数据 SQL
│   ├── init.bat                       # Windows 入口
│   └── package.json                   # 依赖配置
│
├── 小米之家门店管理系统需求文档.md     # 需求起点
├── database-schema.md                 # 表结构
├── api-design-doc.md                  # API 设计
├── springboot-xiaomi-architecture.md  # 代码架构
│
├── structure.md                       # 系统结构（AI 生成）
├── tasks.md                           # 任务清单（AI 生成）
│
├── ui-interaction.md                  # 页面交互
├── dev-task-breakdown.md              # 任务拆解
├── api-test-cases.md                  # 测试用例
├── product-story.md                   # 产品故事
└── how-to-ask-ai-coding.md           # AI 提问指南
```

---

## 数据库初始化

**触发时机**：项目开始时，或学生明确要求"初始化数据库"时。

**AI 执行步骤**：

1. **询问学生**：数据库连接信息（host / port / username / password）
2. **执行初始化**：
   ```bash
   cd projects/xiaomi-store/sql
   npm install
   node init.js [host] [port] [username] [password]
   ```
3. **执行效果**：自动创建 `xiaomi_store` 数据库及全部 14 张表

**脚本说明**：
- `init.js` — 初始化数据库和表结构
- `seed.js` — 插入模拟数据（测试用）
- `init.sql` — 建表 SQL，包含以下表：
  - 用户相关：USER_INFO / ROLE_INFO / PERMISSION_INFO / ROLE_PERMISSION_REL
  - 商品相关：PRODUCT_INFO / CATEGORY_INFO
  - 库存相关：STOCK_IN_INFO / STOCK_OUT_INFO / STOCK_LOG_INFO / STOCK_WARNING_RULE
  - 订单相关：ORDER_INFO / ORDER_ITEM_INFO
  - 会员相关：MEMBER_INFO / MEMBER_CONSUME_RECORD
- `init-data.sql` — 模拟数据 SQL
- `package.json` — 依赖 mysql2

**完整初始化步骤**：
```bash
cd projects/xiaomi-store/sql
npm install
node init.js [host] [port] [user] [password]  # 初始化数据库和表
node seed.js [host] [port] [user] [password]  # 插入模拟数据
```

**注意事项**：
- `npm install` 只需执行一次
- `CREATE TABLE IF NOT EXISTS` 确保重复执行不会报错
- `seed.js` 需要 `init.js` 先执行完成
- AI 不需要写任何数据库连接代码

---

## AI 开发流程

1. **读取需求** → 理解完整功能范围和业务场景
2. **生成文档** → 按标准流程生成 `docs/project.md` / `docs/structure.md` / `docs/tasks.md`
3. **执行任务** → 按 `tasks.md` 顺序逐步开发
4. **调用脚本** → 必要时使用 `sql/init.js` 初始化数据库

---

## 注意事项

- `projects/xiaomi-store/` 是**模板库**，包含项目参考文档
- AI 生成的项目文档应放在 `docs/` 目录下
- 开发过程中如需操作数据库，直接调用 `sql/init.js`，不自己写连接代码
