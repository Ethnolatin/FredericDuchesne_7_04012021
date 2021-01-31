import React from 'react'
import { Button } from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal'
import Table from 'react-bootstrap/Table'

export class AdminModal extends React.Component {
	constructor(props) {
		super(props)

        this.adminModalClose = this.adminModalClose.bind(this)
    }

    adminModalClose = () => {
        this.props.adminModalClose()
    }
    updateUser = (user) => {
        this.props.updateUser(user)
    }

    deleteUser = (user) => {
        this.props.deleteUser(user)
    }

    render () {
        const { showAdminModal, users, userId } = this.props
        return (
            <Modal show={showAdminModal} onHide={this.adminModalClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Liste des utilisateurs :</Modal.Title>
                </Modal.Header>
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
        )
    }
}