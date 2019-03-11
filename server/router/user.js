let  Router = require('koa-router');
const user= require('../mongoose/user');
const util = require('../util');
let  router = new Router();

router.post('/register',async ctx=>{
    let body =ctx.query;
    body.password =util(body.password);
   try {
       let item = await user.findOne({userName:body.userName});
       if(item){
         return  ctx.body = {
               code:1,
               data:'此用户已经存在'
           }
       }
       await  user.create(body);
     return  ctx.body = {
           code:0,
           password:'',
           ...body
       }
   }catch (e) {
       ctx.body ={
           code:1,
           data:e
       }
   }

});
router.post('/login',async ctx=>{
    let body = ctx.query;
    body.password = util(body.password)
    try {
        let users = await user.findOne(body);
        if(users){
            users.password = '';
            ctx.session.views =users._id;
            ctx.body = {
                code:0,
                data:users
            }
        }else {
            ctx.body = {
                code:1,
                data:'账号或者密码错误'
            }
        }
    }catch (e) {
        ctx.body ={
            code:1,
            data:e
        }
    }
})
router.post('/loginOut',ctx=>{
    ctx.session.views = false;
    ctx.body = {
        code:0,
        data:'退出成功'
    }
});

module.exports = router.routes();