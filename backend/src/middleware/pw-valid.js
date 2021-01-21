import passwordSchema from '../models/Password'

// vérifie que le mot de passe est sûr
module.exports = (req, res, next) => {
    try {
        if (!passwordSchema.validate(req.body.password)) {
            throw 'Mot de passe pas assez sécurisé'
        } else {
            next()
        }
    }
    catch (error) {
        res.status(401).json({ error })
    }
}
