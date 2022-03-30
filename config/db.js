const mongoose = require("mongoose");
const colors = require("colors");

const connectDB = async () => {
  let mongoURI;
  if (process.env.NODE_ENV === 'test') {
    mongoURI = 'mongodb://localhost:27017/test'
  } else {
    mongoURI = process.env.MONGO_URI
  }
  
  try {
    const conn = await mongoose.connect(mongoURI);
    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDB;
