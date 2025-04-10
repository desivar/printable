import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

// Load environment variables from .env file
dotenv.config();

const app = express();
const port = process.env.PORT || 3000; // You can set a default port

// Middleware to parse JSON request bodies
app.use(express.json());

// Basic route for testing
app.get('/', (req, res) => {
  res.send('Printable Store API is running!');
});

// Function to connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected successfully!');
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  } catch (error) {
    console.error('MongoDB connection failed:', error);
    process.exit(1); // Exit the process if MongoDB connection fails
  }
};

// Call the connectDB function to establish the connection and start the server
connectDB();