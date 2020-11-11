const express = require('express');
const multer = require('multer');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const app = express();
const axios = require('axios');
const jwt = require('jsonwebtoken');
const session = require('express-session');
const MysqlStore = require('express-mysql-session')(session);
const moment = require('moment-timezone');
const cors = require('cors');
const db = require(__dirname + '/db_connect');
const sessionStore = new MysqlStore({}, db);
const upload = multer({ dest: __dirname + '/../tmp_uploads' });

app.use(express.urlencoded({ extended: false }));
app.use(express.json());


const corsOptions = {
  // 跨網域 操作cookie 要設定true
  credentials: true,
  //每次進來都會拿到一個cb
  origin: function (origin, cb) {
    console.log(`origin: ${origin}`)
    //前面是錯誤 後面是允許
    cb(null, true)
  },
}
app.use(cors(corsOptions))

//連線資料庫
// app.get('/member_list', (req, res) => {
//     db.query('SELECT * FROM member_list LIMIT 5')
//         .then(([results]) => {
//             res.json(results);
//         })
// });

// app.get('/product', (req, res) => {
//     db.query('SELECT * FROM product LIMIT 5')
//         .then(([results]) => {
//             res.json(results);
//         })
// });


app.use(express.static(__dirname + '/../public'));

//範例
app.use('/example', require(__dirname + '/Name/example'));




//引入的檔案裡面一定要有東西，不然會報錯，所以先註解掉

//Cha
// app.use('/cart', require(__dirname + '/Cha'));

// Claudia
// app.use('/farm', require(__dirname + '/Claudia'));

// Iris
app.use('/member', require(__dirname + '/Iris/iris'));

//Janice
app.use('/index', require(__dirname + '/Janice/janice'));

//Jess
// app.use('/bento', require(__dirname + '/Jess'));

//Ru
// app.use('/product', require(__dirname + '/Ru'));


// Server
app.listen(5000, () => {
    console.log('伺服器已啟動');
})