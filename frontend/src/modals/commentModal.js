import React from 'react'
import { Button, Form, Modal } from 'react-bootstrap'

export class CommentModal extends React.Component {
	constructor(props) {
		super(props)
        this.state = {
            comment: undefined,
        }
	}

    handleInputChange = (event) => {
        const value = event.target.value
		localStorage.setItem('comment', String(value))
        localStorage.setItem('articleId',this.props.article.Id)
        this.setState({comment: value})
    }

	closeCommentModal = () => {
        this.setState({
            comment: undefined,
        })
        this.props.closeCommentModal()
    }

    createComment = () => {
        localStorage.getItem('comment') && this.props.createComment()
        this.closeCommentModal()
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
                                className='input'
                                type='text'
                                name='comment'
                                value={localStorage.getItem('comment') || ''}
                                onChange={this.handleInputChange}
                            />
                        </Form.Group> 
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.createComment}>Publier</Button>
                </Modal.Footer>
            </Modal>
        </>)
	}
}