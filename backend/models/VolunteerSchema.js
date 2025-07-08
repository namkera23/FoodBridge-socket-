const mongoose = require("mongoose");

const VolunteerSchema = mongoose.Schema({
    full_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    contact_no: { type: Number, required: true, unique: true },
    location: {
        type: { type: String, enum: ["Point"], default: "Point" },
        coordinates: { type: [Number], required: true } 
    },
    role: { type: String }
});

// Create a geospatial index
VolunteerSchema.index({ location: "2dsphere" });

const Volunteer = mongoose.model("Volunteer", VolunteerSchema);
module.exports = Volunteer;
