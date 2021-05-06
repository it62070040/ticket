const express = require("express");
const path = require("path");
const pool = require("../config");
const fs = require("fs");
router = express.Router();

// user detail

const multer = require("multer");
// SET STORAGE

var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./static/uploads");
  },
  filename: function (req, file, callback) {
    callback(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({ storage: storage });

router.get("/users/:id", function (req, res, next) {
    // Query data from 3 tables
    const promise1 = pool.query("SELECT * FROM concert.users u join concert.booking b on (u.user_id = b.user_user_id) join concert.concerts c on (b.concert_concert_id = c.concert_id) join concert.images i on (c.concert_id = i.concert_id) WHERE u.user_id=?", [
      req.params.id,
    ]);

  
    // Use Promise.all() to make sure that all queries are successful
    Promise.all([promise1])
      .then((results) => {
        const [users, blogFields] = results[0];
        res.json({
          user: users,
          error: null,
        });
      })
      .catch((err) => {
        return res.status(500).json(err);
      });
  }),

router.post("/payment",upload.array("image", 5), async function (req, res, next) {
    const file = req.files;
    let pathArray = [];

    if (!file) {
      return res.status(400).json({ message: "Please upload a file" });
    }

    const booking_id = req.body.booking_id;
        const fname = req.body.fname;
        const lname = req.body.lname;
        const pay_date = req.body.pay_date;

    const conn = await pool.getConnection();
    await conn.beginTransaction();

    try {
      let results = await conn.query(
        "INSERT INTO payments(booking_id, fname, lname, pay_date) VALUES(?, ?, ?, ?);",
        [booking_id, fname, lname, pay_date]
      );
      const concertID = results[0].insertId;

      req.files.forEach((file, index) => {
        let path = [concertID, file.path.substring(6)];
        pathArray.push(path);
      });

      await conn.query(
        "insert into payimages(payment_id, file_path) values ?;",
        [pathArray]
      );

      await conn.commit();
      res.send('success');
    } catch (err) {
      await conn.rollback();
      return res.status(400).send(err);
    } finally {
      console.log("finally");
      conn.release();
    }
}
);

router.get("/banking/:id", async function (req, res, next) {
  
  const conn = await pool.getConnection()
  await conn.beginTransaction()

  try {
    let [rows,fields] = await conn.query("SELECT * FROM banking WHERE concert_id = ?", [req.params.id]);

    await conn.commit();
    res.json(rows);
  } catch (err) {
    await conn.rollback();
    return res.status(500).json(err);
  } finally {
    console.log("finally");
    conn.release();
  }  
});

router.get("/checkOrder/:id", async function (req, res, next) {
  
  const conn = await pool.getConnection()
  await conn.beginTransaction()

  try {
    let [rows,fields] = await conn.query("select b.booking_concert, concat(p.fname,' ' ,p.lname) `name`, b.booking_price, p.pay_date, pi.file_path from booking b left outer join payments p on (b.booking_id = p.booking_id) join payimages pi on (p.id = pi.payment_id) join banking ba on (b.banking_banking_id = ba.banking_id) where ba.user_id = ?", [req.params.id]);


    await conn.commit();
    res.json(rows);
  } catch (err) {
    await conn.rollback();
    return res.status(500).json(err);
  } finally {
    console.log("finally");
    conn.release();
  }  
});
  
exports.router = router;