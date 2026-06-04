import { Request, Response } from "express";
import { db } from "../config/db";
import { ResultSetHeader } from "mysql2";


// /**
//  * Part of the exercise to figure search and sort functionality out on your own
//  */
// export const fetchAllSubtasks = async (req: Request, res: Response) => {
//   try {
//     const [results] = await db.query(
//       'SELECT * FROM todos'
//     );
//     res.json(results)
//   } catch(error: unknown) {
//     const message = error  instanceof Error ? error.message : 'Unknown error'
//     res.status(500).json({error: message})
//   }
// }

export const fetchSubtask = async (req: Request, res: Response) => {
  console.log(req.params)
  const id = req.params.id

  try {
    const [results] = await db.query<ResultSetHeader[]>(
      `SELECT * FROM subtasks WHERE id = ?`,
      [id]
    );
    console.log(results, results[0])

    const todo = results[0]
    if (!todo) {
      res.status(404).json({message: "Subtask not found"})
    }
    res.json(todo)
  } catch(error: unknown) {
    const message = error  instanceof Error ? error.message : 'Unknown error'
    res.status(500).json({error: message})
  }
}

export const createSubtask = async (req: Request, res: Response) => {
  const content = req.body.content;
  const todo_id = req.body.todo_id;
  if (content === undefined) {
    res.status(400).json({error: 'Content is required'}) 
    return; 
  }

  try {
    const sql = `
      INSERT INTO subtasks (todo_id, content)
      VALUES (?, ?)
    `;

    const [result] = await db.query<ResultSetHeader>(
        sql,
        [todo_id, content]
    );
    res.status(201).json({message: 'Subtask created', newSubtask: {id: result.insertId, content: content}})
  } catch(error: unknown) {
    const message = error  instanceof Error ? error.message : 'Unknown error'
    res.status(500).json({error: message})
  }
}

export const updateSubtask = (req: Request, res: Response) => {
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

export const deleteSubtask = async (req: Request, res: Response) => {
  const id = req.params.id

  try {
    const sql = `
      DELETE FROM subtasks 
      WHERE id = ?
    `;

    const [result] = await db.query<ResultSetHeader>(sql,[id]);
    if (result.affectedRows === 0) {
      res.status(404).json({message: "Subtask not found"})
      return // makes sure that we are done with this function, enabling other calls to work after
    }
    res.json({message: 'Subtask deleted'})
  } catch(error: unknown) {
    const message = error  instanceof Error ? error.message : 'Unknown error'
    res.status(500).json({error: message})
  }
}