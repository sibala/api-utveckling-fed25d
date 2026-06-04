import { Request, Response } from "express";
import { db } from "../config/db";
import { ResultSetHeader, RowDataPacket } from "mysql2";


/**
 * Part of the exercise to figure search and sort functionality out on your own
 */
export const fetchAllTodos = async (req: Request, res: Response) => {
  // const search = req.query.search
  // const sort = req.query.sort
  // let filteredTodos = todos;

  
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
  console.log(req.params)
  const id = req.params.id

  try {
    const [rows] = await db.query<RowDataPacket[]>(`
        SELECT 
          todos.id AS todo_id, 
          todos.content AS todo_content,
          todos.done AS todo_done,
          todos.created_at AS todo_created_at,
          subtasks.id AS subtask_id, 
          subtasks.todo_id AS subtask_todo_id,
          subtasks.content AS subtask_content,
          subtasks.done AS subtask_done,
          subtasks.created_at AS subtask_created_at
        from todos
        LEFT JOIN subtasks ON todos.id = subtasks.todo_id
        WHERE todos.id = ?
      `,
      [id]
    );

    const todo = rows[0]
    if (!todo) {
      res.status(404).json({message: "Todo not found"})
    }
  
    res.json(formatedTodo1(rows))
  } catch(error: unknown) {
    const message = error  instanceof Error ? error.message : 'Unknown error'
    res.status(500).json({error: message})
  }
}

// Solution 1
const formatedTodo1 = (rows: any) => {
  let subtasks = []
  for (let row of rows) {
    let subtask = {
      id:         row.subtask_id,
      todo_id:    row.subtask_todo_id,
      content:    row.subtask_content,
      done:       row.subtask_done,
      created_at: row.subtask_created_at,
    }

    subtasks.push(subtask)
  }

  return {
    id:         rows[0].todo_id,
    content:    rows[0].todo_content,
    done:       rows[0].todo_done,
    created_at: rows[0].todo_created_at,
    subtasks:   subtasks
  }
}


// Solution 2
const formatedTodo2 = (rows: any) => {
  return {
      id:         rows[0].todo_id,
      content:    rows[0].todo_content,
      done:       rows[0].todo_done,
      created_at: rows[0].todo_created_at,
      subtasks:   rows.map((row: any) => ({
          id:        row.subtask_id,
          todo_id:   row.subtask_todo_id,
          content:   row.subtask_content,
          done:      row.subtask_done,
          created_at:row.subtask_created_at
      }))
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
    res.status(201).json({message: 'Todo created', newTodo: {id: result.insertId, content: content}})
  } catch(error: unknown) {
    const message = error  instanceof Error ? error.message : 'Unknown error'
    res.status(500).json({error: message})
  }
}

/**
 * Part of the exercise to figure out patch request on your own
 */
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