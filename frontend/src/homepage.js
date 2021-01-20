import React from 'react'
import { Card, Button, Form } from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal'
import { userContext } from './userContext'
import Moment from 'react-moment'
import 'moment/locale/fr'
import { ajaxGet, ajaxPost } from './ajax'
import Navigation from './navigation'

export class Homepage extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
            userId: 1,                      // remplacer la valeur par défaut par ''
            token: '',
            firstName: 'toto',              // remplacer la valeur par défaut par ''
            lastName: 'titi',               // remplacer la valeur par défaut par ''
            articlesCollection: [],
            article: '',
            showArticleModal: false,
            showCreateModal: false,
            newArticleTitle: '',
            newArticleText: ''
        }

		this.getArticles = this.getArticles.bind(this);
		this.createArticle = this.createArticle.bind(this);
        this.articlesList = this.articlesList.bind(this);
        this.articleModalDisplay = this.articleModalDisplay.bind(this);
        this.articleModalClose = this.articleModalClose.bind(this);
        this.createModalClose = this.createModalClose.bind(this);
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
            writerId: this.state.userId,
            writerName: this.state.firstName + ' ' + this.state.lastName,
            title: this.state.newArticleTitle,
            text: this.state.newArticleText
        }
        ajaxPost ('http://localhost:3000/api/articles/', articleData)
        .then ((response) => {
            console.log(response.message)
            this.createModalClose()
        })
        .catch((err) => {
            console.log({err})
        })
    } 

    articleModalDisplay = (selectedArticle) => {
        this.setState({showArticleModal: true, article: selectedArticle})
    }

    createModalDisplay = () => this.setState({showCreateModal: true})

    articleModalClose = () => this.setState({showArticleModal: false})

    createModalClose = () => this.setState({showCreateModal: false})

    handleInputChange(event) {
		const target = event.target
		const name = target.name
		const value = target.value
        this.setState({[name]:value})
    }

    articlesList= () => {
        const articlesCollection = this.state.articlesCollection.reverse()
        const calendarStrings = {
            lastDay : '[hier à] H[h]mm',
            sameDay : '[aujourd\'hui à] H[h]mm',
            lastWeek : 'dddd [dernier à] H[h]mm',
            sameElse : '[le] dddd D MMMM YYYY [à] H[h]mm'
        }
        return (
            <div>
                <Navigation />
                <header>
                    <p>{this.state.firstName} {this.state.lastName}</p>
                    <Button onClick={() => this.createModalDisplay()} >Ecrire un article</Button>

                </header>
                <main>{
                    articlesCollection.map((article) => {
                        return(<>
                            <Card key={article.Id}>
                                <Card.Header>
                                    Publié par{' '}
                                    <b>{article.writerName}{' '}</b>
                                    <Moment
                                        locale='fr'
                                        calendar={calendarStrings}
                                        date={article.timeStamp}
                                    />
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
                                    <Modal.Title>Ecrivez un article :</Modal.Title>
                                </Modal.Header>
                                <Modal.Body >
                                    <Form noValidate>
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
        console.log('contexType: ', Homepage.contextType)
        console.log('this.context: ', this.context)
        const articlesList = this.articlesList()
        return (
            <>
            {articlesList}
            </>
        )
    }

}
