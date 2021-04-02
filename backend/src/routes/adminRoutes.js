import { Router } from 'express'
import auth from '../middlewares/auth'
import adminCtrl from '../controllers/adminCtrl'

const router = Router()

// définit les routes relatives à l'administrateur et leur applique
// le middleware 'auth' qui renforce l'authentification
router.delete('/:id', auth, adminCtrl.deleteUser)
router.put('/:id', auth, adminCtrl.updateUser)
router.get('/', auth, adminCtrl.getAllUsers)

module.exports = router
