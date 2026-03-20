# 数据库表结构说明

## 1. 主要数据表说明

---

### USER_INFO — 用户信息表

存储系统用户的基本信息。

**索引：**
- 主键索引：`TID`
- 唯一索引：`UK_USER_NAME`（用户名）
- 普通索引：`IDX_ROLE_ID`（角色ID）

| 字段名称 | 字段类型 | 字段说明 | 是否必填 |
|---|---|---|---|
| TID | BIGINT | 自增ID | 是 |
| USER_ID | BIGINT | 用户业务ID | 是 |
| USER_NAME | VARCHAR(50) | 用户名 | 是 |
| PASSWORD | VARCHAR(100) | 密码 | 是 |
| ROLE_ID | BIGINT | 角色ID | 否 |
| STATUS | TINYINT | 用户状态：0-正常，1-禁用 | 是 |
| CREATE_TIME | DATETIME | 创建时间 | 是 |
| UPDATE_TIME | DATETIME | 更新时间 | 是 |

---

### ROLE_INFO — 角色信息表

存储系统角色信息。

**索引：**
- 主键索引：`TID`
- 唯一索引：`UK_ROLE_NAME`（角色名称）

| 字段名称 | 字段类型 | 字段说明 | 是否必填 |
|---|---|---|---|
| TID | BIGINT | 自增ID | 是 |
| ROLE_ID | BIGINT | 角色业务ID | 是 |
| ROLE_NAME | VARCHAR(50) | 角色名称 | 是 |
| DESCRIPTION | VARCHAR(200) | 角色描述 | 否 |
| CREATE_TIME | DATETIME | 创建时间 | 是 |
| UPDATE_TIME | DATETIME | 更新时间 | 是 |

---

### PERMISSION_INFO — 权限信息表

存储系统权限信息。

**索引：**
- 主键索引：`TID`
- 唯一索引：`UK_PERMISSION_CODE`（权限编码）

| 字段名称 | 字段类型 | 字段说明 | 是否必填 |
|---|---|---|---|
| TID | BIGINT | 自增ID | 是 |
| PERMISSION_ID | BIGINT | 权限业务ID | 是 |
| PERMISSION_CODE | VARCHAR(50) | 权限编码 | 是 |
| PERMISSION_NAME | VARCHAR(100) | 权限名称 | 是 |
| DESCRIPTION | VARCHAR(200) | 权限描述 | 否 |
| CREATE_TIME | DATETIME | 创建时间 | 是 |
| UPDATE_TIME | DATETIME | 更新时间 | 是 |

---

### ROLE_PERMISSION_REL — 角色权限关联表

用于角色与权限的多对多关系。

**索引：**
- 主键索引：`TID`
- 普通索引：`IDX_ROLE_ID`（角色ID）
- 普通索引：`IDX_PERMISSION_ID`（权限ID）

| 字段名称 | 字段类型 | 字段说明 | 是否必填 |
|---|---|---|---|
| TID | BIGINT | 自增ID | 是 |
| ROLE_ID | BIGINT | 角色ID | 是 |
| PERMISSION_ID | BIGINT | 权限ID | 是 |
| CREATE_TIME | DATETIME | 创建时间 | 是 |
| UPDATE_TIME | DATETIME | 更新时间 | 是 |

---

### PRODUCT_INFO — 商品信息表

存储商品的基本信息。

**索引：**
- 主键索引：`TID`
- 唯一索引：`UK_PRODUCT_CODE`（商品编码）
- 普通索引：`IDX_CATEGORY_ID`（分类ID）
- 普通索引：`IDX_STATUS`（商品状态）

| 字段名称 | 字段类型 | 字段说明 | 是否必填 |
|---|---|---|---|
| TID | BIGINT | 自增ID | 是 |
| PRODUCT_ID | BIGINT | 商品业务ID | 是 |
| PRODUCT_CODE | VARCHAR(30) | 商品编码 | 是 |
| PRODUCT_NAME | VARCHAR(100) | 商品名称 | 是 |
| CATEGORY_ID | BIGINT | 分类ID | 是 |
| PRICE | DECIMAL(10,2) | 商品价格 | 是 |
| STOCK_QUANTITY | INT | 库存数量 | 是 |
| STATUS | TINYINT | 商品状态：0-上架，1-下架 | 是 |
| DESCRIPTION | TEXT | 商品描述 | 否 |
| CREATE_TIME | DATETIME | 创建时间 | 是 |
| UPDATE_TIME | DATETIME | 更新时间 | 是 |

---

### CATEGORY_INFO — 商品分类信息表

存储商品分类信息。

**索引：**
- 主键索引：`TID`
- 唯一索引：`UK_CATEGORY_NAME`（分类名称）
- 普通索引：`IDX_PARENT_ID`（父分类ID）

| 字段名称 | 字段类型 | 字段说明 | 是否必填 |
|---|---|---|---|
| TID | BIGINT | 自增ID | 是 |
| CATEGORY_ID | BIGINT | 分类业务ID | 是 |
| CATEGORY_NAME | VARCHAR(50) | 分类名称 | 是 |
| PARENT_ID | BIGINT | 父分类ID | 否 |
| LEVEL | TINYINT | 分类层级 | 是 |
| CREATE_TIME | DATETIME | 创建时间 | 是 |
| UPDATE_TIME | DATETIME | 更新时间 | 是 |

---

### STOCK_IN_INFO — 商品入库信息表

记录商品入库操作。

**索引：**
- 主键索引：`TID`
- 普通索引：`IDX_PRODUCT_ID`（商品ID）
- 普通索引：`IDX_OPERATOR_ID`（操作人ID）

| 字段名称 | 字段类型 | 字段说明 | 是否必填 |
|---|---|---|---|
| TID | BIGINT | 自增ID | 是 |
| STOCK_IN_ID | BIGINT | 入库业务ID | 是 |
| PRODUCT_ID | BIGINT | 商品ID | 是 |
| QUANTITY | INT | 入库数量 | 是 |
| OPERATOR_ID | BIGINT | 操作人ID | 是 |
| CREATE_TIME | DATETIME | 创建时间 | 是 |
| UPDATE_TIME | DATETIME | 更新时间 | 是 |

---

### STOCK_OUT_INFO — 商品出库信息表

记录商品出库操作。

**索引：**
- 主键索引：`TID`
- 普通索引：`IDX_PRODUCT_ID`（商品ID）
- 普通索引：`IDX_OPERATOR_ID`（操作人ID）

| 字段名称 | 字段类型 | 字段说明 | 是否必填 |
|---|---|---|---|
| TID | BIGINT | 自增ID | 是 |
| STOCK_OUT_ID | BIGINT | 出库业务ID | 是 |
| PRODUCT_ID | BIGINT | 商品ID | 是 |
| QUANTITY | INT | 出库数量 | 是 |
| OPERATOR_ID | BIGINT | 操作人ID | 是 |
| CREATE_TIME | DATETIME | 创建时间 | 是 |
| UPDATE_TIME | DATETIME | 更新时间 | 是 |

---

### ORDER_INFO — 订单信息表

存储销售订单相关信息。

**索引：**
- 主键索引：`TID`
- 唯一索引：`UK_ORDER_NO`（订单号）
- 普通索引：`IDX_USER_ID`（用户ID）
- 普通索引：`IDX_STATUS`（订单状态）

| 字段名称 | 字段类型 | 字段说明 | 是否必填 |
|---|---|---|---|
| TID | BIGINT | 自增ID | 是 |
| ORDER_ID | BIGINT | 订单业务ID | 是 |
| ORDER_NO | VARCHAR(64) | 订单号 | 是 |
| USER_ID | BIGINT | 用户ID | 是 |
| AMOUNT | DECIMAL(10,2) | 订单金额 | 是 |
| STATUS | TINYINT | 订单状态：0-待支付，1-已支付，2-已取消 | 是 |
| CREATE_TIME | DATETIME | 创建时间 | 是 |
| UPDATE_TIME | DATETIME | 更新时间 | 是 |

---

### ORDER_ITEM_INFO — 订单明细信息表

存储订单中每个商品的信息。

**索引：**
- 主键索引：`TID`
- 普通索引：`IDX_ORDER_ID`（订单ID）
- 普通索引：`IDX_PRODUCT_ID`（商品ID）

| 字段名称 | 字段类型 | 字段说明 | 是否必填 |
|---|---|---|---|
| TID | BIGINT | 自增ID | 是 |
| ORDER_ITEM_ID | BIGINT | 订单明细业务ID | 是 |
| ORDER_ID | BIGINT | 订单ID | 是 |
| PRODUCT_ID | BIGINT | 商品ID | 是 |
| QUANTITY | INT | 数量 | 是 |
| UNIT_PRICE | DECIMAL(10,2) | 单价 | 是 |
| TOTAL_PRICE | DECIMAL(10,2) | 小计 | 是 |
| CREATE_TIME | DATETIME | 创建时间 | 是 |
| UPDATE_TIME | DATETIME | 更新时间 | 是 |

---

### MEMBER_INFO — 会员信息表

存储会员的基本信息。

**索引：**
- 主键索引：`TID`
- 唯一索引：`UK_PHONE`（手机号）
- 唯一索引：`UK_MEMBER_CARD_NO`（会员卡号）

| 字段名称 | 字段类型 | 字段说明 | 是否必填 |
|---|---|---|---|
| TID | BIGINT | 自增ID | 是 |
| MEMBER_ID | BIGINT | 会员业务ID | 是 |
| PHONE | VARCHAR(20) | 手机号 | 是 |
| NAME | VARCHAR(50) | 姓名 | 是 |
| BIRTHDAY | DATE | 生日 | 否 |
| MEMBER_CARD_NO | VARCHAR(20) | 会员卡号 | 是 |
| POINTS | INT | 积分 | 是 |
| LEVEL | TINYINT | 会员等级 | 是 |
| CREATE_TIME | DATETIME | 创建时间 | 是 |
| UPDATE_TIME | DATETIME | 更新时间 | 是 |

---

### MEMBER_CONSUME_RECORD — 会员消费记录表

存储会员消费历史记录。

**索引：**
- 主键索引：`TID`
- 普通索引：`IDX_MEMBER_ID`（会员ID）
- 普通索引：`IDX_ORDER_ID`（订单ID）

| 字段名称 | 字段类型 | 字段说明 | 是否必填 |
|---|---|---|---|
| TID | BIGINT | 自增ID | 是 |
| RECORD_ID | BIGINT | 消费记录业务ID | 是 |
| MEMBER_ID | BIGINT | 会员ID | 是 |
| ORDER_ID | BIGINT | 订单ID | 是 |
| CONSUME_AMOUNT | DECIMAL(10,2) | 消费金额 | 是 |
| POINTS_GAINED | INT | 获得积分 | 是 |
| CREATE_TIME | DATETIME | 创建时间 | 是 |
| UPDATE_TIME | DATETIME | 更新时间 | 是 |

---

### STOCK_LOG_INFO — 库存操作日志表

记录所有库存变动的操作日志。

**索引：**
- 主键索引：`TID`
- 普通索引：`IDX_PRODUCT_ID`（商品ID）
- 普通索引：`IDX_OPERATOR_ID`（操作人ID）

| 字段名称 | 字段类型 | 字段说明 | 是否必填 |
|---|---|---|---|
| TID | BIGINT | 自增ID | 是 |
| LOG_ID | BIGINT | 日志业务ID | 是 |
| PRODUCT_ID | BIGINT | 商品ID | 是 |
| OPERATOR_ID | BIGINT | 操作人ID | 是 |
| OPERATION_TYPE | TINYINT | 操作类型：0-入库，1-出库 | 是 |
| QUANTITY | INT | 变动数量 | 是 |
| REASON | VARCHAR(200) | 操作原因 | 否 |
| CREATE_TIME | DATETIME | 创建时间 | 是 |
| UPDATE_TIME | DATETIME | 更新时间 | 是 |

---

### STOCK_WARNING_RULE — 库存预警规则表

存储库存预警规则配置。

**索引：**
- 主键索引：`TID`
- 普通索引：`IDX_PRODUCT_ID`（商品ID）

| 字段名称 | 字段类型 | 字段说明 | 是否必填 |
|---|---|---|---|
| TID | BIGINT | 自增ID | 是 |
| RULE_ID | BIGINT | 规则业务ID | 是 |
| PRODUCT_ID | BIGINT | 商品ID | 是 |
| MIN_STOCK | INT | 最低库存阈值 | 是 |
| WARNING_METHOD | VARCHAR(20) | 预警方式 | 是 |
| ENABLED | TINYINT | 是否启用：0-否，1-是 | 是 |
| CREATE_TIME | DATETIME | 创建时间 | 是 |
| UPDATE_TIME | DATETIME | 更新时间 | 是 |

---

## 2. 数据库表结构 Flyway 脚本

> **⚠️ SQL 脚本已迁移至 `sql/init.sql`**
>
> 以下内容仅供教学参考。实际执行请使用：
>
> **方式一：Node.js（推荐）**
> ```bash
> cd sql
> npm install
> node init.js localhost 3306 root your_password
> ```
>
> **方式二：bat 脚本**
> ```batch
> cd sql
> npm install
> sql\init.bat localhost 3306 root your_password
> ```
>
> **方式三：手动执行 SQL**
> 直接用 MySQL 客户端执行 `sql/init.sql`


