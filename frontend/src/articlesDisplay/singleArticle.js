import React from 'react'
import { BsTrashFill } from 'react-icons/bs'
import { Button, Modal, Image } from 'react-bootstrap'
import { CommentModal } from '../modals/commentModal'
import { itemDate } from '../itemDate'
import { DeleteAlert } from '../alerts'

export class SingleArticle extends React.Component {
    constructor(props) {
		super(props)
        this.state = {
            showCommentModal: false,
            showAlert: false
        }
    }

    closeArticleModal = () => {
        this.props.closeArticleModal()
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

    confirmDelete = (Id) => {
        localStorage.setItem('thisCommentId', Id)
        this.setState({showAlert: true})
    }

    deleteItem = () => {
        this.props.deleteComment(localStorage.getItem('thisCommentId'))
    }

    hideAlert = () => {
        localStorage.removeItem('thisCommentId')
        this.setState({showAlert: false})
    }

    
    render () {
        const {article, articleComments, commentsQty, userId, admin} = this.props

        return (<>
            <Modal show={this.props.showArticleModal} onHide={this.closeArticleModal} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>{article.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {article.image && <Image src={article.image} width='100%' height='100%' alt={article.title}/>}
                    {article.text}
                    {commentsQty !== 0 && <>
                        <div className='comments spacer'>Commentaires</div>
                        {articleComments.map(thisComment => {
                            const myComment = thisComment.commentatorId === userId
                            const commentator = myComment ? 'moi' : thisComment.commentatorName
                            return(
                                <div key={thisComment.Id} className='comments'>
                                    <DeleteAlert
                                        show={thisComment.Id === parseInt(localStorage.getItem('thisCommentId')) && this.state.showAlert}
                                        item={`ce commentaire`}
                                        deleteItem={this.deleteItem}
                                        hideAlert={this.hideAlert}
                                    />
                                    <div className='comment-header'>
                                        <div>
                                            <b>{commentator} </b>
                                            - {itemDate(thisComment.timeStamp)}
                                        </div>
                                        {(myComment || admin !== 0 ) && (
                                            <Button onClick={() => this.confirmDelete(thisComment.Id)}>
                                                <BsTrashFill/>
                                                <span className='sr-only'>Delete</span>
                                            </Button>
                                        )}
                                    </div>
                                    {thisComment.comment}
                                    <hr />
                                </div>
                            )
                        })}
                    </>}
                <div className='sticky spacer' onClick={this.displayCommentModal}>
                    <div >Ajouter un commentaire...</div>
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