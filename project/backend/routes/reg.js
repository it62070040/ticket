const express = require('express')
const pool = require('../config')
const Joi = require('joi')
const bcrypt = require('bcrypt');
const router = express.Router();

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
        res.status(201).send()
    }catch(error){
        conn.rollback()
        res.status(400).json(error);
    }finally{
        conn.release()
    }
});
exports.router = router