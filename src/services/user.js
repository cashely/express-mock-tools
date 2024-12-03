import Service from '.';

const service = new Service();

/**
 * @name 更新用户
 * @param {number} id 
 * @param {any} params 
 * @returns 
 */
service.updateOneById = async (id, params, options = {}) => {
    const user = await service.models.User.update({
       ...params
    }, {
        where: {
            id
        },
        transaction: options.transaction
    });
    return user;
}

/**
 * @name 查找单个用户
 */
service.findOne = service.models.User.findOne.bind(service.models.User);

/**
 * @name 查找所有用户
 */
service.findAll = service.models.User.findAll.bind(service.models.User);

/**
 * @name 创建用户
 */
service.create = service.models.User.create.bind(service.models.User);

/**
 * @name 根据id删除用户
 * @param {*} id
 */
service.deleteOneById = async (id) => {
    const user = await service.models.User.findOne({
        where: {
            id,
        }
    })
    if (!user) {
        return Promise.reject('用户不存在');
    }
    user.status = 0;
    await user.save();
    return user;
}

export default service;