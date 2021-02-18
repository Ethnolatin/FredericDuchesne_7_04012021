import React from 'react'
import Dropdown from 'react-dropdown'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import Navigation from './navigation'
import { AuthContext } from './authContext'
import { Login } from './loginForm'
import { AllArticles } from './articlesDisplay/allArticles'
import { CreateModal } from './modals/createModal'
import { AdminModal } from './modals/adminModal'
import 'react-dropdown/style.css';

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
            showCreateModal: false,
            showAdminModal: false,
            image: '',
            currentImage: '',
            oldImage: '',
            modifiedArticleImageFile: undefined,
            newArticleImageFile: undefined,
            imagePreviewUrl: undefined,
            articleModification: false,
            like: undefined,
            filter: 'date',
        }

		this.getAllArticles = this.getAllArticles.bind(this)
        this.createArticle = this.createArticle.bind(this)
        this.modifyArticle = this.modifyArticle.bind(this)
        this.articlesList = this.articlesList.bind(this)
        this.displayCreateModal = this.displayCreateModal.bind(this)
        this.closeCreateModal = this.closeCreateModal.bind(this)
        this.adminModalDisplay = this.adminModalDisplay.bind(this)
        this.adminModalClose = this.adminModalClose.bind(this)
        this.publishArticle = this.publishArticle.bind(this)
        this.handleImageInput = this.handleImageInput.bind(this)
        this.noImage = this.noImage.bind(this)
        this.handleThumbUpChange = this.handleThumbUpChange.bind(this)
        this.handleThumbDownChange = this.handleThumbDownChange.bind(this)
        this._onSelect = this._onSelect.bind(this)
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
        axios({
            method: 'get',
            url: 'http://localhost:3000/api/articles/',
            headers: {
                'Authorization': 'Bearer ' + this.context.token,
            }
        })
        .then ((response) => {
            this.setState({
                articlesCollection: response.data.reverse()
            })
        })
        .catch((err) => {
            console.log({err})
        })
    }

    createArticle = (event) => {
        event && event.preventDefault()
        const newArticleTitle = localStorage.getItem('newArticleTitle')
        const newArticleText = localStorage.getItem('newArticleText')
        const newArticleImageFile = this.state.newArticleImageFile
        const formData = new FormData()
        newArticleImageFile && formData.append('image', newArticleImageFile)
        formData.append('writerId', this.state.userId)
        formData.append('writerName', this.state.firstName + ' ' + this.state.lastName)
        formData.append('title', newArticleTitle)
        if (newArticleText) {formData.append('text', newArticleText)}
        axios({
            method: 'post',
            url: 'http://localhost:3000/api/articles/',
            data: formData,
            headers: {
                'Authorization': 'Bearer ' + this.context.token,
            }
        })
        .then (() => {
            this.closeCreateModal()
            this.setState({savedImagePreviewUrl: undefined})
            this.getAllArticles()
        })
        .catch((err) => {
            console.log({err})
        })
    }

    updateArticle = (event) => {
        event && event.preventDefault()
        console.log(this.state.oldImage)
        const modifiedArticleTitle = localStorage.getItem('modifiedArticleTitle')
        const modifiedArticleText = localStorage.getItem('modifiedArticleText')
        const modifiedArticleImage = this.state.modifiedArticleImageFile || this.state.currentImage
        const formData = new FormData()
        formData.append('title', modifiedArticleTitle)
        modifiedArticleText && formData.append('text', modifiedArticleText)
        modifiedArticleImage && formData.append('image', modifiedArticleImage)
        this.state.oldImage && formData.append('oldImage', this.state.oldImage)
        axios({
            method: 'put',
            url: 'http://localhost:3000/api/articles/' + this.state.Id,
            data: formData,
            headers: {
                'Authorization': 'Bearer ' + this.context.token,
            }
        })
        .then (() => {
            this.closeCreateModal()
            this.getAllArticles()
        })
        .catch((err) => {
            console.log({err})
        })
    }

    deleteArticle = (selectedArticle) => {
        axios({
            method: 'delete',
            url: 'http://localhost:3000/api/articles/' + selectedArticle.Id,
            headers: {
                'Authorization': 'Bearer ' + this.context.token,
            }
        })
        .then ((response) => {
            this.getAllArticles()
        })
        .catch((err) => {
            console.log({err})
        })
    }

    likeArticle = (selectedArticle, like) => {
        axios({
            method: 'post',
            url: 'http://localhost:3000/api/articles/' + selectedArticle.Id + '/like',
            data: {
                userId: this.state.userId,
                like: like
            },
            headers: {
                'Authorization': 'Bearer ' + this.context.token,
            }
        })
        .then ((response) => {
            this.getAllArticles()
        })
        .catch((err) => {
            console.log({err})
        })
    }

    getAllUsers = () => {
        axios({
            method: 'get',
            url: 'http://localhost:3000/api/admin/',
            headers: {
                'Authorization': 'Bearer ' + this.context.token,
            }
        })
        .then ((response) => {
            this.setState({users: response.data})
        })
        .catch((err) => {
            console.log({err})
        })
    }

    deleteUser = (selectedUserId) => {
        axios({
            method: 'delete',
            url: 'http://localhost:3000/api/admin/' + selectedUserId,
            headers: {
                'Authorization': 'Bearer ' + this.context.token,
            }
        })
        .then ((response) => {
            this.getAllUsers()
        })
        .catch((err) => {
            console.log({err})
        })
    }

    updateUser = (selectedUser) => {
        axios({
            method: 'put',
            url: 'http://localhost:3000/api/admin/' + selectedUser.Id,
            data: {
                admin: !selectedUser.admin * 1
            },
            headers: {
                'Authorization': 'Bearer ' + this.context.token,
            }
        })
        .then (() => {
            this.getAllUsers()
        })
        .catch((err) => {
            console.log({err})
        })
    }

    createComment = () => {
        const articleId = localStorage.getItem('articleId');
        const commentatorId = this.context.userId
        const comment = localStorage.getItem('comment')
        console.log('articleId: ', articleId)
        console.log('commentatorId: ', commentatorId)
        console.log('comment: ', comment)
        const formData = new FormData()
        formData.append('articleId', articleId)
        formData.append('commentatorId', commentatorId)
        formData.append('comment', comment)
        axios({
            method: 'post',
            url: 'http://localhost:3000/api/comments/',
            data: formData,
            headers: {
                'Authorization': 'Bearer ' + this.context.token,
            }
        })
        .then (() => {
            this.closeCommentsModal()
            this.setState({comment: undefined})
        })
        .catch((err) => {
            console.log({err})
        })
    }

    displayCommentsModal = () => {
        this.setState({
            showCommentsModal: true,
        })
    }

    closeCommentsModal = () => {
        localStorage.removeItem('comment')
        localStorage.removeItem('articleId')
        this.setState({
            showCommentsModal: false,
        })
    }

    displayCreateModal = () => {
        this.setState({
            showCreateModal: true
        })
    }

    closeCreateModal = () => {
        if (this.state.articleModification) {
            this.setState({
                articleModification: false,
                modifiedArticleImageFile: undefined,
                modifiedArticleImage: '',
            })
            localStorage.removeItem('modifiedArticleTitle')
            localStorage.removeItem('modifiedArticleText')
        } else {
            this.setState({
                newArticleImageFile: undefined,
            })
            localStorage.removeItem('newArticleTitle')
            localStorage.removeItem('newArticleText')
        }
        this.setState({
            showCreateModal: false,
            currentImage: '',
            imagePreviewUrl: '',
            oldImage: ''
        })
    }

    saveCreateModal = () => {
        this.setState({
            showCreateModal: false,
            savedImagePreviewUrl: this.state.imagePreviewUrl,
            imagePreviewUrl: undefined
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
            currentImage: selectedArticle.image
        })
        localStorage.setItem('modifiedArticleTitle', selectedArticle.title)
        selectedArticle.text && localStorage.setItem('modifiedArticleText', selectedArticle.text)
        this.displayCreateModal()
    }

    handleImageInput(event) {
        const file = event.target.files[0]
        const imageFile = this.state.articleModification ? {modifiedArticleImageFile: file} : {newArticleImageFile: file} 
        this.setState(imageFile)
        const reader = new FileReader()
        reader.onloadend = () => {
            this.setState({imagePreviewUrl: [reader.result]})
        }
        reader.readAsDataURL(file)
    }

    noImage() {
        this.state.articleModification ?
            this.setState({
                modifiedArticleImageFile: undefined,
                modifiedArticleImage: undefined
            })
            : this.setState({
                newArticleImageFile: undefined,
            })
        this.setState({
            oldImage: this.state.currentImage,
            currentImage: undefined,
            imagePreviewUrl: undefined,
            savedImagePreviewUrl: undefined,
        })
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

    publishArticle() {
        this.state.articleModification ?
            this.updateArticle() :
            this.createArticle()
    }

    _onSelect(option) {
        switch(option.value) {
            case 'date':
                this.setState({
                    articlesCollection: this.state.articlesCollection.sort((a, b) => {
                        const x = new Date(a.timeStamp)
                        const y = new Date(b.timeStamp)
                        return y - x
                    })
                })
                break
            case 'likes':
                this.setState({
                    articlesCollection: this.state.articlesCollection.sort((a, b) => {
                        return b.likes - a.likes
                    })
                })
                
                break
            case 'auteur':
                this.setState({
                    articlesCollection: this.state.articlesCollection.sort((a, b) => {
                        const x = a.writerName.toLowerCase()
                        const y = b.writerName.toLowerCase()
                        return x > y ? 1 : x < y ? -1 : 0
                    })
                })
                break
            default: 
                return 
        }
    }

    articlesList() {
        const articlesCollection = this.state.articlesCollection
        const options = ['date', 'likes', 'auteur']
    
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
                    <Dropdown controlClassName='btn' options={options} onChange={this._onSelect} placeholder="Trier par :" />
                    <Button onClick={() => this.displayCreateModal()} >Ecrire un article</Button>
                </header>
                <main>{
                    articlesCollection.map((article) => {
                        return(
                            <div key={article.Id}>
                                <AllArticles
                                    handleThumbUpChange={this.handleThumbUpChange}
                                    handleThumbDownChange={this.handleThumbDownChange}
                                    deleteArticle={this.deleteArticle}
                                    modifyArticle={this.modifyArticle}
                                    createComment={this.createComment}
                                    article={article}
                                    userId={this.state.userId}
                                    admin={this.state.admin}
                                />

                                <CreateModal
                                    closeCreateModal={this.closeCreateModal}
                                    saveCreateModal={this.saveCreateModal}
                                    handleImageInput={this.handleImageInput}
                                    publishArticle={this.publishArticle}
                                    noImage={this.noImage}
                                    showCreateModal={this.state.showCreateModal}
                                    articleModification={this.state.articleModification}
                                    currentImage={this.state.currentImage}
                                    imagePreviewUrl={this.state.imagePreviewUrl}
                                    savedImagePreviewUrl={this.state.savedImagePreviewUrl}
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