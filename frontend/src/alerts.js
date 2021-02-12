import React from 'react'
import { Alert, Button} from 'react-bootstrap'

export class DeleteAlert extends React.Component {
    
    deleteItem = () => {
        this.props.deleteItem()
    }

    hideAlert = () => {
        this.props.hideAlert()
    }

    render() {
        const {show, item} = this.props
        return (
            <Alert show={show} variant='danger'>
                <Alert.Heading>Supprimer cet {item} ?</Alert.Heading>
                <hr />
                <div className="d-flex justify-content-end">
                    <Button onClick={this.deleteItem} >
                        Confirmer
                    </Button>
                    <Button onClick={this.hideAlert} >
                        Annuler
                    </Button>
                </div>
            </Alert>
        )
    }

}