import 'dotenv/config'
import express from 'express';
import cors from 'cors'
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
import todoRouter from './routes/todos'
app.use('/todos', todoRouter)

// Connect to MongoDB
import mongoose from "mongoose"
mongoose.connect(process.env.MONGODB_URL || "");

// Start the express server
const PORT = 3000
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})
