import React from 'react'
import { Card, Button } from 'react-bootstrap'
import { ajaxGet } from './ajax'
import Navigation from './navigation'

export class Homepage extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
            articlesCollection: [],
        }

		this.getArticles = this.getArticles.bind(this);
		this.articlesList = this.articlesList.bind(this);
    }

    componentDidMount(){
        this.getArticles()
    }

    getArticles = () => {
        ajaxGet ('http://localhost:3000/api/articles/')
        .then ((response) => {
            this.setState({articlesCollection: response})
            console.log('articlesCollection: ',this.state.articlesCollection)
        })
        .catch((err) => {
            console.log({err})
        })
    }

    articlesList= () => {
        const articlesCollection = this.state.articlesCollection
        return (
            <div>
                <Navigation />
                <main>
                    {
                        articlesCollection.map((article) => {
                            return(
                                <Card key={article.Id}>
                                    <Card.Header>
                                        Posté par user.firstName user.lastName le timeStamp  {/* format timestamp : j mmm aa */}
                                        </Card.Header>
                                    <Card.Body>
                                        <Card.Title>{article.title}</Card.Title>
                                        <Card.Img variant="top" src={article.imageUrl} alt="" />
                                        <Card.Text>{article.text}</Card.Text>
                                        <hr />
                                        <Button><i className="fas fa-ellipsis-h"></i></Button>
                                    </Card.Body>
                                    <Card.Footer className="text-muted">thumb-up : {article.likes} - thumb-down : {article.dislikes} - score : {article.likes - article.dislikes}</Card.Footer>
                                </Card>
                            )
                        })
                    }
                </main>
            </div>
        )
    }

    render() {
        const articlesList = this.articlesList()
        return articlesList
    }

}
