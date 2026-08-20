import express from 'express'
const router = express.Router()
import {
    fetchAllHeroes,
    fetchHero,
    createHero,
    updateHero,
    deleteHero
} from '../controllers/heroController'


router.get('/', fetchAllHeroes)
router.get('/:id', fetchHero)
router.post('/', createHero)
router.patch('/:id', updateHero)
router.delete('/:id', deleteHero)

export default router