/**
 * @name mock请求的记录
 */
import { Model, DataTypes } from 'sequelize';
import db from '../config/db';
import DocumentModel from './Document';

class RequestModel extends Model {}

RequestModel.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    documentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '文档id',
    },
    from: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '请求来源',
    },
    headers: {
        type: DataTypes.TEXT,
        allowNull: false,
        comment: '请求头',
    },
},
    {
        sequelize: db,
        modelName: 'Request',
        tableName:'requests',
        paranoid: true,
});

RequestModel.belongsTo(DocumentModel, { foreignKey: 'documentId', targetKey: 'id', as: 'document' });

export default RequestModel;