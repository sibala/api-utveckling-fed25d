import 'dotenv/config'
import express from 'express';
import cors from 'cors'
import path from 'path';


const app = express();

// in the .env file can the following variables be included
// MONGODB_URL = 'mongodb+srv://...'
// CLIENT_URL = 'http://localhost:4000'


// Middleware
// Reads a request body sent as JSON text and turns it into a real JavaScript
// object, which Express hands us as req.body.
app.use(express.json());

// CORS only concerns requests from OTHER origins. Our own client lives in
// public/ and is served from the same origin as this API, so the browser never
// treats it as cross-origin. This only matters for an external client.
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000'
}));

// Serve the static client (the HTML/CSS/JS in public/).
//   public/index.html   -> GET /
//   public/todo.html    -> GET /todo.html
//   public/create.html  -> GET /create.html
//   public/js/main.js   -> GET /js/main.js
// process.cwd() is the project root both when running with tsx and after
// `npm run build`, whereas __dirname would move to dist/api/.
app.use(express.static(path.join(process.cwd(), 'public')));


// Routes
import todoRouter from '../src/routes/todos'
import subtaskRouter from '../src/routes/subtasks'
app.use('/api/todos', todoRouter)
app.use('/api/subtasks', subtaskRouter)


// Connect To DB
import mongoose from 'mongoose';
mongoose.connect(process.env.MONGODB_URL || "");

// Start the express server locally. On Vercel there is no long-running server:
// Vercel imports this file and calls the exported app for each request.
if (!process.env.VERCEL) {
  const PORT = 3000
  app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`)
  })
}

export default app;
