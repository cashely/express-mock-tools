import folderService from '../services/folder';
import models from '../models/index';
import Router from '../utils/route';

const router = new Router();

router.post('/', async (req, res) => {
    try {
        const { projectId, name } = req.body;
        const result = await folderService.create({
            projectId,
            name
        });
        res.response.success(result);
    } catch (error) {
        res.response.error(500, error);
    }
})
.get('/', async (req, res) => {
    try {
        const { projectId } = req.query;
        const result = await folderService.findAll({
            where: {
                projectId
            },
            include: [
                {
                    model: models.Project,
                    as: 'project',
                }
            ]
        });
        res.response.success(result);
    } catch (error) {
        res.response.error(500, error);
    }
})

export default router;