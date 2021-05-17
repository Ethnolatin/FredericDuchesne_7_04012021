import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/User'
import dbConnect from '../dbConnect'

// ajoute un nouvel utilisateur à la base de données
exports.signup = (req, res) => {
    // utilise la fonction de hachage 'bcrypt' pour chiffrer le mot de passe
    bcrypt.hash(req.body.password, 10)
    .then((hash) => {
        const newUser = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hash,
        })
        // ajoute l'utilisateur à la base de données
        dbConnect.query('INSERT INTO users SET ?', newUser, (error, result) => {
            if (error) {return res.status(400).json({ error })}
            const user = JSON.parse(JSON.stringify(newUser))
            const Id = result.insertId
            // confirme la création et renvoie l'Id, le prénom, le nom et le niveau admin
            // ainsi qu'un jeton Web JSON signé et encodé à l'aide d'une clé secrète
            return res.status(201).json({
                message: 'Utilisateur créé !',
                userId: Id,
                firstName: user.firstName,
                lastName: user.lastName,
                admin: user.admin,
                token: jwt.sign({ userId: Id }, 'RANDOM_TOKEN_SECRET', { expiresIn: '24h' })
            })
        })
    })
    .catch((error) => res.status(500).json({ error }))
}

// vérifie les informations d'identification de l'utilisateur
exports.login = (req, res) => {
    // vérifie l'existence de l'adresse e-mail dans la base
    dbConnect.query('SELECT * FROM users WHERE email = ?', req.body.email, (error, result) => {
        const resultUser = JSON.parse(JSON.stringify(result))[0]
        if (!resultUser) {return res.status(401).json({ message: 'Utilisateur inconnu...' })}
        // vérifie le mot de passe
        bcrypt.compare(req.body.password, resultUser.password)
        .then(valid => {
            // si non valide, renvoie une erreur
            if (!valid) {return res.status(401).json({ message: 'Mot de passe non valide...' })}
            // si valide, renvoie l'Id, le prénom, le nom et le niveau admin depuis la base de données
            // ainsi qu'un jeton Web JSON signé et encodé à l'aide d'une clé secrète
            return (res.status(200).json({
                userId: resultUser.Id,
                firstName: resultUser.firstName,
                lastName: resultUser.lastName,
                admin: resultUser.admin,
                token: jwt.sign({ userId: resultUser.Id }, 'RANDOM_TOKEN_SECRET', { expiresIn: '24h' })
            }))
        })
        .catch((err) => res.status(500).json({ err }))
    })
}
