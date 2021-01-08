import React from "react"
import logo from './images/logo.svg'
import groupomaniaWhite from './images/groupomaniaWhite.png'
import {LoginWrapper} from './login'
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link
} from "react-router-dom"
import './App.css'

export default function App() {
	return (
		<Router>
			<div className="container">
				<header>
				</header>
				<main>
					<img src={logo} className="homeLogo" alt="logo" />
					<img src={groupomaniaWhite} className="homeLogoText" alt="Groupomania" />
					<LoginWrapper />
				</main>
			</div>
		</Router>
	
	)
}