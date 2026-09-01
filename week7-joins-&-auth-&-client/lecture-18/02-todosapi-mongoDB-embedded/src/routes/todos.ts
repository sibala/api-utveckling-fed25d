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
router.get('/', fetchAllTodos)
router.get('/:id', fetchTodo)
router.post('/', createTodo)
router.patch('/:id', updateTodo)
router.delete('/:id', deleteTodo)

// Subtask routes (nested under todo)
router.post('/:id/subtasks', createSubtask)
router.patch('/:id/subtasks/:subtaskId', updateSubtask)
router.delete('/:id/subtasks/:subtaskId', deleteSubtask)

export default router;
