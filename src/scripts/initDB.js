import models from '../../models/index';

Promise.all(
  Object.values(models)
        .map(model => model.sync({ force: true }))
).then(() => {
  console.log('同步成功');
}).catch((err) => {
  console.log('同步失败', err);
});