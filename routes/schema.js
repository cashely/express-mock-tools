import models from '../models';
import schemaService from '../services/schema';
import { Router } from 'express';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const result = await schemaService.findAll({
      include: [
        {
          model: models.Document,
          as: 'document',
        },
      ],
    });
    res.response.success(result);
  } catch (error) {
    console.error(error);
    res.response.error(500, '查询文档失败');
  }
})


export default router;

