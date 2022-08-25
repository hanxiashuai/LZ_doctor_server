//导入数据库操作模块
const db = require("../db/index");

const https = require("https");

//导入生成 Token 的包
const jwt = require("jsonwebtoken");

//导入全局配置的文件
const config = require("../config");

//微信登录的处理函数
exports.wxlogin = (req, res) => {
  console.log('11111',req.user);
  let url = `https://api.weixin.qq.com/sns/jscode2session?appid=${config.WX_APPID}&secret=${config.WX_APPSECRET}&js_code=${req.query.code}&grant_type=authorization_code`;

  //向微信服务器发送请求
  https.get(url, (response) => {
    let data = "";

    response.on("data", (chunk) => {
      console.log("请求回来的数据", chunk);
      data += chunk;
    });

    response.on("end", () => {
      console.log('3333',JSON.parse(data));
      // openid:微信用户的唯一标识
      // session_key
      const { openid, session_key } = JSON.parse(data);

      //对用户的信息进行加密，生成 token 字符串
      const tokenStr = jwt.sign(JSON.parse(data), config.jwtSecretKey, {
        expiresIn: config.expiresIn,
      });

      //定义sqle 语句， 查询用户是否已经登录过小程序
      const sqlStr = "select * from wx_users where openid=?";
      db.query(sqlStr, openid, (err, results) => {
        //执行 SQL 语句失败
        if (err) return res.cc(err);

        //执行 SQL 成功，但是获取到的数据条数不等于1
        if (results.length !== 1)
          return res.send({
            code: "0",
            message: "微信授权登录成功",
            token: "Bearer " + tokenStr,
          });

        //定义插入新用户的 sql 语句
        const sql = "insert into wx_users set ?";

        db.query(sql, { openid: openid }, (err, results) => {
          //判断sql 语句是否执行成功
          if (err) return res.cc(err);

          //判断影响行数是否为1
          if (results.affectedRows !== 1) return res.cc("登录异常，请稍后再试");

          res.send({
            code: "0",
            message: "微信授权登录成功",
            token: "Bearer " + tokenStr,
          });
        });
      });
    });
  });
};
