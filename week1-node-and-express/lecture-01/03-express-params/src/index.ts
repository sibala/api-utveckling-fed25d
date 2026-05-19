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
  new Todo('AAA'),
  new Todo('BBB'),
  new Todo('CCC'),
  new Todo('Handla mat'),
  new Todo('Käka mat'),
  new Todo('Diska'),
]

// Example query string params
app.get('/todos', (req: Request, res: Response) => {
  const search = req.query.search
  const sort = req.query.sort

  let filteredTodos = todos;

  if (search) {
    filteredTodos = filteredTodos.filter((t) => t.content.includes(search.toString()))
  }
  
  if (sort && sort === "asc") {
    filteredTodos = filteredTodos.sort((a, b) => {
      const todo1 = a.content.toLowerCase()
      const todo2 = b.content.toLowerCase()

      if (todo1 > todo2) return 1
      if (todo1 < todo2) return -1
      return 0
    })
  }

  if (sort && sort === "desc") {
    filteredTodos = filteredTodos.sort((a, b) => {
      const todo1 = a.content.toLowerCase()
      const todo2 = b.content.toLowerCase()

      if (todo1 < todo2) return 1
      if (todo1 > todo2) return -1
      return 0
    })
  }

  
  res.json(filteredTodos)
})


// Example path params
app.get('/todos/:id', (req: Request, res: Response) => {
  const id = req.params.id as string
  const todo = todos.find((t) => t.id === parseInt(id))

  res.json({todo})
})


const PORT = 3000
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})


// ## Exercise 03-express-params

// ### a)
// - Build on the previous code, extend the GET endpoint that returns a list of posts
// - Filter the list by the “Author” property, depending on the “search” query param value
// - Sort the list by the "Title" property, depending on the “sort” query param value (asc or desc)
// - The “search” and “sort” query params are retrieved from the Request object.
// - Example: /posts?search=John&sort=asc

// ### b)
// - Build on the previous code, create a new GET endpoint “/posts/:id” 
// - that returns a specific post depending on the “:id” path param from the URL 
// - The “:id” path param is retrieved from the Request object.
