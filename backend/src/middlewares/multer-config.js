import multer from 'multer'

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/webp': 'webp',
}

// utilise 'multer' pour gérer les fichiers entrants dans les requêtes HTTP
const storage = multer.diskStorage({
    // indique la destination du fichier
    destination: (req, file, callback) => {
        callback(null, 'images/temp')
    },
    // définit un nom du fichier valide (sans espace) et unique (avec un timestamp)
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_').split('.')[0]
        const extension = MIME_TYPES[file.mimetype]
        callback(null, `${name + '-' + Date.now()}.${extension}`)
    },
})

module.exports = multer({ storage }).single('image')
