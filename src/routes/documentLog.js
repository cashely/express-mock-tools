import User from "../models/User";
import DocumentLogService from "../services/documentLog";
import Router from "../utils/route";

const router = new Router({
    auth: true
});

router.get('/', async (req, res) => {
    const logs = await DocumentLogService.DocumentLog.findAll({
        order: [
            ['time', 'DESC']
        ],
        include: [
            {
                model: User,
                as: 'operator'
            }
        ]
    });
    res.response.success(logs);
})
.get('/:id', async (req, res) => {
    const { id } = req.params;
    const log = await DocumentLogService.DocumentLog.findOne({
        where: {
            id: id
        }
    });
    res.response.success(log);
})
.get('/document/:documentId', async (req, res) => {
    const { documentId } = req.params;
    const logs = await DocumentLogService.DocumentLog.findAll({
        where: {
            documentId
        },
        order: [
            ['createdAt', 'DESC']
        ],
        include: [
            {
                model: DocumentLogService.models.User,
                as: 'operator'
            }
        ],
    });
    res.response.success(logs);
})

export default router;