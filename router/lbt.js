const express = require('express');

const router = express.Router()

const lbt_handler = require("../router_handler/lbt")

//获取groups的全部信息
router.get("/lbts",lbt_handler.getlbts);

// 向外共享路由对象
module.exports = router;
