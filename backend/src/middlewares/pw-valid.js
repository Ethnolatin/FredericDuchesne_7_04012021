import passwordSchema from '../models/Password'

// vérifie que le mot de passe est sûr
module.exports = (req, res, next) => {
  try {
    if (!passwordSchema.validate(req.body.password)) {
      throw 'Format de mot de passe non sécurisé'
    } else {
      next()
    }
  } catch (error) {
    res.status(412).json({ error })
  }
}