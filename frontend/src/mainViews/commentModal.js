import React from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { createItem } from '../axios'

export class CommentModal extends React.Component {
	constructor(props) {
		super(props)
        this.state = {
            comment: undefined,
        }
	}

    
    render () {
        const { showCommentModal, article } = this.props
        return (<>
            <Modal show={showCommentModal} onHide={this.closeCommentModal} backdrop='static' animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Ajoutez un commentaire</Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    <Form noValidate>
                        <Form.Group controlId='title'>
                            <Form.Label>Article : "{article.title}"</Form.Label>
						</Form.Group>
                        <hr />
                        <Form.Group controlId='text'>
                            <Form.Label>Votre commentaire :</Form.Label>
                            <Form.Control as='textarea'
                                autoFocus
                                className='input'
                                type='text'
                                name='comment'
                                value={this.state.comment}
                                onChange={this.handleInputChange}
                            />
                        </Form.Group> 
                    </Form>
                </Modal.Body>
                {this.state.comment &&
                    <Modal.Footer>
                        <Button onClick={this.createComment}>Publier</Button>
                    </Modal.Footer>
                }
            </Modal>
        </>)
	}


    handleInputChange = (event) => {
        const value = event.target.value
        // localStorage.setItem('articleId',this.props.article.Id)
        this.setState({comment: value})
    }

	closeCommentModal = () => {
        this.setState({
            comment: undefined,
        })
        this.props.closeCommentModal()
    }

    createComment = async () => {
        const formData = new FormData()
        formData.append('articleId', this.props.article.Id)
        formData.append('commentatorId', sessionStorage.getItem('userId'))
        formData.append('comment', this.state.comment)
        await createItem('comments/', sessionStorage.getItem('token'), sessionStorage.getItem('userId'), formData)
        this.closeCommentModal()
    }

}