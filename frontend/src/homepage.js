import React from 'react'
import { Card, Button, Form } from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal'
import Table from 'react-bootstrap/Table'
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
            admin: 0,
            users: [],
            articlesCollection: [],
            article: {},
            showArticleModal: false,
            showCreateModal: false,
            showAdminModal: false,
            newArticleTitle: '',
            newArticleText: '',
            articleModification: false,
            like: undefined
        }

		this.getAllArticles = this.getAllArticles.bind(this)
		this.createArticle = this.createArticle.bind(this)
        this.articlesList = this.articlesList.bind(this)
        this.articleModalDisplay = this.articleModalDisplay.bind(this)
        this.articleModalClose = this.articleModalClose.bind(this)
        this.createModalDisplay = this.createModalDisplay.bind(this)
        this.createModalClose = this.createModalClose.bind(this)
        this.adminModalDisplay = this.adminModalDisplay.bind(this)
        this.adminModalClose = this.adminModalClose.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
    }


    componentDidMount() {
        this.setState({
            userId: this.context.userId,
            token: this.context.token,
            firstName: this.context.firstName,
            lastName: this.context.lastName,
            admin: this.context.admin
        })
        this.context.token && this.getAllArticles()
    }

    getAllArticles = () => {
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
            this.createModalClose()
            this.getAllArticles()
        })
        .catch((err) => {
            console.log({err})
        })
    }

    updateArticle = (event) => {
        event.preventDefault()
        const Id = this.state.Id
        const articleData = {
            title: this.state.newArticleTitle,
            text: this.state.newArticleText
        }
        ajaxPut ('http://localhost:3000/api/articles/' + Id, articleData, this.context.token)
        .then ((response) => {
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
            this.getAllArticles()
        })
        .catch((err) => {
            console.log({err})
        })
    }

    likeArticle = (selectedArticle, like) => {
        const likeData = {userId: this.state.userId, like: like}
        const Id = selectedArticle.Id
        ajaxPost ('http://localhost:3000/api/articles/' + Id + '/like', likeData, this.context.token)
        .then ((response) => {
            this.getAllArticles()
        })
        .catch((err) => {
            console.log({err})
        })
    }

    getAllUsers = () => {
        ajaxGet ('http://localhost:3000/api/admin/', this.context.token)
        .then ((response) => {
            this.setState({users: response})
        })
        .catch((err) => {
            console.log({err})
        })
    }

    deleteUser = (selectedUser) => {
        const Id = selectedUser.Id
        ajaxDelete ('http://localhost:3000/api/admin/' + Id, this.context.token)
        .then ((response) => {
            this.getAllUsers()
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

    adminModalDisplay = () => {
        this.setState({
            showAdminModal: true
        })
        this.getAllUsers()
    }

    adminModalClose = () => {
        this.setState({
            showAdminModal: false,
            users: []
        })
    }

    modifyArticle(selectedArticle) {
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

    handleThumbUpChange(selectedArticle, likeOption) {
        let like
        switch (likeOption) {
            case 3:
                like = 1
                break
            case 2:
                like = 0
                break
            default: return
        }
        this.likeArticle(selectedArticle, like)
    }

    handleThumbDownChange(selectedArticle, likeOption) {
        let like
        switch (likeOption) {
            case 3:
                like = -1
                break
            case 1:
                like = 0
                break
            default: return
        }
        this.likeArticle(selectedArticle, like)
    }

    articlesList() {
        const articlesCollection = this.state.articlesCollection.reverse()
        const calendarStrings = {
            lastDay : '[hier à] H[h]mm',
            sameDay : '[aujourd\'hui à] H[h]mm',
            lastWeek : 'dddd [dernier à] H[h]mm',
            sameElse : '[le] dddd D MMMM YYYY [à] H[h]mm'
        }
		const publishArticle = this.state.articleModification ? this.updateArticle : this.createArticle

        return (
            <div>
                <Navigation />
                <header>
                    <div className='user'>
                        <p>{this.state.firstName} {this.state.lastName}</p>
                        { this.state.admin === 1 && <i className="fas fa-user-cog"/> }
                        { this.state.admin === 2 && (
                            <Button onClick={() => this.adminModalDisplay()} ><i className="fas fa-user-cog"/></Button> )}
                    </div>
                    <Button onClick={() => this.newArticle()} >Ecrire un article</Button>
                </header>
                <main>{
                    articlesCollection.map((article) => {
                        const myArticle = article.writerId === this.state.userId.toString()
                        const writer = myArticle ? 'moi' : article.writerName
                        const likeOption = (
                            article.usersLiked.includes(this.state.userId) ? 1 
                            : article.usersDisliked.includes(this.state.userId) ? 2
                            : 3
                        )
                        const thumbUp = likeOption === 1 ? <i className="fas fa-thumbs-up"/> : <i className='far fa-thumbs-up'/>
                        const thumbDown = likeOption === 2 ? <i className="fas fa-thumbs-down"/> : <i className='far fa-thumbs-down'/>

                        return(
                            <div key={article.Id}>
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
                                        <Card.Img variant='top' src={article.imageUrl} alt='' />
                                        <Card.Text>{article.text}</Card.Text>
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
                                            {(myArticle || this.state.admin !== 0 ) && (
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

                                <Modal show={this.state.showAdminModal} onHide={this.adminModalClose} animation={false}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Liste des utilisateurs :</Modal.Title>
                                    </Modal.Header>
                                        <Modal.Body>
                                            <Table striped hover size="sm">
                                                <thead>
                                                    <tr>
                                                        <th>Prénom</th>
                                                        <th>Nom</th>
                                                        <th className='trash'></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {this.state.users.map(user => {
                                                        return (
                                                            <tr key={user.Id}>
                                                                <td>{user.firstName}</td>
                                                                <td>{user.lastName}</td>
                                                                <td>
                                                                    <Button onClick={() => this.deleteUser(user)}>
                                                                        <i className='fas fa-trash-alt'/>
                                                                    </Button>
                                                                </td>
                                                            </tr>
                                                        )
                                                    })}
                                                </tbody>
                                            </Table>
                                        </Modal.Body>
                                </Modal>
                            </div>
                        )
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
