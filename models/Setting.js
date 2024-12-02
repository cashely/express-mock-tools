import db from '../config/db';
import { DataTypes, Model } from'sequelize';

class Setting extends Model {};

Setting.init({
    /**
     * @type {number}
     * @description 设置id
     */
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    }
}, {
    sequelize: db,
    modelName:'Setting',
    tableName:'settings'
});

export default Setting;