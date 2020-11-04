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


//連線資料庫
app.get('/try-db', (req, res) => {
    db.query('SELECT * FROM taiwan_farms LIMIT 5')
        .then(([results]) => {
            res.json(results);
        })
});


// app.use(express.static, require(__dirname + '/../public'));
// app.use('/login-api', require(__dirname + '/Cha/cha'));

// Server
app.listen(5000, () => {
    console.log('伺服器已啟動...');
})