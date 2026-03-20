/**
 * 小米之家门店管理系统 - 数据库初始化脚本
 *
 * 使用方法:
 *   node init.js [host] [port] [user] [password]
 *
 * 示例:
 *   node init.js localhost 3306 root 123456
 *
 * 需要先安装依赖:
 *   npm install mysql2
 */

const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);

if (args.length < 4) {
    console.log('============================================');
    console.log('  Mi Store DB Init Script');
    console.log('============================================');
    console.log();
    console.log('Usage: node init.js [host] [port] [user] [password]');
    console.log();
    console.log('Example: node init.js localhost 3306 root 123456');
    console.log();
    console.log('Parameters:');
    console.log('  host     - Database address');
    console.log('  port     - Database port');
    console.log('  user     - Database username');
    console.log('  password - Database password');
    console.log();
    console.log('Required dependency: npm install mysql2');
    console.log();
    process.exit(1);
}

const [host, port, user, password] = args;

console.log('============================================');
console.log('  Mi Store DB Init');
console.log('============================================');
console.log();
console.log(`Connecting to: ${host}:${port}`);
console.log(`Username: ${user}`);
console.log();

async function init() {
    let connection;

    try {
        // 先连接 without database，创建数据库
        console.log('Creating database if not exists...');
        connection = await mysql.createConnection({
            host,
            port: parseInt(port),
            user,
            password,
            multipleStatements: true
        });

        const sqlPath = path.join(__dirname, 'init.sql');
        const sql = fs.readFileSync(sqlPath, 'utf8');

        await connection.query(sql);

        console.log();
        console.log('============================================');
        console.log('  DB Init Complete!');
        console.log('============================================');
        console.log();
        console.log('Tables created:');
        console.log('  - USER_INFO (用户信息表)');
        console.log('  - ROLE_INFO (角色信息表)');
        console.log('  - PERMISSION_INFO (权限信息表)');
        console.log('  - ROLE_PERMISSION_REL (角色权限关联表)');
        console.log('  - PRODUCT_INFO (商品信息表)');
        console.log('  - CATEGORY_INFO (商品分类信息表)');
        console.log('  - STOCK_IN_INFO (商品入库信息表)');
        console.log('  - STOCK_OUT_INFO (商品出库信息表)');
        console.log('  - ORDER_INFO (订单信息表)');
        console.log('  - ORDER_ITEM_INFO (订单明细信息表)');
        console.log('  - MEMBER_INFO (会员信息表)');
        console.log('  - MEMBER_CONSUME_RECORD (会员消费记录表)');
        console.log('  - STOCK_LOG_INFO (库存操作日志表)');
        console.log('  - STOCK_WARNING_RULE (库存预警规则表)');

    } catch (error) {
        console.log();
        console.log('============================================');
        console.log('  DB Init Failed!');
        console.log('============================================');
        console.log();
        console.log('Error:', error.message);
        console.log();
        console.log('Please check:');
        console.log('  1. MySQL service is running');
        console.log('  2. Connection info is correct');
        console.log('  3. User has permission to create database');

        process.exit(1);
    } finally {
        if (connection) {
            await connection.end();
        }
    }
}

init();
