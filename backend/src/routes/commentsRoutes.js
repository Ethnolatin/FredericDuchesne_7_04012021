import { Router } from 'express'
import commentsCtrl from '../controllers/commentsCtrl'
import auth from '../middleware/auth'
import multer from '../middleware/multer-config'

const router = Router()

// définit les routes relatives aux commentaires et leur applique
// le middleware 'auth' qui renforce l'authentification
router.post('/', auth, multer, commentsCtrl.createComment)
router.delete('/:id/deleted', auth, commentsCtrl.deleteArticleComments)
router.delete('/:id', auth, commentsCtrl.deleteComment)
router.get('/:id', auth, commentsCtrl.getArticleComments)
router.get('/', auth, commentsCtrl.getAllComments)

module.exports = router