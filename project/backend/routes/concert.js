const express = require("express");
const path = require("path");
const pool = require("../config");
const Joi = require('joi')
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

async function bookValidator(value, helpers) {
  const [rows, _] = await pool.query(
      `select booking_seat from booking where booking_seat = ?`, [value]
  )
  if(rows.length >0){
      const message = "ที่นั่งถูกเลือกแล้ว กรุณาแจ้งชำระเงิน"
      throw new Joi.ValidationError(message, {message})
  }
}

const addbook = Joi.object({
  booking_seat: Joi.string().required().external(bookValidator),
  booking_concert: Joi.string().required(),
  booking_amount: Joi.required(),
  booking_price: Joi.required(),
  user_user_id: Joi.required(),
  banking_banking_id: Joi.required(),
  concert_concert_id: Joi.required(),
  address_id: Joi.required(),
  ticType: Joi.string().required()
})



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
  const promise1 = pool.query("SELECT * FROM concerts where concert_id=?", [
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

router.get("/mybook/:id", async function (req, res, next) {
  
  const conn = await pool.getConnection()
  await conn.beginTransaction()

  try {
    let [rows,fields] = await conn.query("SELECT * from booking where user_user_id = ?", [req.params.id]);

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

router.get("/seller/:id", async function (req, res, next) {
  
  const conn = await pool.getConnection()
  await conn.beginTransaction()

  try {
    let [rows,fields] = await conn.query("SELECT * from banking where user_id = ?", [req.params.id]);

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

router.post("/addbooking", async function (req, res, next) {
  try{
    await addbook.validateAsync(req.body, {abortEarly: false})
 }catch(error){
     return res.json(error.details.message)
 }
  
  const conn = await pool.getConnection()
  await conn.beginTransaction()

      const booking_seat = req.body.booking_seat;
      const booking_concert = req.body.booking_concert;
      const booking_amount = req.body.booking_amount;
      const booking_price = req.body.booking_price;
      const user_user_id = req.body.user_user_id;
      const banking_banking_id = req.body.banking_banking_id;
      const concert_concert_id = req.body.concert_concert_id;
      const address_id = req.body.address_id;
      const ticType = req.body.ticType;

  try {
      await conn.query(
      "INSERT INTO booking(booking_seat, booking_concert, booking_amount, booking_price, user_user_id, banking_banking_id, concert_concert_id, address_id, ticType) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?);",
      [booking_seat, booking_concert, booking_amount, booking_price, user_user_id, banking_banking_id, concert_concert_id, address_id, ticType]
    );

    await conn.commit();
    res.send('success');
  } catch (err) {
    await conn.rollback();
    return res.status(500).json(err);
  } finally {
    console.log("finally");
    conn.release();
  }  
});


exports.router = router;
