const express = require("express");
const pool = require("../config");

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
