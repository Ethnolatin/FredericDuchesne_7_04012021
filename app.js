import express from 'express'
import bodyParser from 'body-parser'
import postsRoutes from './src/routes/postsRoutes'
import userRoutes from './src/routes/userRoutes'
import dbConnect from './src/models/db.connect'
// const path = require('path');

// se connecte à la base 'groupomania' sur mysql grâce à l'identifiant et au mot de passe fournis
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
// app.use('/images', express.static(path.join(__dirname, 'images')));
// route par défaut pour les posts
app.use('/api/posts', postsRoutes)
// renforce l'authentification sur les routes relatives au user
app.use('/api/auth', userRoutes)

module.exports = app
