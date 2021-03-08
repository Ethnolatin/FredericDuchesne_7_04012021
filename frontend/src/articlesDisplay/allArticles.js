import React from 'react'
import { Card, Button } from 'react-bootstrap'
import { BsTrashFill } from 'react-icons/bs'
import { RiThumbUpFill, RiThumbDownFill, RiThumbUpLine, RiThumbDownLine } from 'react-icons/ri'
import { FaCommentAlt, FaEdit } from 'react-icons/fa'
import { SingleArticle } from './singleArticle'
import { DeleteAlert } from '../alerts'
import { itemDate } from '../itemDate'

export class AllArticles extends React.Component {
	constructor(props) {
		super(props)
        this.state = {
            showArticleModal: false,
            showAlert: false}
    }

    displayArticleModal = (selectedArticle) => {
        this.setState({
            showArticleModal: true,
            article: selectedArticle
        })
    }

    closeArticleModal = () => {
        this.setState({
            showArticleModal: false,
            article: {}
        })
    }

    handleThumbUpChange = (likeOption) => {
        this.props.handleThumbUpChange(this.props.article, likeOption)
    }

    handleThumbDownChange = (likeOption) => {
        this.props.handleThumbDownChange(this.props.article, likeOption)
    }

    confirmDelete = () => {
        this.setState({showAlert: true})
    }

    deleteItem = () => {
        this.props.deleteArticle(this.props.article)
    }

    modifyArticle = () => {
        this.props.modifyArticle(this.props.article)
    }

    hideAlert = () => {
        this.setState({showAlert: false})
    }

    createComment = () => {
        this.props.createComment()
    }

    deleteComment = (Id) => {
        this.props.deleteComment(Id)
    }
    
    render () {
        const { article, userId, admin, commentsQty } = this.props
        const likeOption = (
            article.usersLiked.includes(userId) ?
                1
                : article.usersDisliked.includes(userId) ?
                    2
                    : 3
        )
        const thumbUp = likeOption === 1 ? <RiThumbUpFill className='thumb-up' /> : <RiThumbUpLine className='thumb-line'/>
        const thumbDown = likeOption === 2 ? <RiThumbDownFill className='thumb-down' /> : <RiThumbDownLine className='thumb-line'/>
        const myArticle = article.writerId === userId.toString()
        const writer = myArticle ? 'moi' : article.writerName
        
        return (<>
            <Card >
                <DeleteAlert
                    show={this.state.showAlert}
                    item={`l'article "${article.title}"`}
                    deleteItem={this.deleteItem}
                    hideAlert={this.hideAlert}
                />
                <Card.Header>
                    Publié par{' '}
                    <b>{writer}{' '}</b>
                    {itemDate(article.timeStamp)}
                </Card.Header>
                <Card.Body onClick={this.displayArticleModal}>
                    <Card.Title>{article.Id}-{article.title}</Card.Title>
                    { article.image &&
                        <Card.Img src={article.image} alt='' />
                    }
                    { article.text &&
                        <Card.Text>{article.text}</Card.Text>
                    }
                </Card.Body>
                <Card.Footer>
                    <div className='thumb'>
                        <div onClick={() => this.handleThumbUpChange(likeOption)}>{thumbUp}</div>
                        <div><b>{article.score}</b></div>
                        <div onClick={() => this.handleThumbDownChange(likeOption)}>{thumbDown}</div>
                    </div>
                    <div className='comments-qty' onClick={this.displayArticleModal}>
                        <FaCommentAlt/>
                        {' '}{commentsQty}
                    </div>
                    <div className='card-footer-buttons'>
                        {(myArticle || admin !== 0 ) && (
                            <Button onClick={this.confirmDelete} >
                                <BsTrashFill />
                                <span className='sr-only'>Delete</span>
                            </Button>
                        )}
                        {myArticle && (
                            <Button onClick={this.modifyArticle} >
                                <FaEdit/>
                                <span className='sr-only'>Modify</span>
                            </Button>
                        )}
                    </div>
                </Card.Footer>
            </Card>

            <SingleArticle
                closeArticleModal={this.closeArticleModal}
                createComment={this.createComment}
                deleteComment={this.deleteComment}
                showArticleModal={this.state.showArticleModal}
                showCommentModal={this.props.showCommentModal}
                articleComments={this.props.articleComments}
                article={this.props.article}
                userId={this.props.userId}
                admin={this.props.admin}
            />
        </>)
    }
}
