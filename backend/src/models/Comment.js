function Comment({articleId, commentatorId, comment}) {
    this.articleId = articleId
    this.commentatorId = commentatorId
    this.comment = comment
    this.timeStamp = new Date()
}

module.exports = Comment
