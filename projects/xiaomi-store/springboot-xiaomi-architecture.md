# 代码架构文档 — 小米之家门店管理系统

> 课程：Spring Boot / Java 后端（前后端分离）
> 关联项目文档：springboot-xiaomi.md

---

## 一、后端代码架构（Spring Boot）

### 项目信息
- 框架：Spring Boot
- 数据库：MySQL
- 接口风格：RESTful JSON
- 运行端口：8080

### 分层结构

```
src/main/java/com/mistore/
├── controller/            ← 接口层：接收 HTTP 请求，调用 service，返回统一 JSON
├── service/               ← 业务逻辑层：处理核心业务规则、事务控制
│   └── impl/              ← service 实现类
├── repository/            ← 数据访问层：操作数据库（JPA / MyBatis）
├── entity/                ← 数据实体：对应数据库表
├── dto/                   ← 数据传输对象：接口入参和出参封装
├── config/                ← 配置类：跨域、安全、Bean 等
└── exception/             ← 统一异常处理

src/main/resources/
├── application.yml        ← 数据库连接、端口等配置
└── db/
    └── schema.sql         ← 建表 SQL
```

### 各层职责说明

| 层 | 目录 | 职责 | 不该做的事 |
|---|---|---|---|
| 接口层 | controller/ | 接收请求、参数校验、调用 service | 不写业务逻辑 |
| 业务层 | service/ | 核心业务规则、事务控制 | 不直接操作数据库 |
| 数据层 | repository/ | 数据库 CRUD | 不写业务判断 |
| 实体层 | entity/ | 数据库表映射 | 不写业务方法 |
| 传输层 | dto/ | 接口入参/出参封装 | 不含业务逻辑 |

### 各模块文件规范

#### 用户管理模块
```
controller/UserController.java          ← 接口：/api/auth/**、/api/users/**
service/UserService.java                ← 接口定义
service/impl/UserServiceImpl.java       ← 实现（含密码加密、角色校验）
repository/UserRepository.java          ← 数据库操作
entity/User.java                        ← 字段：id / username / password / role / status
dto/UserLoginDTO.java                   ← 入参：username / password
dto/UserResponseDTO.java                ← 出参：id / username / role（不含密码）
```

#### 商品管理模块
```
controller/ProductController.java       ← 接口：/api/products/**
service/ProductService.java
service/impl/ProductServiceImpl.java
repository/ProductRepository.java
entity/Product.java                     ← 字段：id / name / category / price / stock / minStock / status
dto/ProductCreateDTO.java               ← 入参：name / category / price / stock / minStock
dto/ProductUpdateDTO.java               ← 入参：price / stock / status
dto/ProductResponseDTO.java             ← 出参：完整商品信息 + 是否预警标记
```

#### 库存管理模块
```
controller/InventoryController.java     ← 接口：/api/inventory/**
service/InventoryService.java
service/impl/InventoryServiceImpl.java  ← 含入库/出库后自动更新 product.stock 逻辑
repository/InventoryRepository.java
entity/Inventory.java                   ← 字段：id / productId / type / quantity / remark / operatorId / updateTime
dto/InventoryInDTO.java                 ← 入参：productId / quantity / remark
dto/InventoryOutDTO.java                ← 入参：productId / quantity / remark
```

#### 订单管理模块
```
controller/OrderController.java         ← 接口：/api/orders/**
service/OrderService.java
service/impl/OrderServiceImpl.java      ← 含下单后扣库存、支付后累积积分逻辑
repository/OrderRepository.java
repository/OrderItemRepository.java
entity/Order.java                       ← 字段：id / memberId / operatorId / orderTime / totalPrice / paymentMethod / status
entity/OrderItem.java                   ← 字段：id / orderId / productId / quantity / unitPrice（价格快照）
dto/OrderCreateDTO.java                 ← 入参：memberId（可空）/ items[{productId, quantity}]
dto/OrderPayDTO.java                    ← 入参：paymentMethod
dto/OrderResponseDTO.java               ← 出参：订单信息 + 明细列表
```

#### 会员管理模块
```
controller/MemberController.java        ← 接口：/api/members/**
service/MemberService.java
service/impl/MemberServiceImpl.java     ← 含等级自动计算逻辑
repository/MemberRepository.java
repository/PointRecordRepository.java
entity/Member.java                      ← 字段：id / name / phone / points / level / createdAt
entity/PointRecord.java                 ← 字段：id / memberId / orderId / pointChange / createdAt
dto/MemberCreateDTO.java                ← 入参：name / phone
dto/MemberResponseDTO.java              ← 出参：完整会员信息
```

#### 统计分析模块
```
controller/StatController.java          ← 接口：/api/stats/**
service/StatService.java
service/impl/StatServiceImpl.java       ← 聚合查询逻辑
（无独立 entity，复用 Order / Product / Member 数据）
dto/SalesSummaryDTO.java                ← 出参：totalSales / totalOrders / bestProduct / storeIncome
```

#### 系统配置模块
```
controller/SystemController.java        ← 接口：/api/system/**
config/CorsConfig.java                  ← 跨域配置（允许前端 localhost:3000）
config/SecurityConfig.java              ← 基础安全配置（第一版可简化）
exception/GlobalExceptionHandler.java  ← 统一异常返回格式
```

### 统一返回格式

```java
// 所有接口统一返回 Result<T>，字段名与接口文档保持一致
public class Result<T> {
    private Integer statusCode;   // HTTP状态码，200成功 / 400参数错误 / 403无权限 / 404不存在 / 500服务错误
    private String businessCode;  // 业务代码，固定值 "store-management-service"
    private Integer opCode;       // 操作码，0表示成功，非0表示失败
    private String opDesc;        // 操作描述，如 "成功" / "参数错误"
    private String localTime;     // 响应时间，格式 "yyyy-MM-dd HH:mm:ss"
    private T data;               // 业务数据，无数据时省略该字段

    public static <T> Result<T> success(T data) { ... }
    public static Result<Void> error(int statusCode, int opCode, String opDesc) { ... }
}
```

---

## 二、前端代码架构（React）

### 项目信息
- 框架：React
- 接口地址：http://localhost:8080
- 运行端口：3000

### 目录结构

```
src/
├── pages/                     ← 页面组件（对应路由）
│   ├── Login/                 ← 登录页
│   ├── Dashboard/             ← 首页概览
│   ├── Product/               ← 商品管理
│   │   ├── index.jsx          ← 商品列表页
│   │   └── Form.jsx           ← 新增/编辑表单
│   ├── Inventory/             ← 库存管理
│   │   ├── index.jsx          ← 库存列表
│   │   └── InOut.jsx          ← 入库/出库操作
│   ├── Order/                 ← 订单管理
│   │   ├── index.jsx          ← 订单列表
│   │   ├── Create.jsx         ← 创建订单
│   │   └── Detail.jsx         ← 订单详情
│   ├── Member/                ← 会员管理
│   │   ├── index.jsx          ← 会员列表
│   │   └── Detail.jsx         ← 会员详情+积分记录
│   ├── Stats/                 ← 统计分析
│   │   └── index.jsx          ← 销售统计看板
│   └── System/                ← 系统配置
│       └── index.jsx
│
├── components/                ← 公共组件（多页面复用）
│   ├── Layout/
│   │   ├── index.jsx          ← 整体布局（侧边栏 + 顶部栏 + 内容区）
│   │   └── Sidebar.jsx        ← 侧边导航菜单
│   ├── Table/                 ← 公共数据表格（含分页）
│   ├── StatusTag/             ← 状态标签（上架/下架/订单状态等）
│   └── ConfirmModal/          ← 二次确认弹窗（删除/退款等操作）
│
├── api/                       ← 接口请求封装
│   ├── request.js             ← axios 基础配置（baseURL、拦截器、错误处理）
│   ├── user.js                ← 用户相关接口
│   ├── product.js             ← 商品相关接口
│   ├── inventory.js           ← 库存相关接口
│   ├── order.js               ← 订单相关接口
│   ├── member.js              ← 会员相关接口
│   └── stats.js               ← 统计相关接口
│
├── router/
│   └── index.jsx              ← 路由配置 + 登录守卫
│
├── store/                     ← 全局状态（第一版只存 currentUser）
│   └── userStore.js
│
└── utils/
    ├── format.js              ← 日期格式化、金额格式化
    └── auth.js                ← token 存取、登录状态判断
```

### 各层职责说明

| 目录 | 职责 | 不该做的事 |
|---|---|---|
| pages/ | 页面展示、用户交互、调用 api/ | 不直接写 axios 请求 |
| components/ | 可复用 UI 组件 | 不包含页面业务逻辑 |
| api/ | 所有后端接口调用 | 不处理 UI 状态 |
| router/ | 路由定义和登录守卫 | |
| store/ | 全局共享状态（当前用户信息） | 不存放页面临时状态 |

### 接口请求规范

```javascript
// api/request.js —— 统一配置
import axios from 'axios'

const request = axios.create({
  baseURL: 'http://localhost:8080',
  timeout: 5000
})

// 请求拦截：自动带上 token
request.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// 响应拦截：统一处理错误码
request.interceptors.response.use(
  res => res.data,
  err => {
    if (err.response?.status === 401) {
      // token 失效，跳转登录
      window.location.href = '/login'
    }
    return Promise.reject(err)
  }
)

export default request
```

```javascript
// api/product.js —— 商品模块接口示例
import request from './request'

export const getProductList = (params) => request.get('/api/products', { params })
export const getProductById = (id) => request.get(`/api/products/${id}`)
export const createProduct = (data) => request.post('/api/products', data)
export const updateProduct = (id, data) => request.put(`/api/products/${id}`, data)
export const updateProductStatus = (id, status) => request.put(`/api/products/${id}/status`, { status })
```

### 页面与接口对应关系

| 页面 | 调用接口 | 说明 |
|---|---|---|
| Login | POST /api/auth/login | 登录，存 token |
| Dashboard | GET /api/stats/summary | 首页概览数据 |
| Product/index | GET /api/products | 商品列表 |
| Product/Form | POST /api/products | 新增商品 |
| Product/Form | PUT /api/products/:id | 编辑商品 |
| Inventory/index | GET /api/inventory | 库存列表 + 预警 |
| Inventory/InOut | POST /api/inventory/in | 入库 |
| Inventory/InOut | POST /api/inventory/out | 出库 |
| Order/index | GET /api/orders | 订单列表 |
| Order/Create | POST /api/orders | 创建订单 |
| Order/Create | PUT /api/orders/:id/pay | 订单支付 |
| Order/Detail | GET /api/orders/:id | 订单详情 |
| Member/index | GET /api/members | 会员列表 |
| Member/Detail | GET /api/members/:id | 会员详情 |
| Member/Detail | GET /api/members/:id/points | 积分记录 |
| Stats/index | GET /api/stats/sales | 销售统计 |

---

## 三、前后端联调说明

### 本地开发启动顺序
1. 启动后端：`mvn spring-boot:run`（端口 8080）
2. 启动前端：`npm run dev`（端口 3000）
3. 后端已配置跨域允许 `localhost:3000`

### 联调注意事项
- 前端所有接口请求统一走 `api/request.js`，不要在页面直接写 axios
- 后端接口统一返回 `Result<T>` 格式，前端通过 `res.data` 取数据
- token 存在 `localStorage`，请求拦截器自动附加
- 第一版不强制接 Spring Security，后端可用角色字段手动判断权限
