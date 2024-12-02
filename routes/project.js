import Router from '../utils/route';
import { Op } from 'sequelize';
import models from '../models';
import projectService from '../services/project';
import service from '../services/project';

// console.log(typeof projectService.models.User, models.User)

const router = new Router({
  auth: true
});

router
.get('/', async (req, res) => {
  try {
    // 查询当前作者的项目以及公开的项目
    const result = await projectService.findAll({
      where: {
        [Op.or]: [
          { creatorId: req.user.id },
          { open: 1 }
        ]
      },
      include: [
        {
          model: service.models.User,
          as: 'creator',
          attributes: ['id', 'username', 'avatar'],
        },
        {
          model: service.models.Document.unscoped('defaultScope'),
          as: 'documents',
        },
      ],
    });
    res.response.success(result);
  } catch (error) {
    console.log(error);
    res.response.error(500, '获取项目失败');
  }
})
.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await projectService.findOne({
      where: {
        id: Number(id),
      }
    });
    res.response.success(result);
  } catch (error) {
    console.log(error, 'error')
    res.response.error(500, '获取项目失败');
  }
})

.post('/', async (req, res) => {

  const { name, open } = req.body;
  const { user } = req;
  try {
    const result = await projectService.create({
      name,
      open,
      creatorId: user.id,
    });
    res.response.success(result);
  } catch (error) {
    console.error(error);
    res.response.error(500, '创建项目失败');
  }
})

.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { user } = req;
  try {
    // 查找项目，如果项目的创建者不是当前用户，则返回错误
    const projectResult = await projectService.findOne({
      where: {
        id: Number(id),
      }
    });
    if (projectResult.creatorId !== user.id) {
      return res.response.error(403, '该项目不是您创建的，无法更新');
    }
    const result = await projectService.updateOneById(id, req.body);
    res.response.success(result);
  } catch (error) {
    console.error(error);
    res.response.error(500, '更新项目失败');
  }
})

.delete('/:id', async (req, res) => {
  
  const { id } = req.params;
  const { user } = req;
  try {
    // 检查用户是否是项目的创建者
    const projectResult = await projectService.findOne({
      where: {
        id: Number(id),
      }
    });
    if (user.id !== projectResult.creatorId ) {
      return res.response.error(403, '您没有权限删除该项目');
    }
    const result = await projectService.deleteOneById(id);
    res.response.success(result);
  } catch (error) {
    console.error(error);
    res.response.error(500, '删除项目失败');
  }
})

export default router;

