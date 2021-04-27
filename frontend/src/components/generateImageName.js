export function generateImageName (item) {
    if(!item) {return}
    const xs = item.substring(0, item.length-8) + '300.webp'
    const s = item.substring(0, item.length-8) + '500.webp'
    let newNames = {s, xs}
    return newNames
}
