import React from 'react'
import { Button, Navbar } from 'react-bootstrap'
import { FaSignOutAlt } from 'react-icons/fa'
import iconTextWhite from './images/icon-left-font-monochrome-white.svg'

export default function Navigation() {

    return(
        <Navbar bg='dark' variant='dark' sticky='top'>
            <Navbar.Brand>
                <img
                    alt='Groupomania logo'
                    src={iconTextWhite}
                    className='d-inline-block align-top'
                />{' '}
            </Navbar.Brand>
            <Button href='/login'>
                <FaSignOutAlt/>
                <span className='sr-only'>Sign-out</span>
            </Button>
      </Navbar>
    )
}