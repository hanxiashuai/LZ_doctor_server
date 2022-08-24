//导入 express
const path=require('path')
const express = require("express");

//创建服务器的实例对象
const app = express();
const joi = require("@hapi/joi");
//导入并配置 cors 中间件
const cors = require("cors");
app.use(cors());
app.use(express.json())
//配置解析表单数据的中间件,注意：这个中间件只能解析application/x-www-form-urlencodedd 格式的表单数据
app.use(express.urlencoded({ extended: false }));
//处理静态资源
app.use(express.static(path.join(__dirname,'uploads')))
//一定要在路由之前封装 res.cc 函数
app.use((req, res, next) => {
  //status 默认值为 1 ，表示失败的情况
  //err 的值，可能是一个错误对象，也可能是一个错误描述字符串
  res.cc = function (err, status = 1) {
    res.send({
      status,
      message: err instanceof Error ? err.message : err,
    });
  };
  next();
});


//导入并使用用户路由模块
const userRouter = require("./router/user");
app.use("/api", userRouter);
//导入文章内容的路由模块
 const artcat=require('./router/nav')
 app.use('/api',artcat)
 
//定义错误级别的中间件
app.use((err, req, res, next) => {
  //验证失败导致的错误
  if (err instanceof joi.ValidationError) return res.cc(err);

  //未知的错误
  res.cc(err);
});

//启动服务器
app.listen(3007, () => {
  console.log("服务器启动成功 baseUrl: http://127.0.0.1:3007");
});
