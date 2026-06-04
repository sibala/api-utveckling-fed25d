import 'dotenv/config'
import express from 'express';
import cors from 'cors'
const app = express();

// Middleware
app.use(express.json()); // This specific middleware parses JSON string to Javascript Object
app.use(cors());        // This makes the Express server except request from other domains

// Routes
import todoRouter from './routes/todos'
app.use('/todos', todoRouter)
import subtaskRouter from './routes/subtasks'
app.use('/subtasks', subtaskRouter)



// Test DB connection
import { connectToDatabase } from './config/db';
connectToDatabase()

// Start the express server
const PORT = 3000
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})