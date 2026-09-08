import express from 'express'
import {
    login,
    register,
    logout
} from '../controllers/authController'
const router = express.Router()


router.post('/login', login)
router.post('/register', register) // Will talk more about next week
router.post('/logout', logout) 


export default router