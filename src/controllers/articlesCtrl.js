/* eslint-disable prettier/prettier */
// import fs from 'fs'
import Article from '../models/Article'
import dbConnect from '../models/dbConnect'
import likesManagement from '../likesManagement'

// crée un nouvel article
exports.createArticle = (req, res) => {
    const articleObject = req.body
    const article = new Article({
        ...articleObject,
        // imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    })
    // ajoute l'article à la base de données
    dbConnect.query('INSERT INTO articles SET ?', article, (error, result) => {
        if (error) {return res.status(400).json({ error })}
        res.status(201).json({ message: 'Article enregistré !' })
    })
}

exports.getAllArticles = (req, res) => {
    dbConnect.query('SELECT * FROM articles', (error, result) => {
        if (error) {return res.status(400).json({ error })}
        res.status(201).json(result)
    })
}

exports.getOneArticle = (req, res) => {
    dbConnect.query('SELECT * FROM articles WHERE Id = ?', [req.params.id], (error, result) => {
        if (error) {return res.status(400).json({ error })}
        res.status(201).json(result)
    })
}

exports.modifyArticle = (req, res) => {
    dbConnect.query(
        'UPDATE articles SET title = ?, text = ?, imageUrl = ? WHERE id = ?',
        [req.body.title, req.body.text, req.body.imageUrl, req.params.id],
        (error, result) => {
            if (error) {return res.status(400).json({ error })}
            res.status(201).json({ message: 'Article modifié !' })
        }
    )
}

exports.deleteArticle = (req, res) => {
    dbConnect.query('DELETE FROM articles WHERE Id = ?', [req.params.id], (error, result) => {
        if (error) {return res.status(400).json({ error })}
        res.status(201).json({ message: 'Article supprimé !' })
    })
}

// définit le statut "like" d'un article
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