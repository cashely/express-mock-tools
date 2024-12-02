import Service from ".";

const service = new Service();

/**
 * @module 文件夹管理service
 */

/**
 * @name 创建文件夹
 * @param {Object} folder
 * @returns Promise<Folder>
 */
service.create = async function create(folder) {
    const forderInfo = await service.models.Folder.findOne({
        where: {
            name: folder.name,
            projectId: folder.projectId,
        }
    });
    if (forderInfo) {
        return forderInfo;
    }
    return await service.models.Folder.create(folder);
}

/**
 * @name 更新文件夹
 * @param {Number} id
 * @param {Object} folder
 * @returns Promise<Folder>
 */
service.updateOneById = async function updateOneById(id, folder) {
    return await service.models.Folder.update(folder, {
        where: {
            id
        }
    });
}

/**
 * @name 删除文件夹
 * @param {Number} id
 * @returns Promise<Number>
 */
service.deleteOneById = async function deleteOneById(id) {
    return await service.models.Folder.update({ statu: 0 }, {
        where: {
            id
        }
    });
}

/**
 * @name 根据id获取文件夹
 * @param {Number} id
 * @returns Promise<Folder>
 */
service.findOneById = async function findOneById(id) {
    return await service.models.Folder.findOne({
        where: {
            id
        }
    });
}

/**
 * @name 根据条件获取文件夹
 * @param {Object} conditions
 * @returns Promise<Folder>
 */
service.findOne = service.models.Folder.findOne

/**
 * @name 获取所有文件夹
 * @returns Promise<Folder[]>
 */
service.find = service.findAll = service.models.Folder.findAll.bind(service.models.Folder);

export default service;