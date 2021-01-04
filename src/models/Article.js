function Article({ userId, postTitle, postText, postImageUrl }) {
    this.userId = userId
    this.postTitle = postTitle
    this.postText = postText
    this.postImageUrl = postImageUrl
    this.likes = 0
    this.dislikes = 0
    this.usersLiked = []
    this.usersDisliked = []
}

module.exports = Article
