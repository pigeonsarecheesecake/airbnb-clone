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

// Place model
const Place = require('./models/place.js')

// Bcrypt
const bcrypt = require('bcrypt')

// Environment Variables
require('dotenv').config()

// Cookie Parser
const cookieParser=require('cookie-parser')

// Multer
const multer = require('multer')

// File system
const fs=require('fs')

// Middleware for uploads, express static allows to serve static files from a directory
app.use('/uploads', express.static(__dirname+'/uploads'))

// Secrets
const bcryptSalt=bcrypt.genSaltSync(10);
// jwt secret used to sign
const jwtSecret='babhdsbfbsjdfbh'

// Image downloader
const imageDownloader = require('image-downloader');
const { log } = require('console');

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
app.get('/profile', (req,res)=>{
    const {token} = req.cookies;
    if(token){
        // Uses jwt to find user information
        jwt.verify(token,jwtSecret,{},async(err,userData)=>{
            if (err) throw err
            const {name,email,_id}=await User.findById(userData.id)
            res.json({name,email,_id})
        })
    }else{
        res.json(null)
    }
})

// Route for logging out
app.post('/logout',(req,res)=>{
    res.cookie('token','').json(true )
})

// Route to upload pics by link, also saves it under uploads
app.post('/upload-by-link', async (req,res)=>{
    const {link} =req.body
    const newName = 'photo'+Date.now() + '.jpg';
    await imageDownloader.image(
        {
            url:link,
            // Dirname is current directory which is \\projects\\current-practice\\airbnb-clone\\api\\uploads
            dest:__dirname + '/uploads/' + newName
        }
    )
    res.json(newName)
})

// Using Multer
const photosMiddleware=multer({dest:'uploads'})
// Upload from computer
app.post('/upload', photosMiddleware.array('photos',100) ,(req,res)=>{
    const uploadedFiles=[]
    for(let i=0;i<req.files.length;i++){
        const {path, originalname} = req.files[i]
        const parts = originalname.split('.')
        const ext = parts[parts.length-1]
        const newPath = path + '.' +ext
        fs.renameSync(path,newPath)
        uploadedFiles.push(newPath.replace('uploads\\',''))
    }
    res.json(uploadedFiles)
})

// Isnt it better to have a middleware that verifies token instead of defining
// token verification every endpoint?

// places post (submitting data)
app.post('/places',  (req, res)=>{
    // Grabs the cookies object from requests and destructure it and ellicit token property
    const {token}=req.cookies

    // Ellicit information regarding the new place inside the request body
    const {
        title,address,addedPhotos,description,
        perks, extraInfo, checkIn, checkOut, maxGuests
    } = req.body
    console.log(addedPhotos)

    // Use jwt verify to ellicit owner id
    jwt.verify(token, jwtSecret, {}, async (err,userData)=>{
        if(err) throw err
        const placeDoc=await Place.create({
            owner: userData.id,
            title, address, photos:addedPhotos, 
            description, perks, extraInfo,
            checkIn, checkOut, maxGuests
        })
        res.json(placeDoc)
    })
})

// places get (retrieving data)
app.get('/places',(req,res)=>{
    const {token} =req.cookies
    jwt.verify(token,jwtSecret,{},async(err,userData)=>{
        // Grab the user id from the token store it under id variable, use this id to find a place
        const {id} = userData
        res.json(await Place.find({owner:id}))
    })
})

// Places get using id 
app.get('/places/:id',async (req,res)=>{
    const {id} = req.params
    res.json(await Place.findById(id))
})

// Places put 
app.put('/places', async (req,res)=>{
    // Grabs the cookies object from requests and destructure it and ellicit token property
    const {token}=req.cookies

    // Ellicit information regarding the new place inside the request body
    const {
        id,title,address,addedPhotos,description,
        perks, extraInfo, checkIn, checkOut, maxGuests
    } = req.body

    jwt.verify(token,jwtSecret,{},async(err,userData)=>{
        if (err) throw err
        const placeDoc=await Place.findById(id)
        if (userData.id === placeDoc.owner.toString()){
            placeDoc.set({
                title, address, photos:addedPhotos, 
                description, perks, extraInfo,
                checkIn, checkOut, maxGuests
            })
            await placeDoc.save()
            res.json('ok')
        }
    })
})

app.listen(4000)
