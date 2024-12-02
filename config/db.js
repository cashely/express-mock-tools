import { Sequelize } from 'sequelize';
import md5 from 'md5';
import transaction from '../utils/transaction';

class DB {

    models = {};

    db;

    constructor() {
        this.init();
        return this.db;
    }

    async init() {
        if (!this.db) {
            this.db = new Sequelize({
                dialect:'sqlite',
                storage: './db.sqlite',
                logging: false,
            });

            transaction.init(this.db);

            this.models = this.db.models;

            try {
                await this.db.authenticate();
                console.log('Connection has been established successfully.');
                await this.checkAdmin();
                
            } catch (error) {
                console.error('Unable to connect to the database:', error);
            }
            return this.db;
        }
    }

    async checkAdmin() {

        const { User } = this.models;

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
}

const db = new DB();

export default db;