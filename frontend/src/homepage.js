import React from 'react'
import {ajaxGet} from './ajax'

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
                <div>Articles</div>
                <ul>
                    {
                        articlesCollection.map((article) => 
                            <li key={article.Id}>{article.title}<br />{article.text} </li>
                        )
                    }
                </ul>
            </div>
        )
    }


    render() {
        const articlesList = this.articlesList()
        return articlesList
    }

}
