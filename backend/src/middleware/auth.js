import jwt from 'jsonwebtoken'

// vérifie que l'utilisateur est authentifié
module.exports = (req, res, next) => {
    try {
        // extrait le userId de la requête
        const reqUserId = parseInt(req.url.split('=')[1])
        // extrait le token du header 'authorization'
        const token = req.headers.authorization.split(' ')[1]
        // décode le token
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET')
        const { userId } = decodedToken
        // compare le userId extrait de la requête et celui extrait du token
        if (reqUserId !== userId) {
            throw 'User ID non valable'
        } else {
            next()
        }
    } catch (error) {
        res.status(401).json({ error })
    }
}
