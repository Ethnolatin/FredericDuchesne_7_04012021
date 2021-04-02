import fs from 'fs'

export default (file) => {
    const filename = file.split('.')[0].slice(0, -3)
    const imgSizes = [300, 500, 800]
    
    imgSizes.map((imgSize) => {
        fs.unlink(`images/${filename}${imgSize}.webp`, (err) => {
            if (err) {console.log(err)}
            else {console.log(`Image ${filename}${imgSize}.webp supprimée...`)}
        })
    })
}