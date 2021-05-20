import fs from 'fs'
import Article from '../models/Article'
import dbConnect from '../dbConnect'
import likesManagement from '../components/likesManagement'
import declineImage from '../components/declineImage'
import deleteImages from '../components/deleteImages'

// récupère tous les articles
exports.getAllArticles = (req, res) => {
    dbConnect.query(
        'SELECT articles.*, CONCAT(users.firstName, " ", users.lastName) AS writerName FROM users JOIN articles ON users.Id = articles.writerId',
        (error, result) => {
            if (error) {return res.status(400).json({ error })}
            res.status(200).json(result)
        }
    )
}

// crée un nouvel article
exports.createArticle = async (req, res) => {
    const articleObject = req.body
    const article = new Article({
        ...articleObject,
    })
    // gère l'éventuelle image
    await manageImage()
    // ajoute l'article à la base de données
    dbConnect.query('INSERT INTO articles SET ?', article, (error, result) => {
        if (error) {return res.status(400).json({ error })}
        res.status(201).json({ message: 'Article enregistré !' })
    })
    async function manageImage() {
        if (req.file) {
            declineImage(req.file)
            article.image = `${req.protocol}://${req.get('host')}/images/${req.file.filename.split('.')[0]}-800.webp`
        }
    }
}

// modifie un article en fonction de son Id
exports.modifyArticle = async (req, res) => {
    let articleObject
    // gère l'éventuelle image
    await manageImage()
    // met l'article à jour
    dbConnect.query(
        'UPDATE articles SET title = ?, text = ?, image = ? WHERE id = ?',
        [articleObject.title, articleObject.text, articleObject.image, req.params.id],
        (error, result) => {
            if (error) {return res.status(400).json({ error })}
            res.status(201).json({ message: 'Article modifié !' })
        }
    )
    async function manageImage() {
        // supprime l'éventuelle image antérieure de backend/images
        if (req.body.oldImage) {
            const imageName = req.body.oldImage.split('/images/')[1]
            deleteImages(imageName)
        }
        // gère l'éventuelle nouvelle image
        if (req.file) {
            declineImage(req.file)
            articleObject = {
            ...req.body,
            image: `${req.protocol}://${req.get('host')}/images/${req.file.filename.split('.')[0]}-800.webp`
            }
        } else {
            articleObject = { ...req.body }
        }
        return
    }
}

// supprime un article en fonction de son Id
exports.deleteArticle = (req, res) => {
    dbConnect.query('SELECT * FROM articles WHERE Id = ?', [req.params.id], (error, result) => {
        if (error) {return res.status(500).json({ error })}
    // gère les éventuelles images
    if (result[0].image) {
            const filename = result[0].image.split('/images/')[1]
            deleteImages(filename)
        }
        // supprime l'article
        dbConnect.query('DELETE FROM articles WHERE Id = ?', [req.params.id], (error, result) => {
            if (error) {return res.status(400).json({ error })}
            res.status(201).json({ message: 'Article supprimé !' })
        })
    })
}

// gère le statut "like" d'un article
exports.likeArticle = (req, res) => {
    // récupère l'article concerné
    dbConnect.query('SELECT * FROM articles WHERE Id = ?', [req.params.id], (error, result) => {
        if (error) {return res.status(500).json({ error })}
        // modifie les données relatives au like/dislike
        const likedArticle = likesManagement(result, req.body.userId, req.body.like)
        // enregistre les modifications dans la table
        dbConnect.query(
            'UPDATE articles SET likes = ?, dislikes = ?, usersLiked = ?, usersDisliked = ? WHERE id = ?',
            [likedArticle.likes, likedArticle.dislikes, likedArticle.usersLiked, likedArticle.usersDisliked, likedArticle.Id],
            (err) => {
                if (err) {return res.status(400).json({ err })}
                res.status(201).json({ message: 'Vote enregistré !' })
            }
        )
    })
}