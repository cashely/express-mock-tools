import { transaction } from "../config/prismaDB";
const service = {};

service.updateOneById = function updateOneById(conditions, res) {
  return transaction(async (prisma) => {
    await prisma.document.update({
      data: conditions
    }, {
      where: {
        id: conditions.id
      }
    });
  }, res);
}


service.findOneById = async function findOneById(id) {
  return await service.models.Document.findOne({
    where: {
      id: id
    }
  });
}

service.models.Document.addScope('defaultScope', {
  attributes: {
    exclude: ['projectId']
  },
  where: {
    statu: 1
  },
  include: [
    {
      model: service.models.Schema,
      as:'schema',
    },
    {
      model: service.models.Project,
      as:'project',
    },
    {
      model: service.models.Folder,
      as: 'folder',
    },
    {
      model: service.models.Schedule,
      as:'schedule',
    }
  ],
})

service.deleteOneById = async function deleteOneById(id) {
  return await service.models.Document.update({ statu: 0 }, {
    where: {
      id: id
    }
  });
}

service.find = service.findAll = service.models.Document.findAll.bind(service.models.Document);
service.create = function create(...conditions) {
  return service.models.Document.create(...conditions)
};

service.bulkCreate = function bulkCreate(...conditions) {
  return service.models.Document.bulkCreate(...conditions)
};

service.findOne = function findOne(...conditions) {
  return service.models.Document.findOne(...conditions)
};

export default service;