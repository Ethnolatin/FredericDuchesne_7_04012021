import fs from 'fs'
import Article from '../models/Article'
import dbConnect from '../models/dbConnect'
import likesManagement from '../likesManagement'

// récupère tous les articles
exports.getAllArticles = (req, res) => {
    dbConnect.query('SELECT * FROM articles', (error, result) => {
        if (error) {return res.status(400).json({ error })}
        res.status(201).json(result)
    })
}

// récupère un article en fonction de son Id
exports.getOneArticle = (req, res) => {
    dbConnect.query('SELECT * FROM articles WHERE Id = ?', [req.params.id], (error, result) => {
        if (error) {return res.status(400).json({ error })}
        res.status(201).json(result)
    })
}

// crée un nouvel article
exports.createArticle = (req, res) => {
    const articleObject = req.body
    const article = new Article({
        ...articleObject,
    })
    // gère l'éventuelle image
    if (req.file) {article.image = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`}
    // ajoute l'article à la base de données
    dbConnect.query('INSERT INTO articles SET ?', article, (error, result) => {
        if (error) {return res.status(400).json({ error })}
        res.status(201).json({ message: 'Article enregistré !' })
    })
}

// modifie un article en fonction de son Id
exports.modifyArticle = (req, res) => {
    let articleObject
    // gère l'éventuelle image
    if (req.file) {
        // supprime l'éventuelle image antérieure
        if (req.body.oldImage) {
            const imageName = req.body.oldImage.split('/images/')[1]
            fs.unlink(`images/${imageName}`, (err) => {
                if (err) {return res.status(402).json({ err })}
                else {console.log('Image supprimée...')}
            })
        }
        // ajoute la nouvelle image
        articleObject = {
            ...req.body,
            image: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        }
    } else {
        articleObject = { ...req.body }
    }
    // met l'article à jour
    dbConnect.query(
        'UPDATE articles SET title = ?, text = ?, image = ? WHERE id = ?',
        [articleObject.title, articleObject.text, articleObject.image, req.params.id],
        (error, result) => {
            if (error) {return res.status(400).json({ error })}
            res.status(201).json({ message: 'Article modifié !' })
        }
    )
}

// supprime un article en fonction de son Id
exports.deleteArticle = (req, res) => {
    dbConnect.query('SELECT * FROM articles WHERE Id = ?', [req.params.id], (error, result) => {
        if (error) {return res.status(500).json({ error })}
        // détecte et supprime l'éventuelle image
        if (result[0].image) {
            const filename = result[0].image.split('/images/')[1]
            fs.unlink(`images/${filename}`, (err) => {
                if (err) {return res.status(402).json({ err })}
                else {console.log('Image supprimée...')}
            })
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