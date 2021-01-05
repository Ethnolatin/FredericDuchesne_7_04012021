function Article({ userId, title, text, imageUrl }) {
    this.userId = userId
    this.title = title
    this.text = text
    this.imageUrl = imageUrl
    this.likes = 0
    this.dislikes = 0
    this.usersLiked = null
    this.usersDisliked = null
}

module.exports = Article
