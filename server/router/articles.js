let Router = require('koa-router');
let route = new Router();
const Util = require('../RouterUtil');
const articles = require('../mongoose/articles');
route.get('/', async ctx => {
    let {page, num, keyWords} = ctx.query;
    return Util.limit(page, num, keyWords, ['title', 'content'],articles, ctx, true);
});
route.post('/create', async ctx => {
    let body = ctx.query;
     body.user = ctx.session.views;
    try {
        body = await articles.create(body);
        ctx.body = {
            code: 0,
            ...body
        }
    } catch (e) {
        ctx.body = {
            code: 1,
            data:e
        }
    }
});
route.put('/update/:id',async ctx=>{
    return await  Util.Update(ctx,'findByIdAndUpdate','更新成功',articles,false)
});
route.delete('/destruction/:id',async ctx=>{
    return await  Util.Update(ctx,'findByIdAndRemove','删除成功',articles,true)
});
route.post('/connect/:id',async ctx=>{
    let {id} = ctx.params;
    let connect = ctx.query;
    connect.user = ctx.session.views
  try {
    let res=   await articles.findByIdAndUpdate(id,{$push:{connect}});
    ctx.body ={
        code:0,
        ...res
    }
  }catch (e) {
  ctx.body = {
      code:1,
      data:e
  }
  }
});
route.post('/update/pv/:id',async ctx=>{
    return await  Util.Update(ctx,'findByIdAndUpdate','更新成功',articles,false,true)
});

module.exports = route.routes();