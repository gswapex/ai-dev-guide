/**
 * 小米之家门店管理系统 - 模拟数据初始化脚本
 *
 * 使用方法:
 *   node seed.js [host] [port] [user] [password]
 *
 * 示例:
 *   node seed.js localhost 3306 root 123456
 */

const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);

if (args.length < 4) {
    console.log('============================================');
    console.log('  Mi Store Seed Script');
    console.log('============================================');
    console.log();
    console.log('Usage: node seed.js [host] [port] [user] [password]');
    console.log();
    console.log('Example: node seed.js localhost 3306 root 123456');
    console.log();
    console.log('This will insert sample data into xiaomi_store database.');
    console.log('Make sure init.js has been run first!');
    console.log();
    process.exit(1);
}

const [host, port, user, password] = args;

console.log('============================================');
console.log('  Mi Store Seed Data');
console.log('============================================');
console.log();
console.log(`Connecting to: ${host}:${port}`);
console.log(`Username: ${user}`);
console.log();

async function seed() {
    let connection;

    try {
        connection = await mysql.createConnection({
            host,
            port: parseInt(port),
            user,
            password,
            database: 'xiaomi_store',
            multipleStatements: true
        });

        const sqlPath = path.join(__dirname, 'init-data.sql');
        const sql = fs.readFileSync(sqlPath, 'utf8');

        await connection.query(sql);

        console.log();
        console.log('============================================');
        console.log('  Seed Data Complete!');
        console.log('============================================');
        console.log();
        console.log('Sample data inserted:');
        console.log('  - 4 roles (系统管理员/门店经理/店员/财务人员)');
        console.log('  - 12 permissions');
        console.log('  - 5 users (admin/manager/clerk01/clerk02/finance)');
        console.log('  - 11 product categories');
        console.log('  - 11 products');
        console.log('  - 5 members');
        console.log('  - 5 orders (4 completed, 1 pending)');
        console.log('  - 9 order items');
        console.log('  - 4 consume records');
        console.log('  - 3 stock warning rules');
        console.log();
        console.log('Test accounts (password: 123456):');
        console.log('  - admin     (系统管理员)');
        console.log('  - manager   (门店经理)');
        console.log('  - clerk01   (店员)');
        console.log('  - finance   (财务人员)');

    } catch (error) {
        console.log();
        console.log('============================================');
        console.log('  Seed Failed!');
        console.log('============================================');
        console.log();
        console.log('Error:', error.message);
        console.log();
        console.log('Please make sure:');
        console.log('  1. init.js has been run successfully');
        console.log('  2. Database xiaomi_store exists');

        process.exit(1);
    } finally {
        if (connection) {
            await connection.end();
        }
    }
}

seed();
