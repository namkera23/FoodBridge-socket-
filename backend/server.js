

const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const socketIo = require("socket.io");
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  }
});

const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const connectDB = require('./models/dbConnection');
const Hotel = require("./models/HotelSchema");
const Ngo = require("./models/NgoSchema");
const Volunteer = require("./models/VolunteerSchema");
const FoodRequest = require("./models/FoodRequest");
const mongoose = require('mongoose');

// Store connected sockets
const connectedUsers = {};

const getHotelAssignedToVolunteer = async (volunteerId) => {
  const request = await FoodRequest.findOne({ assignedVolunteer: volunteerId }).populate("hotelId", "_id");
  if (request && request.hotelId) {
    return request.hotelId._id.toString();
  }
  return null;
};


io.on("connection", (socket) => {
  console.log("Socket connected:", socket.id);

  socket.on("join", (userId) => {
    socket.join(userId);
    connectedUsers[userId] = socket.id;
    console.log(`User ${userId} joined their room.`);
  });

  socket.on("volunteerLocation", async ({ volunteerId, latitude, longitude }) => {
  console.log("Received volunteer location:", latitude, longitude);

  try {
    console.log("Fetching hotel assigned to volunteer:", volunteerId);
    const hotelId = await getHotelAssignedToVolunteer(volunteerId);
    console.log(hotelId) // ✅ Await the function
    if (hotelId) {
      io.to(hotelId).emit("volunteerLocationUpdate", {
        volunteerId,
        latitude,
        longitude,
      });
      console.log("send volunteer location to hotel");
    } else {
      console.log(`No hotel assigned to volunteer ${volunteerId}`);
    }
  } catch (error) {
    console.error("Error in volunteerLocation handler:", error.message);
  }
});


  // ✅ New Event: Volunteer Accepts Request
  socket.on("volunteerAccepted", async ({ requestId, volunteerId }) => {
    try {
      const updatedRequest = await FoodRequest.findByIdAndUpdate(
        requestId,
        {
          assignedVolunteer: volunteerId,
          status: "assigned"
        },
        { new: true }
      )
        .populate("hotelId", "hotel_name _id")
        .populate("assign_ngoId", "ngoName _id")
        .populate("assignedVolunteer", "full_name contact_no");

      if (!updatedRequest) {
        return console.log(`Request ${requestId} not found`);
      }

      const hotelId = updatedRequest.hotelId._id.toString();
      const ngoId = updatedRequest.assign_ngoId._id.toString();

      // Emit to hotel
      io.to(hotelId).emit("notification", {
        message: `Volunteer ${updatedRequest.assignedVolunteer.full_name} has accepted the request.`,
        requestId
      });

      // Emit to NGO
      io.to(ngoId).emit("notification", {
        message: `Volunteer ${updatedRequest.assignedVolunteer.full_name} is delivering the food.`,
        requestId
      });

      console.log(`Volunteer ${volunteerId} assigned to request ${requestId} has hotel ${hotelId} and NGO ${ngoId}`);
    } catch (error) {
      console.error("Error handling volunteerAccepted:", error.message);
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
    // Optionally, clean up connectedUsers here
  });
});

global.io = io;

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

connectDB();
app.use(express.json());

const port = 5000;
const JWT_sceret = "code_maniac";


app.post("/register/hotel", async (req, res) => {
  try {
    const { hotel_name, foodLicense, contact, email, password, address, location } = req.body;

    if (!location || !location.lat || !location.lng) {
      return res.status(400).json({ message: "Location coordinates are required" });
    }

    const hotel_exist = await Hotel.findOne({
      $or: [{ foodLicense }, { email }]
    });

    if (hotel_exist) {
      return res.status(400).json({ message: "Hotel already exists with same license or email!" });
    }

    const hashedPassword = await bcrypt.hash(password, 8);

    const newHotel = new Hotel({
      hotel_name,
      foodLicense,
      contact,
      email,
      password: hashedPassword,
      address,
      location
    });

    await newHotel.save();

    return res.status(200).json({ message: "Hotel registered successfully!" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
});



app.post("/register/ngo", async (req, res) => {
    try {
        const { ngoName, registrationNo, contact, email, password, address, location } = req.body;
        console.log(req.body)
        // Check if NGO already exists
        const ngoExist = await Ngo.findOne({ registrationNo });
        if (ngoExist) return res.status(400).json({ message: "NGO already exists!" });

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 8);

        // Store location as [longitude, latitude] for GeoJSON compatibility
        const newNgo = new Ngo({
            ngoName,
            registrationNo,
            contact,
            email,
            password: hashedPassword,
            address,
            location: { type: "Point", coordinates: [parseFloat(location.lng), parseFloat(location.lat)] }
        });

        await newNgo.save();
        console.log("NGO created");

        res.status(201).json({ message: "NGO registered successfully!" });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: error.message });
    }
});

app.post("/register/volunteer", async (req, res) => {
    try {
        const { full_name, email, password, contact_no, role = "volunteer", location } = req.body;

        console.log("Received data:", req.body);

        // Validate required fields
        if (!full_name || !email || !password || !contact_no || !location) {
            return res.status(400).json({ error: "Full name, email, password, contact number, and location are required" });
        }

        // Check if email already exists
        const existingVolunteer = await Volunteer.findOne({ email });
        if (existingVolunteer) {
            return res.status(400).json({ error: "Email already registered. Please use a different email." });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 8);
        console.log("Hashed password:", hashedPassword);

        // Create new volunteer instance
        const newVolunteer = new Volunteer({
            full_name,
            email,
            password: hashedPassword,
            contact_no: Number(contact_no), // Ensure contact_no is stored as a number
            role,
            location, // Store latitude & longitude
        });

        // Save to database
        await newVolunteer.save();
        res.status(201).json({ message: "Volunteer registered successfully!", volunteer: newVolunteer });

    } catch (error) {
        console.error("Error in volunteer registration:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});


app.post('/login', async (req, res) => {
    try {
      const { email, password, role } = req.body;
      let user = null; // Declare user outside the conditions
        console.log(role)
      if (role === "hotel") {
        user = await Hotel.findOne({ email });
        console.log(user)
      } else if (role === "ngo") {
        user = await Ngo.findOne({ email });
      } else {
        user = await Volunteer.findOne({ email });
      }
  
      if (user) {
        return res.status(200).json({ message: "Login successful!!" ,userId:user._id});
      } 
  
      return res.status(400).json({ message: "Invalid credentials" });
  
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: error.message });
    }
    
  });

const findNearbyNGOs = async (hotelLocation) => {
    return await Ngo.find({
        location: {
            $near: {
                $geometry: {
                    type: "Point",
                    coordinates: hotelLocation, // [longitude, latitude]
                },
                $maxDistance: 10000 // 10 km (10,000 meters)
            }
        }
    });
};

// Route to create a food request and notify nearby NGOs
app.post("/dashboard/hotel/:hotelId/make_request", async (req, res) => {
    try {
        const { food_name, food_quantity, pickup_time } = req.body;
        const { hotelId } = req.params;
        console.log(hotelId)

        if (!food_name || !food_quantity || !pickup_time) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Find the hotel to get its location
        const hotel = await Hotel.findById(hotelId);
        console.log(hotel)
        if (!hotel || !hotel.location || !hotel.location.lng || !hotel.location.lat) {
            return res.status(404).json({ message: "Hotel not found or location missing" });
        }

        const hotelLocation = [hotel.location.lng, hotel.location.lat]; // Convert to [longitude, latitude]
        console.log(hotelLocation)
        // Find nearby NGOs
        const nearbyNGOs = await findNearbyNGOs(hotelLocation);
        console.log(nearbyNGOs)
        const ngoIds = nearbyNGOs.map(ngo => ngo._id);
        console.log(ngoIds)
        if (ngoIds.length === 0) {
            return res.status(404).json({ message: "No NGOs found within 10 km" });
        }

        // Create a new food request
        const newRequest = new FoodRequest({
            hotelId,
            food_name,
            food_quantity,
            pickup_time,
            nearbyNGO: ngoIds,
            status: "pending"
        });

        await newRequest.save();
        res.status(201).json({
            message: "Food request created successfully and sent to nearby NGOs",
            request: newRequest,
            notifiedNGOs: nearbyNGOs
        });

    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});




app.get('/dashboard/ngo/:ngoId/all_requests', async (req, res) => {
    try {
        const { ngoId } = req.params;
        console.log("Received NGO ID:", ngoId);

        // Validate NGO ID
        if (!mongoose.Types.ObjectId.isValid(ngoId)) {
            return res.status(400).json({ message: "Invalid NGO ID format" });
        }

        const foodRequests = await FoodRequest.find({ nearbyNGO: ngoId })
            .populate("hotelId", "hotel_name address contact") 
            .populate("nearbyNGO", "ngoName email contact"); 

        if (!foodRequests.length) {
            return res.status(401).json({ message: "No food requests found for this NGO" });
        }

        console.log("Fetched Requests:", foodRequests);
        res.status(200).json({ requests: foodRequests });

    } catch (error) {
        console.error("Error fetching food requests:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

app.get('/dashboard/volunteer/:volunteerId/all_requests', async (req, res) => {
    try {
        const { volunteerId } = req.params;
        console.log("Received volunteer ID:", volunteerId);

        // Validate NGO ID
        if (!mongoose.Types.ObjectId.isValid(volunteerId)) {
            return res.status(400).json({ message: "Invalid volunteer ID format" });
        }

        const foodRequests = await FoodRequest.find({ nearbyvolunteers: volunteerId })
            .populate("hotelId", "hotel_name address contact") 
            .populate("assign_ngoId", "ngoName address contact");

        if (!foodRequests.length) {
            return res.status(404).json({ message: "No food requests found for this NGO" });
        }

        console.log("Fetched Requests:", foodRequests);
        res.status(200).json({ requests: foodRequests });

    } catch (error) {
        console.error("Error fetching food requests:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

const findNearbyVolunteers = async (ngoLocation) => {
    return await Volunteer.find({
        location: {
            $near: {
                $geometry: {
                    type: "Point",
                    coordinates: ngoLocation, // [lng, lat]
                },
                $maxDistance: 10000, // 10 km
            },
        },
    });
};

// Modify the volunteer assignment logic to emit socket events
app.put("/requests/:requestId/accept", async (req, res) => {
  try {
    const { requestId } = req.params;
    const { ngoId } = req.body;

    const ngo = await Ngo.findById(ngoId);
    if (!ngo) return res.status(404).json({ message: "NGO not found" });

    const ngoLocation = ngo.location.coordinates;
    const volunteers = await findNearbyVolunteers(ngoLocation);

    if (volunteers.length === 0) {
      return res.status(404).json({ message: "No volunteers found within 10 km" });
    }

    const assignedVolunteer = volunteers[0];

    const updated = await FoodRequest.findByIdAndUpdate(requestId, {
      status: "accepted",
      assignedVolunteer: assignedVolunteer._id,
    });

    // Notify hotel and NGO (real-time)
    const request = await FoodRequest.findById(requestId).populate("hotelId").populate("assign_ngoId");
    const hotelId = request.hotelId._id.toString();
    const ngoRoom = ngoId.toString();

    io.to(hotelId).emit("notification", {
      message: `Volunteer ${assignedVolunteer.full_name} has been assigned to your request.`,
      volunteer: assignedVolunteer
    });

    io.to(ngoRoom).emit("notification", {
      message: `Volunteer ${assignedVolunteer.full_name} has accepted the request.`,
      volunteer: assignedVolunteer
    });

    res.status(200).json({ message: "Request accepted and assigned!", volunteer: assignedVolunteer });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.post("/accept-request", async (req, res) => {
    try {
        const { requestId, ngoId } = req.body;

        // Fetch NGO location
        const ngo = await Ngo.findById(ngoId);
        if (!ngo) return res.status(404).json({ message: "NGO not found" });

        const ngoLocation = ngo.location.coordinates;
        console.log(ngoLocation) // [longitude, latitude]

        // Find nearby volunteers (within 10km)
        const nearbyVolunteers = await Volunteer.find({
            location: {
                $geoWithin: {
                    $centerSphere: [ngoLocation, 10 / 6378.1] // 10km in radians
                }
            }
        });
        console.log(nearbyVolunteers)

        if (nearbyVolunteers.length === 0) {
            return res.status(404).json({ message: "No nearby volunteers found" });
        }

        // Update the FoodRequest with nearby volunteers
        const RequestsSend = await FoodRequest.findByIdAndUpdate(requestId, {
            assign_ngoId: ngoId,
            status: "accepted",
            nearbyvolunteers: nearbyVolunteers.map((v) => v._id),
        });
        console.log(RequestsSend)
        res.status(200).json({ message: "Request sent to nearby volunteers!" });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
app.get("/volunteer-requests/:volunteerId", async (req, res) => {
    try {
        const { volunteerId } = req.params;

        // Fetch all food requests assigned to the volunteer
        const requests = await FoodRequest.find({ nearbyvolunteers: volunteerId })
            .populate("hotelId assign_ngoId");
        
            console.log("volunterr Req:"+requests)

        res.status(200).json(requests);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
// Fetch pending requests
app.get("/requests/pending", async (req, res) => {
    try {
        const pendingRequests = await FoodRequest.find({ status: "pending" }).populate("hotelId ngoId");
        res.json({ requests: pendingRequests });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get volunteer location by ID
app.get("/volunteers/:volunteerId/location", async (req, res) => {
    try {
        const volunteer = await Volunteer.findById(req.params.volunteerId);
        if (!volunteer) return res.status(404).json({ message: "Volunteer not found" });

        res.json({ location: volunteer.location });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/hotel/:hotelId/location',async(req,res)=>{
    try{
        const {hotelId} = req.params;
        const hotel = await Hotel.findById(hotelId);  
        if(!hotel) return res.status(404).json({message:"Hotel not found"});

        res.json({location: hotel.location});
    }
    catch(err){
        console.error("Error fetching hotel location:", err);
        res.status(500).json({message:"Internal server error"});
    }
})

server.listen(5000,()=>{
    console.log("server started")
})
