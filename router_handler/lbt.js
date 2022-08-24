const db = require('../db/index')

exports.getlbts = (req, res) => {
    try {
        const sql = 'SELECT * FROM `lbt`';
        db.query(sql, function (error, results) {
            if (error) throw error;
            res.send({
                code:1,
                msg:"获取轮播图数据成功",
                records: results,
            })
        });
    } catch (error) {
        res.send({
            msg:'服务器出错了'
        })
    }
}