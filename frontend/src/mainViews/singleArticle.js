import React from 'react'
import { Modal, Image } from 'react-bootstrap'
import { DeleteAlert } from './alerts'
import { CommentModal } from './commentModal'
import { deleteItem, getSomeItems } from '../axios'
import { DeleteButton } from '../components/deleteButton'
// import { generateImageName } from '../components/generateImageName'
import { itemDate } from '../components/itemDate'

export class SingleArticle extends React.Component {
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
        const list = await getSomeItems('comments/', sessionStorage.getItem('token'), sessionStorage.getItem('userId'), this.props.article.Id)
        const commentsQty = list ? list.length : 0
        return this.setState({
            articleComments: list,
            commentsQty: commentsQty
        })
    }


    render () {
        const userId = sessionStorage.getItem('userId')
        const admin = parseInt(sessionStorage.getItem('admin'))
        const { article } = this.props
        const articleComments = this.state.articleComments
        // const resizedImage = generateImageName(article.image)
        // const {sImage, xsImage} = resizedImage || {}

        return (<>
            <Modal show={this.props.showArticleModal} onHide={this.closeArticleModal} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>{article.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {article.image && <Image 
                        src={article.image}
                        // srcSet={`${xsImage} 300w, ${sImage} 500w, ${article.image} 800w`}
                        sizes='100vw'
                        width='100%' height='100%' alt={article.title}
                    />}
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
        await deleteItem('comments/', sessionStorage.getItem('token'), sessionStorage.getItem('userId'), localStorage.getItem('toBeDeleted'))
        this.getArticleComments()
    }

    hideAlert = () => {
        this.setState({showAlert: false})
        this.getArticleComments()
    }

}