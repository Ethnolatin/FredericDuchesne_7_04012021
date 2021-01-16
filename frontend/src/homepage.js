import React from 'react'
import { Card, Button } from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal'
import { ajaxGet } from './ajax'
import Navigation from './navigation'

export class Homepage extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
            articlesCollection: [],
            article: '',
            showModal: false
        }

		this.getArticles = this.getArticles.bind(this);
        this.articlesList = this.articlesList.bind(this);
        this.modalDisplay = this.modalDisplay.bind(this);
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

    modalDisplay = (selectedArticle) => {
        this.setState({showModal: true, article: selectedArticle})
    }

    modalClose = () => this.setState({showModal: false})

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
                                    <Button onClick={() => this.modalDisplay(article)} >
                                        <i className="fas fa-ellipsis-h"></i>
                                    </Button>
                                </Card.Body>
                                <Card.Footer>thumb-up : {article.likes} - thumb-down : {article.dislikes} - score : {article.likes - article.dislikes}</Card.Footer>
                            </Card>

                            <Modal show={this.state.showModal} onHide={this.modalClose} animation={false}>
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
