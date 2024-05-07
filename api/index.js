// Express
const express = require('express');
const app=express()

// jwt
const jwt = require('jsonwebtoken')

// Cross Origin
const cors=require('cors')

// Mongoose
const mongoose = require('mongoose')

// Models
const User=require('./models/User')

// Bcrypt
const bcrypt = require('bcrypt')

// Environment Variables
require('dotenv').config()

// Cookie Parser
const cookieParser=require('cookie-parser')

// Secrets
const bcryptSalt=bcrypt.genSaltSync(10);
// jwt secret used to sign
const jwtSecret='babhdsbfbsjdfbh'


app.use(express.json())
app.use(cookieParser())
app.use(cors({
    credentials:true,
    origin:'http://localhost:5173'
}))

// Connects to database
mongoose.connect(process.env.MONGO_URL)

app.get('/test',(req,res)=>{
    res.json('test')
})

// Route for registering
app.post('/register',async (req,res)=>{
    const {name,email,password}=req.body
    try{
        const userDoc = await User.create({
            name,
            email,
            password:bcrypt.hashSync(password, bcryptSalt)
        })
        res.json(userDoc)
    }catch(e){
        res.status(422).json(e)
    }
})

// Route for logging in
app.post('/login',async(req,res)=>{
    const{email,password}=req.body
    const userDoc = await User.findOne({email})
    // If the username exists, check if password is correct
    //If username does not exist, respond with not found
    if(userDoc){
        const passOk=bcrypt.compareSync(password, userDoc.password)
        if(passOk){
            // Sign jwt
            jwt.sign({
                email:userDoc.email,
                id:userDoc._id
            },jwtSecret, {}, (err,token)=>{
                if(err) throw err;
                res.cookie('token',token).json(userDoc)
            })
        }else{
            res.status(422).json('pass not ok')
        }
    }else{
        res.status(422).json('not found')
    }
})

// Route for profile
app.get('/profile',(req,res)=>{
    const {token} = req.cookies;
    console.log(req.cookies)
    res.json({token})
})

app.listen(4000)
