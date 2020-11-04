const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

router.get('/try-uuid', (req, res) => {
    res.json({
        uuid1: uuidv4(),
        uuid2: uuidv4(),
    });
});

module.exports = router;

//網址列輸入 localhost:5000/test/try-uuid 看結果