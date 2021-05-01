const express = require("express");
const pool = require("../config");
const fs = require("fs");
const multer = require("multer");
const { isLoggedIn } = require('../middlewares')
router = express.Router();

router.get("/", async function (req, res, next) {
  try {
    const search = req.query.search || ''
    let sql = 'SELECT a.*, b.file_path FROM concerts AS a LEFT JOIN (SELECT * FROM images WHERE main=1) AS b ON a.concert_id = b.concert_id'
    let cond = []

    if (search.length > 0) {
      sql = 'SELECT a.*, b.file_path FROM concerts AS a LEFT JOIN (SELECT * FROM images WHERE main=1) AS b ON a.concert_id = b.concert_id WHERE a.concert_title LIKE ?;'
      cond = [`%${search}%`, `%${search}%`]
    }
    const [rows, fields] = await pool.query(sql, cond);
    return res.json(rows);
  } catch (err) {
    return res.status(500).json(err)
  }
});
router.get("/hotel_K", isLoggedIn, async function (req, res, next) {
  try {
    const [rows, fields] = await pool.query(
      `SELECT * FROM concerts;`
      // `SELECT a.*, b.file_path FROM concerts AS a LEFT JOIN (SELECT * FROM images WHERE main=1) AS b ON a.concert_id = b.concert_id`
    );
    return res.json(rows);
  } catch (err) {
    return next(err)
  }
});
router.get("/seathotel", isLoggedIn, async function (req, res, next) {
  try {
    const [rows, fields] = await pool.query(
      `SELECT * FROM hotel_k;`
    );
    return res.json(rows);
  } catch (err) {
    return next(err)
  }
});
router.put("/seathotel/:seat", isLoggedIn, async function (req, res, next) {
  try {
     await pool.query(
      `UPDATE hotel_k SET status = '1' WHERE seat_id = ?;`, [req.params.seat]
    );
    const [rows, fields] = await pool.query(
      `SELECT * FROM hotel_k;`
    );
    return res.json(rows);
  } catch (err) {
    return next(err)
  }
});
router.delete("/seathotel/:seat", isLoggedIn, async function (req, res, next) {
  try {
     await pool.query(
      `UPDATE hotel_k SET status = '0' WHERE seat_id = ?;`, [req.params.seat]
    );
    const [rows, fields] = await pool.query(
      `SELECT * FROM hotel_k;`
    );
    return res.json(rows);
  } catch (err) {
    return next(err)
  }
});
router.put("/choose", isLoggedIn, async function (req, res, next) {
  try {
      const [rows, fields] = await pool.query(
      // `SELECT * FROM hotel_k;`
    );
    return res.json(rows);
  } catch (err) {
    return next(err)
  }
});
router.get("/payment", isLoggedIn, async function (req, res, next) {
  try {
      const [rows, fields] = await pool.query(
      // `SELECT * FROM hotel_k;`
    );
    return res.json(rows);
  } catch (err) {
    return next(err)
  }
});
// router.post("/test", async function (req, res, next) {
//   try {
//     const [rows, fields] = await pool.query(
//       `SELECT * FROM hotel_k;`
//     );
//     return res.json({num: rows.length});
//   } catch (err) {
//     return next(err)
//   }
// });

//   try {
//     const [rows, fields] = await pool.query(
//       `SELECT * FROM concert;`
//     );
//     return res.json(rows);
//   } catch (err) {
//     return next(err)
//   }
// });

exports.router = router;
