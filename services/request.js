import Service from ".";
const service = new Service();

/**
 * @name 查找全部
 */
service.find = service.findAll = service.models.Request.findAll.bind(service.models.Request);

/**
 * @name 创建
 * @param {Object} request
 */
service.create = service.models.Request.create.bind(service.models.Request);

export default service;