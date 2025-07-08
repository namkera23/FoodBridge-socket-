const mongoose = require("mongoose");

const dbConnection = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/foodBridge", {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("DB connection successful!!");
    } catch (error) {
        console.log("MongoDB connection error:", error);
    }
};

module.exports = dbConnection;
