const express = require('express')
const pool = require('../config')
const Joi = require('joi')
const bcrypt = require('bcrypt');
const { generateToken } = require("../utils/token");
const { isLoggedIn } = require('../middlewares')
const router = express.Router();

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

async function emailValidator(value, helpers) {
    const [rows, _] = await pool.query(
        `select email from users where email = ?`, [value]
    )
    if(rows.length >0){
        const message = "this email already taken"
        throw new Joi.ValidationError(message, {message})
    }
}

const singupschema = Joi.object({
    email: Joi.string().required().email().external(emailValidator),
    mobile: Joi.string().required().pattern(/0[0-9]{9}/),
    first_name: Joi.string().required().max(150),
    last_name: Joi.string().required().max(150),
    password: Joi.string().required().custom(passwordValidator),
    confirmpassword: Joi.string().required().valid(Joi.ref('password')),
    address: Joi.string().required().max(150),
    role: Joi.string().required()
})
    

router.post('/signup', async (req, res, next) => {
    try{
       await singupschema.validateAsync(req.body, {abortEarly: false})
    }catch(error){
        return res.status(400).json(error)
    }

    const conn = await pool.getConnection()
    await conn.beginTransaction()

    const password = await bcrypt.hash(req.body.password, 5)
    const first_name = req.body.first_name
    const last_name = req.body.last_name
    const email = req.body.email
    const mobile = req.body.mobile
    const address = req.body.address
    const role = req.body.role
    

    try{
        await conn.query("insert into users(user, fname, lname, address, phone, email, password)" +
        "values (?,?,?,?,?,?,?)",
        [role, first_name, last_name, address, mobile, email, password]
        )
        conn.commit()
        res.status(201).send(first_name)
    }catch(error){
        conn.rollback()
        res.status(400).json(error);
    }finally{
        conn.release()
    }
});

router.post('/user/login', async (req, res, next) => {
         try {
             await loginSchema.validateAsync(req.body, { abortEarly: false })
         } catch (err) {
             return res.status(400).send(err)
         }
         const email = req.body.emailLogin
         const password = req.body.passLogin
     
         const conn = await pool.getConnection()
         await conn.beginTransaction()
     
         try {
             // Check if username is correct
             const [users] = await conn.query(
                 'SELECT * FROM users WHERE email=?', 
                 [email]
             )
             const user = users[0]
             if (!user) {    
                 throw new Error('Incorrect email or password')
             }
     
             // Check if password is correct
             if (!(await bcrypt.compare(password, user.password))) {
                 throw new Error('Incorrect email or password')
             }
     
             // Check if token already existed
             const [tokens] = await conn.query(
                 'SELECT * FROM tokens WHERE user_id=?', 
                 [user.user_id]
             )
             let token = tokens[0]?.token
             if (!token) {
                 // Generate and save token into database
                 token = generateToken()
                 await conn.query(
                     'INSERT INTO tokens(user_id, token) VALUES (?, ?)', 
                     [user.user_id, token]
                 )
             }
     
             conn.commit()
             res.status(200).json({'token': token})
         } catch (error) {
             conn.rollback()
             res.status(400).json(error.toString())
         } finally {
             conn.release()
         }
});
router.get('/user/me', isLoggedIn, async (req, res, next) => {
    res.json(req.user)
});
exports.router = router