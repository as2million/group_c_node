const express = require('express');
const router = express.Router();
const db = require(__dirname + '/../db_connect');

router.get('/info/:id?', async (req, res) => {

    const sql = 'SELECT * FROM taiwan_farms WHERE `category_sid` = ?'
    const [results] = await db.query(sql, [req.params.id])
    res.json(results);

});

router.get('/my-params1/:id?', (req, res) => {
    res.json(req.params);
});

module.exports = router;

//網址列輸入 localhost:5000/farm/info 看結果