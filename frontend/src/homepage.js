import React from 'react'
import { Card, Button, Form } from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal'
import Moment from 'react-moment'
import 'moment/locale/fr'
import { AuthContext } from './authContext'
import { ajaxGet, ajaxPost, ajaxPut, ajaxDelete } from './ajax'
import Navigation from './navigation'
import { Login } from './loginForm'

export class Homepage extends React.Component {
    static contextType = AuthContext
	constructor(props) {
		super(props)
		this.state = {
            Id: '',
            userId: '',
            token: '',
            firstName: '',
            lastName: '',
            articlesCollection: [],
            article: {},
            showArticleModal: false,
            showCreateModal: false,
            newArticleTitle: '',
            newArticleText: '',
            articleModification: false
        }

		this.getAllArticles = this.getAllArticles.bind(this)
		this.createArticle = this.createArticle.bind(this)
        this.articlesList = this.articlesList.bind(this)
        this.articleModalDisplay = this.articleModalDisplay.bind(this)
        this.articleModalClose = this.articleModalClose.bind(this)
        this.createModalDisplay = this.createModalDisplay.bind(this)
        this.createModalClose = this.createModalClose.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
    }


    componentDidMount() {
        console.log('context: ', this.context)
        this.setState({
            userId: this.context.userId,
            token: this.context.token,
            firstName: this.context.firstName,
            lastName: this.context.lastName
        })
        this.context.token && this.getAllArticles()
    }

    getAllArticles = () => {
        console.log('GET request')
        ajaxGet ('http://localhost:3000/api/articles/', this.context.token)
        .then ((response) => {
            this.setState({articlesCollection: response})
        })
        .catch((err) => {
            console.log({err})
        })
    }

    createArticle = (event) => {
        event.preventDefault()
        const articleData = {
            writerId: this.state.userId,
            writerName: this.state.firstName + ' ' + this.state.lastName,
            title: this.state.newArticleTitle,
            text: this.state.newArticleText
        }
        ajaxPost ('http://localhost:3000/api/articles/', articleData, this.context.token)
        .then ((response) => {
            console.log(response.message)
            this.createModalClose()
            this.getAllArticles()
        })
        .catch((err) => {
            console.log({err})
        })
    }

    modifyArticle = (event) => {
        event.preventDefault()
        const Id = this.state.Id
        const articleData = {
            title: this.state.newArticleTitle,
            text: this.state.newArticleText
        }
        ajaxPut ('http://localhost:3000/api/articles/' + Id, articleData, this.context.token)
        .then ((response) => {
            console.log(response.message)
            this.createModalClose()
            this.getAllArticles()
        })
        .catch((err) => {
            console.log({err})
        })
    }

    deleteArticle = (selectedArticle) => {
        const Id = selectedArticle.Id
        ajaxDelete ('http://localhost:3000/api/articles/' + Id, this.context.token)
        .then ((response) => {
            console.log(response.message)
            this.getAllArticles()
        })
        .catch((err) => {
            console.log({err})
        })
    }

    articleModalDisplay = (selectedArticle) => {
        this.setState({
            showArticleModal: true,
            article: selectedArticle
        })
    }

    articleModalClose = () => {
        this.setState({
            showArticleModal: false,
            article: {}
        })
    }

    createModalDisplay = () => {
        this.setState({
            showCreateModal: true
        })
    }

    createModalClose = () => {
        this.setState({
            showCreateModal: false
        })
    }

    modify(selectedArticle) {
        this.setState({
            articleModification: true,
            Id: selectedArticle.Id,
            newArticleTitle: selectedArticle.title,
            newArticleText: selectedArticle.text
        })
        this.createModalDisplay()
    }

    newArticle() {
        this.setState({
            newArticleTitle: '',
            newArticleText: '',
            articleModification: false
        })
        this.createModalDisplay()
    }

    handleInputChange(event) {
		const target = event.target
		const name = target.name
		const value = target.value
        this.setState({[name]:value})
    }

    articlesList() {
        console.log('state: ', this.state)
        const articlesCollection = this.state.articlesCollection.reverse()
        const calendarStrings = {
            lastDay : '[hier à] H[h]mm',
            sameDay : '[aujourd\'hui à] H[h]mm',
            lastWeek : 'dddd [dernier à] H[h]mm',
            sameElse : '[le] dddd D MMMM YYYY [à] H[h]mm'
        }
		const publishArticle = this.state.articleModification ? this.modifyArticle : this.createArticle

        return (
            <div>
                <Navigation />
                <header>
                    <p>{this.state.firstName} {this.state.lastName}</p>
                    <Button onClick={() => this.newArticle()} >Ecrire un article</Button>
                </header>
                <main>{
                    articlesCollection.map((article) => {
                        const myArticle = article.writerId === this.state.userId.toString()
                        const writer = myArticle ? 'moi' : article.writerName
                        return(<>
                            <Card key={article.Id}>
                                <Card.Header>
                                    Publié par{' '}
                                    <b>{writer}{' '}</b>
                                    <Moment
                                        locale='fr'
                                        calendar={calendarStrings}
                                        date={article.timeStamp}
                                    />
                                </Card.Header>
                                <Card.Body>
                                    <Card.Title>{article.title}</Card.Title>
                                    <Card.Img variant='top' src={article.imageUrl} alt='' />
                                    <Card.Text>{article.text}</Card.Text>
                                    <hr />
                                    <Button onClick={() => this.articleModalDisplay(article)} >
                                        <i className='fas fa-ellipsis-h'/>
                                    </Button>
                                </Card.Body>
                                <Card.Footer>
                                    <div className='thumbs'>
                                        <i className='far fa-thumbs-up up'/>{article.likes}{' '}
                                        <i className='far fa-thumbs-down down'/>{article.dislikes}{' '}
                                         - score : {article.likes - article.dislikes}
                                    </div>
                                    {myArticle && (
                                        <div className='card-footer-buttons'>
                                            <Button onClick={() => this.modify(article)} ><i className='fas fa-edit'/></Button>
                                            <Button onClick={() => this.deleteArticle(article)} ><i className='fas fa-trash-alt'/></Button>
                                        </div>
                                    )}
                                </Card.Footer>
                            </Card>

                            <Modal show={this.state.showArticleModal} onHide={this.articleModalClose} animation={false}>
                                <Modal.Header closeButton>
                                    <Modal.Title>{this.state.article.title}</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>{this.state.article.text}</Modal.Body>
                                <Modal.Footer>
                                    
                                </Modal.Footer>
                            </Modal>

                            <Modal show={this.state.showCreateModal} onHide={this.createModalClose} animation={false}>
                                <Modal.Header closeButton>
                                    <Modal.Title>{this.state.articleModification ? 'Modifiez votre article :' : 'Ecrivez un article :' }</Modal.Title>
                                </Modal.Header>
                                <Modal.Body >
                                    <Form noValidate>
                                        <Form.Group controlId='title'>
                                            <Form.Label>Titre :</Form.Label>
                                            <Form.Control
                                                className='input'
                                                type='text'
                                                name='newArticleTitle'
                                                value={this.state.newArticleTitle}
                                                onChange={this.handleInputChange}
                                                required
                                            />
                                        </Form.Group> 
                                        <hr />
                                        <Form.Group controlId='text'>
                                            <Form.Label>Texte :</Form.Label>
                                            <Form.Control as='textarea'
                                                className='input'
                                                type='text'
                                                name='newArticleText'
                                                value={this.state.newArticleText}
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
                        </>)
                    })
                }</main>
            </div>
        )
    }

    render() {
        const pageToOpen = this.context.token ? this.articlesList() : <Login/>
        return (<>
            {pageToOpen}
        </>)
    }

}
