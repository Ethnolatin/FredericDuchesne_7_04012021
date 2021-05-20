import { Router } from 'express'
import emailValidation from '../middlewares/email-valid'
import pwValidation from '../middlewares/pw-valid'
import userCtrl from '../controllers/userCtrl'

const router = Router()

// définit les routes relatives à l'utilisateur et leur applique les middlewares :
// - emailValidation qui vérifie le format de l'adresse e-mail
// - pwValidation qui vérifie la sureté du mot de passe
router.post('/signup', emailValidation, pwValidation, userCtrl.signup)
router.post('/login', emailValidation, userCtrl.login)

module.exports = router
