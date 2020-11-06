const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const db = require(__dirname + '/../db_connect');

// router.get('/try-uuid', (req, res) => {
//     res.json({
//         uuid1: uuidv4(),
//         uuid2: uuidv4(),
//     });
// });

//連線資料庫
router.get('/bento', (req, res) => {
  db.query('SELECT * FROM `product` WHERE 1')
    .then(([results]) => {
      res.json(results);
    })
});

//連線資料庫
router.get('/message', (req, res) => {
  db.query('SELECT * FROM `message` WHERE 1')
    .then(([results]) => {
      res.json(results);
    })
});

// 只取sid=1
router.get('/productSid', (req, res) => {
  db.query('SELECT * FROM `message` WHERE product_sid=1')
    .then(([results]) => {
      res.json(results);
    })
});

//取product_sid=1 + 會員名字
router.get('/member', (req, res) => {
  db.query('SELECT member_list.name,message.content,message.product_sid FROM `member_list` INNER JOIN message on  member_list.member_sid=message.member_sid WHERE product_sid=1')
    .then(([results]) => {
      res.json(results);
    })

});

// //處理分頁
// router.get("/productSid2", async (req, res) => {
//   const output = {
//     page: 0,
//     perPage: 5,
//     totalRows: 0,
//     totalPages: 0,
//     rows: [],
//   }
//   //desctructor  總筆數
//   //這裡只取第一個值  還是arrary
//   const [[{ totalRows }]] = await db.query(
//     "SELECT * FROM `message` WHERE product_sid=1"
//   )
//   if (totalRows > 0) {
//     //沒有輸入值就是1  轉換成整數
//     let page = parseInt(req.query.page) || 1
//     output.totalRows = totalRows
//     //會回傳大於等於所給數字的最小整數
//     output.totalPages = Math.ceil(totalRows / output.perPage)

//     //拿到的值做判斷
//     if (page < 1) {
//       output.page = 1
//     } else if (page > output.totalPages) {
//       output.page = totalPages
//     } else {
//       output.page = page
//     }
//     // //分頁資料 //起始位置
//     // let sql = `SELECT * FROM message ORDER BY sid DESC LIMIT ${
//     //   (output.page - 1) * output.perPage
//     // }, ${output.perPage}`

//     // const [r2] = await db.query(sql)

//     // output.rows = r2
//   }
//   res.json(output)
// })

async function getListData(req) {

  // const sql = "SELECT COUNT(1) totalRows FROM `message` WHERE product_sid=1"
  // const [[{ totalRows }]] = await db.query(sql)
  // return totalRows;


  const output = {
    page: 0,
    perPage: 5,
    totalRows: 0,
    totalPages: 0,
    rows: []
  }
  //desctructor  總筆數
  //這裡只取第一個值  還是arrary
  const [[{ totalRows }]] = await db.query(
    "SELECT COUNT(1) totalRows FROM `message` WHERE product_sid=1"
  );

  if (totalRows > 0) {
    //沒有輸入值就是1  轉換成整數
    let page = parseInt(req.query.page) || 1
    output.totalRows = totalRows
    //會回傳大於等於所給數字的最小整數
    output.totalPages = Math.ceil(totalRows / output.perPage)

    //拿到的值做判斷
    if (page < 1) {
      output.page = 1
    } else if (page > output.totalPages) {
      output.page = totalPages
    } else {
      output.page = page
    }
    // //分頁資料 //起始位置
    let sql = `SELECT * FROM message ORDER BY sid DESC LIMIT ${(output.page - 1) * output.perPage
      }, ${output.perPage}`

    const [r2] = await db.query(sql);
    output.rows = r2
  }
  return output;
}

router.get("/productSid2", async (req, res) => {
  res.json(await getListData(req))
})



module.exports = router;