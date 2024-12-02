import Service from ".";
const service = new Service();

service.create = function(...conditions) {
  return service.models.DocumentLog.create(...conditions);
}

service.find = service.findAll = service.models.DocumentLog.findAll.bind(service.models.DocumentLog);

service.findOne = function findOne(conditions) {
  return service.models.DocumentLog.findOne(...conditions);
}

export default service;