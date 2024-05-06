const mongoose = require('mongoose')
const {Schema} = mongoose

// Remember schema is the collection shape, its a class
const UserSchema = new Schema({
    name:String,
    email:{type:String, unique:true},
    password:String
})

// Creates the model
const UserModel = mongoose.model('User',UserSchema)

module.exports=UserModel