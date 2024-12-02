import { nanoid } from 'nanoid';
import Service from '.';

const service = new Service();

service.create = async function create(project) {
  const projectResult = await service.models.Project.create({
   ...project,
    alias: nanoid(),
  });

  return projectResult;
}

service.findAll = service.models.Project.findAll.bind(service.models.Project);

service.findOneById = async function findOneById(id) {
  return await service.models.Project.findOne({
    where: {
      id,
      statu: 1
    },
    include: [
      {
        model: service.models.Document,
        as: 'documents',
      },
    ],
  });
}

service.findOne = async function findOne(conditions) {
  return await service.models.Project.findOne({
    include: [
      {
        model: service.models.Document.unscoped('defaultScope'),
        as: 'documents',
      },
    ],
    ...conditions
  });
}

service.find = function find(conditions) {
  return service.models.Project.findAll({
    where: {
    //  ...conditions,
      statu: 1
    },
    include: [
      {
        model: service.models.Document.unscoped('defaultScope'),
        as: 'documents',
      },
      {
        model: service.models.User,
        attributes: ['id', 'username', 'email'],
        as: 'creator'
      },
      {
        model: service.models.User,
        as: 'users'
      },
    ],
  });
}

service.deleteOneById = async function deleteOneById(id) {
  return await service.models.Project.update({ statu: 0 }, {
    where: {
      id
    }
  });
}

service.updateOneById = async function updateOneById(id, params, options = {}) {
  return await service.models.Project.update({
    ...params
  }, {
    where: {
      id
    },
    transaction: options.transaction
  });
}

export default service;