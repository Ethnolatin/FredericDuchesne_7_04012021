import express from 'express'
import bodyParser from 'body-parser'
import path from 'path'
import articlesRoutes from './src/routes/articlesRoutes'
import userRoutes from './src/routes/userRoutes'
import adminRoutes from './src/routes/adminRoutes'
import dbConnect from './src/models/dbConnect'

// se connecte à la base 'groupomania' sur mysql
// grâce à l'identifiant et au mot de passe fournis dans un fichier .env
dbConnect

const app = express()

// headers permettant à l'application d'accéder à l'API malgré le CORS (s'applique à toutes les routes)
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*') // permet l'accès à l'API depuis n'importe quelle origine
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
    )
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PUT, DELETE, PATCH, OPTIONS'
    )
    next()
})

// utilise body-parser et sa méthode 'json' pour exploiter le corps d'une requête de type application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// utilise body-parser et sa méthode 'json' pour transformer le corps de la requête en json exploitable
app.use(bodyParser.json())

// gère la ressource 'images' de manière statique
app.use('/images', express.static(path.join(__dirname, 'images')))
// route par défaut pour les articles
app.use('/api/articles', articlesRoutes)
// route par défaut pour l'admin'
app.use('/api/admin', adminRoutes)
// renforce l'authentification sur les routes relatives au user
app.use('/api/auth', userRoutes)
  
module.exports = app
