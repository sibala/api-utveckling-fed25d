import 'dotenv/config'
import express from 'express';
import cors from 'cors'
import cookieParser from 'cookie-parser';


const app = express();

// Middleware
app.use(express.json()); // This specific middleware parses JSON string to Javascript Object
app.use(cookieParser()); // This specific middleware parses Cookies
app.use(cors());        


// Routes


// Connect To DB
// import mongoose from 'mongoose';
// mongoose.connect(process.env.MONGODB_URL || "");

// Start the express server
const PORT = 3000
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})
