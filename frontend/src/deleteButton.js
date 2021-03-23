import React from 'react'
import { BsTrashFill } from 'react-icons/bs'
import { Button } from 'react-bootstrap'

export class DeleteButton extends React.Component {

    confirmDelete = () => {
        localStorage.setItem('toBeDeleted', this.props.toBeDeleted)
        localStorage.setItem('userName', this.props.userName)
        this.props.confirmDelete()
    }

    render() {
        return (
            <Button onClick={() => this.confirmDelete()}>
                <BsTrashFill/>
                <span className='sr-only'>Delete</span>
            </Button>
        )
    }
}