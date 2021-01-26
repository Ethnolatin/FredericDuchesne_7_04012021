import { Router } from 'express'
import userCtrl from '../controllers/userCtrl'

const router = Router()

// définit les routes relatives à l'utilisateur
router.post('/signup', userCtrl.signup)
router.post('/login', userCtrl.login)

module.exports = router
