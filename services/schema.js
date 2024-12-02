import Service from '.';

const service = new Service();

/**
 * @name 更新schema片段
 * @param {Number} id
 * @param {Object} schema
 * @returns Promise<Schema>
 */
service.updateOneById = async function updateOneById(id, schema, options = {}) {
    return await service.models.Schema.update(schema, {
        where: {
            id
        },
        transaction: options.transaction
    });
}

/**
 * @name 删除schema片段
 * @param {Number} id
 * @returns Promise<Number>
 */
service.deleteOneById = async function deleteOneById(id, options = {}) {
    return await service.models.Schema.update({ statu: 0 }, {
        where: {
            id
        },
        ...options
    });
}

/**
 * @name 创建schema片段
 * @param {Object} schema
 * @returns Promise<Schema>
 */
service.create = service.models.Schema.create.bind(service.models.Schema);

/**
 * @name 批量创建schema片段
 * @param {Object} schema
 * @returns Promise<Schema>
 */
service.bulkCreate = service.models.Schema.bulkCreate.bind(service.models.Schema);

/**
 * @name 查找单个片段
 */
service.findOne = service.models.Schema.findOne.bind(service.models.Schema);

/**
 * @name 根据id获取schema片段
 * @param {Number} id
 * @returns Promise<Schema>
 */
service.findOneById = async function findOneById(id) {
    return await service.models.Schema.findOne({
        where: {
            id
        }
    });
}

/**
 * @name 根据条件获取schema片段
 * @param {Object} conditions
 * @returns Promise<Schema>
 */
service.findOneByName = async function findOneByName(condtions) {
    return await service.models.Schema.findOne(condtions);
}

/**
 * @name 获取所有schema片段
 * @returns Promise<Schema[]>
 */
service.find = service.findAll = service.models.Schema.findAll.bind(service.models.Schema);

export default service;