import { Request, Response } from "express";
import { db } from "../config/db";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import Subtask from "../models/Subtask";


export const fetchSubtask = async (req: Request, res: Response) => {
  const id = req.params.id as string

  try {
    const subtask = await Subtask.findById(id);

    if (!subtask) {
      res.status(404).json({message: "Subtask not found"})
      return;
    } 

    res.json(subtask)
  } catch(error: unknown) {
    const message = error  instanceof Error ? error.message : 'Unknown error'
    res.status(500).json({error: message})
  }
}

export const createSubtask = async (req: Request, res: Response) => {
  const content = req.body.content as string;
  const todo_id = req.body.todo_id as string;
  if (content === undefined || todo_id === undefined) {
    res.status(400).json({error: 'Content AND todo_id are required'}) 
    return; 
  }

  try {
    const newSubtask = await Subtask.create({todo_id: todo_id, content: content})
    res.status(201).json({message: 'Subtask created', newSubtask: newSubtask})
  } catch(error: unknown) {
    const message = error  instanceof Error ? error.message : 'Unknown error'
    res.status(500).json({error: message})
  }
}

export const updateSubtask = async (req: Request, res: Response) => {
  const id = req.params.id as string
  const {content, done} = req.body // Destructur JS Object
  if (content === undefined && done === undefined) {
    res.status(400).json({error: 'Either content OR done are required'})
    return
  }


  try {
    const updatedFields: Partial<{content: string, done: boolean}> = {};
    if (content !== undefined) updatedFields.content = content
    if (done !== undefined) updatedFields.done = done
    
    const result = await Subtask.updateOne({_id: id}, {$set: updatedFields})
        
    if (result.matchedCount === 0) {
      res.status(404).json({message: "Subtask not found"})
      return // makes sure that we are done with this function, enabling other calls to work after
    }
  
    res.json({message: 'Subtask updated'})
  } catch(error: unknown) {
    const message = error  instanceof Error ? error.message : 'Unknown error'
    res.status(500).json({error: message})
  }
}

export const deleteSubtask = async (req: Request, res: Response) => {
  const id = req.params.id as string

  try {

    const result = await Subtask.deleteOne({_id: id})
    if (result.deletedCount === 0) {
      res.status(404).json({message: "Subtask not found"})
      return // makes sure that we are done with this function, enabling other calls to work after
    }
    res.json({message: 'Subtask deleted'})
  } catch(error: unknown) {
    const message = error  instanceof Error ? error.message : 'Unknown error'
    res.status(500).json({error: message})
  }
}