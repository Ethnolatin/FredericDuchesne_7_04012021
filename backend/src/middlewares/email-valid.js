import emailValidator from 'email-validator'

// vérifie le format de l'adresse e-mail
module.exports = (req, res, next) => {
    try {
      if (!emailValidator.validate(req.body.email)) {
        throw 'Format de courriel incorrect'
      } else {
        next()
      }
    } catch (error) {
      res.status(412).json({ error })
    }
  }