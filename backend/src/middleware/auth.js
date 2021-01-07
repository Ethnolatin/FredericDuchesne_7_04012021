/* eslint-disable no-throw-literal */
import jwt from 'jsonwebtoken'

// vérifie que l'utilisateur est authentifié
module.exports = (req, res, next) => {
    try {
        // extrait le token du header 'authorization'
        // const token = req.headers.authorization.split(' ')[1]
        const token =
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTYwOTk3MjUwMCwiZXhwIjoxNjEwODM2NTAwfQ.IV6wLKZSMM3iuFMNBHCDe1Rrl1k0Yauz-hI2Dlnvmn0'
        // décode le token
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET')
        const { userId } = decodedToken
        // vérifie le token
        if (req.body.userId && req.body.userId !== userId) {
            throw 'User ID non valable'
        } else {
            next()
        }
    } catch (error) {
        res.status(401).json({ error })
    }
}
