/* eslint-disable prettier/prettier */
// import fs from 'fs'
import Article from '../models/Article'
import dbConnect from '../models/dbConnect'
// import likesManagement from '../likesManagement'

// crée un nouvel article
exports.createArticle = (req, res) => {
    const articleObject = req.body
    const article = new Article({
      ...articleObject,
    //   imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    })
    // ajoute l'article à la base de données
    dbConnect.query('INSERT INTO articles SET ?', article, (error, result) => {
        if (error) {return res.status(400).json({ error })}
        return res.status(201).json({ message: 'Article enregistré !' })
    })
}

exports.getAllArticles = (req, res) => {
    dbConnect.query('SELECT * FROM articles', (error, result) => {
        if (error) {return res.status(400).json({ error })}
        res.status(201).json(result)
    })
}
