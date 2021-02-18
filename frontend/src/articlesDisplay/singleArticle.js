import React from 'react'
import { Button, Modal, Image } from 'react-bootstrap'
import { CommentsModal } from '../modals/commentsModal'

export class SingleArticle extends React.Component {
    constructor(props) {
		super(props)
        this.state = {
            showCommentsModal: false
        }

        this.articleModalClose = this.articleModalClose.bind(this)
    }

    articleModalClose = () => {
        this.props.articleModalClose()
    }

    displayCommentsModal = () => {
        this.setState({
            showCommentsModal: true
        })
    }
    
    closeCommentsModal = () => {
        this.setState({
            showCommentsModal: false,
        })
    }

    createComment = () => {
        this.props.createComment()
    }

    
    render () {
        const {showArticleModal, article} = this.props
        return (<>
            <Modal show={showArticleModal} onHide={this.articleModalClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>{article.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {article.image && <Image src={article.image} width='100%' height='100%' alt={article.title}/>}
                    {article.text}
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.displayCommentsModal} >
                        <i className='fas fa-comment-alt'/>
                    </Button>
                </Modal.Footer>
            </Modal>
            <CommentsModal
                closeCommentsModal={this.closeCommentsModal}
                showCommentsModal={this.state.showCommentsModal}
                createComment={this.createComment}
                article={article}
            />
                                
        </>)
    }
}