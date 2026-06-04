import express from 'express';
import { 
  createSubtask, 
  deleteSubtask, 
  fetchSubtask, 
  updateSubtask } from '../controller/subtaskController';
const router = express.Router()

// router.get('/', fetchAllSubtasks)
router.get('/:id', fetchSubtask)
router.post('/:variable', createSubtask)
router.patch('/:id', updateSubtask)
router.delete('/:id', deleteSubtask)

export default router;