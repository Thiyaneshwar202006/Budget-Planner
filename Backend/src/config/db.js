const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      connectTimeoutMS: 10000, // 10 seconds timeout for connection
      serverSelectionTimeoutMS: 10000, // 10 seconds timeout for server selection
    });
    console.log("MongoDB Connected...");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1); // Exit the process with failure if connection fails
  }
};

module.exports = connectDB;