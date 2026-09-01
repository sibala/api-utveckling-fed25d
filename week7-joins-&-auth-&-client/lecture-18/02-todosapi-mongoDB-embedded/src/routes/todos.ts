import express from 'express';
import {
  createTodo,
  deleteTodo,
  fetchAllTodos,
  fetchTodo,
  updateTodo,
  createSubtask,
  updateSubtask,
  deleteSubtask
} from '../controller/todoController';
const router = express.Router()

// Todo routes
router.get('/', fetchAllTodos) // localhost:3000/todos
router.get('/:id', fetchTodo)  // localhost:3000/todos/:id
router.post('/', createTodo)   // localhost:3000/todos
router.patch('/:id', updateTodo) // localhost:3000/todos/:id
router.delete('/:id', deleteTodo) // localhost:3000/todos/:id



// Subtask routes (nested under todo)
router.post('/:id/subtasks', createSubtask) // localhost:3000/todo/:id/subtasks
router.patch('/:id/subtasks/:subtaskId', updateSubtask)   // localhost:3000/todo/:id/subtasks/:subtaskid
router.delete('/:id/subtasks/:subtaskId', deleteSubtask) // localhost:3000/todo/:id/subtasks/:subtaskid

export default router;
