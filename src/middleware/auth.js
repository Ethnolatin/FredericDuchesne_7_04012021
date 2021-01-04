/* eslint-disable no-throw-literal */
const jwt = require('jsonwebtoken')

// vérifie que l'utilisateur est authentifié
module.exports = (req, res, next) => {
    try {
        // extrait le token du header 'authorization'
        const token = req.headers.authorization.split(' ')[1]
        // décode le token
        const decodedToken = jwt.verify(token, process.env.TOKENKEY)
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
