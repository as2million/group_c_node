//引入express
const express = require('express');

//引入router
const router = express.Router();

//引入需要用的套件
const { v4: uuidv4 } = require('uuid');

const db = require(__dirname + '/../db_connect');

//路由名稱+功能
router.get('/member_list', (req, res) => {
    db.query('SELECT * FROM member_list LIMIT 5')
        .then(([results]) => {
            res.json(results);
        })
    });


//輸出路由
module.exports = router;