// model/db.js - MongoDB connection configuration
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    if (process.env.NODE_ENV === 'production' && !process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI is required in production. Configure MongoDB Atlas before starting the server.');
    }
    const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/backlog-hero';
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✓ MongoDB connected successfully');
    return mongoose.connection;
  } catch (err) {
    console.error('✗ MongoDB connection failed:', err.message);
    throw err;
  }
};

module.exports = connectDB;
