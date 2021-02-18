import Comment from '../models/Comment'
import dbConnect from '../models/dbConnect'

// crée un nouveau commentaire
exports.createComment = (req, res) => {
    console.log('req.body: ', req.body)
    const newComment = new Comment({
        ...req.body,
    })
    console.log('newComment: ',newComment)
    // ajoute le commentaire à la base de données
    dbConnect.query('INSERT INTO comments SET ?', newComment, (error, result) => {
        if (error) {return res.status(400).json({ error })}
        res.status(201).json({ message: 'Commentaire enregistré !' })
    })
}
