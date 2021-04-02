import React from 'react'
import { Button, Form, Image, Modal, Alert } from 'react-bootstrap'

export class CreateModal extends React.PureComponent {
	constructor(props) {
		super(props)

        this.state = {
            modifiedArticleTitle: undefined,
            modifiedArticleText: undefined,
            newArticleTitle: undefined,
            newArticleText: undefined,
            showAlert: false,
        }
    }

    render () {
        const { showCreateModal, articleModification, previewImage } = this.props
        return (<>
            <Modal show={showCreateModal} onHide={this.closeCreateModal} backdrop='static' animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>{articleModification ? 'Modifiez votre article :' : 'Ecrivez un article :' }</Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    <Form noValidate>
                        <Alert show={this.state.showAlert} variant='warning' >
                            Votre article doit avoir un titre...
                        </Alert>
                        <Form.Group controlId='title'>
                            <Form.Label>Titre :</Form.Label>
                            <Form.Control
                                className='input'
                                type='text'
                                name={articleModification ? 'modifiedArticleTitle' : 'newArticleTitle' }
                                value={localStorage.getItem(articleModification ? 'modifiedArticleTitle' : 'newArticleTitle') || ''}
                                onChange={this.handleInputChange}
                                required
                            />
                        </Form.Group> 
                        <hr />
                        <Form.Group>
                            <Form.Label>Image :</Form.Label>
                            <br />
                            {previewImage && <>
                                <Image src={previewImage} width='50%' height='50%' />
                                <br />
                                <Button onClick={this.noImage}>Supprimer l'image</Button>
                            </>}
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
                                name={articleModification ? 'modifiedArticleText' : 'newArticleText' }
                                value={localStorage.getItem(articleModification ? 'modifiedArticleText' : 'newArticleText') || ''}
                                onChange={this.handleInputChange}
                            />
                        </Form.Group> 
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    {!articleModification &&
                        <Button onClick={this.saveCreateModal}>Sauvegarder</Button>
                    }
                    <Button onClick={this.checkTitle}>Publier</Button>
                </Modal.Footer>
            </Modal>
        </>)
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
        this.setState({showAlert: false})
        this.props.saveCreateModal()
    }

    handleInputChange = (event) => {
		const name = event.target.name
		const value = event.target.value
        localStorage.setItem(String(name), String(value))
        this.setState({[name]:value})
    }

    handleImageInput = (event) => {
        this.props.handleImageInput(event)
    }

    checkTitle = () => {
        this.setState({showAlert: false})
        const articleModification = this.props.articleModification
        const modifiedArticleTitle = localStorage.getItem('modifiedArticleTitle')
        const newArticleTitle = localStorage.getItem('newArticleTitle')
        if ((articleModification && !modifiedArticleTitle) ||
        (!articleModification && !newArticleTitle)) {
            this.setState({showAlert: true})
            return
        } else this.publishArticle()
    }

    publishArticle = () => {
        this.props.publishArticle()
    }

    noImage = () => {
        this.props.noImage()
    }
    
}