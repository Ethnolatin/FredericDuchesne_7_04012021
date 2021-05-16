import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container, Row } from 'react-bootstrap'
import './styles/css/style.css'
import { Homepage } from './mainViews/homepage'

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