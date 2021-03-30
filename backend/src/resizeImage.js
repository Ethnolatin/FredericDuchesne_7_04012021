import sharp from 'sharp'
import path from 'path'
import fs from 'fs'



export default (file) => {
    const filename = file.filename.split('.')[0]
    const imgSizes = [300, 500, 800]
    
    const multiplyImages = imgSizes.map(async(imgSize) => {
        await sharp(file.path)
        .resize(imgSize, imgSize, {
            fit: sharp.fit.inside,
            withoutEnlargement: true
        })
        .toFormat('webp')
        .toFile(path.resolve('images', filename + '-' + imgSize + '.webp'))
        .catch(err => {console.log(err)})
    })

    Promise.all(multiplyImages).then(() => {fs.unlinkSync(file.path)})
}

  