import 'dotenv/config'
import express from 'express';
import cors from 'cors'
import cookieParser from 'cookie-parser';


const app = express();

// Middleware
app.use(express.json()); // This specific middleware parses JSON string to Javascript Object
app.use(cookieParser()); // This specific middleware parses Cookies
app.use(cors({
  origin: process.env.CLIENT_URL,         // This makes the Express server except request from other domains
  credentials: true    // Allows cookies sent to this API
}));        


// Routes
import greetingRouter from './routes/greetings'
import authRouter from './routes/auth'
app.use('/greetings', greetingRouter)
app.use('/auth', authRouter)


// Connect To DB
// import mongoose from 'mongoose';
// mongoose.connect(process.env.MONGODB_URL || "");

// Start the express server
const PORT = 3000
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})
