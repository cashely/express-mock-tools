import { Op } from 'sequelize';
import md5 from 'md5';
import { nanoid } from 'nanoid';
import transaction from '../utils/transaction';
import { signToken } from '../utils';
import Router from "../utils/route";
import userService from "../services/user";
import documentService from "../services/document";

const loginRouter = new Router();
// console.log(userService.findAll({}))

loginRouter.post('/', async (req, res) => {
    const { username, password } = req.body;
    const user = await userService.findOne({
        where: {
            [Op.or]: [
                { username },
                { email: username }],
            password: md5(password),
        }
    });

    if (!user) {
        return res.response.error(400, '用户名或密码错误');
    }
    return res.response.success(signToken(user));
})

const signUpRouter = new Router();
signUpRouter.post('/', async (req, res) => {
    transaction.start(async (t) => {
        const { username, password, email, inviteCode } = req.body;
        const user = await userService.findOne({
            where: {
                [Op.or]: [
                    { username },
                    { email }],
            }
        });
        if (user) {
            return res.response.error(400, '用户名或邮箱已存在');
        }

        let inviteUser = {};

        if (inviteCode) {
            // 根据邀请的code查找存在的用户
            inviteUser = await userService.findOne({
                where: {
                    inviteCode
                }
            });

            if (!inviteUser) {
                return res.response.error(400, '改邀请码的用户不存在');
            }

            // 邀请码的用户可创建的文档增加50个
            await userService.updateOneById(inviteUser.id, {
                stock: inviteUser.stock + 50
            }, { transaction: t });
        }

        await userService.create({
            username,
            password: md5(password),
            email,
            inviteUserId: !!inviteCode ? inviteUser.id : null,
            inviteCode: nanoid(5).toUpperCase()
        }, { transaction: t });
        res.response.success(true);
    }, res);
})

export {
    loginRouter,
    signUpRouter
};

const router = new Router({
    auth: true
});

router.get('/', async (req, res) => {
    const users = await userService.findAll();
    res.response.success(users);
})
    .get('/current', async (req, res) => {
        try {
            const { user } = req;
            const userResult = userService.findOne({
                where: {
                    id: user.id
                }
            });
            const documentResult = documentService.models.Document.count({
                where: {
                    creatorId: user.id
                }
            });
            const [users, documentCount] = await Promise.all([userResult, documentResult]);
            res.response.success({
                ...users.toJSON(),
                documentCount
            });
        } catch (error) {
            res.response.error(400, error.message);
        }
    })
    .post('/', async (req, res) => {
        const { user } = req;
        const { username, password, email, role = 0, avatar = 'https://www.loliapi.com/acg/pc/', inviteCode } = req.body;
        transaction.start(async (t) => {
            // 邀请码校验
            if (inviteCode) {
                const userResult = await userService.findOne({
                    where: {
                        inviteCode
                    }
                });
                // console.log(userResult, 'userResult')
                if (!userResult) {
                    return res.response.error(400, '邀请码错误');
                }
                // 邀请码的用户可创建的文档增加50个
                await userService.updateOneById(userResult.id, {
                    stock: userResult.stock + 50
                }, { transaction: t });

            }

            const userResult = await userService.create({
                username,
                password: md5(password),
                email,
                role,
                avatar,
                creatorId: user.id
            }, { transaction: t });
            res.response.success(userResult);
        }, res)
    })
    .post('/logout', async (req, res) => {
        delete req.user;
        res.response.success();
    })

export default router;