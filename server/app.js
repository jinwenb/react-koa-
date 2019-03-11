const Koa = require('koa');
const Router  = require('koa-router');
const user = require('./router/user');
const categories =require('./router/categories');
const articles= require('./router/articles')
const session= require('koa-session');
let bodyParser =require('koa-bodyparser');
let app =new Koa();
app.keys = ['some secret hurr'];
const CONFIG = {
    key: 'koa:sess',
    maxAge: 86400000,
    autoCommit: true,
    overwrite: true,
    httpOnly: true,
    signed: true,
    rolling: false,
    renew: false,
};
app.use(async (ctx,next)=>{
    ctx.res.setHeader('Access-Control-Allow-Origin','*');
    await next()
});
app.use(session(CONFIG, app));
app.use(bodyParser());
let route =new Router();
app.listen(7001);
route.use('/api/users', user);
route.use('/api/categories', categories);
route.use('/api/articles', articles);
app.use(route.routes());


