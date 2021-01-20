function Article({ writerId, writerName, title, text, imageUrl }) {
    this.writerId = writerId
    this.writerName = writerName
    this.title = title
    this.text = text
    this.imageUrl = imageUrl
    this.timeStamp = new Date()
    this.likes = 0
    this.dislikes = 0
    this.usersLiked = '[]'
    this.usersDisliked = '[]'
}

module.exports = Article
