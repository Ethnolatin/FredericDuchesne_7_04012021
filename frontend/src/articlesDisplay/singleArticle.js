import React from 'react'
import { Modal, Image } from 'react-bootstrap'
import { CommentModal } from '../modals/commentModal'
import { itemDate } from '../itemDate'
import { DeleteButton } from '../deleteButton'
import { DeleteAlert } from '../alerts'
import { deleteItem } from '../axios'
import { AuthContext } from '../authContext'
import { getSomeItems } from '../axios'

export class SingleArticle extends React.Component {
    static contextType = AuthContext
    constructor(props) {
		super(props)
        this.state = {
            articleComments: undefined,
            commentsQty: 0,
            showCommentModal: false,
            showAlert: false
        }
    }

    componentDidMount() {
        this.getArticleComments()
    }

    getArticleComments = async () => {
        const list = await getSomeItems('comments/', this.context.token, this.context.userId, this.props.article.Id)
        const commentsQty = list ? list.length : 0
        return this.setState({
            articleComments: list,
            commentsQty: commentsQty
        })
    }


    render () {
        const { userId, admin } = this.context
        const { article } = this.props
        const articleComments = this.state.articleComments

        return (<>
            <Modal show={this.props.showArticleModal} onHide={this.closeArticleModal} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>{article.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {article.image && <Image src={article.image} width='100%' height='100%' alt={article.title}/>}
                    {article.text}
                    {this.state.commentsQty !== 0 && <>
                        <div className='comments spacer'>Commentaires</div>
                        {articleComments && 
                            articleComments.map(thisComment => {
                                const myComment = thisComment.commentatorId === userId
                                const commentator = myComment ? 'moi' : thisComment.commentatorName
                                return(
                                    <div key={thisComment.Id} className='comments'>
                                        <DeleteAlert
                                            show={thisComment.Id === parseInt(localStorage.getItem('toBeDeleted')) && this.state.showAlert}
                                            item={`ce commentaire`}
                                            hideAlert={this.hideAlert}
                                            deleteItem={this.deleteComment}
                                        />
                                        <div className='comment-header'>
                                            <div>
                                                <b>{commentator} </b>
                                                - {itemDate(thisComment.timeStamp)}
                                            </div>
                                            {(myComment || admin !== 0 ) && (
                                                <DeleteButton
                                                    confirmDelete={this.confirmDelete}
                                                    toBeDeleted={thisComment.Id}
                                                />
                                            )}
                                        </div>
                                        {thisComment.comment}
                                        <hr />
                                    </div>
                                )
                            })
                        }
                    </>}
                <div className='sticky spacer' onClick={this.displayCommentModal}>
                    <div >Ajouter un commentaire...</div>
                </div>
                
                </Modal.Body>
            </Modal>
            <CommentModal
                closeCommentModal={this.closeCommentModal}
                showCommentModal={this.state.showCommentModal}
                article={article}
            />
        </>)
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
        this.getArticleComments()
        this.setState({
            showCommentModal: false,
        })
    }

    confirmDelete = () => {
        this.setState({showAlert: true})
    }

    deleteComment = async () => {
        await deleteItem('comments/', this.context.token, this.context.userId, localStorage.getItem('toBeDeleted'))
        this.getArticleComments()
    }

    hideAlert = () => {
        this.setState({showAlert: false})
        this.getArticleComments()
    }

}