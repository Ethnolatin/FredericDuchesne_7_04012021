import sharp from 'sharp'
import path from 'path'
import fs from 'fs'

export default (file) => {
    sharp(file.path)
        .resize(800, 800, {
            fit: sharp.fit.inside,
            withoutEnlargement: true
        })
        .toFormat('webp')
        .toFile(path.resolve('images', file.filename.split('.')[0] + '.webp'))
            .then(() => {fs.unlinkSync(file.path)})
            .catch(err => {console.log(err)})
}