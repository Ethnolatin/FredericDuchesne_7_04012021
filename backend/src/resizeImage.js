import sharp from 'sharp'
import path from 'path'
import fs from 'fs'

export default (file) => {
    sharp(file.path)
        .resize(500, 500, {
            fit: sharp.fit.inside,
            withoutEnlargement: true
        })
        .toFile(path.resolve('images', file.filename))
            .then(() => {fs.unlinkSync(file.path)})
            .catch(err => {console.log(err)})
}