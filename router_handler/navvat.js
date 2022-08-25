//数据库到模块
const db = require("../db/index");
exports.lognav = (req, res) => {
  //定义分类查询的sql语句
  const sql = "select * from `nav`";
  //定义
  db.query(sql, (err, result) => {
    if (err) return res.cc(err);
    res.send({
      status: 0,
      message: "成功",
      data: result,
    });
  });
};
exports.load = (req, res) => {
  //定义分类查询的sql语句
  //  const sql = "select * from `image` (url) value (?);";
   //定义
   console.log(req.files);
   res.send({
    code: 0,
    mag: "新增文章成功",
   })
  // const { filename } = req.files[0];
  // // console.log(filename);
  // const artcaturl = `http://127.0.0.1:3007/${filename}`;
  // db.query(sql,[], (err, result) => {
  //   if (err) return res.cc(err);
  //   res.status(200).send({
  //     errno: 0, // 注意：值是数字，不能是字符串
  //     data: {
  //       url: artcaturl, // 图片 src ，必须
  //       alt: "点击", // 图片描述文字，非必须
  //       href: "zzz", // 图片的链接，非必须
  //     },
  //   });
  // });
};
//添加文章的接口
exports.table = async (req, res) => {
  try {
    const { content } = req.body;
    console.log("@@@：", req.body);
    const statement = "insert into `table` (content) value(?)";
    db.query(statement, [content], function (error, result, fields) {
      if (error) throw error;
      res.status(200).send({
        code: 0,
        mag: "新增文章成功",
      });
    });
  } catch (error) {
    console.log(error);
  }
};
//删除文章的接口
exports.delectinterface = async (req, res) => {
  try {
    console.log(req.body);
    const state = "delete from `table` where id= ?";
    const { id } = req.body;
    // console.log(req.body.id);
    db.query(state, id, function (error, result, fields) {
      if (error) throw error;
      res.status(200).send({
        code: 0,
        mag: "删除文章成功",
      });
    });
  } catch (error) {
    console.log(error);
  }
};
//修改文章内容
exports.Modifyarticle = async (req, res) => {
  try {
    console.log(req.body);
    const stateupdate = "update `table` set content=? where  id=?";
    const { id, content } = req.body;
    // console.log(req.body.id);
    db.query(stateupdate, [content, id], function (error, result, fields) {
      if (error) throw error;
      res.status(200).send({
        code: 0,
        mag: "修改章成功",
      });
    });
  } catch (error) {
    console.log(error);
  }
};
//获取文章内容的接口
exports.article = (req, res) => {
  //定义分类查询的sql语句
  const newsql = "select * from `table` where id=?";
  //定义
  const { id } = req.query;
  console.log(req.query);
  db.query(newsql, [id], (err, result) => {
    if (err) return res.cc(err);
    res.status(200).send({
      status: 0,
      message: "文章获取成功",
      data: result,
    });
  });
};
