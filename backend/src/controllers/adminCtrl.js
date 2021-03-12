import dbConnect from '../models/dbConnect'

// récupère le nom de tous les utilisateurs
exports.getAllUsers = (req, res) => {
    dbConnect.query('SELECT Id,firstName,lastName,admin FROM users', (error, result) => {
        if (error) {return res.status(400).json({ error })}
        res.status(201).json(result)
    })
}

// supprime un utilisateur en fonction de son Id
exports.deleteUser = (req, res) => {
    // cherche l'utilisateur dans la base
    dbConnect.query('SELECT * FROM users WHERE Id = ?', [req.params.id], (error, result) => {
        if (error) {return res.status(500).json({ error })}
        // supprime l'utilisateur
        dbConnect.query('DELETE FROM users WHERE Id = ?', [req.params.id], (error, result) => {
            if (error) {return res.status(400).json({ error })}
            res.status(201).json({ message: 'Utilisateur supprimé !' })
        })
    })
}

// modifie le statut admin d'un utilisateur en fonction de son Id
exports.updateUser = (req, res) => {
    dbConnect.query(
        'UPDATE users SET admin = ? WHERE id = ?', [req.body.admin, req.params.id], (error, result) => {
            if (error) {return res.status(400).json({ error })}
            res.status(201).json({ message: 'Statut modifié !' })
        }
    )
}