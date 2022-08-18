//导入定义验证规则的包
const joi = require("@hapi/joi");

//定义用户名和验证码的规则

const username = joi.string().alphanum().min(1).max(10).required();

const password = joi
  .string()
  .pattern(/^[\S]{6,15}$/)
  .required();

//定义验证注册和登录表单数据的规则对象
exports.reg_login_schema = {
  body: {
    username,
    password,
  },
};
