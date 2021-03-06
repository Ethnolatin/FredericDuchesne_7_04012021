import { Router } from 'express'
import articlesCtrl from '../controllers/articlesCtrl'
import auth from '../middlewares/auth'
import multer from '../middlewares/multer-config'

const router = Router()

// définit les routes relatives aux articles et leur applique les middlewares :
// - 'auth' renforce l'authentification
// - 'multer' gère les téléchargements de fichier pour 'create' et 'modify'
router.post('/:id/like', auth, articlesCtrl.likeArticle)
router.post('/', auth, multer, articlesCtrl.createArticle)
router.put('/:id', auth, multer, articlesCtrl.modifyArticle)
router.delete('/:id', auth, articlesCtrl.deleteArticle)
router.get('/', auth, articlesCtrl.getAllArticles)

module.exports = router
