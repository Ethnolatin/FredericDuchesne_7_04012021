function Article({ writerId, title, text, image }) {
    this.writerId = writerId
    this.title = title
    this.text = text
    this.image = image
    this.timeStamp = new Date()
    this.likes = 0
    this.dislikes = 0
    this.score = 0
    this.usersLiked = '[]'
    this.usersDisliked = '[]'
}

module.exports = Article
