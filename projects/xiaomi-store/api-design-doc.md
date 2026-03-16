# 接口设计文档

## 目录

- [用户登录](#1-用户登录)
- [用户登出](#2-用户登出)
- [用户注册](#3-用户注册)
- [获取用户信息](#4-获取用户信息)
- [获取角色列表](#5-获取角色列表)
- [获取权限列表](#6-获取权限列表)
- [获取商品列表](#7-获取商品列表)
- [获取商品详情](#8-获取商品详情)
- [新增商品](#9-新增商品)
- [编辑商品](#10-编辑商品)
- [删除商品](#11-删除商品)
- [获取商品分类列表](#12-获取商品分类列表)
- [获取订单列表](#13-获取订单列表)
- [获取订单详情](#14-获取订单详情)
- [获取会员列表](#15-获取会员列表)
- [获取会员详情](#16-获取会员详情)
- [获取库存日志列表](#17-获取库存日志列表)
- [获取统计报表](#18-获取统计报表)

---

## 1. 用户登录

**接口描述：** 用户通过账号密码登录系统

### 基本信息

| 项目 | 说明 |
|---|---|
| 请求方法 | `POST` |
| 请求路径 | `/v1/auth/login` |
| 所属Controller | AuthController |
| 认证方式 | 无 |

### 接口实现逻辑

1. 验证用户名和密码是否正确
2. 若验证通过，生成JWT Token并返回
3. 若验证失败，返回错误信息

### 请求参数

**请求头**

| 参数名 | 类型 | 必填 | 说明 | 示例 |
|---|---|---|---|---|
| Content-Type | String | 是 | 内容类型 | application/json |

**请求体参数**

| 字段名 | 类型 | 必填 | 说明 | 约束 | 示例 |
|---|---|---|---|---|---|
| userName | String | 是 | 用户名 | 最大长度50 | admin |
| password | String | 是 | 密码 | 最大长度100 | password123 |

```json
{
  "userName": "admin",
  "password": "password123"
}
```

### 响应结果

**响应参数说明**

| 字段名 | 类型 | 说明 | 示例 |
|---|---|---|---|
| statusCode | Integer | HTTP状态码 | 200 |
| businessCode | String | 业务代码 | store-management-service |
| opCode | Integer | 操作码，0表示成功 | 0 |
| opDesc | String | 操作描述 | 成功 |
| localTime | String | 本地时间 | 2025-12-22 19:57:46 |
| data | Object | 业务数据 | - |
| data.token | String | JWT Token | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... |

**成功响应**

```json
{
    "statusCode": 200,
    "businessCode": "store-management-service",
    "opCode": 0,
    "opDesc": "成功",
    "localTime": "2025-12-22 19:57:46",
    "data": {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
}
```

---

## 2. 用户登出

**接口描述：** 用户退出登录

### 基本信息

| 项目 | 说明 |
|---|---|
| 请求方法 | `POST` |
| 请求路径 | `/v1/auth/logout` |
| 所属Controller | AuthController |
| 认证方式 | JWT Token |

### 接口实现逻辑

1. 验证JWT Token有效性
2. 将Token加入黑名单，使其失效

### 请求参数

**请求头**

| 参数名 | 类型 | 必填 | 说明 | 示例 |
|---|---|---|---|---|
| Authorization | String | 是 | JWT Token | Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... |
| Content-Type | String | 是 | 内容类型 | application/json |

### 响应结果

**响应参数说明**

| 字段名 | 类型 | 说明 | 示例 |
|---|---|---|---|
| statusCode | Integer | HTTP状态码 | 200 |
| businessCode | String | 业务代码 | store-management-service |
| opCode | Integer | 操作码，0表示成功 | 0 |
| opDesc | String | 操作描述 | 成功 |
| localTime | String | 本地时间 | 2025-12-22 19:57:46 |

**成功响应**

```json
{
    "statusCode": 200,
    "businessCode": "store-management-service",
    "opCode": 0,
    "opDesc": "成功",
    "localTime": "2025-12-22 19:57:46"
}
```

---

## 3. 用户注册

**接口描述：** 新用户注册账户

### 基本信息

| 项目 | 说明 |
|---|---|
| 请求方法 | `POST` |
| 请求路径 | `/v1/users/register` |
| 所属Controller | UserController |
| 认证方式 | 无 |

### 接口实现逻辑

1. 验证邮箱是否已被注册
2. 验证密码强度
3. 创建用户并保存到数据库
4. 发送确认邮件

### 请求参数

**请求头**

| 参数名 | 类型 | 必填 | 说明 | 示例 |
|---|---|---|---|---|
| Content-Type | String | 是 | 内容类型 | application/json |

**请求体参数**

| 字段名 | 类型 | 必填 | 说明 | 约束 | 示例 |
|---|---|---|---|---|---|
| userName | String | 是 | 用户名 | 最大长度50 | user001 |
| email | String | 是 | 邮箱地址 | 邮箱格式 | user@example.com |
| password | String | 是 | 密码 | 至少8位，包含字母和数字 | Password123 |

```json
{
  "userName": "user001",
  "email": "user@example.com",
  "password": "Password123"
}
```

### 响应结果

**响应参数说明**

| 字段名 | 类型 | 说明 | 示例 |
|---|---|---|---|
| statusCode | Integer | HTTP状态码 | 200 |
| businessCode | String | 业务代码 | store-management-service |
| opCode | Integer | 操作码，0表示成功 | 0 |
| opDesc | String | 操作描述 | 成功 |
| localTime | String | 本地时间 | 2025-12-22 19:57:46 |

**成功响应**

```json
{
    "statusCode": 200,
    "businessCode": "store-management-service",
    "opCode": 0,
    "opDesc": "成功",
    "localTime": "2025-12-22 19:57:46"
}
```

---

## 4. 获取用户信息

**接口描述：** 根据用户ID获取用户详细信息

### 基本信息

| 项目 | 说明 |
|---|---|
| 请求方法 | `GET` |
| 请求路径 | `/v1/users/{userId}` |
| 所属Controller | UserController |
| 认证方式 | JWT Token |

### 接口实现逻辑

1. 验证JWT Token有效性
2. 根据用户ID查询用户信息
3. 返回用户详细信息

### 请求参数

**请求头**

| 参数名 | 类型 | 必填 | 说明 | 示例 |
|---|---|---|---|---|
| Authorization | String | 是 | JWT Token | Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... |
| Content-Type | String | 是 | 内容类型 | application/json |

**路径参数**

| 参数名 | 类型 | 必填 | 说明 | 示例 |
|---|---|---|---|---|
| userId | Long | 是 | 用户ID | 1001 |

### 响应结果

**响应参数说明**

| 字段名 | 类型 | 说明 | 示例 |
|---|---|---|---|
| statusCode | Integer | HTTP状态码 | 200 |
| businessCode | String | 业务代码 | store-management-service |
| opCode | Integer | 操作码，0表示成功 | 0 |
| opDesc | String | 操作描述 | 成功 |
| localTime | String | 本地时间 | 2025-12-22 19:57:46 |
| data | Object | 业务数据 | - |
| data.userId | Long | 用户业务ID | 1001 |
| data.userName | String | 用户名 | admin |
| data.roleId | Long | 角色ID | 100 |
| data.status | Integer | 用户状态 | 0 |
| data.createTime | String | 创建时间 | 2025-01-01T10:00:00Z |
| data.updateTime | String | 更新时间 | 2025-01-01T10:00:00Z |

**成功响应**

```json
{
    "statusCode": 200,
    "businessCode": "store-management-service",
    "opCode": 0,
    "opDesc": "成功",
    "localTime": "2025-12-22 19:57:46",
    "data": {
        "userId": 1001,
        "userName": "admin",
        "roleId": 100,
        "status": 0,
        "createTime": "2025-01-01T10:00:00Z",
        "updateTime": "2025-01-01T10:00:00Z"
    }
}
```

---

## 5. 获取角色列表

**接口描述：** 获取所有角色信息列表

### 基本信息

| 项目 | 说明 |
|---|---|
| 请求方法 | `GET` |
| 请求路径 | `/v1/roles` |
| 所属Controller | RoleController |
| 认证方式 | JWT Token |

### 接口实现逻辑

1. 验证JWT Token有效性
2. 查询所有角色信息
3. 返回角色列表

### 请求参数

**请求头**

| 参数名 | 类型 | 必填 | 说明 | 示例 |
|---|---|---|---|---|
| Authorization | String | 是 | JWT Token | Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... |
| Content-Type | String | 是 | 内容类型 | application/json |

**查询参数**

| 参数名 | 类型 | 必填 | 说明 | 约束 | 默认值 |
|---|---|---|---|---|---|
| pageNum | Integer | 否 | 当前页码 | ≥1 | 1 |
| pageSize | Integer | 否 | 每页大小 | ≥1 | 10 |

### 响应结果

**响应参数说明**

| 字段名 | 类型 | 说明 | 示例 |
|---|---|---|---|
| statusCode | Integer | HTTP状态码 | 200 |
| businessCode | String | 业务代码 | store-management-service |
| opCode | Integer | 操作码，0表示成功 | 0 |
| opDesc | String | 操作描述 | 成功 |
| pageNum | String | 当前页码 | 1 |
| pageSize | String | 每页大小 | 10 |
| pages | String | 总页数 | 1 |
| total | String | 总记录数 | 2 |
| localTime | String | 本地时间 | 2025-12-22 19:57:46 |
| data | Array | 业务数据 | - |
| data[].roleId | Long | 角色业务ID | 100 |
| data[].roleName | String | 角色名称 | 管理员 |
| data[].description | String | 角色描述 | 系统管理员 |
| data[].createTime | String | 创建时间 | 2025-01-01T10:00:00Z |
| data[].updateTime | String | 更新时间 | 2025-01-01T10:00:00Z |

**成功响应**

```json
{
    "statusCode": 200,
    "businessCode": "store-management-service",
    "opCode": 0,
    "opDesc": "成功",
    "pageNum": "1",
    "pageSize": "10",
    "pages": "1",
    "total": "2",
    "localTime": "2025-12-22 19:57:46",
    "data": [
        {
            "roleId": 100,
            "roleName": "管理员",
            "description": "系统管理员",
            "createTime": "2025-01-01T10:00:00Z",
            "updateTime": "2025-01-01T10:00:00Z"
        },
        {
            "roleId": 101,
            "roleName": "店员",
            "description": "门店销售人员",
            "createTime": "2025-01-01T10:00:00Z",
            "updateTime": "2025-01-01T10:00:00Z"
        }
    ]
}
```

---

## 6. 获取权限列表

**接口描述：** 获取所有权限信息列表

### 基本信息

| 项目 | 说明 |
|---|---|
| 请求方法 | `GET` |
| 请求路径 | `/v1/permissions` |
| 所属Controller | PermissionController |
| 认证方式 | JWT Token |

### 接口实现逻辑

1. 验证JWT Token有效性
2. 查询所有权限信息
3. 返回权限列表

### 请求参数

**请求头**

| 参数名 | 类型 | 必填 | 说明 | 示例 |
|---|---|---|---|---|
| Authorization | String | 是 | JWT Token | Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... |
| Content-Type | String | 是 | 内容类型 | application/json |

### 响应结果

**响应参数说明**

| 字段名 | 类型 | 说明 | 示例 |
|---|---|---|---|
| statusCode | Integer | HTTP状态码 | 200 |
| businessCode | String | 业务代码 | store-management-service |
| opCode | Integer | 操作码，0表示成功 | 0 |
| opDesc | String | 操作描述 | 成功 |
| localTime | String | 本地时间 | 2025-12-22 19:57:46 |
| data | Array | 业务数据 | - |
| data[].permissionId | Long | 权限业务ID | 1000 |
| data[].permissionCode | String | 权限编码 | USER_MANAGE |
| data[].permissionName | String | 权限名称 | 用户管理 |
| data[].description | String | 权限描述 | 用户信息管理 |
| data[].createTime | String | 创建时间 | 2025-01-01T10:00:00Z |
| data[].updateTime | String | 更新时间 | 2025-01-01T10:00:00Z |

**成功响应**

```json
{
    "statusCode": 200,
    "businessCode": "store-management-service",
    "opCode": 0,
    "opDesc": "成功",
    "localTime": "2025-12-22 19:57:46",
    "data": [
        {
            "permissionId": 1000,
            "permissionCode": "USER_MANAGE",
            "permissionName": "用户管理",
            "description": "用户信息管理",
            "createTime": "2025-01-01T10:00:00Z",
            "updateTime": "2025-01-01T10:00:00Z"
        },
        {
            "permissionId": 1001,
            "permissionCode": "PRODUCT_MANAGE",
            "permissionName": "商品管理",
            "description": "商品信息管理",
            "createTime": "2025-01-01T10:00:00Z",
            "updateTime": "2025-01-01T10:00:00Z"
        }
    ]
}
```

---

## 7. 获取商品列表

**接口描述：** 获取商品信息列表，支持分页、筛选和排序

### 基本信息

| 项目 | 说明 |
|---|---|
| 请求方法 | `GET` |
| 请求路径 | `/v1/products` |
| 所属Controller | ProductController |
| 认证方式 | JWT Token |

### 接口实现逻辑

1. 验证JWT Token有效性
2. 根据查询条件筛选商品信息
3. 返回商品列表

### 请求参数

**请求头**

| 参数名 | 类型 | 必填 | 说明 | 示例 |
|---|---|---|---|---|
| Authorization | String | 是 | JWT Token | Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... |
| Content-Type | String | 是 | 内容类型 | application/json |

**查询参数**

| 参数名 | 类型 | 必填 | 说明 | 约束 | 默认值 |
|---|---|---|---|---|---|
| pageNum | Integer | 否 | 当前页码 | ≥1 | 1 |
| pageSize | Integer | 否 | 每页大小 | ≥1 | 10 |
| status | Integer | 否 | 商品状态 | 0-上架，1-下架 | null |
| categoryId | Long | 否 | 商品分类ID | >0 | null |
| keyword | String | 否 | 商品名称关键词 | 最大长度100 | null |

### 响应结果

**响应参数说明**

| 字段名 | 类型 | 说明 | 示例 |
|---|---|---|---|
| statusCode | Integer | HTTP状态码 | 200 |
| businessCode | String | 业务代码 | store-management-service |
| opCode | Integer | 操作码，0表示成功 | 0 |
| opDesc | String | 操作描述 | 成功 |
| pageNum | String | 当前页码 | 1 |
| pageSize | String | 每页大小 | 10 |
| pages | String | 总页数 | 1 |
| total | String | 总记录数 | 2 |
| localTime | String | 本地时间 | 2025-12-22 19:57:46 |
| data | Array | 业务数据 | - |
| data[].productId | Long | 商品业务ID | 1001 |
| data[].productCode | String | 商品编码 | PROD202501010001 |
| data[].productName | String | 商品名称 | 苹果手机 |
| data[].categoryId | Long | 分类ID | 100 |
| data[].price | BigDecimal | 商品价格 | 5999.00 |
| data[].stockQuantity | Integer | 库存数量 | 100 |
| data[].status | Integer | 商品状态 | 0 |
| data[].description | String | 商品描述 | 高端智能手机 |
| data[].createTime | String | 创建时间 | 2025-01-01T10:00:00Z |
| data[].updateTime | String | 更新时间 | 2025-01-01T10:00:00Z |

**成功响应**

```json
{
    "statusCode": 200,
    "businessCode": "store-management-service",
    "opCode": 0,
    "opDesc": "成功",
    "pageNum": "1",
    "pageSize": "10",
    "pages": "1",
    "total": "2",
    "localTime": "2025-12-22 19:57:46",
    "data": [
        {
            "productId": 1001,
            "productCode": "PROD202501010001",
            "productName": "苹果手机",
            "categoryId": 100,
            "price": 5999.00,
            "stockQuantity": 100,
            "status": 0,
            "description": "高端智能手机",
            "createTime": "2025-01-01T10:00:00Z",
            "updateTime": "2025-01-01T10:00:00Z"
        },
        {
            "productId": 1002,
            "productCode": "PROD202501010002",
            "productName": "华为手机",
            "categoryId": 100,
            "price": 4999.00,
            "stockQuantity": 50,
            "status": 0,
            "description": "智能商务手机",
            "createTime": "2025-01-01T10:00:00Z",
            "updateTime": "2025-01-01T10:00:00Z"
        }
    ]
}
```

---

## 8. 获取商品详情

**接口描述：** 根据商品ID获取商品详细信息

### 基本信息

| 项目 | 说明 |
|---|---|
| 请求方法 | `GET` |
| 请求路径 | `/v1/products/{productId}` |
| 所属Controller | ProductController |
| 认证方式 | JWT Token |

### 接口实现逻辑

1. 验证JWT Token有效性
2. 根据商品ID查询商品信息
3. 返回商品详细信息

### 请求参数

**请求头**

| 参数名 | 类型 | 必填 | 说明 | 示例 |
|---|---|---|---|---|
| Authorization | String | 是 | JWT Token | Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... |
| Content-Type | String | 是 | 内容类型 | application/json |

**路径参数**

| 参数名 | 类型 | 必填 | 说明 | 示例 |
|---|---|---|---|---|
| productId | Long | 是 | 商品ID | 1001 |

### 响应结果

**响应参数说明**

| 字段名 | 类型 | 说明 | 示例 |
|---|---|---|---|
| statusCode | Integer | HTTP状态码 | 200 |
| businessCode | String | 业务代码 | store-management-service |
| opCode | Integer | 操作码，0表示成功 | 0 |
| opDesc | String | 操作描述 | 成功 |
| localTime | String | 本地时间 | 2025-12-22 19:57:46 |
| data | Object | 业务数据 | - |
| data.productId | Long | 商品业务ID | 1001 |
| data.productCode | String | 商品编码 | PROD202501010001 |
| data.productName | String | 商品名称 | 苹果手机 |
| data.categoryId | Long | 分类ID | 100 |
| data.price | BigDecimal | 商品价格 | 5999.00 |
| data.stockQuantity | Integer | 库存数量 | 100 |
| data.status | Integer | 商品状态 | 0 |
| data.description | String | 商品描述 | 高端智能手机 |
| data.createTime | String | 创建时间 | 2025-01-01T10:00:00Z |
| data.updateTime | String | 更新时间 | 2025-01-01T10:00:00Z |

**成功响应**

```json
{
    "statusCode": 200,
    "businessCode": "store-management-service",
    "opCode": 0,
    "opDesc": "成功",
    "localTime": "2025-12-22 19:57:46",
    "data": {
        "productId": 1001,
        "productCode": "PROD202501010001",
        "productName": "苹果手机",
        "categoryId": 100,
        "price": 5999.00,
        "stockQuantity": 100,
        "status": 0,
        "description": "高端智能手机",
        "createTime": "2025-01-01T10:00:00Z",
        "updateTime": "2025-01-01T10:00:00Z"
    }
}
```

---

## 9. 新增商品

**接口描述：** 添加新的商品信息

### 基本信息

| 项目 | 说明 |
|---|---|
| 请求方法 | `POST` |
| 请求路径 | `/v1/products` |
| 所属Controller | ProductController |
| 认证方式 | JWT Token |

### 接口实现逻辑

1. 验证JWT Token有效性
2. 验证商品信息合法性
3. 生成商品编码
4. 保存商品信息到数据库

### 请求参数

**请求头**

| 参数名 | 类型 | 必填 | 说明 | 示例 |
|---|---|---|---|---|
| Authorization | String | 是 | JWT Token | Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... |
| Content-Type | String | 是 | 内容类型 | application/json |

**请求体参数**

| 字段名 | 类型 | 必填 | 说明 | 约束 | 示例 |
|---|---|---|---|---|---|
| productName | String | 是 | 商品名称 | 最大长度100 | 苹果手机 |
| categoryId | Long | 是 | 分类ID | >0 | 100 |
| price | BigDecimal | 是 | 商品价格 | ≥0 | 5999.00 |
| stockQuantity | Integer | 是 | 库存数量 | ≥0 | 100 |
| description | String | 否 | 商品描述 | 最大长度65535 | 高端智能手机 |

```json
{
  "productName": "苹果手机",
  "categoryId": 100,
  "price": 5999.00,
  "stockQuantity": 100,
  "description": "高端智能手机"
}
```

### 响应结果

**响应参数说明**

| 字段名 | 类型 | 说明 | 示例 |
|---|---|---|---|
| statusCode | Integer | HTTP状态码 | 200 |
| businessCode | String | 业务代码 | store-management-service |
| opCode | Integer | 操作码，0表示成功 | 0 |
| opDesc | String | 操作描述 | 成功 |
| localTime | String | 本地时间 | 2025-12-22 19:57:46 |

**成功响应**

```json
{
    "statusCode": 200,
    "businessCode": "store-management-service",
    "opCode": 0,
    "opDesc": "成功",
    "localTime": "2025-12-22 19:57:46"
}
```

---

## 10. 编辑商品

**接口描述：** 修改现有商品信息

### 基本信息

| 项目 | 说明 |
|---|---|
| 请求方法 | `PUT` |
| 请求路径 | `/v1/products/{productId}` |
| 所属Controller | ProductController |
| 认证方式 | JWT Token |

### 接口实现逻辑

1. 验证JWT Token有效性
2. 根据商品ID查询商品信息
3. 验证商品信息合法性
4. 更新商品信息到数据库

### 请求参数

**请求头**

| 参数名 | 类型 | 必填 | 说明 | 示例 |
|---|---|---|---|---|
| Authorization | String | 是 | JWT Token | Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... |
| Content-Type | String | 是 | 内容类型 | application/json |

**路径参数**

| 参数名 | 类型 | 必填 | 说明 | 示例 |
|---|---|---|---|---|
| productId | Long | 是 | 商品ID | 1001 |

**请求体参数**

| 字段名 | 类型 | 必填 | 说明 | 约束 | 示例 |
|---|---|---|---|---|---|
| productName | String | 否 | 商品名称 | 最大长度100 | 苹果手机 |
| categoryId | Long | 否 | 分类ID | >0 | 100 |
| price | BigDecimal | 否 | 商品价格 | ≥0 | 5999.00 |
| stockQuantity | Integer | 否 | 库存数量 | ≥0 | 100 |
| description | String | 否 | 商品描述 | 最大长度65535 | 高端智能手机 |

```json
{
  "productName": "苹果手机Pro",
  "price": 6999.00,
  "stockQuantity": 120
}
```

### 响应结果

**响应参数说明**

| 字段名 | 类型 | 说明 | 示例 |
|---|---|---|---|
| statusCode | Integer | HTTP状态码 | 200 |
| businessCode | String | 业务代码 | store-management-service |
| opCode | Integer | 操作码，0表示成功 | 0 |
| opDesc | String | 操作描述 | 成功 |
| localTime | String | 本地时间 | 2025-12-22 19:57:46 |

**成功响应**

```json
{
    "statusCode": 200,
    "businessCode": "store-management-service",
    "opCode": 0,
    "opDesc": "成功",
    "localTime": "2025-12-22 19:57:46"
}
```

---

## 11. 删除商品

**接口描述：** 删除指定商品信息

### 基本信息

| 项目 | 说明 |
|---|---|
| 请求方法 | `DELETE` |
| 请求路径 | `/v1/products/{productId}` |
| 所属Controller | ProductController |
| 认证方式 | JWT Token |

### 接口实现逻辑

1. 验证JWT Token有效性
2. 根据商品ID查询商品信息
3. 删除商品信息

### 请求参数

**请求头**

| 参数名 | 类型 | 必填 | 说明 | 示例 |
|---|---|---|---|---|
| Authorization | String | 是 | JWT Token | Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... |
| Content-Type | String | 是 | 内容类型 | application/json |

**路径参数**

| 参数名 | 类型 | 必填 | 说明 | 示例 |
|---|---|---|---|---|
| productId | Long | 是 | 商品ID | 1001 |

### 响应结果

**响应参数说明**

| 字段名 | 类型 | 说明 | 示例 |
|---|---|---|---|
| statusCode | Integer | HTTP状态码 | 200 |
| businessCode | String | 业务代码 | store-management-service |
| opCode | Integer | 操作码，0表示成功 | 0 |
| opDesc | String | 操作描述 | 成功 |
| localTime | String | 本地时间 | 2025-12-22 19:57:46 |

**成功响应**

```json
{
    "statusCode": 200,
    "businessCode": "store-management-service",
    "opCode": 0,
    "opDesc": "成功",
    "localTime": "2025-12-22 19:57:46"
}
```

---

## 12. 获取商品分类列表

**接口描述：** 获取商品分类信息列表

### 基本信息

| 项目 | 说明 |
|---|---|
| 请求方法 | `GET` |
| 请求路径 | `/v1/categories` |
| 所属Controller | CategoryController |
| 认证方式 | JWT Token |

### 接口实现逻辑

1. 验证JWT Token有效性
2. 查询所有商品分类信息
3. 返回分类列表

### 请求参数

**请求头**

| 参数名 | 类型 | 必填 | 说明 | 示例 |
|---|---|---|---|---|
| Authorization | String | 是 | JWT Token | Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... |
| Content-Type | String | 是 | 内容类型 | application/json |

### 响应结果

**响应参数说明**

| 字段名 | 类型 | 说明 | 示例 |
|---|---|---|---|
| statusCode | Integer | HTTP状态码 | 200 |
| businessCode | String | 业务代码 | store-management-service |
| opCode | Integer | 操作码，0表示成功 | 0 |
| opDesc | String | 操作描述 | 成功 |
| localTime | String | 本地时间 | 2025-12-22 19:57:46 |
| data | Array | 业务数据 | - |
| data[].categoryId | Long | 分类业务ID | 100 |
| data[].categoryName | String | 分类名称 | 手机数码 |
| data[].parentId | Long | 父分类ID | 0 |
| data[].level | Integer | 分类层级 | 1 |
| data[].createTime | String | 创建时间 | 2025-01-01T10:00:00Z |
| data[].updateTime | String | 更新时间 | 2025-01-01T10:00:00Z |

**成功响应**

```json
{
    "statusCode": 200,
    "businessCode": "store-management-service",
    "opCode": 0,
    "opDesc": "成功",
    "localTime": "2025-12-22 19:57:46",
    "data": [
        {
            "categoryId": 100,
            "categoryName": "手机数码",
            "parentId": 0,
            "level": 1,
            "createTime": "2025-01-01T10:00:00Z",
            "updateTime": "2025-01-01T10:00:00Z"
        },
        {
            "categoryId": 101,
            "categoryName": "笔记本电脑",
            "parentId": 100,
            "level": 2,
            "createTime": "2025-01-01T10:00:00Z",
            "updateTime": "2025-01-01T10:00:00Z"
        }
    ]
}
```

---

## 13. 获取订单列表

**接口描述：** 获取订单信息列表，支持分页、筛选和排序

### 基本信息

| 项目 | 说明 |
|---|---|
| 请求方法 | `GET` |
| 请求路径 | `/v1/orders` |
| 所属Controller | OrderController |
| 认证方式 | JWT Token |

### 接口实现逻辑

1. 验证JWT Token有效性
2. 根据查询条件筛选订单信息
3. 返回订单列表

### 请求参数

**请求头**

| 参数名 | 类型 | 必填 | 说明 | 示例 |
|---|---|---|---|---|
| Authorization | String | 是 | JWT Token | Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... |
| Content-Type | String | 是 | 内容类型 | application/json |

**查询参数**

| 参数名 | 类型 | 必填 | 说明 | 约束 | 默认值 |
|---|---|---|---|---|---|
| pageNum | Integer | 否 | 当前页码 | ≥1 | 1 |
| pageSize | Integer | 否 | 每页大小 | ≥1 | 10 |
| status | Integer | 否 | 订单状态 | 0-待支付，1-已支付，2-已取消 | null |
| keyword | String | 否 | 订单号关键词 | 最大长度64 | null |

### 响应结果

**响应参数说明**

| 字段名 | 类型 | 说明 | 示例 |
|---|---|---|---|
| statusCode | Integer | HTTP状态码 | 200 |
| businessCode | String | 业务代码 | store-management-service |
| opCode | Integer | 操作码，0表示成功 | 0 |
| opDesc | String | 操作描述 | 成功 |
| pageNum | String | 当前页码 | 1 |
| pageSize | String | 每页大小 | 10 |
| pages | String | 总页数 | 1 |
| total | String | 总记录数 | 2 |
| localTime | String | 本地时间 | 2025-12-22 19:57:46 |
| data | Array | 业务数据 | - |
| data[].orderId | Long | 订单业务ID | 1001 |
| data[].orderNo | String | 订单号 | ORD202501010001 |
| data[].userId | Long | 用户ID | 1001 |
| data[].amount | BigDecimal | 订单金额 | 5999.00 |
| data[].status | Integer | 订单状态 | 0 |
| data[].createTime | String | 创建时间 | 2025-01-01T10:00:00Z |
| data[].updateTime | String | 更新时间 | 2025-01-01T10:00:00Z |

**成功响应**

```json
{
    "statusCode": 200,
    "businessCode": "store-management-service",
    "opCode": 0,
    "opDesc": "成功",
    "pageNum": "1",
    "pageSize": "10",
    "pages": "1",
    "total": "2",
    "localTime": "2025-12-22 19:57:46",
    "data": [
        {
            "orderId": 1001,
            "orderNo": "ORD202501010001",
            "userId": 1001,
            "amount": 5999.00,
            "status": 0,
            "createTime": "2025-01-01T10:00:00Z",
            "updateTime": "2025-01-01T10:00:00Z"
        },
        {
            "orderId": 1002,
            "orderNo": "ORD202501010002",
            "userId": 1001,
            "amount": 4999.00,
            "status": 1,
            "createTime": "2025-01-01T10:00:00Z",
            "updateTime": "2025-01-01T10:00:00Z"
        }
    ]
}
```

---

## 14. 获取订单详情

**接口描述：** 根据订单ID获取订单详细信息

### 基本信息

| 项目 | 说明 |
|---|---|
| 请求方法 | `GET` |
| 请求路径 | `/v1/orders/{orderId}` |
| 所属Controller | OrderController |
| 认证方式 | JWT Token |

### 接口实现逻辑

1. 验证JWT Token有效性
2. 根据订单ID查询订单信息
3. 返回订单详细信息

### 请求参数

**请求头**

| 参数名 | 类型 | 必填 | 说明 | 示例 |
|---|---|---|---|---|
| Authorization | String | 是 | JWT Token | Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... |
| Content-Type | String | 是 | 内容类型 | application/json |

**路径参数**

| 参数名 | 类型 | 必填 | 说明 | 示例 |
|---|---|---|---|---|
| orderId | Long | 是 | 订单ID | 1001 |

### 响应结果

**响应参数说明**

| 字段名 | 类型 | 说明 | 示例 |
|---|---|---|---|
| statusCode | Integer | HTTP状态码 | 200 |
| businessCode | String | 业务代码 | store-management-service |
| opCode | Integer | 操作码，0表示成功 | 0 |
| opDesc | String | 操作描述 | 成功 |
| localTime | String | 本地时间 | 2025-12-22 19:57:46 |
| data | Object | 业务数据 | - |
| data.orderId | Long | 订单业务ID | 1001 |
| data.orderNo | String | 订单号 | ORD202501010001 |
| data.userId | Long | 用户ID | 1001 |
| data.amount | BigDecimal | 订单金额 | 5999.00 |
| data.status | Integer | 订单状态 | 0 |
| data.createTime | String | 创建时间 | 2025-01-01T10:00:00Z |
| data.updateTime | String | 更新时间 | 2025-01-01T10:00:00Z |

**成功响应**

```json
{
    "statusCode": 200,
    "businessCode": "store-management-service",
    "opCode": 0,
    "opDesc": "成功",
    "localTime": "2025-12-22 19:57:46",
    "data": {
        "orderId": 1001,
        "orderNo": "ORD202501010001",
        "userId": 1001,
        "amount": 5999.00,
        "status": 0,
        "createTime": "2025-01-01T10:00:00Z",
        "updateTime": "2025-01-01T10:00:00Z"
    }
}
```

---

## 15. 获取会员列表

**接口描述：** 获取会员信息列表，支持分页、筛选和排序

### 基本信息

| 项目 | 说明 |
|---|---|
| 请求方法 | `GET` |
| 请求路径 | `/v1/members` |
| 所属Controller | MemberController |
| 认证方式 | JWT Token |

### 接口实现逻辑

1. 验证JWT Token有效性
2. 根据查询条件筛选会员信息
3. 返回会员列表

### 请求参数

**请求头**

| 参数名 | 类型 | 必填 | 说明 | 示例 |
|---|---|---|---|---|
| Authorization | String | 是 | JWT Token | Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... |
| Content-Type | String | 是 | 内容类型 | application/json |

**查询参数**

| 参数名 | 类型 | 必填 | 说明 | 约束 | 默认值 |
|---|---|---|---|---|---|
| pageNum | Integer | 否 | 当前页码 | ≥1 | 1 |
| pageSize | Integer | 否 | 每页大小 | ≥1 | 10 |
| keyword | String | 否 | 手机号关键词 | 最大长度20 | null |

### 响应结果

**响应参数说明**

| 字段名 | 类型 | 说明 | 示例 |
|---|---|---|---|
| statusCode | Integer | HTTP状态码 | 200 |
| businessCode | String | 业务代码 | store-management-service |
| opCode | Integer | 操作码，0表示成功 | 0 |
| opDesc | String | 操作描述 | 成功 |
| pageNum | String | 当前页码 | 1 |
| pageSize | String | 每页大小 | 10 |
| pages | String | 总页数 | 1 |
| total | String | 总记录数 | 2 |
| localTime | String | 本地时间 | 2025-12-22 19:57:46 |
| data | Array | 业务数据 | - |
| data[].memberId | Long | 会员业务ID | 1001 |
| data[].phone | String | 手机号 | 13800138000 |
| data[].name | String | 姓名 | 张三 |
| data[].birthday | String | 生日 | 1990-01-01 |
| data[].memberCardNo | String | 会员卡号 | MCN0001 |
| data[].points | Integer | 积分 | 1000 |
| data[].level | Integer | 会员等级 | 1 |
| data[].createTime | String | 创建时间 | 2025-01-01T10:00:00Z |
| data[].updateTime | String | 更新时间 | 2025-01-01T10:00:00Z |

**成功响应**

```json
{
    "statusCode": 200,
    "businessCode": "store-management-service",
    "opCode": 0,
    "opDesc": "成功",
    "pageNum": "1",
    "pageSize": "10",
    "pages": "1",
    "total": "2",
    "localTime": "2025-12-22 19:57:46",
    "data": [
        {
            "memberId": 1001,
            "phone": "13800138000",
            "name": "张三",
            "birthday": "1990-01-01",
            "memberCardNo": "MCN0001",
            "points": 1000,
            "level": 1,
            "createTime": "2025-01-01T10:00:00Z",
            "updateTime": "2025-01-01T10:00:00Z"
        },
        {
            "memberId": 1002,
            "phone": "13800138001",
            "name": "李四",
            "birthday": "1992-02-02",
            "memberCardNo": "MCN0002",
            "points": 800,
            "level": 1,
            "createTime": "2025-01-01T10:00:00Z",
            "updateTime": "2025-01-01T10:00:00Z"
        }
    ]
}
```

---

## 16. 获取会员详情

**接口描述：** 根据会员ID获取会员详细信息

### 基本信息

| 项目 | 说明 |
|---|---|
| 请求方法 | `GET` |
| 请求路径 | `/v1/members/{memberId}` |
| 所属Controller | MemberController |
| 认证方式 | JWT Token |

### 接口实现逻辑

1. 验证JWT Token有效性
2. 根据会员ID查询会员信息
3. 返回会员详细信息

### 请求参数

**请求头**

| 参数名 | 类型 | 必填 | 说明 | 示例 |
|---|---|---|---|---|
| Authorization | String | 是 | JWT Token | Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... |
| Content-Type | String | 是 | 内容类型 | application/json |

**路径参数**

| 参数名 | 类型 | 必填 | 说明 | 示例 |
|---|---|---|---|---|
| memberId | Long | 是 | 会员ID | 1001 |

### 响应结果

**响应参数说明**

| 字段名 | 类型 | 说明 | 示例 |
|---|---|---|---|
| statusCode | Integer | HTTP状态码 | 200 |
| businessCode | String | 业务代码 | store-management-service |
| opCode | Integer | 操作码，0表示成功 | 0 |
| opDesc | String | 操作描述 | 成功 |
| localTime | String | 本地时间 | 2025-12-22 19:57:46 |
| data | Object | 业务数据 | - |
| data.memberId | Long | 会员业务ID | 1001 |
| data.phone | String | 手机号 | 13800138000 |
| data.name | String | 姓名 | 张三 |
| data.birthday | String | 生日 | 1990-01-01 |
| data.memberCardNo | String | 会员卡号 | MCN0001 |
| data.points | Integer | 积分 | 1000 |
| data.level | Integer | 会员等级 | 1 |
| data.createTime | String | 创建时间 | 2025-01-01T10:00:00Z |
| data.updateTime | String | 更新时间 | 2025-01-01T10:00:00Z |

**成功响应**

```json
{
    "statusCode": 200,
    "businessCode": "store-management-service",
    "opCode": 0,
    "opDesc": "成功",
    "localTime": "2025-12-22 19:57:46",
    "data": {
        "memberId": 1001,
        "phone": "13800138000",
        "name": "张三",
        "birthday": "1990-01-01",
        "memberCardNo": "MCN0001",
        "points": 1000,
        "level": 1,
        "createTime": "2025-01-01T10:00:00Z",
        "updateTime": "2025-01-01T10:00:00Z"
    }
}
```

---

## 17. 获取库存日志列表

**接口描述：** 获取库存操作日志列表，支持分页、筛选和排序

### 基本信息

| 项目 | 说明 |
|---|---|
| 请求方法 | `GET` |
| 请求路径 | `/v1/stock/logs` |
| 所属Controller | StockLogController |
| 认证方式 | JWT Token |

### 接口实现逻辑

1. 验证JWT Token有效性
2. 根据查询条件筛选库存日志信息
3. 返回库存日志列表

### 请求参数

**请求头**

| 参数名 | 类型 | 必填 | 说明 | 示例 |
|---|---|---|---|---|
| Authorization | String | 是 | JWT Token | Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... |
| Content-Type | String | 是 | 内容类型 | application/json |

**查询参数**

| 参数名 | 类型 | 必填 | 说明 | 约束 | 默认值 |
|---|---|---|---|---|---|
| pageNum | Integer | 否 | 当前页码 | ≥1 | 1 |
| pageSize | Integer | 否 | 每页大小 | ≥1 | 10 |
| productId | Long | 否 | 商品ID | >0 | null |
| operatorId | Long | 否 | 操作人ID | >0 | null |

### 响应结果

**响应参数说明**

| 字段名 | 类型 | 说明 | 示例 |
|---|---|---|---|
| statusCode | Integer | HTTP状态码 | 200 |
| businessCode | String | 业务代码 | store-management-service |
| opCode | Integer | 操作码，0表示成功 | 0 |
| opDesc | String | 操作描述 | 成功 |
| pageNum | String | 当前页码 | 1 |
| pageSize | String | 每页大小 | 10 |
| pages | String | 总页数 | 1 |
| total | String | 总记录数 | 2 |
| localTime | String | 本地时间 | 2025-12-22 19:57:46 |
| data | Array | 业务数据 | - |
| data[].logId | Long | 日志业务ID | 1001 |
| data[].productId | Long | 商品ID | 1001 |
| data[].operatorId | Long | 操作人ID | 1001 |
| data[].operationType | Integer | 操作类型 | 0 |
| data[].quantity | Integer | 变动数量 | 100 |
| data[].reason | String | 操作原因 | 进货入库 |
| data[].createTime | String | 创建时间 | 2025-01-01T10:00:00Z |
| data[].updateTime | String | 更新时间 | 2025-01-01T10:00:00Z |

**成功响应**

```json
{
    "statusCode": 200,
    "businessCode": "store-management-service",
    "opCode": 0,
    "opDesc": "成功",
    "pageNum": "1",
    "pageSize": "10",
    "pages": "1",
    "total": "2",
    "localTime": "2025-12-22 19:57:46",
    "data": [
        {
            "logId": 1001,
            "productId": 1001,
            "operatorId": 1001,
            "operationType": 0,
            "quantity": 100,
            "reason": "进货入库",
            "createTime": "2025-01-01T10:00:00Z",
            "updateTime": "2025-01-01T10:00:00Z"
        },
        {
            "logId": 1002,
            "productId": 1001,
            "operatorId": 1001,
            "operationType": 1,
            "quantity": 50,
            "reason": "销售出库",
            "createTime": "2025-01-01T10:00:00Z",
            "updateTime": "2025-01-01T10:00:00Z"
        }
    ]
}
```

---

## 18. 获取统计报表

**接口描述：** 获取各类统计报表数据

### 基本信息

| 项目 | 说明 |
|---|---|
| 请求方法 | `GET` |
| 请求路径 | `/v1/reports/statistics` |
| 所属Controller | ReportController |
| 认证方式 | JWT Token |

### 接口实现逻辑

1. 验证JWT Token有效性
2. 根据查询条件生成统计报表数据
3. 返回统计报表结果

### 请求参数

**请求头**

| 参数名 | 类型 | 必填 | 说明 | 示例 |
|---|---|---|---|---|
| Authorization | String | 是 | JWT Token | Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... |
| Content-Type | String | 是 | 内容类型 | application/json |

**查询参数**

| 参数名 | 类型 | 必填 | 说明 | 约束 | 默认值 |
|---|---|---|---|---|---|
| timeRange | String | 否 | 时间范围 | DAY/WEEK/MONTH/YEAR | DAY |
| startDate | String | 否 | 开始日期 | YYYY-MM-DD | null |
| endDate | String | 否 | 结束日期 | YYYY-MM-DD | null |

### 响应结果

**响应参数说明**

| 字段名 | 类型 | 说明 | 示例 |
|---|---|---|---|
| statusCode | Integer | HTTP状态码 | 200 |
| businessCode | String | 业务代码 | store-management-service |
| opCode | Integer | 操作码，0表示成功 | 0 |
| opDesc | String | 操作描述 | 成功 |
| localTime | String | 本地时间 | 2025-12-22 19:57:46 |
| data | Object | 业务数据 | - |
| data.totalSales | BigDecimal | 总销售额 | 100000.00 |
| data.totalOrders | Integer | 总订单数 | 100 |
| data.hotProducts | Array | 热销商品列表 | - |
| data.hotProducts[].productId | Long | 商品ID | 1001 |
| data.hotProducts[].productName | String | 商品名称 | 苹果手机 |
| data.hotProducts[].salesVolume | Integer | 销量 | 50 |
| data.salesTrend | Array | 销售趋势数据 | - |
| data.salesTrend[].date | String | 日期 | 2025-01-01 |
| data.salesTrend[].amount | BigDecimal | 销售额 | 10000.00 |

**成功响应**

```json
{
    "statusCode": 200,
    "businessCode": "store-management-service",
    "opCode": 0,
    "opDesc": "成功",
    "localTime": "2025-12-22 19:57:46",
    "data": {
        "totalSales": 100000.00,
        "totalOrders": 100,
        "hotProducts": [
            {
                "productId": 1001,
                "productName": "苹果手机",
                "salesVolume": 50
            },
            {
                "productId": 1002,
                "productName": "华为手机",
                "salesVolume": 40
            }
        ],
        "salesTrend": [
            {
                "date": "2025-01-01",
                "amount": 10000.00
            },
            {
                "date": "2025-01-02",
                "amount": 12000.00
            }
        ]
    }
}
```
