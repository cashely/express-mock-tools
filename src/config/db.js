import { Sequelize } from 'sequelize';
import md5 from 'md5';
import path from 'node:path';
import sqlite3 from 'sqlite3';
import { PostgresDialect } from '@sequelize/postgres';
import transaction from '../utils/transaction';

const sqliteDB = new Sequelize({
    dialect:'sqlite',
    storage: path.join(__dirname, '../db.sqlite'),
    logging: false,
    dialectModule: sqlite3
});
const pgDB = new Sequelize(process.env.POSTGRESQL_URL, {
    dialect: PostgresDialect,
    logging: false,
});

const newDB = process.env.NODE_ENV === 'production'? pgDB : sqliteDB;
transaction.init(newDB);

const checkAdmin = async () => {

    try {
        await newDB.authenticate();
        console.log('Connection has been established successfully.');        
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

checkAdmin();

export default newDB;