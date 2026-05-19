import express, { Request, Response } from 'express';
import { Todo } from './models/Todo';
const app = express();


// Define root path with message
// req, handles the incoming request from the client
// res, handles the outgoing response back ti the client
// May use _ to indicate that the parameter is not used
app.get('/', (_: Request, res: Response) => {
  res.send('Hello World')
})

const todos: Todo[] = [
  new Todo('Handla mat'),
  new Todo('Käka mat'),
  new Todo('Diska'),
]

app.get('/todos', (_: Request, res: Response) => {
  res.json(todos)
})


const PORT = 3000
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})


// ## Exercise 02-express-intro
// - Add a new GET endpoint "/posts" that returns a list of posts
// - The posts should be an instance of the Post class (modules/Post.ts) with the following properties
// - id, title, content, author
