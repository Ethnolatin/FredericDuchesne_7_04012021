import React from 'react'
import { Card, Button } from 'react-bootstrap'
import Moment from 'react-moment'
import 'moment/locale/fr'

export class AllArticles extends React.Component {
	constructor(props) {
		super(props)

        this.articleModalDisplay = this.articleModalDisplay.bind(this)
        this.deleteArticle = this.deleteArticle.bind(this)
        this.modifyArticle = this.modifyArticle.bind(this)
    }

    articleModalDisplay = (article) => {
        this.props.articleModalDisplay(article)
    }

    handleThumbUpChange = (article, likeOption) => {
        this.props.handleThumbUpChange(article, likeOption)
    }

    handleThumbDownChange = (article, likeOption) => {
        this.props.handleThumbDownChange(article, likeOption)
    }

    deleteArticle = (article) => {
        this.props.deleteArticle(article)
    }

    modifyArticle = (article) => {
        this.props.modifyArticle(article)
    }

    clickHandler = (props) => {
        const action = props.action
        action(props)
    }


    render () {
        const { article, userId, admin} = this.props
        const likeOption = (
            article.usersLiked.includes(userId) ? 1 
            : article.usersDisliked.includes(userId) ? 2
            : 3
        )
        const thumbUp = likeOption === 1 ? <i className='fas fa-thumbs-up'/> : <i className='far fa-thumbs-up'/>
        const thumbDown = likeOption === 2 ? <i className='fas fa-thumbs-down'/> : <i className='far fa-thumbs-down'/>
        const myArticle = article.writerId === userId.toString()
        const writer = myArticle ? 'moi' : article.writerName
        const calendarStrings = {
            lastDay : '[hier à] H[h]mm',
            sameDay : '[aujourd\'hui à] H[h]mm',
            lastWeek : 'dddd [dernier à] H[h]mm',
            sameElse : '[le] dddd D MMMM YYYY [à] H[h]mm'
        }
        return (
            <Card >
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
                    { article.image &&
                        <Card.Img src={article.image} alt={article.title} />
                    }
                    { article.text &&
                        <Card.Text>{article.text}</Card.Text>
                    }
                    <hr />
                    <Button onClick={() => this.articleModalDisplay(article)} >
                        <i className='fas fa-ellipsis-h'/>
                    </Button>
                </Card.Body>
                <Card.Footer>
                    <div className='thumbs'>
                        <div onClick={() => this.handleThumbUpChange(article, likeOption)}>{thumbUp}{article.likes}{' '}</div>
                        <div onClick={() => this.handleThumbDownChange(article, likeOption)}>{thumbDown}{article.dislikes}{' '}</div>
                        <div><b>Score : {article.likes - article.dislikes}</b></div>
                    </div>
                    <div className='card-footer-buttons'>
                        {(myArticle || admin !== 0 ) && (
                            <Button onClick={() => this.deleteArticle(article)} >
                                <i className='fas fa-trash-alt'/>
                            </Button>
                        )}
                        {myArticle && (
                            <Button onClick={() => this.modifyArticle(article)} >
                                <i className='fas fa-edit'/>
                            </Button>
                        )}
                    </div>
                </Card.Footer>
            </Card>
        )
    }
}
