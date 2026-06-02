import { Request, Response } from "express";
import { Todo } from "../models/Todo";
import { db } from "../config/db";
import { ResultSetHeader } from "mysql2";

const todos: Todo[] = [
  new Todo('AAA'),
  new Todo('BBB'),
  new Todo('CCC', true),
  new Todo('Handla mat'),
  new Todo('Käka mat', true),
  new Todo('Diska'),
  new Todo('Diska'),
]

export const fetchAllTodos = async (req: Request, res: Response) => {
  // const search = req.query.search
  // const sort = req.query.sort
  // let filteredTodos = todos;

  // try {
  //   if (search) {
  //     filteredTodos = filteredTodos.filter((t) => t.content.includes(search.toString()))
  //   }
    
  //   if (sort && sort === "asc") {
  //     filteredTodos = filteredTodos.sort((a, b) => {
  //       const todo1 = a.content.toLowerCase()
  //       const todo2 = b.content.toLowerCase()

  //       if (todo1 > todo2) return 1
  //       if (todo1 < todo2) return -1
  //       return 0
  //     })
  //   }

  //   if (sort && sort === "desc") {
  //     filteredTodos = filteredTodos.sort((a, b) => {
  //       const todo1 = a.content.toLowerCase()
  //       const todo2 = b.content.toLowerCase()

  //       if (todo1 < todo2) return 1
  //       if (todo1 > todo2) return -1
  //       return 0
  //     })
  //   }

  //   res.json(filteredTodos)
  // } catch(error: unknown) {
  //   const message = error  instanceof Error ? error.message : 'Unknown error'
  //   res.status(500).json({error: message})
  // }

  try {
    const [results] = await db.query(
      'SELECT * FROM todos'
    );
    res.json(results)
  } catch(error: unknown) {
    const message = error  instanceof Error ? error.message : 'Unknown error'
    res.status(500).json({error: message})
  }
}


export const fetchTodo = async (req: Request, res: Response) => {
  const id = req.params.id

  try {
    const [results] = await db.query<ResultSetHeader[]>(
      `SELECT * FROM todos WHERE id = ?`,
      [id]
    );

    const todo = results[0]
    if (!todo) {
      res.status(404).json({message: "Todo not found"})
    }
    res.json(results)
  } catch(error: unknown) {
    const message = error  instanceof Error ? error.message : 'Unknown error'
    res.status(500).json({error: message})
  }
}

export const createTodo = async (req: Request, res: Response) => {
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

  // const newTodo = new Todo(content) // content = "Släng soporna"
  // todos.push(newTodo);
  
  // res.status(201).json({message: 'Todo created', data: newTodo})

  try {
    const sql = `
      INSERT INTO todos (content)
      VALUES (?)
    `;

    const [result] = await db.query<ResultSetHeader>(sql,[content]);
    res.status(201).json({message: 'Todo created', newTodo: {id: result.insertId, content: content}})
  } catch(error: unknown) {
    const message = error  instanceof Error ? error.message : 'Unknown error'
    res.status(500).json({error: message})
  }
}

export const updateTodo = (req: Request, res: Response) => {
  // const content = req.body.content;
  // const done = req.body.done;
  // const {content, done} = req.body // Destructur JS Object
  // if (content === undefined || done === undefined) {
  //   res.status(400).json({error: 'Content and Done are required'})
  //   return
  // }

  // const todo = todos.find((t) => t.id === parseInt(req.params.id))
  // if (!todo) {
  //   res.status(404).json({error: 'Todo not found'})
  //   return;
  // }
  
  // todo.content = content;
  // todo.done = done;
  // res.json({message: 'Todo updated', data: todo})
}

export const deleteTodo = async (req: Request, res: Response) => {
  const id = req.params.id

  // const todoIndex = todos.findIndex((t) => t.id === parseInt(id)) 
  // if (todoIndex === -1) {
  //   res.status(404).json({error: 'Todo not found'})
  //   return;
  // }

  // todos.splice(todoIndex, 1)

  try {
    const sql = `
      DELETE FROM todos 
      WHERE id = ?
    `;

    const [result] = await db.query<ResultSetHeader>(sql,[id]);
    if (result.affectedRows === 0) {
      res.status(404).json({message: "Todo not found"})
      return // makes sure that we are done with this function, enabling other calls to work after
    }
    res.json({message: 'Todo deleted'})
  } catch(error: unknown) {
    const message = error  instanceof Error ? error.message : 'Unknown error'
    res.status(500).json({error: message})
  }
  
}