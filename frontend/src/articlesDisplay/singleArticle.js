import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Image from 'react-bootstrap/Image'


export class SingleArticle extends React.Component {
    constructor(props) {
		super(props)

        this.articleModalClose = this.articleModalClose.bind(this)
    }

    articleModalClose = () => {
        this.props.articleModalClose()
    }

    render () {
        const { showArticleModal, article} = this.props
        return (
            <Modal show={showArticleModal} onHide={this.articleModalClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>{article.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Image src={article.image} width="100%" height="100%" alt={article.title}/>
                    {article.text}
                </Modal.Body>
            </Modal>
        )
    }
}