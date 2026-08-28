import express from 'express';
import { 
  createTodo, 
  deleteTodo, 
  fetchAllTodos, 
  fetchTodo, 
  updateTodo } from '../controller/todoController';
const router = express.Router()

router.get('/', fetchAllTodos)
router.get('/:id', fetchTodo)
router.post('/', createTodo)
router.patch('/:id', updateTodo)
router.delete('/:id', deleteTodo)

export default router;
