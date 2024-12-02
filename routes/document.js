import fd from 'fast-diff';
import Router from '../utils/route';
import documentService from '../services/document';
import documentLog from '../services/documentLog';
import schemaService from '../services/schema';
import requestService from '../services/request';
import transaction from '../utils/transaction';

const router = new Router({
  auth: true
});

router
  .get('/', async (req, res) => {
    const { projectId } = req.query;
    try {
      const result = await documentService.findAll({
        where: {
          projectId
        }
      });
      res.response.success(result);
    } catch (error) {
      console.error(error);
      res.response.error(500, '查询文档失败');
    }
  })

  .get('/count', async (req, res) => {
    const { projectId } = req.query;
    try {
      const result = await documentService.models.Document.count({
        where: {
          projectId
        }
      });
      res.response.success(result);
    } catch (error) {
      console.error(error);
      res.response.error(500, '统计文档数量失败');
    }
  })

  .get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const result = await documentService.findOne({
        where: {
          id
        }
      });
      res.response.success(result);
    } catch (error) {
      console.error(error);
      res.response.error(500, '查询文档失败');
    }
  })

  .post('/', async (req, res) => {
    transaction.start(async (t) => {
      const { projectId, name, content, path, folderId, description, type, useTemplate, protocal, scheduleId } = req.body;
      const { user } = req;
      const schemaResult = await schemaService.create({
        name,
        content
      }, { transaction: t });
      const result = await documentService.create({
        projectId,
        folderId,
        name,
        schemaId: schemaResult.id,
        creatorId: user.id,
        path,
        description,
        type,
        useTemplate,
        scheduleId,
        protocal
      }, { transaction: t });

      await documentLog.create({
        documentId: result.id,
        operatorId: user.id,
        content,
        type: 1,
        time: Date.now()
      }, { transaction: t });
      res.response.success(result);
    }, res);
  })

  .put('/:id', async (req, res) => {
    const { id } = req.params;
    const { user } = req;
    const { content, name, description, type, schemaId, path, useTemplate, protocal, scheduleId } = req.body;
    transaction.start(async (t) => {
      const documentResult = await documentService.findOne({
        where: {
          id
        }
      });

      // 如果不是文档的作者不允许执行删除操作
      if (documentResult.creatorId !== user.id) {
        return res.response.error(403, '该文档不是您创建的，无法修改');
      }

      const isDiffContent = fd(content, documentResult.schema.content);

      if (isDiffContent.length > 1) {
        await schemaService.updateOneById(schemaId, {
          content
        }, { transaction: t });

        await documentLog.create({
          documentId: id,
          operatorId: user.id,
          content,
          type: 0,
          time: Date.now()
        }, {
          transaction: t
        });
      }

      const result = await documentService.updateOneById(id, {
        name,
        description,
        type,
        path,
        useTemplate,
        protocal,
        scheduleId: scheduleId
      }, {
        transaction: t
      });
      res.response.success(result);
    }, res);
  })

  .delete('/:id', async (req, res) => {
    const { id } = req.params;
    const { user } = req;
    try {

      // 如果不是文档的作者不允许执行删除操作
      const documentResult = await documentService.findOne({
        where: {
          id
        }
      });
      if (documentResult.creatorId !== user.id) {
        return res.response.error(403, '该文档不是您创建的，无法删除');
      }
      const result = await documentService.deleteOneById(id);

      await documentLog.create({
        documentId: id,
        operatorId: user.id,
        type: 2,
        time: Date.now()
      });
      res.response.success(result);
    } catch (error) {
      console.error(error);
      res.response.error(500, '删除文档失败');
    }
  })

  .get('/export/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const result = await documentService.findOne({
        where: {
          id
        }
      });
      res.response.success({
        content: result.toJSON().schema.content
      })
    } catch (error) {
      console.error(error);
      res.response.error(500, '查询文档失败');
    }
  })

  // @name 获取文档mock的访问记录
  .get('/request/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const result = await requestService.findAll({
        where: {
          documentId: id
        }
      });
      res.response.success(result);
    } catch (error) {
      console.log(error)
      res.response.error(500, error);
    }
  })
  // 从swagger批量导入
  .post('/import/swagger', async (req, res) => {
    transaction.start(async (t) => {
      const { user } = req;
      const { projectId, documents } = req.body;
      const filterNullContent = documents.filter((item) => item.content);
      const nullContent = documents.filter((item) => !item.content);
      const schemaEntitys = filterNullContent.map((item) => {
        return {
          name: `${item.path}_${item.method}`,
          content: item.content,
        }
      });
      const schemaResults = await schemaService.bulkCreate(schemaEntitys, { transaction: t });

      // 把空的内容跟非空的内容聚合成新的文档实体
      const documentEntitys = [
        ...nullContent.map((item) => {
          return {
            name: `${item.path}`,
            path: item.path,
            method: (() => {
              switch (item.method) {
                case 'get':
                  return 1;
                case 'post':
                  return 2;
                case 'put':
                  return 3;
                case 'delete':
                  return 4;
                default:
                  return 0;
              }
            })(),
            description: item.description,
            type: 0,
            projectId,
            creatorId: user.id
          }
        }),
        ...schemaResults.map((item, index) => {
          return {
            name: `${filterNullContent[index].path}`,
            path: filterNullContent[index].path,
            method: filterNullContent[index].method,
            description: filterNullContent[index].description,
            type: 0,
            projectId,
            creatorId: user.id,
            schemaId: item.id
          }
        })
      ];
      // 批量创建文档
      const documentResults = await documentService.bulkCreate(documentEntitys, { transaction: t });

      res.response.success(documentResults);
    }, res);
  })


export default router;