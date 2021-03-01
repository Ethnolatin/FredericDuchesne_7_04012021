import React from 'react'
import { Button, Modal, Image } from 'react-bootstrap'
import { CommentModal } from '../modals/commentModal'
import { itemDate } from '../itemDate'

export class SingleArticle extends React.Component {
    constructor(props) {
		super(props)
        this.state = {
            showCommentModal: false
        }

        this.articleModalClose = this.articleModalClose.bind(this)
    }

    articleModalClose = () => {
        this.props.articleModalClose()
    }

    displayCommentModal = () => {
        this.setState({
            showCommentModal: true
        })
    }
    
    closeCommentModal = () => {
        this.setState({
            showCommentModal: false,
        })
    }

    createComment = () => {
        this.props.createComment()
    }

    deleteComment = (Id) => {
        this.props.deleteComment(Id)
    }

    
    render () {
        const {article, articleComments, userId, admin} = this.props
        
        return (<>
            <Modal show={this.props.showArticleModal} onHide={this.articleModalClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>{article.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {article.image && <Image src={article.image} width='100%' height='100%' alt={article.title}/>}
                    {article.text}
                    <div className='comments spacer'></div>
                    {articleComments && 
                        articleComments.map(thisComment => {
                            const myComment = thisComment.commentatorId === userId
                            const commentator = myComment ? 'moi' : thisComment.commentatorName
                            return(
                                <div key={thisComment.Id} className='comments'>
                                    <div className='comment-header'>
                                        <div>
                                            <b>{commentator} </b>
                                            - {itemDate(thisComment.timeStamp)}
                                        </div>
                                        {(myComment || admin !== 0 ) && (
                                            <Button onClick={() => this.deleteComment(thisComment.Id)}>
                                                <i className='fas fa-trash-alt'/>
                                            </Button>
                                        )}
                                    </div>
                                    {thisComment.comment}
                                    <hr />
                                </div>
                            )
                        })
                    }
                <div onClick={this.displayCommentModal} className='sticky'>
                    <div >
                        Ajouter un commentaire...
                    </div>
                </div>
                
                </Modal.Body>
            </Modal>
            <CommentModal
                closeCommentModal={this.closeCommentModal}
                showCommentModal={this.state.showCommentModal}
                createComment={this.createComment}
                article={article}
            />
                                
        </>)
    }
}