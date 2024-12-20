import db from '../config/db';
import Project from './Project';
import Folder from './Folder';
import Schema from './Schema';
import User from './User';
import { DataTypes, Model } from'sequelize';

class Document extends Model {};
/**
 * @description 文档模型
 * @class Document
 */
Document.init({
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
     * @description 文档描述
     */
    description: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    /**
     * @type {number}
     * @description 文档创建者
     */
    creatorId: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    /**
     * @type {number}
     * @description 文档最后一次修改者
     */
    latstCreator: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    /**
     * @type {string}
     * @description 文档路径
     */
    path: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    /**
     * @type {number}
     * @description 文档状态
     */
    statu: {
        type: DataTypes.INTEGER,
        defaultValue: 1, // 0 - 删除 1 - 正常
    },
    type: {
        type: DataTypes.INTEGER,
        defaultValue: 1, // 0 - schema、 1 - json、 2 - template
    },
    schemaId: {
        type: DataTypes.INTEGER,
        unique: true,
        allowNull: true,
    },
    projectId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    /**
     * @name 请求的类型
     */
    method: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0, // 0 - all 1 - get 2 - post 3 - put 4 - delete
    },
    /**
     * @name 返回状态码
     */
    statuCode: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 200,
    },
    /**
     * @name 是否应用模版
     */
    useTemplate: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 2, // 1 - 是 2 - 否
    }
}, {
    sequelize: db,
    modelName: 'Document',
    tableName: 'documents'
});

Project.hasMany(Document, {
    foreignKey: 'projectId',
    sourceKey: 'id',
    as: 'documents'
});

Document.belongsTo(Project, {
    foreignKey: 'projectId',
    targetKey: 'id',
    as: 'project'
});

Folder.hasMany(Document, {
    foreignKey: 'folderId',
    sourceKey: 'id',
    as: 'documents'
});

Document.belongsTo(Folder, {
    foreignKey: 'folderId',
    targetKey: 'id',
    as: 'folder'
});

Document.belongsTo(Schema, {
    foreignKey:'schemaId',
    sourceKey: 'id',
    as:'schema'
});

Document.belongsTo(User, {
    foreignKey: 'creatorId',
    targetKey: 'id',
    as: 'creator'
});






export default Document