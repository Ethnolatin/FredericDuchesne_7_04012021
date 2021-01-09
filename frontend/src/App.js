import React from "react"
import logo from './images/logo.svg'
import iconTextWhite from './images/icon-left-font-monochrome-white.svg'
import groupomaniaWhite from './images/groupomaniaWhite.png'
import {Login} from './loginForm'
// import {LoginWrapper} from './login'
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
							<img src={groupomaniaWhite} className="logoText" alt="Groupomania" />
							<Login />
						</div>
					)}/>
					<Route path="/signup/" render={()=> (
						<div>
							<img src={iconTextWhite} className="logoText" alt="logo Groupomania" />
							<SignupWrapper />
						</div>
					)}/>
				</main>
			</div>
		</Router>
	
	)
}