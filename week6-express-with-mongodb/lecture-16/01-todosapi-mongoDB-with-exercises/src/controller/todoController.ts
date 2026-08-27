import { Request, Response } from "express";
import Todo from '../models/Todo'

/**
 * Part of the exercise to figure search and sort functionality out on your own
 */
export const fetchAllTodos = async (req: Request, res: Response) => {
  const search = req.query.search
  const sort = req.query.sort
  
  try {
    const todos = await Todo.find()
    res.json(todos)
  } catch(error: unknown) {
    const message = error  instanceof Error ? error.message : 'Unknown error'
    res.status(500).json({error: message})
  }
}

export const fetchTodo = async (req: Request, res: Response) => {
  const id = req.params.id as string

  try {
    const todo = await Todo.findById(id)
    if (!todo) {
      res.status(404).json({message: "Todo not found"})
    }
    res.json(todo)
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

  try {
    const sql = `
      INSERT INTO todos (content)
      VALUES (?)
    `;

    const [result] = await db.query<ResultSetHeader>(sql,[content]);
    console.log(result)
    res.status(201).json({message: 'Todo created', newTodo: {id: result.insertId, content: content}})
  } catch(error: unknown) {
    const message = error  instanceof Error ? error.message : 'Unknown error'
    res.status(500).json({error: message})
  }
}

/**
 * Part of the exercise to figure out PATCH request on your own
 */
export const updateTodo = async (req: Request, res: Response) => {
  // const content = req.body.content;
  // const done = req.body.done;
  const {content, done} = req.body // Destructur JS Object
  if (content === undefined || done === undefined) {
    res.status(400).json({error: 'Content and Done are required'})
    return
  }


  try {
    const id = req.params.id
    const [result] = await db.query<ResultSetHeader>(`
        UPDATE todos 
        SET content = ?, done = ?
        WHERE id = ?
      `,
      [content, done, id]
    );
    
    if (result.affectedRows === 0) {
      res.status(404).json({message: "Todo not found"})
      return // makes sure that we are done with this function, enabling other calls to work after
    }
  
    res.json({message: 'Todo updated'})
  } catch(error: unknown) {
    const message = error  instanceof Error ? error.message : 'Unknown error'
    res.status(500).json({error: message})
  }
}

export const deleteTodo = async (req: Request, res: Response) => {
  const id = req.params.id

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