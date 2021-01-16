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
				<Row className='auth'>
					<Route exact path='/login/'><Login /></Route>
				</Row>
				<Row>
					<Route exact path='/'>
						<Homepage />
					</Route>
				</Row>
			</Container>
		</Router>
	)
}