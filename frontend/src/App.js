import React from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import { Container, Row } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

import logo from './images/logo.svg'
import iconTextWhite from './images/icon-left-font-monochrome-white.svg'
import groupomaniaWhite from './images/groupomaniaWhite.png'
import { Login } from './loginForm'
import { Signup } from './signupForm'
import { Homepage } from './homepage'

export default class App extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			loggedIn: true,
		}
	}


	render () {
	return (
		<Router>
			<Container>
				<Row className='auth'>
					<Route exact path='/login/' component={login}/>
					<Route exact path='/signup/' component={signup}/>
				</Row>
				<Row>
				<Route exact path='/'>
					{this.state.loggedIn ? <Homepage /> : <Redirect to='/login'></Redirect>}
				</Route>
				<Route exact path='/:Id' />

				</Row>
			</Container>
		</Router>
	)}
}

const login = ({ match }) => (
	<div>
		<img src={logo} className='homeLogo' alt='logo' />
		<img src={groupomaniaWhite} className='logoText' alt='Groupomania' />
		<Login />
		{console.log({login})}
	</div>	
)

const signup = ({ match }) => (
	<div>
		<img src={iconTextWhite} className='logoText' alt='logo Groupomania' />
		<Signup />
	</div>	
)