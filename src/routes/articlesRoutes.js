import { Router } from 'express'
import articlesCtrl from '../controllers/articlesCtrl'
import auth from '../middleware/auth'
// import multer from '../middleware/multer-config'

const router = Router()

// définit les routes relatives aux articles et leur applique les middlewares :
// - 'auth' renforce l'authentification sur les routes relatives aux articles
// - 'multer' accepte les téléchargements de fichier pour 'create' et 'modify'
// router.post('/:id/like', auth, articlesCtrl.likeArticle)
router.post('/', articlesCtrl.createArticle) // remettre auth
router.put('/:id', articlesCtrl.modifyArticle) // remettre auth
router.delete('/:id', articlesCtrl.deleteArticle) // remettre auth
router.get('/:id', articlesCtrl.getOneArticle) // remettre auth
router.get('/', articlesCtrl.getAllArticles) // remettre auth

module.exports = router
