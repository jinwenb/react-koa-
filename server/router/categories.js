const Router = require('koa-router');
const categories = require('../mongoose/categories')
let route = new Router();
let Util = require('../RouterUtil');
route.get('/', async ctx => {
    let {page, num, keyWords} = ctx.query;
    return await Util.limit(page, num, keyWords, 'name',categories, ctx)
});
route.post('/create', async ctx => {
    let body = ctx.query;
    try {
        await categories.create(body);
        ctx.body = {
            code: 0,
            data: '创建成功'
        }
    } catch (e) {
        ctx.body = {
            code: 1,
            data:e
        }
    }
});
route.post('/update/:id', async ctx => {
    return await Util.Update(ctx, 'findByIdAndUpdate', '更新成功',categories)
});
route.post('/destruction/:id', async ctx => {
    return await Util.Update(ctx, 'findByIdAndRemove', '删除成功',categories, true)
});
module.exports = route.routes();