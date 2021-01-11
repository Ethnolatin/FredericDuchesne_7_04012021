import dotenv from 'dotenv'
import http from 'http'

dotenv.config()

const app = require('./app')

const server = http.createServer(app)

// renvoie un port valide (3000 par défaut)
const normalizePort = (val) => {
    const port = parseInt(val, 10)
    if (Number.isNaN(port)) {
        return val
    }
    if (port >= 0) {
        return port
    }
    return false
}
const port = normalizePort(process.env.PORT || '3000')
app.set('port', port)

// recherche et gère les erreurs
const errorHandler = (error) => {
    if (error.syscall !== 'listen') {
        throw error
    }
    const address = server.address()
    const bind =
        typeof address === 'string' ? `pipe ${address}` : `port: ${port}`
    switch (error.code) {
        case 'EACCES':
            console.error(`${bind} requires elevated privileges.`)
            process.exit(1)
            break
        case 'EADDRINUSE':
            console.error(`${bind} is already in use.`)
            process.exit(1)
            break
        default:
            throw error
    }
}

server.on('error', errorHandler)
server.on('listening', () => {
    const address = server.address()
    const bind =
        typeof address === 'string' ? `pipe ${address}` : `port: ${port}`
    console.log(`Listening on ${bind}`)
})

server.listen(port)