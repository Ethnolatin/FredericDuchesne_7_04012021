import { Router } from 'express'
import articlesCtrl from '../controllers/articlesCtrl'
import auth from '../middleware/auth'
// import multer from '../middleware/multer-config'

const router = Router()

// définit les routes relatives aux articles et leur applique les middlewares :
// - 'auth' renforce l'authentification sur les routes relatives aux articles
// - 'multer' accepte les téléchargements de fichier pour 'create' et 'modify'
// router.post('/:id/like', auth, articlesCtrl.likeArticle)
router.post('/', auth, articlesCtrl.createArticle)
router.put('/:id', auth, articlesCtrl.modifyArticle)
router.delete('/:id', auth, articlesCtrl.deleteArticle)
router.get('/:id', auth, articlesCtrl.getOneArticle)
router.get('/', auth, articlesCtrl.getAllArticles)

module.exports = router
