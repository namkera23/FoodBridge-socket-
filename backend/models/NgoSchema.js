// // const mongoose = require("mongoose")

// // const NgoSchema = mongoose.Schema({
// //     ngo_name:{
// //         type:String,
// //         required:true,
// //     },
// //     email:{
// //         type:String,
// //         required:true,
// //         unique:true
// //     },
// //     password:{
// //         type:String,
// //         required:true,
// //         unique:true
// //     },
// //     address:{
// //         type:String,
// //         required:true,
// //         unique:true
// //     },
// //     location:{
// //         lat:Number,
// //         lon:Number
// //     },
// //     contact_no:{
// //         type:Number,
// //         required:true,
// //         unique:true
// //     },
// //     role:{
// //         type:String
// //     },
// //     registration_no:{
// //         type:String,
// //         unique:true,
// //         required:true
// //     }
// // })

// // const Ngo = mongoose.model("Ngo",NgoSchema);
// // module.exports = Ngo;

// const mongoose = require("mongoose");

// const NgoSchema = new mongoose.Schema({
//     ngoName: {
//         type: String,
//         required: true,
//     },
//     email: {
//         type: String,
//         required: true,
//         unique: true
//     },
//     password: {
//         type: String,
//         required: true,
//         unique: true
//     },
//     address: {
//         type: String,
//         required: true,
//         unique: true
//     },
//     location: {
//         type: {
//             type: String,
//             enum: ["Point"],
//             required: true,
//             default: "Point"
//         },
//         coordinates: {
//             type: [Number], // [longitude, latitude]
//             required: true
//         }
//     },
//     contact: {
//         type: Number,
//         required: true,
//         unique: true
//     },
//     role: {
//         type: String
//     },
//     registrationNo: {
//         type: String,
//         unique: true,
//         required: true
//     }
// });

// // Creating a geospatial index for location
// NgoSchema.index({ location: "2dsphere" });

// const Ngo = mongoose.model("Ngo", NgoSchema);
// module.exports = Ngo;

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const NgoSchema = new mongoose.Schema({
    ngoName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // Removed `unique: true`
    address: { type: String, required: true }, // Removed `unique: true`
    location: {
        type: { type: String, enum: ["Point"], default: "Point" },
        coordinates: { type: [Number], required: true } // [longitude, latitude]
    },
    contact: { type: Number, required: true },
    role: { type: String, default: "NGO" },
    registrationNo: { type: String, required: true, unique: true }
});

// Creating Geospatial Index for location
NgoSchema.index({ location: "2dsphere" });

const Ngo = mongoose.model("Ngo", NgoSchema);
module.exports = Ngo;

