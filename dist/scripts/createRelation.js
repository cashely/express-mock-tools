"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = createRelation;
/**
 * @name 创建表的关联关系
 */

function createRelation(models) {
  var Project = models.Project,
    Document = models.Document,
    Folder = models.Folder,
    Schema = models.Schema,
    User = models.User,
    Schedule = models.Schedule,
    DocumentLog = models.DocumentLog,
    ProjectUser = models.ProjectUser,
    Request = models.Request;
  Project.hasMany(Document, {
    foreignKey: 'projectId',
    sourceKey: 'id',
    as: 'documents',
    scope: {
      statu: 1
    }
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
    foreignKey: 'schemaId',
    sourceKey: 'id',
    as: 'schema'
  });
  Document.belongsTo(User, {
    foreignKey: 'creatorId',
    targetKey: 'id',
    as: 'creator'
  });
  Document.belongsTo(Schedule, {
    foreignKey: 'scheduleId',
    targetKey: 'id',
    as: 'schedule'
  });
  DocumentLog.belongsTo(User, {
    foreignKey: 'operatorId',
    targetKey: 'id',
    as: 'operator'
  });
  DocumentLog.belongsTo(Document, {
    foreignKey: 'documentId',
    targetKey: 'id',
    as: 'document'
  });
  Project.hasMany(Folder, {
    foreignKey: 'projectId',
    as: 'folders'
  });
  Folder.belongsTo(Project, {
    foreignKey: 'projectId',
    as: 'project'
  });
  Folder.belongsTo(Folder, {
    foreignKey: 'folderId',
    as: 'parent'
  });
  Project.belongsToMany(User, {
    through: ProjectUser,
    foreignKey: 'projectId',
    otherKey: 'userId',
    as: 'users'
  });
  User.belongsToMany(Project, {
    through: ProjectUser,
    foreignKey: 'userId',
    otherKey: 'projectId',
    as: 'projects'
  });
  Project.belongsTo(User, {
    foreignKey: 'creatorId',
    as: 'creator'
  });
  Request.belongsTo(Document, {
    foreignKey: 'documentId',
    targetKey: 'id',
    as: 'document'
  });
  Schedule.belongsTo(User, {
    foreignKey: 'creatorId',
    targetKey: 'id',
    as: 'creator'
  });
  User.belongsTo(User, {
    allowNull: true,
    foreignKey: 'creatorId',
    targetKey: 'id',
    as: 'creator'
  });
  User.belongsTo(User, {
    allowNull: true,
    foreignKey: 'inviteUserId',
    targetKey: 'id',
    as: 'inviterUser'
  });
}