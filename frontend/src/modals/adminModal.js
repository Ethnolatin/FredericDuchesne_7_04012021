import React from 'react'
import { Button } from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal'
import Table from 'react-bootstrap/Table'
import { DeleteAlert } from '../alerts'

export class AdminModal extends React.Component {
	constructor(props) {
		super(props)
        this.state = {
            showAlert: false,
        }

        this.adminModalClose = this.adminModalClose.bind(this)
    }

    adminModalClose = () => {
        this.props.adminModalClose()
    }
    updateUser = (user) => {
        this.props.updateUser(user)
    }

    confirmDelete = (user) => {
        localStorage.setItem('userId', user.Id)
        localStorage.setItem('userName', user.firstName + ' ' + user.lastName)
        this.setState({showAlert: true})
    }

    deleteItem = () => {
        this.props.deleteUser(localStorage.getItem('userId'))
    }

    hideAlert = () => {
        localStorage.removeItem('userId')
        localStorage.removeItem('userName')
        this.setState({showAlert: false})
    }

    render () {
        const { showAdminModal, users, userId } = this.props
        return (
            <Modal show={showAdminModal} onHide={this.adminModalClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Liste des utilisateurs :</Modal.Title>
                </Modal.Header>
                <DeleteAlert
                    show={this.state.showAlert}
                    item={localStorage.getItem('userName')}
                    deleteItem={this.deleteItem}
                    hideAlert={this.hideAlert}
                />
                <Modal.Body>
                    <Table striped hover size='sm'>
                        <thead>
                            <tr>
                                <th>Prénom</th>
                                <th>Nom</th>
                                <th className='admin'>Admin</th>
                                <th className='trash'></th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => {
                                return (user.Id !== userId &&
                                    <tr key={user.Id}>
                                        <td>{user.firstName}</td>
                                        <td>{user.lastName}</td>
                                        <td>
                                            <input
                                                className = 'checkbox'
                                                type='checkbox'
                                                defaultChecked={user.admin}
                                                onChange={() => this.updateUser(user)}
                                            />
                                        </td>
                                        <td>
                                            <Button onClick={() => this.confirmDelete(user)}>
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
        )
    }
}