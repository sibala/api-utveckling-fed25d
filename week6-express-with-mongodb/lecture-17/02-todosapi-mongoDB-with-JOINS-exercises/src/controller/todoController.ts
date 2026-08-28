import { Request, Response } from "express";
import { db } from "../config/db";
import Todo from "../models/Todo";
import { ResultSetHeader } from "mysql2";

/**
 * Part of the exercise to figure search and sort functionality out on your own
 */
export const fetchAllTodos = async (req: Request, res: Response) => {
  const search = req.query.search
  const sort = req.query.sort
  
  try {
    const todos = await Todo.find().populate('subtasks')
    res.json(todos)
  } catch(error: unknown) {
    const message = error  instanceof Error ? error.message : 'Unknown error'
    res.status(500).json({error: message})
  }
}

export const fetchTodo = async (req: Request, res: Response) => {
  const id = req.params.id as string

  try {
    const todo = await Todo.findById(id).populate('subtasks')
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
    const newTodo = await Todo.create({content: content})
    res.status(201).json({message: 'Todo created', newTodo: newTodo})
  } catch(error: unknown) {
    const message = error  instanceof Error ? error.message : 'Unknown error'
    res.status(500).json({error: message})
  }
}

/**
 * Part of the exercise to figure out patch request on your own
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
  const id = req.params.id as string

  try {
    const result = await Todo.deleteOne({ _id: id }); // returns {deletedCount: 1}
    if (result.deletedCount === 0) {
      res.status(404).json({message: "Todo not found"})
      return // makes sure that we are done with this function, enabling other calls to work after
    }
    res.json({message: 'Todo deleted', result: result})
  } catch(error: unknown) {
    const message = error  instanceof Error ? error.message : 'Unknown error'
    res.status(500).json({error: message})
  }
}