import { Router } from 'express'
import pwValidation from '../middleware/pw-valid'
import userCtrl from '../controllers/userCtrl'

const router = Router()

// définit les routes relatives à l'utilisateur
// applique à la route signup le middleware pwValidation qui vérifie la sureté du mot de passe
router.post('/signup', pwValidation, userCtrl.signup)
router.post('/login', userCtrl.login)
router.get('/', (req, res) => {
    res.send('Salut user !')
})

module.exports = router
