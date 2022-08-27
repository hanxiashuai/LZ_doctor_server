const db = require('../db/index')

exports.getDoctors = (req, res) => {
    if (req.query.id) {
        try {
            // console.log("@@@",req.query);
            const sql = 'SELECT * FROM `doctor` where  id=?';
            db.query(sql, req.query.id, function (error, results, fields) {
                if (error) throw error;
                res.send({
                    code: 1,
                    msg: '获取医生数据成功',
                    records: results
                })
            });
        } catch (error) {
            res.send({
                msg: '服务器出错了'
            })
        }
    } else {
        try {
            // console.log("@@@",req.query);
            const sql = 'SELECT * FROM `doctor` where groupId=8 ';
            db.query(sql, function (error, results, fields) {
                if (error) throw error;
                res.send({
                    code: 1,
                    msg: '获取医生数据成功',
                    records: results
                })
            });
        } catch (error) {
            res.send({
                msg: '服务器出错了'
            })
        }
    }

}
exports.getDoct = (req, res) => {
    //定义分类查询的sql语句
    const sql = " SELECT * FROM  `doctor` where groupId = ?";
    //定义
    db.query(sql, req.query.groupId , (err, result) => {
      if (err) return res.cc(err);
      res.send({
        status: 0,
        message: "成功",
        data: result,
      });
    });
  };