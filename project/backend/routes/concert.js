const express = require("express");
const path = require("path");
const pool = require("../config");
const fs = require("fs");

router = express.Router();

// Require multer for file upload
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

router.post("/concerts", upload.array("myImage", 5),async function (req, res, next) {
    if (req.method == "POST") {
      const file = req.files;
      let pathArray = [];

      if (!file) {
        return res.status(400).json({ message: "Please upload a file" });
      }

      // const title = req.body.title;
      // const content = req.body.content;
      // const status = req.body.status;
      // const pinned = req.body.pinned;

      const title = req.body.concert_title;
      const desc = req.body.concert_desc;
      const address = req.body.concert_address;
      const showtime = req.body.concert_showtime;
      // formData.append("concert_address", this.priceCon);
      const amountseat = req.body.concert_amountseat;
      const buyAvailable = req.body.buy_available;
      // formData.append("pinned", this.pinnedBlog ? 1 : 0);
      const status = req.body.concert_status;

      const conn = await pool.getConnection();
      // Begin transaction
      await conn.beginTransaction();

      try {
        let results = await conn.query(
          "INSERT INTO concerts(concert_title, concert_desc, concert_address, concert_showtime, concert_amountseat, buy_available, concert_status) VALUES(?, ?, ?, ?, ?, ?, ?);",
          [title, desc, address, showtime, amountseat, buyAvailable, status]
        );
        const concertID = results[0].insertId;

        req.files.forEach((file, index) => {
          let path = [concertID, file.path.substring(6), index == 0 ? 1 : 0];
          pathArray.push(path);
        });

        await conn.query(
          "INSERT INTO images(concert_id, file_path, main) VALUES ?;",
          [pathArray]
        );

        await conn.commit();
        res.send("success!");
      } catch (err) {
        await conn.rollback();
        return res.status(400).json(err);
      } finally {
        console.log("finally");
        conn.release();
      }
    }
  }
);

// Blog detail
router.get("/concerts/:id", function (req, res, next) {
  // Query data from 3 tables
  const promise1 = pool.query("SELECT * FROM concerts WHERE concert_id=?", [
    req.params.id,
  ]);
  const promise2 = pool.query("SELECT * FROM images WHERE concert_id=?", [
    req.params.id,
  ]);
  

  // Use Promise.all() to make sure that all queries are successful
  Promise.all([promise1, promise2])
    .then((results) => {
      const [concerts, blogFields] = results[0];
      const [images, imageFields] = results[1];
      res.json({
        concert: concerts[0],
        images: images,
        error: null,
      });
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
});

router.get("/location/:id", async function (req, res, next) {
  
  const conn = await pool.getConnection()
  await conn.beginTransaction()

  try {
    let [rows,fields] = await conn.query("SELECT * FROM location WHERE address_id = ?", [req.params.id]);

    await conn.commit();
    res.json(rows[0]);
  } catch (err) {
    await conn.rollback();
    return res.status(500).json(err);
  } finally {
    console.log("finally");
    conn.release();
  }  
});

router.get("/booked/:id", async function (req, res, next) {
  
  const conn = await pool.getConnection()
  await conn.beginTransaction()

  try {
    let [rows,fields] = await conn.query("SELECT booking_seat FROM booking group by booking_seat, concert_concert_id having concert_concert_id = ?", [req.params.id]);

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
