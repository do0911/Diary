const fs = require("fs"); //파일 입출력 모듈
const express = require("express");
const bodyParser = require("body-parser"); //req.body를 추출하기위해 필요
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json()); //req를 json형식으로 리턴//
app.use(bodyParser.urlencoded({ extended: true })); //객체 안에 객체를 파싱 extend: true

const data = fs.readFileSync("./database.json");
const conf = JSON.parse(data);
const mysql = require("mysql");

const multer = require("multer");
const upload = multer({ dest: "./upload" });

const connection = mysql.createConnection({
  host: conf.host,
  user: conf.user,
  password: conf.password, //  mysql연동
  port: conf.port,
  database: conf.database,
});

connection.connect();

app.get("/api/diary", (req, res) => {
  connection.query(
    "select * from diary order by num desc",
    (err, rows, fields) => {
      res.send(rows);
      console.log("get");
    }
  );
});

app.use("/image", express.static("./upload"));

app.post("/api/diary", upload.single("image"), (req, res) => {
  let title = req.body.title;
  let content = req.body.content;
  let photo = req.body.photo;
  let date = req.body.date;
  let sql = `INSERT INTO diary VALUES (null, '${title}', '${content}', '${photo}', '${date}')`;
  connection.query(sql, (err, rows, fields) => {
    res.send(rows);
  });
  console.log(date);
  console.log("post");
});

app.delete("/api/board/:num", (req, res) => {
  let sql = "DELETE FROM diary WHERE num = ?";
  let params = [req.params.num];
  connection.query(sql, params, (err, rows, fields) => {
    res.send(rows);
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
