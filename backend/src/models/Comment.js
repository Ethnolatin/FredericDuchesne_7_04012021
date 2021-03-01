function Comment({articleId, commentatorId, commentatorName, comment}) {
    this.articleId = articleId
    this.commentatorId = commentatorId
    this.commentatorName = commentatorName
    this.comment = comment
    this.timeStamp = new Date()
}

module.exports = Comment
