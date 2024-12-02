import db from '../config/db.js';
// import Document from './Document.js';
import { DataTypes, Model } from 'sequelize';

class Schema extends Model {};
/**
 * @description 文档模型
 * @class Document
 */
Schema.init({
    /**
     * @type {number}
     * @description 文档id
     */
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    /**
     * @type {string}
     * @description 文档名称
     */
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    /**
     * @type {string}
     * @description 文档别名
     */
    alias: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    /**
     * @type {string}
     * @description 文档内容
     */
    content: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    /**
     * @type {number}
     * @description 文档类型 0: 普通文档 1: 引用片段
     */
    type: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    /**
     * @type {number}
     * @description 文档状态 1: 正常 0: 删除
     */
    statu: {
        type: DataTypes.INTEGER,
        defaultValue: 1, // 1: 正常 0: 禁用
    }
}, {
    sequelize: db,
    modelName: 'Schema',
    tableName:'schemas',
})

export default Schema;
