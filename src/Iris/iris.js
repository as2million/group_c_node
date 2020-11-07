//引入express
const express = require("express");
const db = require(__dirname + "/../db_connect");
const session = require("express-session");

//引入router
const router = express.Router();

//引入需要用的套件
const { v4: uuidv4 } = require("uuid");

//路由名稱+功能
router.get("/try-uuid", (req, res) => {
  res.json({
    uuid1: uuidv4(),
    uuid2: uuidv4(),
  });
});

// 測試連線資料庫
router.get("/try-db", (req, res) => {
  // db.query( 'SELECT * FROM my_fav')
  db.query(
    "SELECT * FROM `my_fav` INNER JOIN `product` ON `my_fav`.`product_sid`=`product`.`sid`"
  ).then(([results, fields]) => {
    res.json(results);
  });
});

// SELECT * FROM `my_fav` INNER JOIN `product` ON `my_fav`.`product_sid`=`product`.`sid` WHERE `member_sid`='1'

// -------- 取得我的最愛--------------//
router.get("/myFavList", (req, res) => {
  db.query(
    "SELECT * FROM `my_fav` INNER JOIN `product` ON `my_fav`.`product_sid`=`product`.`sid`"
  ).then(([results, fields]) => {
    res.json(results);
  });
});

// ------- 取得會員資料(登入,修改頁面) ------- //
router.get("/allUserProfile", (req, res) => {
  db.query("SELECT * FROM member_list").then(([results, fields]) => {
    res.json(results);
  });
});

// ---------- 新增最愛 ---------- //
router.post("/addMyFav", (req, res) => {
  const newFavItem = req.body;

  const sql =
    "INSERT INTO `my_fav` set `product_sid`='" +
    newFavItem.product_sid +
    "',`member_sid`='" +
    newFavItem.currentUser +
    "'";

  db.query(sql);
  res.json(newFavItem);
});

// ---------- 刪除最愛 ---------- //
router.post("/deleteMyFav", (req, res) => {
  const itemToBeDelete = req.body;
  const sql =
    "DELETE FROM `my_fav` WHERE `member_sid`='" +
    itemToBeDelete.currentUser +
    "' AND `product_sid`='" +
    itemToBeDelete.product_sid +
    "'";
  db.query(sql);
  res.json(itemToBeDelete);
});

// ---------- 會員註冊 ---------- //
router.post("/userRegister", (req, res) => {
  const newRegister = req.body;
  const sql =
    "INSERT INTO `member_list`( `account`, `password`,`mobile`, `email`) VALUES ('" +
    newRegister.account +
    "','" +
    newRegister.password +
    "','" +
    newRegister.mobile +
    "','" +
    newRegister.email +
    "')";
  db.query(sql);
  res.json(newRegister);
});

// ---------- 更新會員資料 ---------- //
router.post("/updateProfile", (req, res) => {
  const newProfile = req.body;
  const fulladdress = "" + req.body.address;
  const county = fulladdress.slice(0, 3);
  const district = fulladdress.slice(3, 6);
  const address = fulladdress.slice(6);

  const sql =
    "UPDATE `member_list` SET `password`='" +
    newProfile.password +
    "',`name`='" +
    newProfile.familyname +
    newProfile.givenname +
    "',`birthday`='" +
    newProfile.birthday +
    "',`mobile`='" +
    newProfile.mobile +
    "',`email`='" +
    newProfile.email +
    "',`county`='" +
    county +
    "',`district`='" +
    district +
    "',`address`='" +
    address +
    "' WHERE `member_sid` = '" +
    newProfile.currentUser +
    "'";
  db.query(sql);
  res.json(newProfile);
});

//輸出路由
module.exports = router;

//網址列輸入 localhost:5000/example/try-uuid 看結果
// http://localhost:5000/member/try-db
