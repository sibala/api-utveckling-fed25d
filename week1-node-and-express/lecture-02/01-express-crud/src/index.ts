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
  new Todo('Diska'),
]

// Example query string params
app.get('/todos', (req: Request, res: Response) => {
  const search = req.query.search
  const sort = req.query.sort

  let filteredTodos = todos;
  // For testing error handling
  // let filteredTodos: any = null;

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


// General Middleware for all requests
app.use(express.json()); // This specific middleware parses JSON string to Javascript Object


// Create todo
app.post('/todos', (req: Request, res: Response) => {
  const content = req.body.content;
  if (content === undefined) {
    res.status(400).json({error: 'Content is required'}) 
    return; 
  }
  // const todoExists = todos.find((t) => t.content === content)
  // if (todoExists) {
  //   res.json({message: 'Todo exisits already. Please create antoher todo'})  
  //   return;
  // }
  // console.log(todoExists)

  const newTodo = new Todo(content) // content = "Släng soporna"
  todos.push(newTodo);
  
  res.status(201).json({message: 'Todo created', data: newTodo})
})


// Update todo
app.patch('/todos/:id', (req: Request, res: Response) => {
  // const content = req.body.content;
  // const done = req.body.done;
  const {content, done} = req.body // Destructur JS Object
  if (content === undefined || done === undefined) {
    res.status(400).json({error: 'Content and Done are required'})
    return
  }

  const todo = todos.find((t) => t.id === parseInt(req.params.id as string))
  if (!todo) {
    res.status(404).json({error: 'Todo not found'})
    return;
  }
  
  todo.content = content;
  todo.done = done;
  res.json({message: 'Todo updated', data: todo})
})


app.delete('/todos/:id', (req: Request, res: Response) => {
  const id = req.params.id

  const todoIndex = todos.findIndex((t) => t.id === parseInt(id)) 
  if (todoIndex === -1) {
    res.status(404).json({error: 'Todo not found'})
    return;
  }

  todos.splice(todoIndex, 1)
  res.json({message: 'Todo deleted'})
})


const PORT = 3000
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})
