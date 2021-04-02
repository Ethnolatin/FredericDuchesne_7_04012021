import React from 'react'
import Dropdown from 'react-dropdown'
import Button from 'react-bootstrap/Button'
import { FaUserCog } from 'react-icons/fa'
import { AdminModal } from './adminModal'
import { AllArticles } from './allArticles'
import { CreateModal } from './createModal'
import { Login } from './loginForm'
import { getAllItems, createItem, updateItem, deleteItem, likeItem } from '../axios'
import { AuthContext } from '../components/authContext'
import { Loader } from '../components/loader'
import Navigation from '../components/navigation'
import 'react-dropdown/style.css'

export class Homepage extends React.Component {
    static contextType = AuthContext
	constructor(props) {
		super(props)
		this.state = {
            loading: true,
            sortOption: 'date',
            articlesCollection: [],
            showCreateModal: false,
            showAdminModal: false,
            currentImage: '',
            oldImage: '',
            modifiedArticleImageFile: undefined,
            newArticleImageFile: undefined,
            imagePreviewUrl: undefined,
            articleModification: false,
        }
        this._onSelect = this._onSelect.bind(this)
    }


    render() {
        const pageToOpen = this.context.token ?
            this.displayArticlesList()
            : <Login />
        return (<>
            {pageToOpen}
        </>)
    }


    componentDidMount() {
        if (this.context.token) {
            this.getAllArticles()
        }
    }

    getAllArticles = async () => {
        const list = await getAllItems('articles/', this.context.token, this.context.userId)
        this.setState({
            articlesCollection: list,
            loading: false
        })
        this.sortArticlesList()
    }

    sortArticlesList = () => {
        switch(this.state.sortOption) {
            case 'date':
                this.setState({
                    articlesCollection: this.state.articlesCollection.sort((a, b) => {
                        const x = new Date(a.timeStamp)
                        const y = new Date(b.timeStamp)
                        return y - x
                    })
                })
                break
            case 'score':
                this.setState({
                    articlesCollection: this.state.articlesCollection.sort((a, b) => {
                        return b.score - a.score
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

    displayArticlesList = () => {
        if(this.state.loading) {return <Loader />}
        const options = ['date', 'score', 'auteur']

        return (
            <div>
                <Navigation />
                <header>
                    <div className='user'>
                        <p>{this.context.firstName} {this.context.lastName}</p>
                        { this.context.admin === 1 && <FaUserCog/> }
                        { this.context.admin === 2 && (
                            <Button onClick={() => this.displayAdminModal()} >
                                <FaUserCog/><span className='sr-only'>Options admin</span>
                            </Button> )}
                    </div>
                    <Dropdown controlClassName='btn' options={options} onChange={this._onSelect} placeholder="Trier par :" />
                    <Button onClick={() => this.displayCreateModal()} >Ecrire un article</Button>
                </header>
                <main>{
                    this.state.articlesCollection.map((article) => {
                        const previewImage = this.definePreviewImage()
                        return(
                            <div key={article.Id}>
                                
                                <AllArticles
                                    handleThumbUpChange={this.handleThumbUpChange}
                                    handleThumbDownChange={this.handleThumbDownChange}
                                    deleteArticle={this.deleteArticle}
                                    modifyArticle={this.modifyArticle}
                                    article={article}
                                />

                                <CreateModal
                                    closeCreateModal={this.closeCreateModal}
                                    saveCreateModal={this.saveCreateModal}
                                    handleImageInput={this.handleImageInput}
                                    publishArticle={this.publishArticle}
                                    noImage={this.noImage}
                                    previewImage={previewImage}
                                    showCreateModal={this.state.showCreateModal}
                                    articleModification={this.state.articleModification}
                                />

                                <AdminModal
                                    closeAdminModal={this.closeAdminModal}
                                    showAdminModal={this.state.showAdminModal}
                                />
                            </div>
                        )
                    })
                }</main>
            </div>
        )
    }

    createArticle = async (event) => {
        event && event.preventDefault()
        const newArticleTitle = localStorage.getItem('newArticleTitle')
        const newArticleText = localStorage.getItem('newArticleText')
        const newArticleImageFile = this.state.newArticleImageFile
        const formData = new FormData()
        newArticleImageFile && formData.append('image', newArticleImageFile)
        formData.append('writerId', this.context.userId)
        formData.append('writerName', this.context.firstName + ' ' + this.context.lastName)
        formData.append('title', newArticleTitle)
        newArticleText && formData.append('text', newArticleText)
        await createItem('articles/', this.context.token, this.context.userId, formData)
        this.closeCreateModal()
        this.setState({savedImagePreviewUrl: undefined})
        this.getAllArticles()
    }

    updateArticle = async (event) => {
        event && event.preventDefault()
        const modifiedArticleTitle = localStorage.getItem('modifiedArticleTitle')
        const modifiedArticleText = localStorage.getItem('modifiedArticleText')
        const modifiedArticleImage = this.state.modifiedArticleImageFile || this.state.currentImage
        const formData = new FormData()
        formData.append('title', modifiedArticleTitle)
        modifiedArticleText && formData.append('text', modifiedArticleText)
        modifiedArticleImage && formData.append('image', modifiedArticleImage)
        this.state.oldImage && formData.append('oldImage', this.state.oldImage)
        await updateItem('articles/', this.context.token, this.context.userId, formData, localStorage.getItem('modifiedArticleId'))
            this.closeCreateModal()
            this.getAllArticles()
    }

    deleteArticle = async () => {
        const toBeDeleted = localStorage.getItem('toBeDeleted')
        await deleteItem('articles/', this.context.token, this.context.userId, toBeDeleted)
        await deleteItem('comments/', this.context.token, this.context.userId, toBeDeleted + '/deleted')
        this.getAllArticles()
    }

    likeArticle = async (selectedArticle, like) => {
        await likeItem('articles/', this.context.token, this.context.userId, selectedArticle, like)
        this.getAllArticles()
    }

    modifyArticle = (selectedArticle) => {
        this.setState({
            articleModification: true,
            currentImage: selectedArticle.image
        })
        localStorage.setItem('modifiedArticleTitle', selectedArticle.title)
        localStorage.setItem('modifiedArticleId', selectedArticle.Id)
        selectedArticle.text && localStorage.setItem('modifiedArticleText', selectedArticle.text)
        this.displayCreateModal()
    }

    publishArticle = () => {
        this.state.articleModification ?
            this.updateArticle() :
            this.createArticle()
    }

    displayCreateModal = () => {
        this.setState({
            showCreateModal: true
        })
    }

    saveCreateModal = () => {
        this.setState({
            showCreateModal: false,
            savedImagePreviewUrl: this.state.imagePreviewUrl,
            imagePreviewUrl: undefined
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
            localStorage.removeItem('modifiedArticleId')
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

    displayAdminModal = () => {
        this.setState({
            showAdminModal: true
        })
    }

    closeAdminModal = () => {
        this.setState({
            showAdminModal: false,
        })
    }

    handleImageInput = (event) => {
        const file = event.target.files[0]
        const imageFile = this.state.articleModification ?
            {modifiedArticleImageFile: file}
            : {newArticleImageFile: file}
        this.setState(imageFile)
        this.setState({oldImage: this.state.currentImage})
        const reader = new FileReader()
        reader.onloadend = () => {
            this.setState({imagePreviewUrl: [reader.result]})
        }
        reader.readAsDataURL(file)
    }

    noImage = () => {
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

    definePreviewImage = () => {
        const previewImage =
            this.state.imagePreviewUrl ? 
                this.state.imagePreviewUrl :
                this.state.articleModification ?
                    this.state.currentImage :
                    this.state.savedImagePreviewUrl ?
                        this.state.savedImagePreviewUrl :
                        undefined
        return previewImage
    }

    handleThumbUpChange = (selectedArticle, likeOption) => {
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

    handleThumbDownChange =(selectedArticle, likeOption) => {
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

    async _onSelect(option) {
        await this.setState({sortOption: option.value})
        this.sortArticlesList()
    }

}