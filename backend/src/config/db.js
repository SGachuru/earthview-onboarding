const mongoose = require('mongoose');

const connectDB = async () => {
  if (process.env.USE_MOCK_DB === 'true') {
    console.log('USE_MOCK_DB=true, running in mock mode and skipping MongoDB connection');
    return;
  }

  if (!process.env.MONGO_URI) {
    console.log('No MONGO_URI set, skipping MongoDB connection');
    return;
  }
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log('MongoDB connection failed, running in memory mode');
  }
};

module.exports = connectDB;
