import React from 'react'
import { Card, Button } from 'react-bootstrap'
import { RiThumbUpFill, RiThumbDownFill, RiThumbUpLine, RiThumbDownLine } from 'react-icons/ri'
import { FaCommentAlt, FaEdit } from 'react-icons/fa'
import { SingleArticle } from './singleArticle'
import { DeleteAlert } from './alerts'
import { getSomeItems } from '../axios'
import { AuthContext } from '../components/authContext'
import { DeleteButton } from '../components/deleteButton'
// import { generateImageName } from '../components/generateImageName'
import { itemDate } from '../components/itemDate'

export class AllArticles extends React.Component {
    static contextType = AuthContext
	constructor(props) {
		super(props)
        this.state = {
            showArticleModal: false,
            showAlert: false,
            commentsQty: 0,
        }
    }

    componentDidMount() {
        this.getArticleCommentsQty()
    }

    getArticleCommentsQty = async () => {
        const list = await getSomeItems('comments/', this.context.token, this.context.userId, this.props.article.Id)
        const commentsQty = list ? list.length : 0
        return this.setState({commentsQty: commentsQty})
    }

    
    render () {
        const { userId, admin } = this.context
        const { article } = this.props
        const { commentsQty } = this.state
        const likeOption = (
            article.usersLiked.includes(userId) ?
                1
                : article.usersDisliked.includes(userId) ?
                    2
                    : 3
        )
        const thumbUp = likeOption === 1 ?
            <RiThumbUpFill className='thumb-up' />
            : <RiThumbUpLine className='thumb-line'/>
        const thumbDown = likeOption === 2 ?
            <RiThumbDownFill className='thumb-down' />
            : <RiThumbDownLine className='thumb-line'/>
        const myArticle = article.writerId === userId.toString()
        const writer = myArticle ? 'moi' : article.writerName
        // const resizedImage = generateImageName(article.image)
        // const {sImage, xsImage} = resizedImage || {}
        
        return (<>
            <Card >
                <DeleteAlert
                    show={this.state.showAlert}
                    item={`l'article "${article.title}"`}
                    hideAlert={this.hideAlert}
                    deleteItem={this.deleteArticle}
                />
                <Card.Header>
                    Publié par{' '}
                    <b>{writer}{' '}</b>
                    {itemDate(article.timeStamp)}
                </Card.Header>
                <Card.Body onClick={this.displayArticleModal}>
                    <Card.Title>{article.title}</Card.Title>
                    { article.image &&
                        <Card.Img
                            src={article.image}
                            // srcSet={`${xsImage} 300w, ${sImage} 500w, ${article.image} 800w`}
                            sizes='100vw'
                            maxwidth='100%' maxheight='100%'
                            alt=''
                            // onLoad={this.onLoad} 
                        />
                    }
                    { article.text &&
                        <Card.Text>{article.text}</Card.Text>
                    }
                </Card.Body>
                <Card.Footer>
                    <div className='thumb'>
                        <div onClick={() => this.handleThumbUpChange(likeOption)}>{thumbUp}</div>
                        <div><b>{article.score}</b></div>
                        <div onClick={() => this.handleThumbDownChange(likeOption)}>{thumbDown}</div>
                    </div>
                    {commentsQty !== 0 &&
                        <div className='comments-qty' onClick={this.displayArticleModal}>
                            <FaCommentAlt/>
                            {' '}{commentsQty}
                        </div>}
                    <div className='card-footer-buttons'>
                        {(myArticle || admin !== 0 ) && (
                            <DeleteButton
                                confirmDelete={this.confirmDelete}
                                toBeDeleted={article.Id}
                            />
                        )}
                        {myArticle && (
                            <Button onClick={this.modifyArticle} >
                                <FaEdit/>
                                <span className='sr-only'>Modify</span>
                            </Button>
                        )}
                    </div>
                </Card.Footer>
            </Card>

            <SingleArticle
                closeArticleModal={this.closeArticleModal}
                showArticleModal={this.state.showArticleModal}
                commentsQty={commentsQty}
                article={article}
            />
        </>)
    }

    // onLoad = (event) => {
    //     console.log(this.props.article.Id, event.target.currentSrc)
    // }

    displayArticleModal = () => {
        this.setState({
            showArticleModal: true,
        })
    }

    closeArticleModal = () => {
        this.setState({
            showArticleModal: false,
        })
        this.getArticleCommentsQty()
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

    deleteArticle = () => {
        this.props.deleteArticle()
    }

    modifyArticle = () => {
        this.props.modifyArticle(this.props.article)
    }

    hideAlert = () => {
        this.setState({showAlert: false})
    }
           
}
