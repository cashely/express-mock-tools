import Service from ".";

const service = new Service();

service.create = service.models.Reference.create.bind(service.models.Reference);
service.find = service.models.Reference.findAll.bind(service.models.Reference);
service.findOne = service.models.Reference.findOne.bind(service.models.Reference);
service.findOneById = async function findOneById(id) {
  return await service.models.Reference.findOne({
    where: {
      id: id
    }
  });
};
service.updateOneById = async function updateOneById(id, values) {
  return await service.models.Reference.update(values, {
    where: {
      id: id
    }
  });
};
service.deleteOneById = async function deleteOneById(id) {
  return await service.models.Reference.update({ statu: 0 }, {
    where: {
      id: id
    }
  });
};

export default service;