/* eslint-disable prettier/prettier */
module.exports = (item, userId, like) => {
    const article = item
    switch (like) {
        case 1:
            article.usersLiked.push(userId)
            article.likes += 1
            break
        case -1:
            article.usersDisliked.push(userId)
            article.dislikes += 1
            break
        case 0: {
			const likeIndex = article.usersLiked.indexOf(userId)
			if (likeIndex !== -1) {
				article.usersLiked.splice(likeIndex, 1)
				article.likes -= 1
			}
			const dislikeIndex = article.usersDisliked.indexOf(userId)
			if (dislikeIndex !== -1) {
				article.usersDisliked.splice(dislikeIndex, 1)
				article.dislikes -= 1
			}
            break
		}
        default:
            return error
    }
    return article
}
