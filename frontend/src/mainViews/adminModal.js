import React from 'react'
import { Modal, Table } from 'react-bootstrap'
import { DeleteAlert } from './alerts'
import { DeleteButton } from '../components/deleteButton'
import { getAllItems, updateItem, deleteItem } from '../axios'

export class AdminModal extends React.Component {
	constructor(props) {
		super(props)
        this.state = {
            showAlert: false,
            users: [],
        }
    }

    componentDidMount() {
        this.getAllUsers()
    }

    getAllUsers = async () => {
        const list = await getAllItems('admin/', sessionStorage.getItem('token'), sessionStorage.getItem('userId'))
        return this.setState({
            users: list,
        })
    }


    render () {
        const { showAdminModal } = this.props
        return (
            <Modal show={showAdminModal} onHide={this.closeAdminModal} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Liste des utilisateurs :</Modal.Title>
                </Modal.Header>
                <DeleteAlert
                    show={this.state.showAlert}
                    item={localStorage.getItem('userName')}
                    hideAlert={this.hideAlert}
                    deleteItem={this.deleteUser}
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
                            {this.state.users.map(user => {
                                return (user.Id.toString() !== sessionStorage.getItem('userId') &&
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
                                            <DeleteButton
                                                confirmDelete={this.confirmDelete}
                                                toBeDeleted={user.Id}
                                                userName={user.firstName + ' ' + user.lastName}
                                            />
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


    updateUser = async (selectedUser) => {
        await updateItem('admin/', sessionStorage.getItem('token'), sessionStorage.getItem('userId'), {admin: !selectedUser.admin * 1}, selectedUser.Id)
        this.getAllUsers()
    }

    deleteUser = async () => {
        await deleteItem('admin/', sessionStorage.getItem('token'), sessionStorage.getItem('userId'), localStorage.getItem('toBeDeleted'))
        this.getAllUsers()
    }

    closeAdminModal = () => {
        this.props.closeAdminModal()
    }
    
    confirmDelete = () => {
        this.setState({showAlert: true})
    }

    hideAlert = () => {
        this.setState({showAlert: false})
    }

}