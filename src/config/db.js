import { Sequelize } from 'sequelize';
import md5 from 'md5';
import path from 'node:path';
import sqlite3 from 'sqlite3';
import transaction from '../utils/transaction';

const newDB = new Sequelize({
    dialect:'sqlite',
    storage: path.join(__dirname, '../db.sqlite'),
    logging: false,
    dialectModule: sqlite3
});

transaction.init(newDB);

const checkAdmin = async () => {

    try {
        await newDB.authenticate();
        console.log('Connection has been established successfully.');        
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }

    const { User } = newDB.models;

    const admin = await User.findOne({
        where: {
            role: 1,
        }
    });

    if (!admin) {
        const password = md5('admin');
        await User.create({
            username: 'admin',
            password,
            email: '290119516@qq.com',
            role: 1,
        });
        console.log('创建管理员账号成功', `\n账号为：admin 密码为：${password}`);
    } else {
        console.log('管理员账号已存在');
    }
}

checkAdmin();

export default newDB;