import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container, Row } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

import logo from './images/logo.svg'
import iconTextWhite from './images/icon-left-font-monochrome-white.svg'
import groupomaniaWhite from './images/groupomaniaWhite.png'
import { Login } from './loginForm'
import { Signup } from './signupForm'
import {Homepage} from './homepage'

export default function App() {

	
	return (
		<Router>
			<Container>
				<header>
				</header>
				<main>
					<Row className='auth'>
						<Route exact={true} path='/login/' component={login}/>
						<Route exact={true} path='/signup/' component={signup}/>
					</Row>
					<Row>
					<Route exact={true} path='/' render={()=> (
						<div>
							<Homepage />
						</div>
					)}/>
					</Row>
				</main>
				
			</Container>
		</Router>
	
	)
}

const login = ({ match }) => (
	<div>
		<img src={logo} className='homeLogo' alt='logo' />
		<img src={groupomaniaWhite} className='logoText' alt='Groupomania' />
		<Login />
	</div>	
)

const signup = ({ match }) => (
	<div>
		<img src={iconTextWhite} className='logoText' alt='logo Groupomania' />
		<Signup />
	</div>	
)