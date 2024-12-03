import Service from './';
const service = new Service();

/**
 * @name 根据id删除定时器
 * @param {number} id 定时器id
 */
service.deleteOneById = async function deleteOneById(id, options = {}) {
  return await service.models.Schedule.destroy({
    where: {
      id: id
    }
  }, options);
}

/**
 * @name 根据id查询定时器
 * @param {number} id 定时器id
 */
service.findOneById = async function findOneById(id, options = {}) {
  return await service.models.Schedule.findOne({
    where: {
      id: id
    }
  }, options);
}
export default service;