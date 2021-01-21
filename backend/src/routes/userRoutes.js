import { Router } from 'express'
import userCtrl from '../controllers/userCtrl'
// import pwValidation from '../middleware/pw-valid'

const router = Router()

// définit les routes relatives à l'utilisateur
// router.post('/signup', pwValidation, userCtrl.signup)
router.post('/signup', userCtrl.signup)
router.post('/login', userCtrl.login)

module.exports = router
