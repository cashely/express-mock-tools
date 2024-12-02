import db from '../config/db.js';
import { Model, DataTypes } from'sequelize';

class ProjectUser extends Model {};
ProjectUser.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    projectId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    sequelize: db,
    modelName: 'ProjectUser',
    tableName: 'project_user'
})

export default ProjectUser;