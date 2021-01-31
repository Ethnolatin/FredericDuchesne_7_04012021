import React from 'react'
import { Button } from 'react-bootstrap'
import { AuthContext } from './authContext'
import { ajaxGet, ajaxPost, ajaxPut, ajaxDelete } from './ajax'
import Navigation from './navigation'
import { Login } from './loginForm'
import { AllArticles } from './articlesDisplay/allArticles'
import { SingleArticle } from './articlesDisplay/singleArticle'
import { CreateModal } from './modals/createModal'
import { AdminModal } from './modals/adminModal'

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
            image: '',
            articleModification: false,
            like: undefined
        }

		this.getAllArticles = this.getAllArticles.bind(this)
        this.createArticle = this.createArticle.bind(this)
        this.modifyArticle = this.modifyArticle.bind(this)
        this.articlesList = this.articlesList.bind(this)
        this.articleModalDisplay = this.articleModalDisplay.bind(this)
        this.articleModalClose = this.articleModalClose.bind(this)
        this.createModalDisplay = this.createModalDisplay.bind(this)
        this.createModalClose = this.createModalClose.bind(this)
        this.adminModalDisplay = this.adminModalDisplay.bind(this)
        this.adminModalClose = this.adminModalClose.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleThumbUpChange = this.handleThumbUpChange.bind(this)
        this.handleThumbDownChange = this.handleThumbDownChange.bind(this)
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

    updateUser = (selectedUser) => {
        const Id = selectedUser.Id
        const userData = {
            admin: !selectedUser.admin * 1
        }
        ajaxPut ('http://localhost:3000/api/admin/' + Id, userData, this.context.token)
        .then ((response) => {
            console.log(response)
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
		const publishArticle = this.state.articleModification ? this.updateArticle : this.createArticle

        return (
            <div>
                <Navigation />
                <header>
                    <div className='user'>
                        <p>{this.state.firstName} {this.state.lastName}</p>
                        { this.state.admin === 1 && <i className='fas fa-user-cog'/> }
                        { this.state.admin === 2 && (
                            <Button onClick={() => this.adminModalDisplay()} ><i className='fas fa-user-cog'/></Button> )}
                    </div>
                    <Button onClick={() => this.newArticle()} >Ecrire un article</Button>
                </header>
                <main>{
                    articlesCollection.map((article) => {
                        return(
                            <div key={article.Id}>
                                <AllArticles
                                    articleModalDisplay={this.articleModalDisplay}
                                    handleThumbUpChange={this.handleThumbUpChange}
                                    handleThumbDownChange={this.handleThumbDownChange}
                                    deleteArticle={this.deleteArticle}
                                    modifyArticle={this.modifyArticle}
                                    article={article}
                                    userId={this.state.userId}
                                    admin={this.state.admin}
                                />

                                <SingleArticle
                                    articleModalClose={this.articleModalClose}
                                    showArticleModal={this.state.showArticleModal}
                                    article={this.state.article}
                                />
                                
                                <CreateModal
                                    createModalClose={this.createModalClose}
                                    handleInputChange={this.handleInputChange}
                                    showCreateModal={this.state.showCreateModal}
                                    articleModification={this.state.articleModification}
                                    newArticleTitle={this.state.newArticleTitle}
                                    newArticleText={this.state.newArticleText}
                                    publishArticle={publishArticle}
                                />

                                <AdminModal
                                    adminModalClose={this.adminModalClose}
                                    updateUser={this.updateUser}
                                    deleteUser={this.deleteUser}
                                    showAdminModal={this.state.showAdminModal}
                                    users={this.state.users}
                                    userId={this.state.userId}
                                />
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