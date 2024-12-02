import { Router } from 'express';
import * as reference from '../services/reference';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const result = await reference.findOne({});
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
})
.post('/', async (req, res) => {

  const body = req.body;

  const { name, content } = req.body;
  try {
    const result = await reference.create({
      name,
      content
    });
    res.response.success();
  } catch (error) {
    console.error(error);
    res.response.error(500, '创建引用失败');
  }
})
.post('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await reference.updateOneById(id, req.body);
    res.response.success();
  } catch (error) {
    console.error(error);
    res.response.error(500, '更新引用失败');
  }
})

export default router;