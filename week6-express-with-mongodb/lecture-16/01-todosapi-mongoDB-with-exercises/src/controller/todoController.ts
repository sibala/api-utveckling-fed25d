import { Request, Response } from "express";
import { db } from "../config/db";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { ITodoDBResponse } from "../models/ITodoDBResponse";


/**
 * Part of the exercise to figure search and sort functionality out on your own
 */
export const fetchAllTodos = async (req: Request, res: Response) => {
  const search = req.query.search
  const sort = req.query.sort

  
  try {
    let sql = 'SELECT * FROM todos'
    let params: string[] = [];

    if(search) {
      sql += ` WHERE content LIKE ?`
      params = [`%${search}%`]
    }

    // Solution 1
    if(sort && sort === 'asc') {
      sql += ` ORDER BY content ASC`
    } else if (sort && sort === 'desc') {
      sql += ` ORDER BY content DESC`
    }

    // Solution 2 - with ternary operator
    // if (sort) {
    //   sql += sort == 'asc' 
    //     ? ' ORDER BY content ASC' 
    //     : ' ORDER BY content DESC'
    // }

    const [results] = await db.query<RowDataPacket[]>(sql,params);
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
    const [rows] = await db.query<ITodoDBResponse[]>(`
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

    console.log(rows)
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
const formatedTodo1 = (rows: ITodoDBResponse[]) => {
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
const formatedTodo2 = (rows: ITodoDBResponse[]) => {
  return {
      id:         rows[0].todo_id,
      content:    rows[0].todo_content,
      done:       rows[0].todo_done,
      created_at: rows[0].todo_created_at,
      subtasks:   rows.map((row) => ({
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