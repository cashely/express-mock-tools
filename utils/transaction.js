/**
 * @name sequlize事务
 */

function Transaction() {
  this.sequelize = null
  this.t = null;
}

Transaction.prototype.init = async function (db) {
    this.sequelize = db;
}

Transaction.prototype.start = async function (callback, res) {
    const t = await this.sequelize.transaction();
    try {
        await callback(t);
        await t.commit();
    } catch (error) {
        await t.rollback();
        console.log(error, '事务提交失败');
        res.response.error(500, '操作失败');
    }
}

const transaction = new Transaction();

export default transaction;