/* eslint-disable prettier/prettier */
module.exports = (item, userId, like) => {
    const article = JSON.parse(JSON.stringify(item))[0]
    const usersLikedObject = JSON.parse(article.usersLiked)
    const usersDislikedObject = JSON.parse(article.usersDisliked)

    switch (like) {
        case 1: 
            usersLikedObject.push(userId)
            article.likes += 1
            break
        case -1:
            usersDislikedObject.push(userId)
            article.dislikes += 1
            break
        case 0: {
			const likeIndex = usersLikedObject.indexOf(userId)
			if (likeIndex !== -1) {
				usersLikedObject.splice(likeIndex, 1)
				article.likes -= 1
			}
			const dislikeIndex = usersDislikedObject.indexOf(userId)
			if (dislikeIndex !== -1) {
				usersDislikedObject.splice(dislikeIndex, 1)
				article.dislikes -= 1
			}
            break
		}
        default:
            return error
    }
    article.usersLiked = JSON.stringify(usersLikedObject)
    article.usersDisliked = JSON.stringify(usersDislikedObject)

    return article
}
