/**
 * 定时任务
 */
import { Model, DataTypes } from 'sequelize';
import User from './User';
import db from '../config/db';

class Schedule extends Model {}

Schedule.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    times: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
        max: 20,
        min: 1,
        comment: '调用频次',
    },
    path: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '调用地址',
    },
    method: {
        type: DataTypes.NUMBER,
        defaultValue: 2, // 1 - get 2 - post 3 - put 4 - delete 5 - patch
        allowNull: false,
        comment: '调用方法',
    },
    gap: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 2 * 1000, // 默认 2s 单位 ms
        comment: '间隔时间',
    },
    running: {
        type: DataTypes.NUMBER,
        defaultValue: 0,
        comment: '是否正在运行'
    },
    creatorId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        comment: '创建人Id',
    },
}, {
    sequelize: db,
    modelName: 'Schedule',
    tableName:'schedules',
    paranoid: true,
});

Schedule.belongsTo(User, {
    foreignKey: 'creatorId',
    targetKey: 'id',
    as: 'creator'
});

export default Schedule;