const express = require('express');

const router = express.Router()

const doctor_handler = require("../router_handler/doctor")

//获取groups的全部信息
router.get("/doctors",doctor_handler.getDoctors);

// 向外共享路由对象
module.exports = router;
