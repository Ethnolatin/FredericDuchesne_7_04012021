import PasswordValidator from 'password-validator'

// crée un schéma pour le mot de passe avec les propriétés requises
export const pwSchema = new PasswordValidator()
pwSchema
  .is().min(8)                          // 8 caractères minimum
  .has().uppercase(1)                   // 1 lettre majuscule minimum
  .has().lowercase(1)                   // 1 lettre minuscule minimum
  .has().digits(1)                      // 1 chiffre minimum
  .has().not().spaces()                 // pas d'espace
