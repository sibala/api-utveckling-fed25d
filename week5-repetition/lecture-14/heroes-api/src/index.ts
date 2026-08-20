import 'dotenv/config'
import express from 'express';
import cors from 'cors'
const app = express()

/**
 * We want to create a Heroes API
 * 
 * 1. Begin with defining all routes for heroes.ts
 * 2. Create empty functions in heroController.ts and import them to the heroes routes 
 * 3. Import routes to index
 * 4. Create DB connection, and import to index.ts
 * 5. Add middleware in index.ts
 * 6. Create the heroes table in Beekeeper Studio
 * 7. Work with each and every empty function in heroController.ts, use DB to fetch or manipulate data
 * 8. Test out the functionallity of the API through Insomnia requests
 */

// Middleware
app.use(express.json()); // This specific middleware parses JSON string to Javascript Object
app.use(cors());        // This makes the Express server except request from other domains

app.get('/', (req, res) => {
    res.send('Hello World!')
})

import heroRouter from './routes/heroes'
app.use('/heroes', heroRouter)

import { connectToDatabase } from './config/db'
connectToDatabase();

const PORT = 3000
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})