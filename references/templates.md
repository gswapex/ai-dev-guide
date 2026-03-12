# 文档模板

> AGENTS.md 在生成各文档时套用以下模板。
> 根据 project.md 中的「技术栈」字段自动选择对应课程类型。

---

## 课程类型识别规则

| 技术栈关键词 | 课程类型 |
|---|---|
| Spring Boot / Java / MySQL | Spring Boot 前后端分离 |
| React / Vue / 前端 | 前端课程 |
| PHP | PHP 课程 |
| 微信小程序 / 小程序 | 小程序课程 |
| Windows / 桌面端 / PyQt / Electron | 桌面端课程 |
| 未注明 / AI 自动选定 | 默认按前端处理 |

---

## 一、structure.md 模板（功能需求层）

> 描述：系统有哪些功能模块、每个模块的页面和接口是什么。
> 给谁看：需求确认 + AI 开发参照。

---

### Spring Boot 前后端分离

```markdown
# 系统结构文档

## 项目信息
- 项目名称：
- 后端技术栈：Spring Boot + MySQL
- 前端技术栈：React / Vue（或纯 HTML）
- 目标用户：

## 功能模块清单

### [模块名，如：用户管理]
- 功能描述：
- 前端页面：[页面名称 + 路由]
- 后端接口：[接口路径 + 方法]
- 涉及数据表：

### [模块名，如：商品管理]
- 功能描述：
- 前端页面：
- 后端接口：
- 涉及数据表：

## 前端页面清单
| 页面名称 | 路由 | 所属模块 | 说明 |
|---|---|---|---|
| 登录页 | /login | 用户管理 | |
| [页面] | /[path] | [模块] | |

## 后端接口清单
| 模块 | 接口路径 | 方法 | 说明 |
|---|---|---|---|
| 用户管理 | /api/auth/login | POST | 登录 |
| [模块] | /api/[资源] | GET | 获取列表 |
| [模块] | /api/[资源] | POST | 新增 |
| [模块] | /api/[资源]/:id | PUT | 修改 |

## 数据库表清单
| 表名 | 说明 | 关联表 |
|---|---|---|
| users | 用户表 | roles |
| [表名] | [说明] | [关联] |

## 接口返回格式（统一）
```json
{
  "code": 200,
  "message": "success",
  "data": {}
}
```
```

---

### 前端课程（React / Vue）

```markdown
# 系统结构文档

## 项目信息
- 项目名称：
- 技术栈：React / Vue
- 目标用户：

## 功能模块清单
### [模块名]
- 功能描述：
- 对应页面：
- 主要交互：

## 页面清单
| 页面名称 | 路由 | 说明 |
|---|---|---|

## 组件清单
- [组件名]：[用途]

## 本地数据结构
```javascript
// [实体名]
{
  id: string,
  [字段]: [类型],
  createdAt: Date
}
```
```

---

### PHP 课程

```markdown
# 系统结构文档

## 项目信息
- 项目名称：
- 技术栈：PHP + MySQL
- 目标用户：

## 功能模块清单
### [模块名]
- 功能描述：
- 对应页面文件：[xxx.php]
- 主要表单操作：

## 页面文件清单
| 文件名 | 说明 |
|---|---|
| index.php | |
| [name].php | |

## 数据库表清单
| 表名 | 说明 |
|---|---|
```

---

### 小程序课程

```markdown
# 系统结构文档

## 项目信息
- 项目名称：
- 平台：微信小程序
- 目标用户：

## 功能模块清单
### [模块名]
- 功能描述：
- 对应页面：
- 主要交互：

## 页面清单
| 页面路径 | 说明 |
|---|---|
| pages/[name]/index | |

## 数据结构
[注明本地存储还是云数据库]
```

---

### 桌面端课程（Electron / PyQt）

```markdown
# 系统结构文档

## 项目信息
- 项目名称：
- 平台：Windows 桌面端
- 技术栈：
- 目标用户：

## 功能模块清单
### [模块名]
- 功能描述：
- 对应窗口/面板：
- 主要交互：

## 窗口清单
| 窗口名称 | 说明 |
|---|---|
| 主窗口 | |

## 数据存储
[注明存储方式：本地文件 / SQLite / 注册表]
```

---

## 二、architecture.md 模板（代码架构层）

> 描述：代码如何组织、分哪些层、每层职责是什么。
> 给谁看：AI 写代码时的结构参照，防止乱放文件。
> 注意：只有 Spring Boot 前后端分离项目需要独立的 architecture.md，其他课程的代码结构较简单，直接写在 structure.md 末尾即可。

---

### Spring Boot 后端代码架构

```markdown
# 后端代码架构文档

## 项目信息
- 项目名称：
- 框架：Spring Boot
- 数据库：MySQL

## 分层结构

```
src/main/java/com/[项目名]/
├── controller/        ← 接口层：接收 HTTP 请求，调用 service，返回 JSON
├── service/           ← 业务逻辑层：处理核心业务规则
│   └── impl/          ← service 实现类
├── repository/        ← 数据访问层：操作数据库（JPA / MyBatis）
├── entity/            ← 数据实体：对应数据库表
├── dto/               ← 数据传输对象：接口入参和出参
├── config/            ← 配置类：跨域、安全、Bean 等
└── exception/         ← 统一异常处理
```

## 各层职责说明

| 层 | 目录 | 职责 | 不该做的事 |
|---|---|---|---|
| 接口层 | controller/ | 接收请求、参数校验、调用 service | 不写业务逻辑 |
| 业务层 | service/ | 核心业务规则、事务控制 | 不直接操作数据库 |
| 数据层 | repository/ | 数据库 CRUD | 不写业务判断 |
| 实体层 | entity/ | 数据库表映射 | 不写业务方法 |
| 传输层 | dto/ | 接口入参/出参封装 | 不含业务逻辑 |

## 各模块文件规范

### [模块名，如：用户管理]
```
controller/UserController.java      ← 接口：/api/users/**
service/UserService.java            ← 接口定义
service/impl/UserServiceImpl.java   ← 实现
repository/UserRepository.java      ← 数据库操作
entity/User.java                    ← 数据实体
dto/UserLoginDTO.java               ← 登录入参
dto/UserResponseDTO.java            ← 返回数据
```

### [模块名，如：商品管理]
```
controller/ProductController.java
service/ProductService.java
service/impl/ProductServiceImpl.java
repository/ProductRepository.java
entity/Product.java
dto/ProductCreateDTO.java
dto/ProductResponseDTO.java
```

## 统一返回格式
```java
// 所有接口统一返回 Result<T>
public class Result<T> {
    private Integer code;    // 200成功，400参数错误，500服务错误
    private String message;
    private T data;
}
```

## 跨域配置
- 前端开发时运行在 localhost:3000
- 后端运行在 localhost:8080
- 需在 config/CorsConfig.java 配置允许跨域
```

---

### Spring Boot 前端代码架构（React）

```markdown
# 前端代码架构文档

## 项目信息
- 框架：React（或 Vue 3）
- 接口地址：http://localhost:8080

## 目录结构

```
src/
├── pages/             ← 页面组件（对应路由）
│   ├── Login/
│   ├── [模块名]/
│   └── ...
├── components/        ← 公共组件（多页面复用）
│   ├── Layout/        ← 整体布局（侧边栏、顶部栏）
│   ├── Table/         ← 公共表格
│   └── ...
├── api/               ← 接口请求封装
│   ├── request.js     ← axios 基础配置（baseURL、拦截器）
│   ├── user.js        ← 用户相关接口
│   └── [模块].js      ← 各模块接口
├── router/            ← 路由配置
├── store/             ← 全局状态（可选，第一版尽量不用）
└── utils/             ← 工具函数
```

## 各层职责说明

| 目录 | 职责 | 不该做的事 |
|---|---|---|
| pages/ | 页面展示和用户交互 | 不直接写 axios 请求 |
| components/ | 可复用的 UI 组件 | 不包含页面业务逻辑 |
| api/ | 所有后端接口调用 | 不处理 UI 状态 |
| router/ | 路由定义和权限守卫 | |

## 接口请求规范
```javascript
// api/request.js —— 统一配置
import axios from 'axios'
const request = axios.create({
  baseURL: 'http://localhost:8080',
  timeout: 5000
})
// 响应拦截：统一处理错误码
export default request

// api/user.js —— 模块接口
import request from './request'
export const login = (data) => request.post('/api/auth/login', data)
export const getUserList = () => request.get('/api/users')
```

## 页面与接口对应关系
| 页面 | 调用接口 | 说明 |
|---|---|---|
| Login | POST /api/auth/login | 登录 |
| [页面名] | [接口] | [说明] |
```

---

## 三、tasks.md 模板（通用）

> Spring Boot 项目的任务需同时包含前端和后端任务。

```markdown
# 开发任务清单

> 项目：[项目名称]
> 状态说明：⬜ 未开始 / 🔄 进行中 / ✅ 已完成

---

### 任务 1：搭建项目基础结构
- 状态：⬜
- 后端：初始化 Spring Boot 项目，配置数据库连接，建库建表
- 前端：初始化 React/Vue 项目，配置路由和 axios
- 验收：前后端项目均可启动，接口联通无报错

### 任务 2：[第一个核心模块]
- 状态：⬜
- 后端目标：完成 [模块] 的 entity / repository / service / controller
- 前端目标：完成 [模块] 的页面和接口调用
- 验收：[用户可以完成什么操作]

### 任务 3：[第二个核心模块]
- 状态：⬜
- 后端目标：
- 前端目标：
- 验收：

### 任务 4：[第三个核心模块]
- 状态：⬜
- 后端目标：
- 前端目标：
- 验收：

### 任务 5：联调测试主流程
- 状态：⬜
- 目标：前后端联调，走通核心使用流程
- 验收：可以完整演示项目主流程，无明显报错

---

## 当前进度
- 总任务：[N] 个
- 已完成：0
```
