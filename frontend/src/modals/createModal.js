import React from 'react'
import { Button, Form } from 'react-bootstrap'
import Image from 'react-bootstrap/Image'
import Modal from 'react-bootstrap/Modal'

export class CreateModal extends React.PureComponent {
	constructor(props) {
		super(props)

        this.state = {
            modifiedArticleTitle: undefined,
            modifiedArticleText: undefined,
            newArticleTitle: undefined,
            newArticleText: undefined,
        }

        this.closeCreateModal = this.closeCreateModal.bind(this)
        this.saveCreateModal = this.saveCreateModal.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleImageInput = this.handleImageInput.bind(this)
        this.checkTitle = this.checkTitle.bind(this)
    }

    closeCreateModal = () => {
        this.setState({
            modifiedArticleTitle: undefined,
            modifiedArticleText: undefined,
            newArticleTitle: undefined,
            newArticleText: undefined,
        })
        this.props.closeCreateModal()
    }

    saveCreateModal = () => {
        this.props.saveCreateModal()
    }

    handleInputChange(event) {
		const name = event.target.name
		const value = event.target.value
        localStorage.setItem(String(name), String(value))
        this.setState({[name]:value})
    }

    handleImageInput = (event) => {
        this.props.handleImageInput(event)
    }

    definePreviewImage = (articleModification, current, preview, saved) => {
        const previewImage =
            preview ? 
                preview :
                articleModification ?
                    current :
                    saved ?
                        saved :
                        undefined
        return previewImage
    }

    publishArticle = () => {
        this.props.publishArticle()
    }

    checkTitle() {
        const articleModification = this.props.articleModification
        const modifiedArticleTitle = localStorage.getItem('modifiedArticleTitle')
        const newArticleTitle = localStorage.getItem('newArticleTitle')
        if ((articleModification && !modifiedArticleTitle) ||
        (!articleModification && !newArticleTitle)) {
            alert("Votre article doit avoir un titre...")
            return
        } else this.publishArticle()
    }
    
render () {
        const { showCreateModal, articleModification, currentImage, imagePreviewUrl, savedImagePreviewUrl } = this.props

        return (
            <Modal show={showCreateModal} onHide={this.closeCreateModal} backdrop='static' animation={false}>
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
                                name={articleModification ? 'modifiedArticleTitle' : 'newArticleTitle' }
                                value={localStorage.getItem(articleModification ? 'modifiedArticleTitle' : 'newArticleTitle')}
                                onChange={this.handleInputChange}
                                required
                            />
                        </Form.Group> 
                        <hr />
                        <Form.Group>
                            <Form.Label>Image :</Form.Label>
                            <Form.File
                                className='input'
                                type='file'
                                name='image'
                                onChange={this.handleImageInput}
                            />
                        </Form.Group>
                        <Image src={this.definePreviewImage(articleModification, currentImage, imagePreviewUrl, savedImagePreviewUrl)} width='50%' height='50%' />
                        <hr />
                        <Form.Group controlId='text'>
                            <Form.Label>Texte :</Form.Label>
                            <Form.Control as='textarea'
                                className='input'
                                type='text'
                                name={articleModification ? 'modifiedArticleText' : 'newArticleText' }
                                value={localStorage.getItem(articleModification ? 'modifiedArticleText' : 'newArticleText')}
                                onChange={this.handleInputChange}
                                required
                            />
                        </Form.Group> 
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.checkTitle}>Publier</Button>
                    {!articleModification &&
                        <Button onClick={this.saveCreateModal}>Sauvegarder</Button>
                    }
                </Modal.Footer>
            </Modal>
        )
    }
}