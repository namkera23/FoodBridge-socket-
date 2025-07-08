const mongoose = require("mongoose")

const FoodRequestSchema = new mongoose.Schema({
  hotelId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hotel",
    
  },
  assign_ngoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Ngo",
    
  },
   nearbyNGO:[{ type: mongoose.Schema.Types.ObjectId, ref: "Ngo" }]
    ,
    nearbyvolunteers:{
        type:[{ type: mongoose.Schema.Types.ObjectId, ref: "Volunteer" }]
    },
  food_name: String,
  food_quantity: String,
  pickup_time: String,
  status: {
    type: String,
    default: "pending"
  },
  assignedVolunteer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Volunteer" // 👈 This is the required field
  }
});

const FoodRequest = mongoose.model("FoodRequest",FoodRequestSchema);
module.exports = FoodRequest;
