import { Sequelize } from 'sequelize';
import path from 'node:path';
import sqlite3 from 'sqlite3';
import * as pg from 'pg';
import models from '../models';
import createRelation from '../scripts/createRelation';
import transaction from '../utils/transaction';

const sqliteDB = new Sequelize({
    dialect:'sqlite',
    storage: path.join(__dirname, '../db.sqlite'),
    logging: false,
    dialectModule: sqlite3
});
const pgDB = new Sequelize(process.env.POSTGRESQL_URL, {
    dialect: 'postgres',
    logging: false,
    dialectModule: pg
});

const newDB = process.env.NODE_ENV === 'production'? pgDB : sqliteDB;
transaction.init(newDB);

const checkAdmin = async () => {

    try {
        await newDB.authenticate();
        createRelation(newDB.models);
        await newDB.sync({ alter: true });
        console.log('Connection has been established successfully.');        
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

checkAdmin();

export default newDB;