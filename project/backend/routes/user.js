const express = require("express");
const path = require("path");
const pool = require("../config");
const fs = require("fs");


router = express.Router();

const loginSchema = Joi.object({
  emailLogin: Joi.string().required().email(),
  passLogin: Joi.string().required()
}) 

function passwordValidator (value, helpers) {
if(value.length < 8){
 throw new Joi.ValidationError('Password must contain at least 8 charecters')
}
if (!(value.match(/[a-z]/) && value.match(/[A-Z]/) && value.match(/[0-9]/))) {
 throw new Joi.ValidationError('Password must be harder')
}
return value
}


const singupschema = Joi.object({
  mobile: Joi.string().required().pattern(/0[0-9]{9}/),
  first_name: Joi.string().required().max(150),
  last_name: Joi.string().required().max(150),
  password: Joi.string().required().custom(passwordValidator),
  confirmpassword: Joi.string().required().valid(Joi.ref('password')),
  address: Joi.string().required().max(150),
  id: Joi.number().required(),
  oldpassword:  Joi.string().required()
})


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


router.get("/user/:id",  async function (req, res, next) {

  const conn = await pool.getConnection()
  await conn.beginTransaction()


  try {
    let [rows,fields] = await conn.query("SELECT * FROM concert.users  WHERE user_id=?", [req.params.id]);
    // let [rows2,fields2] = await conn.query("SELECT * FROM concert.booking where user_user_id=?", [req.params.id]);
    

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


  // edit data user
router.put("/edit", async function (req, res, next) {
    try {
      await singupschema.validateAsync(req.body, {abortEarly: false})
  } catch (err) {
    return res.status(400).message(error)
  }
      const conn = await pool.getConnection()
      await conn.beginTransaction()
    
      const id = req.body.id
      const first_name = req.body.first_name
      const last_name = req.body.last_name
      const mobile = req.body.mobile
      const address = req.body.address
      const password = await bcrypt.hash(req.body.password, 5)
      const oldpassword = req.body.oldpassword


    try{
      const [users] = await conn.query(
        'SELECT * FROM users WHERE user_id=?', [id] )
      const user = users[0]
        if (!(await bcrypt.compare(oldpassword, user.password))) {
          throw new Error('Incorrect old password')
      }
      
      await conn.query("UPDATE users SET fname = ?, lname = ?, address = ?, phone = ?, password = ? WHERE user_id = ?",
        [ first_name, last_name, address, mobile, password, id]) 

        res.status(201).send(first_name)
        console.log("edit data!")
        conn.commit()
        
        
      }catch(error){
        conn.rollback()
        res.status(400).json(error.toString())
      }finally{
          conn.release()
      }
});

router.get("/UserBooked/:id",  async function (req, res, next) {

  const conn = await pool.getConnection()
  await conn.beginTransaction()

  try {
    let [rows,fields] = await conn.query("SELECT * FROM concert.booking b join concert.concerts c on (c.concert_id= b.concert_concert_id) join concert.images i on (c.concert_id = i.concert_id) where b.user_user_id=?", [req.params.id]);
    // let [rows2,fields2] = await conn.query("SELECT * FROM concert.booking where user_user_id=?", [req.params.id]);
    

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