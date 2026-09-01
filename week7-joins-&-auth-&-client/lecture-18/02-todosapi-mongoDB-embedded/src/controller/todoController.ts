import { Request, Response } from "express";
import Todo from "../models/Todo";

export const fetchAllTodos = async (req: Request, res: Response) => {
  const search = req.query.search
  const sort = req.query.sort as string

  try {
    let filter: {} = {};
    if (search) {
      filter = {content: { $regex: search}}
    }

    let sortOrder: {} = {};
    if (sort && (sort.toLowerCase() === 'asc' || sort.toLowerCase() === 'desc' )) {
      sortOrder = {content: sort.toLowerCase()}
    }

    const todos = await Todo.find(filter).sort(sortOrder)
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
      return
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

export const updateTodo = async (req: Request, res: Response) => {
  const id = req.params.id as string
  const {content, done} = req.body
  if (content === undefined && done === undefined) {
    res.status(400).json({error: 'Either Content or Done are required'})
    return
  }

  try {
    const updateFields: Partial<{ content: string, done: boolean}> = {}
    if (content !== undefined) updateFields.content = content
    if (done !== undefined) updateFields.done = done

    const result = await Todo.updateOne(
      {_id: id},
      {$set: updateFields}
    )

    if (result.matchedCount === 0) {
      res.status(404).json({message: "Todo not found"})
      return
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
    const result = await Todo.deleteOne({ _id: id });
    if (result.deletedCount === 0) {
      res.status(404).json({message: "Todo not found"})
      return
    }
    res.json({message: 'Todo deleted', result: result})
  } catch(error: unknown) {
    const message = error  instanceof Error ? error.message : 'Unknown error'
    res.status(500).json({error: message})
  }
}

// Subtask operations (embedded)

export const createSubtask = async (req: Request, res: Response) => {
  const todoId = req.params.id as string
  const content = req.body.content;
  if (content === undefined) {
    res.status(400).json({error: 'Content is required'})
    return;
  }

  try {
    const todo = await Todo.findById(todoId)
    if (!todo) {
      res.status(404).json({message: "Todo not found"})
      return
    }

    todo.subtasks.push({ content })
    await todo.save()

    const newSubtask = todo.subtasks[todo.subtasks.length - 1]
    res.status(201).json({message: 'Subtask created', newSubtask: newSubtask})
  } catch(error: unknown) {
    const message = error  instanceof Error ? error.message : 'Unknown error'
    res.status(500).json({error: message})
  }
}

export const updateSubtask = async (req: Request, res: Response) => {
  const todoId = req.params.id as string
  const subtaskId = req.params.subtaskId as string
  const {content, done} = req.body
  if (content === undefined && done === undefined) {
    res.status(400).json({error: 'Either content or done are required'})
    return
  }

  try {
    const todo = await Todo.findById(todoId)
    if (!todo) {
      res.status(404).json({message: "Todo not found"})
      return
    }

    const subtask = todo.subtasks.id(subtaskId)
    if (!subtask) {
      res.status(404).json({message: "Subtask not found"})
      return
    }

    if (content !== undefined) subtask.content = content
    if (done !== undefined) subtask.done = done
    await todo.save()

    res.json({message: 'Subtask updated', subtask: subtask})
  } catch(error: unknown) {
    const message = error  instanceof Error ? error.message : 'Unknown error'
    res.status(500).json({error: message})
  }
}

export const deleteSubtask = async (req: Request, res: Response) => {
  const todoId = req.params.id as string
  const subtaskId = req.params.subtaskId as string

  try {
    const todo = await Todo.findById(todoId)
    if (!todo) {
      res.status(404).json({message: "Todo not found"})
      return
    }

    const subtask = todo.subtasks.id(subtaskId)
    if (!subtask) {
      res.status(404).json({message: "Subtask not found"})
      return
    }

    subtask.deleteOne()
    await todo.save()

    res.json({message: 'Subtask deleted'})
  } catch(error: unknown) {
    const message = error  instanceof Error ? error.message : 'Unknown error'
    res.status(500).json({error: message})
  }
}
