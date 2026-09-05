const mongoose = require('mongoose');

// Connects to MongoDB with a 5-second timeout so server never hangs
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.log('MongoDB Atlas connection error:', error.message);
    console.log('Note: Please ensure your current IP address is whitelisted in MongoDB Atlas Network Access (0.0.0.0/0).');
  }
};

module.exports = connectDB;
