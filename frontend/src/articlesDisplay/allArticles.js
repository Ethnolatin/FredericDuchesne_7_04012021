import React from 'react'
import { Card, Button } from 'react-bootstrap'
import Moment from 'react-moment'
import { DeleteAlert } from '../alerts'

import 'moment/locale/fr'

export class AllArticles extends React.Component {
	constructor(props) {
		super(props)
        this.state = {showAlert: false}
    }

    articleModalDisplay = () => {
        this.props.articleModalDisplay(this.props.article)
    }

    handleThumbUpChange = (likeOption) => {
        this.props.handleThumbUpChange(this.props.article, likeOption)
    }

    handleThumbDownChange = (likeOption) => {
        this.props.handleThumbDownChange(this.props.article, likeOption)
    }

    confirmDelete = () => {
        this.setState({showAlert: true})
    }

    deleteItem = () => {
        this.props.deleteArticle(this.props.article)
    }

    modifyArticle = () => {
        this.props.modifyArticle(this.props.article)
    }

    hideAlert = () => {
        this.setState({showAlert: false})
    }


    render () {
        const { article, userId, admin} = this.props
        const likeOption = (
            article.usersLiked.includes(userId) ?
                1
                : article.usersDisliked.includes(userId) ?
                    2
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
                <DeleteAlert
                    show={this.state.showAlert}
                    item={`l'article "${article.title}"`}
                    deleteItem={this.deleteItem}
                    hideAlert={this.hideAlert}
                />
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
                    <Button onClick={this.articleModalDisplay} >
                        <i className='fas fa-ellipsis-h'/>
                    </Button>
                </Card.Body>
                <Card.Footer>
                    <div className='thumbs'>
                        <div onClick={() => this.handleThumbUpChange(likeOption)}>{thumbUp}{article.likes}{' '}</div>
                        <div onClick={() => this.handleThumbDownChange(likeOption)}>{thumbDown}{article.dislikes}{' '}</div>
                        <div><b>Score : {article.likes - article.dislikes}</b></div>
                    </div>
                    <div className='card-footer-buttons'>
                        {(myArticle || admin !== 0 ) && (
                            <Button onClick={this.confirmDelete} >
                                <i className='fas fa-trash-alt'/>
                            </Button>
                        )}
                        {myArticle && (
                            <Button onClick={this.modifyArticle} >
                                <i className='fas fa-edit'/>
                            </Button>
                        )}
                    </div>
                </Card.Footer>
            </Card>
        )
    }
}
