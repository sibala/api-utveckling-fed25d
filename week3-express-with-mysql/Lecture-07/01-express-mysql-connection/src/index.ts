import 'dotenv/config'
import express from 'express';
import cors from 'cors'
const app = express();

// console.log(process.env)


// Middleware
app.use(express.json()); // This specific middleware parses JSON string to Javascript Object
app.use(cors());        // This makes the Express server except request from other domains


// Connect to DB
import mysql from 'mysql2/promise';
const db = mysql.createPool({
  host:     process.env.DB_HOST || "",
  user:     process.env.DB_USER || "",
  database: process.env.DB_NAME || "",
  password: process.env.DB_PASSWORD || "",
  port:     parseInt(process.env.DB_PORT || "3306")
});



const connectToDatabase = async () => {
  try {
    await db.getConnection();
    console.log("Connected to DB")
  } catch(error: unknown) {
    console.log("Error connecting top DB: " + error)
  }
}




// Routes
import todoRouter from './routes/todos'
app.use('/todos', todoRouter)


// Test DB connection
connectToDatabase()
// Start the express server
const PORT = 3000
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})