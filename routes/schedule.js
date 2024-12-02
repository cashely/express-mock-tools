import Router from "../utils/route";
import service from "../services/schedule";
import transaction from "../utils/transaction";

const router = new Router({
    auth: true
});

router.get("/", async (req, res) => {
  const { page = 1, pageSize = 10 } = req.query;
  const result = await service.list({ page, pageSize });
  res.response.success(result);
})
.get("/:id", async (req, res) => {
  const { id } = req.params;
  const result = await service.findOneById(id);
  res.response.success(result);
})
.post('/', async (req, res) => {
    transaction.start(async (t) => {
        const { times, path, gap, method } = req.body;
        const result = await service.models.Schedule.create({
            times,
            path,
            gap,
            method,
            creatorId: req.user.id
        }, { transaction: t });
        res.response.success(result);
    }, res);
})
.delete('/:id', async (req, res) => {
    transaction.start(async (t) => {
        const { id } = req.params;
        const result = await service.deleteOneById(id, { transaction: t });
        res.response.success(result);
    }, res);
})

export default router;

