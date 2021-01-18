import React from 'react'
import { Card, Button, Form } from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal'
import { ajaxGet, ajaxPost } from './ajax'
import Navigation from './navigation'

export class Homepage extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
            userId: this.props.userId,
            articlesCollection: [],
            article: '',
            showArticleModal: false,
            showCreateModal: false,
            newArticleTitle: '',
            newArticleText: ''
        }

        console.log(this.state.userId)

		this.getArticles = this.getArticles.bind(this);
		this.createArticle = this.createArticle.bind(this);
        this.articlesList = this.articlesList.bind(this);
        this.articleModalDisplay = this.articleModalDisplay.bind(this);
        this.articleModalClose = this.articleModalClose.bind(this);
        this.createModalClose = this.createModalClose.bind(this);
        this.saveSandbox = this.saveSandbox.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    componentDidMount() {
        this.getArticles()
    }

    getArticles = () => {
        ajaxGet ('http://localhost:3000/api/articles/')
        .then ((response) => {
            this.setState({articlesCollection: response})
        })
        .catch((err) => {
            console.log({err})
        })
    }

    createArticle = (event) => {
        event.preventDefault();
        const articleData = {
            userId: 1,                     //   remplacer "1" par le userId //
            title: this.state.newArticleTitle,
            text: this.state.newArticleText
        }
        ajaxPost ('http://localhost:3000/api/articles/', articleData)
        .then ((response) => {console.log(response.message)
        })
        .catch((err) => {
            console.log({err})
        })
    } 

    articleModalDisplay = (selectedArticle) => {
        this.setState({showArticleModal: true, article: selectedArticle})
    }

    articleModalClose = () => this.setState({showArticleModal: false})
    createModalClose = () => this.setState({showCreateModal: false})

    saveSandbox(event) {
        console.log("Hello World");
        console.log('new article: ', this.state.newArticleTitle + this.state.newArticleText);
    }
    
    handleSubmit(event) {
        event.preventDefault()
        console.log('value: ', event.target.value)
    }

    handleInputChange(event) {
		const target = event.target
		const name = target.name
		const value = target.value
        this.setState({[name]:value})
    }

	articlesList= () => {
        const articlesCollection = this.state.articlesCollection.reverse()
        return (
            <div>
                <Navigation />
                <main>{
                    articlesCollection.map((article) => {
                        return(<>
                            <Card key={article.Id}>
                                <Card.Header>
                                    Posté par user.firstName user.lastName le timeStamp  {/* format timestamp : j mmm aa */}
                                    </Card.Header>
                                <Card.Body>
                                    <Card.Title>{article.title}</Card.Title>
                                    <Card.Img variant="top" src={article.imageUrl} alt="" />
                                    <Card.Text>{article.text}</Card.Text>
                                    <hr />
                                    <Button onClick={() => this.articleModalDisplay(article)} >
                                        <i className="fas fa-ellipsis-h"></i>
                                    </Button>
                                </Card.Body>
                                <Card.Footer>thumb-up : {article.likes} - thumb-down : {article.dislikes} - score : {article.likes - article.dislikes}</Card.Footer>
                            </Card>

                            <Modal show={this.state.showArticleModal} onHide={this.articleModalClose} animation={false}>
                                <Modal.Header closeButton>
                                    <Modal.Title>{this.state.article.title}</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>{this.state.article.text}</Modal.Body>
                                <Modal.Footer>
                                    <Button>
                                        Modifier
                                    </Button>
                                    <Button >
                                        Supprimer
                                    </Button>
                                </Modal.Footer>
                            </Modal>

                            <Modal show={this.state.showCreateModal} onHide={this.createModalClose} animation={false}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Créer un article</Modal.Title>
                                </Modal.Header>
                                <Modal.Body >
                                    <Form noValidate onSubmit={this.handleSubmit}>
                                        <Form.Group controlId='title'>
                                            <Form.Label>Titre</Form.Label>
                                            <Form.Control
                                                className='input'
                                                type="text"
                                                name='newArticleTitle'
                                                value={this.state.newArticleTitle}
                                                onChange={this.handleInputChange}
                                                required
                                            />
                                        </Form.Group> 
                                        <hr />
                                        <Form.Group controlId='text'>
                                            <Form.Label>Texte</Form.Label>
                                            <Form.Control
                                                className='input'
                                                type="text"
                                                name='newArticleText'
                                                value={this.state.newArticleText}
                                                onChange={this.handleInputChange}
                                                required
                                            />
                                        </Form.Group> 
                                    </Form>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button onClick={this.createArticle} >Publier</Button>
                                    <Button onClick={this.createModalClose} >Fermer</Button>
                                </Modal.Footer>
                            </Modal>
                        </>)
                    })
                }</main>
            </div>
        )
    }

    render() {
        const articlesList = this.articlesList()
        return articlesList
    }

}
