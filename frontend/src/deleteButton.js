import React from 'react'
import { BsTrashFill } from 'react-icons/bs'
import { Button } from 'react-bootstrap'

export class DeleteButton extends React.Component {

    confirmDelete = (item) => {
        this.props.confirmDelete(item)
    }

    render() {
        return (
            <Button onClick={() => this.confirmDelete(this.props.item)}>
                <BsTrashFill/>
                <span className='sr-only'>Delete</span>
            </Button>
        )
    }
}