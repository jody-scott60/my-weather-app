require("dotenv").config();
const mongoose = require("mongoose");

const uri = process.env.mongodb_uri;

const connectDB = async () => {
  try {
    await mongoose.connect(uri);
    console.log("DB connected");
  } catch (error) {
    console.error(`Error: ${error}`);
    await mongoose.disconnect();
    console.log("MongoDB disconnected");
  }
};

module.exports = { connectDB };
