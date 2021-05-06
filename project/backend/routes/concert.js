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
const concertOwner = async (req, res, next) => {
  if (req.user.role === 'admin') {
         return next()
       }
     const [[concert]] = await pool.query('SELECT * FROM concerts WHERE concert_id=?', [req.params.id])
   
     if (concert.user_user_id !== req.user.user_id) {
       return res.status(403).send('You do not have permission to perform this action')
     }
     next()
   }


router.post("/concerts", upload.array("myImage", 5),async function (req, res, next) {
    if (req.method == "POST") {
      const file = req.files;
      let pathArray = [];

      if (!file) {
        return res.status(400).json({ message: "Please upload a file" });
      }

      const concert_title = req.body.concert_title;
      const concert_desc = req.body.concert_desc;
      const concert_address = req.body.concert_address;
      const address_id = req.body.address_id;
      const price = req.body.price;
      const concert_showtime = req.body.concert_showtime;
      const buy_available = req.body.buy_available;
      const user_user_id = req.body.user_user_id
    
      const bank_account = req.body.bank_account;
      const account_name = req.body.account_name;
      const fname = req.body.fname;
      const lname = req.body.lname;

      const conn = await pool.getConnection();
      // Begin transaction
      await conn.beginTransaction();

      try {
        let results = await conn.query(
          "INSERT INTO concerts(concert_title, concert_desc, concert_address, address_id, price, concert_showtime, buy_available, user_user_id) VALUES(?, ?, ?, ?, ?, ?, ?, ?);",
          [concert_title, concert_desc, concert_address, address_id, price, concert_showtime, buy_available, user_user_id]
        );
        const concertID = results[0].insertId;

        await conn.query(
          "insert into banking (bank_account, account_name, concert_id, user_id, fname, lname) values (?, ?, ?, ?, ?, ?);",
          [bank_account,account_name,concertID,user_user_id,fname,lname]
        )


        req.files.forEach((file, index) => {
          let path = [concertID, file.path.substring(6), 1];
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

router.get("/mycon/:id", async function (req, res, next) {
  
  const conn = await pool.getConnection()
  await conn.beginTransaction()

  try {
    let [rows,fields] = await conn.query("SELECT c.concert_id, c.concert_title, c.price, i.file_path, l.seat, sum(IFNULL(b.booking_amount,0)) `sold`, l.amount, c.concert_status FROM concerts c join images  i on (c.concert_id = i.concert_id) join location l on (c.address_id = l.address_id) left outer join booking b on (c.concert_id = b.concert_concert_id) group by c.concert_title, c.price, c.user_user_id, i.file_path, l.seat having c.user_user_id = ?", [req.params.id]);


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
    let [rows,fields] = await conn.query("SELECT * from banking where concert_id = ?", [req.params.id]);

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

router.delete('/image/:imageId', async function (req, res, next) {
  const conn = await pool.getConnection();
  await conn.beginTransaction();

  try {
      // Get Path files from the upload folder
      const [
          images,
          imageFields,
      ] = await conn.query(
          "SELECT `file_path` FROM `images` WHERE `id` = ?",
          [req.params.imageId]
      );

      // Delete File from path
      const appDir = path.dirname(require.main.filename); // Get app root directory
      console.log(appDir)
      const p = path.join(appDir, 'static', images[0].file_path);
      fs.unlinkSync(p);

      // Delete Data from Table images
      const [rows1, fields1] = await conn.query(
          'DELETE FROM `images` WHERE `id`=?', [req.params.imageId]
      )

      // commit
      await conn.commit()
      res.json({ message: "Delete image Complete" })
  } catch (error) {
      next(error)
      await conn.rollback();
      // res.status(500).json(error)
  } finally {
      conn.release();
  }
})

router.put("/concerts/:id",upload.array("myImage", 5),  async function (req, res, next) {
  const file = req.files;
  let pathArray = []

  if (!file) {
    const error = new Error("Please upload a file");
    error.httpStatusCode = 400;
    next(error);
  }

  const concert_title = req.body.concert_title;
  const concert_desc = req.body.concert_desc;
  const concert_address = req.body.concert_address;
  const address_id = req.body.address_id;
  const price = req.body.price;
  const concert_showtime = req.body.concert_showtime;
  const buy_available = req.body.buy_available;
  const user_user_id = req.body.user_user_id

  const bank_account = req.body.bank_account;
  const account_name = req.body.account_name;
  const concert_id  = req.body.concert_id;
  const fname = req.body.fname;
  const lname = req.body.lname;


  const conn = await pool.getConnection()
  await conn.beginTransaction();

  try {
    let results = await conn.query(
      "UPDATE concerts SET concert_title=?, concert_address=?, concert_desc=?, concert_showtime=?, buy_available=?, address_id=?, price=?, user_user_id=? WHERE concert_id=?",
      [concert_title,concert_address,concert_desc,concert_showtime,buy_available,address_id,price,user_user_id, req.params.id]
    )
    await conn.query(
      "UPDATE banking SET bank_account=?, account_name=?, concert_id=?, user_id=?, fname=?, lname=? WHERE concert_id=?",
      [bank_account,account_name,concert_id,user_user_id,fname,lname, req.params.id]
    )

    if (file.length > 0) {
      file.forEach((file, index) => {
        let path = [req.params.id, file.path.substring(6), 1]
        pathArray.push(path)
      })

      await conn.query(
        "INSERT INTO images(concert_id, file_path, main) VALUES ?;",
        [pathArray])
    }

    await conn.commit()
    res.send("success!");
  } catch (err) {
    await conn.rollback();
    next(err);
  } finally {
    console.log('finally')
    conn.release();
  }
  return;
});

router.put("/changestatus/:id", async function (req, res, next) {
  
  const conn = await pool.getConnection()
  await conn.beginTransaction()

  try {
    let [rows,fields] = await conn.query("update booking set status = ? where booking_id = ?", [req.body.status, req.params.id]);

    await conn.commit();
    res.send('changed');
  } catch (err) {
    await conn.rollback();
    return res.status(500).json(err);
  } finally {
    console.log("finally");
    conn.release();
  }  
});

exports.router = router;
