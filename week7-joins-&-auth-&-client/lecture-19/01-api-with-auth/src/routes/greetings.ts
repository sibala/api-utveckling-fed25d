import express from 'express';
import { 
  fetchGeneralGreeting, 
  fetchSpecificGreeting, 
 } from '../controllers/greetingController';
import { verifyAccessToken } from '../middleware/verifyToken';
const router = express.Router()

router.get('/', fetchGeneralGreeting)
router.get('/:name', verifyAccessToken, fetchSpecificGreeting)

export default router;
