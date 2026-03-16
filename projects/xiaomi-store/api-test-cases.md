# 小米之家门店管理系统 — 接口测试用例文档

> 覆盖正常场景 / 边界值 / 异常场景 | 18 个接口 | V1.0

---

## 一、测试说明

- 本文档覆盖系统全部 18 个后端接口的测试用例，每个接口包含：正常场景（Happy Path）、边界值测试和异常场景测试。
- 测试工具建议：Postman，将用例整理为 Collection 便于批量运行。
- 所有需要认证的接口，请求头必须携带有效 JWT Token：`Authorization: Bearer <token>`。
- 通用成功响应格式：`statusCode=200`，`opCode=0`；失败响应：`opCode` 非 0，`opDesc` 说明具体原因。

---

## 二、用户认证模块

### TC-001  用户登录  `POST /v1/auth/login`

| 用例编号 | 用例名称 | 输入数据 | 预期结果 | 类型 |
|----------|----------|----------|----------|------|
| TC-001-01 | 正常登录 | `{"userName":"admin","password":"password123"}` | 200，opCode=0，返回 token 字段 | 正常 |
| TC-001-02 | 密码错误 | `{"userName":"admin","password":"wrongpwd"}` | opCode≠0，opDesc 含"密码"或"账号"错误提示 | 异常 |
| TC-001-03 | 用户名不存在 | `{"userName":"notexist","password":"123456"}` | opCode≠0，提示账号或密码错误（不暴露用户是否存在） | 异常 |
| TC-001-04 | userName 为空 | `{"userName":"","password":"password123"}` | opCode≠0，提示参数错误 | 边界 |
| TC-001-05 | password 超长（>100字符） | 密码字段填写 101 位字符串 | opCode≠0，提示参数错误 | 边界 |
| TC-001-06 | 请求体为空 JSON | `{}` | opCode≠0，提示必填字段缺失 | 异常 |

### TC-002  用户登出  `POST /v1/auth/logout`

| 用例编号 | 用例名称 | 输入数据 | 预期结果 | 类型 |
|----------|----------|----------|----------|------|
| TC-002-01 | 正常登出 | 携带有效 Token | 200，opCode=0 | 正常 |
| TC-002-02 | 无 Token 登出 | 不携带 Authorization 头 | statusCode=401，提示未授权 | 异常 |
| TC-002-03 | 重复使用已登出 Token | 登出后再次用同一 Token 请求 | 401，Token 已失效 | 异常 |

### TC-003  用户注册  `POST /v1/users/register`

| 用例编号 | 用例名称 | 输入数据 | 预期结果 | 类型 |
|----------|----------|----------|----------|------|
| TC-003-01 | 正常注册 | 合法的 userName/email/password | 200，opCode=0 | 正常 |
| TC-003-02 | 邮箱格式非法 | email 填写 "notanemail" | opCode≠0，提示邮箱格式错误 | 边界 |
| TC-003-03 | 密码强度不足（少于8位） | password 填写 "123" | opCode≠0，提示密码强度不足 | 边界 |
| TC-003-04 | 用户名已存在 | 使用已注册的 userName | opCode≠0，提示用户名已被使用 | 异常 |
| TC-003-05 | 邮箱已被注册 | 使用已注册的 email | opCode≠0，提示邮箱已被注册 | 异常 |
| TC-003-06 | userName 超长（>50字符） | userName 填写 51 位字符 | opCode≠0，提示参数长度超限 | 边界 |

---

## 三、商品管理模块

### TC-007  获取商品列表  `GET /v1/products`

| 用例编号 | 用例名称 | 输入参数 | 预期结果 | 类型 |
|----------|----------|----------|----------|------|
| TC-007-01 | 不带参数获取列表 | 无额外参数 | 默认返回第1页10条数据，包含分页字段 | 正常 |
| TC-007-02 | 按分类筛选 | `categoryId=100` | 返回仅属于该分类的商品 | 正常 |
| TC-007-03 | 按关键词搜索 | `keyword=苹果` | 返回商品名称含"苹果"的商品 | 正常 |
| TC-007-04 | 分页参数正常 | `pageNum=2&pageSize=5` | 返回第2页最多5条数据 | 正常 |
| TC-007-05 | pageNum=0（非法页码） | `pageNum=0` | opCode≠0，提示参数非法 | 边界 |
| TC-007-06 | pageSize 超大（1000） | `pageSize=1000` | 系统限制最大页数或返回所有，无报错 | 边界 |
| TC-007-07 | 不携带 Token | 无 Authorization 头 | statusCode=401 | 异常 |

### TC-009  新增商品  `POST /v1/products`

| 用例编号 | 用例名称 | 输入数据 | 预期结果 | 类型 |
|----------|----------|----------|----------|------|
| TC-009-01 | 正常新增 | 合法的 productName/categoryId/price/stockQuantity | 200，opCode=0，商品列表中可查到新商品 | 正常 |
| TC-009-02 | price 为负数 | `"price":-1` | opCode≠0，提示价格不能为负 | 边界 |
| TC-009-03 | stockQuantity 为负数 | `"stockQuantity":-1` | opCode≠0，提示库存不能为负 | 边界 |
| TC-009-04 | categoryId 不存在 | `"categoryId":99999` | opCode≠0，提示分类不存在 | 异常 |
| TC-009-05 | productName 为空 | `"productName":""` | opCode≠0，提示商品名称必填 | 边界 |
| TC-009-06 | productName 超长（>100字符） | 填写 101 位商品名 | opCode≠0，提示名称超长 | 边界 |
| TC-009-07 | price 为 0 | `"price":0` | 200，opCode=0，允许价格为0 | 边界 |

---

## 四、库存管理模块

> 库存模块核心测试点：出入库后 `product.stock` 字段是否正确更新，以及库存不足时的保护逻辑。

| 用例编号 | 接口 | 用例名称 | 输入数据 | 预期结果 | 类型 |
|----------|------|----------|----------|----------|------|
| TC-INV-01 | POST /v1/inventory/in | 正常入库 | productId=1001, quantity=50 | 200，product.stockQuantity 增加50 | 正常 |
| TC-INV-02 | POST /v1/inventory/in | 入库数量为0 | quantity=0 | opCode≠0，提示数量必须大于0 | 边界 |
| TC-INV-03 | POST /v1/inventory/in | 商品ID不存在 | productId=99999 | opCode≠0，提示商品不存在 | 异常 |
| TC-INV-04 | POST /v1/inventory/out | 正常出库 | 当前库存100，quantity=30 | 200，stockQuantity 变为70 | 正常 |
| TC-INV-05 | POST /v1/inventory/out | 库存不足出库 | 当前库存5，quantity=10 | opCode≠0，提示库存不足 | 边界 |
| TC-INV-06 | POST /v1/inventory/out | 恰好全部出库 | 当前库存50，quantity=50 | 200，stockQuantity 变为0 | 边界 |
| TC-INV-07 | GET /v1/stock/logs | 查询指定商品日志 | productId=1001 | 返回该商品所有出入库记录 | 正常 |
| TC-INV-08 | GET /v1/stock/logs | 预警标记验证 | 让库存低于 minStock | 商品详情接口返回 isLowStock=true | 正常 |

---

## 五、订单管理模块

> 订单模块是系统核心，重点测试：库存扣减原子性、支付状态流转、积分联动逻辑。

### TC-ORD  创建订单  `POST /v1/orders`

| 用例编号 | 用例名称 | 输入数据 | 预期结果 | 类型 |
|----------|----------|----------|----------|------|
| TC-ORD-01 | 正常下单（游客） | memberId 不传，items 含1个商品 | 200，订单创建，对应商品库存减少 | 正常 |
| TC-ORD-02 | 正常下单（关联会员） | 传入有效 memberId | 200，订单创建，支付后可累积积分 | 正常 |
| TC-ORD-03 | 多商品下单 | items 包含3个不同商品 | 200，每个商品库存各自减少对应数量 | 正常 |
| TC-ORD-04 | 商品库存不足 | 某商品库存5，下单数量10 | opCode≠0，提示库存不足，所有库存不扣减（原子性） | 边界 |
| TC-ORD-05 | 商品不存在 | items 中包含 productId=99999 | opCode≠0，提示商品不存在 | 异常 |
| TC-ORD-06 | 商品已下架 | 下单已下架商品 | opCode≠0，提示商品不可购买 | 异常 |
| TC-ORD-07 | items 为空数组 | `"items":[]` | opCode≠0，提示订单明细不能为空 | 边界 |
| TC-ORD-08 | 数量为0 | `"quantity":0` | opCode≠0，提示数量必须大于0 | 边界 |

### TC-PAY  订单支付  `PUT /v1/orders/{id}/pay`

| 用例编号 | 用例名称 | 输入数据 | 预期结果 | 类型 |
|----------|----------|----------|----------|------|
| TC-PAY-01 | 正常支付 | 有效 orderId，paymentMethod=WECHAT | 200，订单状态变为已支付（1） | 正常 |
| TC-PAY-02 | 重复支付已支付订单 | 已支付的 orderId 再次发起支付 | opCode≠0，提示订单已支付 | 异常 |
| TC-PAY-03 | 支付后积分增加 | 关联了会员的订单支付 | 200，查询该会员积分有所增加 | 正常 |
| TC-PAY-04 | 支付不存在的订单 | orderId=99999 | opCode≠0，提示订单不存在 | 异常 |

---

## 六、会员管理模块

| 用例编号 | 接口 | 用例名称 | 预期结果 | 类型 |
|----------|------|----------|----------|------|
| TC-MEM-01 | POST /v1/members | 正常注册会员（手机号+姓名） | 200，返回会员信息，自动生成会员卡号 | 正常 |
| TC-MEM-02 | POST /v1/members | 手机号已被注册 | opCode≠0，提示手机号已存在 | 异常 |
| TC-MEM-03 | POST /v1/members | 手机号格式非法（非11位） | opCode≠0，提示手机号格式错误 | 边界 |
| TC-MEM-04 | GET /v1/members | 按手机号关键词搜索 | 返回手机号含该关键词的会员 | 正常 |
| TC-MEM-05 | GET /v1/members/{id} | 获取存在的会员详情 | 200，返回完整会员信息 | 正常 |
| TC-MEM-06 | GET /v1/members/{id} | 获取不存在的会员 | opCode≠0，提示会员不存在 | 异常 |
| TC-MEM-07 | GET /v1/members/{id}/points | 查询积分记录 | 返回该会员所有积分变动记录列表 | 正常 |
| TC-MEM-08 | 等级自动晋升 | 积分累积到各晋级阈值 | 查询会员，level 字段自动升级 | 正常 |

---

## 七、统计报表模块

| 用例编号 | 用例名称 | 输入参数 | 预期结果 | 类型 |
|----------|----------|----------|----------|------|
| TC-STAT-01 | 按天查询统计 | `timeRange=DAY` | 返回今日 totalSales/totalOrders/hotProducts/salesTrend | 正常 |
| TC-STAT-02 | 按周查询统计 | `timeRange=WEEK` | 返回本周汇总数据，salesTrend 包含7个日期数据点 | 正常 |
| TC-STAT-03 | 按月查询统计 | `timeRange=MONTH` | 返回本月数据，salesTrend 包含当月所有日期数据点 | 正常 |
| TC-STAT-04 | 自定义日期范围 | `startDate=2025-01-01&endDate=2025-01-31` | 返回该区间数据 | 正常 |
| TC-STAT-05 | 结束日期早于开始日期 | `startDate=2025-03-01&endDate=2025-01-01` | opCode≠0，提示日期范围非法 | 边界 |
| TC-STAT-06 | 空数据期间查询 | 查询无订单的日期 | 200，totalSales=0，totalOrders=0，hotProducts=[] | 边界 |

---

## 八、测试优先级汇总

| 优先级 | 接口/用例范围 | 原因 |
|--------|---------------|------|
| P0 必测 | TC-001登录、TC-ORD-01~08创建订单、TC-INV-04~06出库、TC-PAY-01~03支付 | 系统核心流程，任何一项失败都影响主业务 |
| P1 高优 | TC-003注册、TC-009新增商品、TC-MEM-01会员注册、TC-STAT-01统计 | 覆盖核心增删改查和数据准确性 |
| P2 常规 | TC-007列表分页筛选、TC-ORD 订单列表、TC-MEM-04~07会员查询 | 覆盖查询功能的分页和筛选逻辑 |
| P3 边界 | 所有"边界"类型用例（负数/超长/空值） | 提升系统健壮性，确保参数校验覆盖完整 |
