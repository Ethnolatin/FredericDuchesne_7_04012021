import React from 'react'
import { Button, Form } from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal'

export class CreateModal extends React.PureComponent {
	constructor(props) {
		super(props)

        this.createModalClose = this.createModalClose.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleImageInput = this.handleImageInput.bind(this)
    }

    createModalClose = () => {
        this.props.createModalClose()
    }

    handleInputChange = (event) => {
        this.props.handleInputChange(event)
    }

    handleImageInput = (event) => {
        this.props.handleImageInput(event)
    }

render () {
        const { showCreateModal, articleModification, newArticleTitle, newArticleText, currentImage, publishArticle } = this.props
        return (
            <Modal show={showCreateModal} onHide={this.createModalClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>{articleModification ? 'Modifiez votre article :' : 'Ecrivez un article :' }</Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    <Form noValidate>
                        <Form.Group controlId='title'>
                            <Form.Label>Titre :</Form.Label>
                            <Form.Control
                                className='input'
                                type='text'
                                name='newArticleTitle'
                                value={newArticleTitle}
                                onChange={this.handleInputChange}
                                required
                            />
                        </Form.Group> 
                        <hr />
                        <Form.Group>
                            <Form.Label>Image :{currentImage}</Form.Label>
                            <Form.File
                                className='input'
                                type='file'
                                name='image'
                                onChange={this.handleImageInput}
                            />
                        </Form.Group>
                        <hr />
                        <Form.Group controlId='text'>
                            <Form.Label>Texte :</Form.Label>
                            <Form.Control as='textarea'
                                className='input'
                                type='text'
                                name='newArticleText'
                                value={newArticleText}
                                onChange={this.handleInputChange}
                                required
                            />
                        </Form.Group> 
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={publishArticle}>Publier</Button>
                    <Button onClick={this.createModalClose}>Fermer</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}