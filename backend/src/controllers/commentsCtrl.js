import Comment from '../models/Comment'
import dbConnect from '../dbConnect'

// crée un nouveau commentaire
exports.createComment = (req, res) => {
    const newComment = new Comment({
        ...req.body,
    })
    // ajoute le commentaire à la base de données
    dbConnect.query('INSERT INTO comments SET ?', newComment, (error, result) => {
        if (error) {return res.status(400).json({ error })}
        res.status(201).json({ message: 'Commentaire enregistré !' })
    })
}

// récupère les commentaires correspondant à un article
exports.getArticleComments = (req, res) => {
    dbConnect.query('SELECT * FROM comments WHERE articleId = ?', [req.params.id], (error, result) => {
        if (error) {return res.status(400).json({ error })}
        res.status(200).json(result)
    })
}

// récupère tous les commentaires
exports.getAllComments = (req, res) => {
    dbConnect.query('SELECT * FROM comments', (error, result) => {
        if (error) {return res.status(400).json({ error })}
        res.status(200).json(result)
    })
}

// supprime un commentaire en fonction de son Id
exports.deleteComment = (req, res) => {
    dbConnect.query('DELETE FROM comments WHERE Id = ?', [req.params.id], (error, result) => {
        if (error) {return res.status(400).json({ error })}
        res.status(201).json({ message: 'Commentaire supprimé !' })
    })
}

// supprime les commentaires correspondant à un article
exports.deleteArticleComments = (req, res) => {
    dbConnect.query('DELETE FROM comments WHERE articleId = ?', [req.params.id], (error, result) => {
        if (error) {return res.status(400).json({ error })}
        res.status(201).json({ message: 'Commentaires associés supprimés !' })
    })
}
