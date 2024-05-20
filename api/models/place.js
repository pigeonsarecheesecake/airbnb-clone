const mongoose = require('mongoose')
const {Schema} = mongoose

// Place Schema, remember schema is a class of collection, instances of this class will be documents
const placeSchema = new mongoose.Schema(
    {
        // This is important, this relates to users
        owner: {type:mongoose.Schema.Types.ObjectId, ref:'User'},
        title:String,
        address:String,
        photos:[String],
        description:String,
        perks:[String],
        extraInfo:String,
        checkIn: Number,
        checkOut:Number,
        maxGuests: Number,
        price: Number
    }
)

const PlaceModel=mongoose.model('Place',placeSchema)

module.exports=PlaceModel