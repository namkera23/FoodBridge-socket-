const mongoose = require("mongoose")

const HotelSchema = mongoose.Schema({
    hotel_name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        unique:true
    },
    address:{type:String,
        required:true
    },
    location:{
        lat:Number,
        lng:Number,
        
    },
    contact:{
        type:Number,
        required:true
    },
    role:{
        type:String
    },
    foodLicense:{
        type:String,
        required:true
    }
})

const Hotel = mongoose.model("Hotel",HotelSchema);
module.exports = Hotel;
