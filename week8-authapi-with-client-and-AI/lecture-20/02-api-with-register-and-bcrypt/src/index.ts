import 'dotenv/config'
import express from 'express';
import cors from 'cors'
import cookieParser from 'cookie-parser';


const app = express();

// in the .env file can the following variables be included
// JWT_SECRET = 'secret'
// NODE_ENV = 'development' # development | production
// CLIENT_URL = 'http://localhost:4000'


// Middleware
app.use(express.json()); // This specific middleware parses JSON string to Javascript Object
app.use(cookieParser()); // This specific middleware parses Cookies
app.use(cors({
  origin: 'http://localhost:4000',         // This makes the Express server except request from other domains
  credentials: true    // Allows cookies sent to this API
}));        


// Routes
import authRouter from './routes/auth'
import greetingRouter from './routes/greetings'
app.use('/auth', authRouter)
app.use('/greetings', greetingRouter)



// Connect To DB
// import mongoose from 'mongoose';
// mongoose.connect(process.env.MONGODB_URL || "");

// Start the express server
const PORT = 3000
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})



