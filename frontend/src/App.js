import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container, Row } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

import { Login } from './loginForm'
import { Homepage } from './homepage'

export default function App() {
	return (
		<Router>
			<Container >
				<Row>
					<Route exact path='/' component={Homepage} />
				</Row>
				<Row className='auth'>
					<Route exact path='/login' component={Login} />
				</Row>
			</Container>
		</Router>
	)
}