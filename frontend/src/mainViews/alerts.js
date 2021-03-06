import React from 'react'
import { Alert, Button} from 'react-bootstrap'

export class DeleteAlert extends React.Component {
    
    render() {
        const {show, item} = this.props
        return (
            <Alert show={show} variant='danger'>
                <Alert.Heading>
                    Supprimer {item} ?
                </Alert.Heading>
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

    deleteItem = async () => {
        await this.props.deleteItem()
        this.hideAlert()
    }

    hideAlert = () => {
        localStorage.removeItem('toBeDeleted')
        localStorage.removeItem('userName')
        this.props.hideAlert()
    }

}