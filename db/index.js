const mysql = require("mysql");

const db = mysql.createPool({
 // host:"192.168.0.124",
  host: "localhost",
  user: "root",
  password: "123456",
 //   database:"my_db_01"
  database: "nav",
});

//0为成功
module.exports = db;
