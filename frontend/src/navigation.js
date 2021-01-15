import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import {Button} from 'react-bootstrap'
import iconTextWhite from './images/icon-left-font-monochrome-white.svg'

export default function Navigation() {

    return(
        <Navbar bg="dark" variant="dark" sticky="top">
            <Navbar.Brand href="/">
            <img
                alt=""
                src={iconTextWhite}
                className="d-inline-block align-top"
            />{' '}
            </Navbar.Brand>
            {/* <Nav.Link href="">Home</Nav.Link> */}
            <Button href="/login"><i className="fas fa-sign-out-alt"></i></Button>
      </Navbar>
    )
}