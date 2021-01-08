import React from "react"
import logo from './images/logo.svg'
import groupomaniaWhite from './images/groupomaniaWhite.png'
import {LoginWrapper} from './login'
import {SignupWrapper} from './signup'
import {
	BrowserRouter as Router,
	Route,
	/* Switch,
	Link */
} from "react-router-dom"
import './App.css'

export default function App() {
	return (
		<Router>
			<div className="container">
				<header>
				</header>
				<main>
					<Route exact={true} path="/" render={()=> (
						<div>
							<img src={logo} className="homeLogo" alt="logo" />
							<img src={groupomaniaWhite} className="homeLogoText" alt="Groupomania" />
							<LoginWrapper />
						</div>
					)}/>
					<Route path="/signup/" render={()=> (<SignupWrapper />)}/>
				</main>
			</div>
		</Router>
	
	)
}