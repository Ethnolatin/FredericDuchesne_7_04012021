import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container, Row } from 'react-bootstrap'
// import 'bootstrap/dist/css/bootstrap.min.css'
import './styles/css/style.css'

import { Homepage } from './homepage'

export default function App() {
	return (
		<Router>
			<Container >
				<Row>
					<Route exact path='/' component={Homepage} />
				</Row>
			</Container>
		</Router>
	)
}