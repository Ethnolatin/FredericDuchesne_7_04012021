import React from 'react'
import logo from './images/logo.svg'
import iconTextWhite from './images/icon-left-font-monochrome-white.svg'
import groupomaniaWhite from './images/groupomaniaWhite.png'
import { AuthContext } from './authContext'
import { Homepage } from './homepage'
import { logUser } from './axios'
import { pwSchema } from './pwSchema'

export class Login extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			userId: '',
			token: '',
			firstName: '',
			lastName: '',
			admin: 0,
			email: '',
			password:'',
            passwordCtrl: '',
			pwType: 'password',
            pwCtrlType: 'password',
			errorMessage: '',
			loginPage: true,
		}
	}

	render () {
		const nameFields = (<>
			<div className='field'>
				<label htmlFor='firstName' className='label'>Prénom</label>
				<br />
				<input
					className='input'
					type='text'
					name='firstName'
					value={this.state.firstName}
					onChange={this.handleInputChange}
					id='firstName'
					required
				/>
			</div>
			<div className='field'>
				<label htmlFor='lastName' className='label'>Nom</label>
				<br />
				<input
					className='input'
					type='text'
					name='lastName'
					value={this.state.lastName}
					onChange={this.handleInputChange}
					id='lastName'
					required
				/>
			</div>
		</>)
		const emailField = (
			<div className='field'>
				<label htmlFor='email' className='label'>Courriel</label>
				<br />
				<input
					className='input'
					type='email'
					name='email'
					value={this.state.email}
					pattern='[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$'
					onChange={this.handleInputChange}
					id='email'
					required
					placeholder='pseudo@domaine.ext'
				/>
			</div>
		)
		const passwordField = (
			<div className='field'>
				<label htmlFor='password' className='label'>Mot de passe</label>
				<br />
				<input
					className='input'
					type={this.state.pwType}
					name='password'
					value={this.state.password}
					onChange={this.handleInputChange}
					id='password'
					required
				/>
				<div
					className='toggle'
					onClick={() => this.handleClick('pwType')}
				>
					{this.state.pwType === 'text' ?
						'Masquer le mot de passe' :
						'Afficher le mot de passe'
					}
				</div>
			</div>
		)
		const passwordCtrlField = (
			<div className='field'>
				<label htmlFor='passwordCtrl' className='label'>Vérification du mot de passe</label>
				<br />
				<input
					className='input'
					type={this.state.pwCtrlType}
					name='passwordCtrl'
					value={this.state.passwordCtrl}
					onFocus={this.pwSecurity}
					onChange={this.handleInputChange}
					id='passwordCtrl'
					required
				/>
				<div
					className='toggle'
					onClick={() => this.handleClick('pwCtrlType')}
				>
					{this.state.pwCtrlType === 'text' ?
						'Masquer le mot de passe' :
						'Afficher le mot de passe'
					}
				</div>
			</div>
		)
		
		const loginPage = this.state.loginPage
		const title = loginPage ? 'Bienvenue !' : 'Inscription'
		const footerMessage = loginPage ? 'Pas encore inscrit ?  ' : 'Déjà inscrit ?  '
		const toggleButton = loginPage ? 'Inscrivez-vous ici' : 'Identifiez-vous ici'
		const headerLogo = loginPage ? (
			 <div>
				<img src={logo} className='logo-image' width='150' height='150' alt='Rotating logo' />
				<img src={groupomaniaWhite} className='logo-text' width='864' height='150' alt='Groupomania brand' />
			</div>
		) : (
			<img src={iconTextWhite} className='logo-text' width='485' height='78' alt='logo Groupomania' />
		)
		const formFields = loginPage ? (<>
			{emailField}
			{passwordField}
		</>) : (<>
			{nameFields}
			{emailField}
			{passwordField}
			{passwordCtrlField}
		</>)

		const contextValue = {
			userId: this.state.userId,
			token: this.state.token,
			firstName: this.state.firstName,
			lastName: this.state.lastName,
			admin: this.state.admin
		}

		return (
			<AuthContext.Provider value={contextValue}>
				{ contextValue.token ? (
					<Homepage/>
					) : (
					<div className='login-page'>
						{headerLogo}	
						<form onSubmit={this.loginSubmit} className='login-form'>
							<h1>{title}</h1>
							<hr />
							{formFields}
							<hr />
							<div className={this.state.errorMessage === '' ? 'noErrorMessage' : 'errorMessage'} >{this.state.errorMessage}</div>
							<button type='submit' className='submit-button' >Valider</button>
							<p className='login-form-footer'> 
								{footerMessage}
								<span onClick={() => this.setState({loginPage: !this.state.loginPage, errorMessage: ''})} >{toggleButton}</span>
							</p>
						</form>
					</div>
				)}
			</AuthContext.Provider>
		)
	}


	handleInputChange = (event) => {
		const target = event.target
		const name = target.name
		const value = target.value
		this.setState({[name]:value})
	}

	loginSubmit = async (event) => {
		event && event.preventDefault()
		if (!this.state.loginPage && this.state.password !== this.state.passwordCtrl) {
			this.setState({errorMessage: 'Les deux mots de passe sont différents'})
		} else {
			const url = this.state.loginPage ? 'login' : 'signup'
			const data = {
				email: this.state.email,
				password: this.state.password,
				firstName: this.state.firstName,
				lastName: this.state.lastName,
			}
			const response = await logUser (url, data)
			this.setState({...response})
		}
	}

	handleClick = (pw) => {
		this.state[pw] === 'password' ? 
			this.setState({[pw]: 'text'}) :
			this.setState({[pw]: 'password'})
	}
	
	pwSecurity = () => {
		if (!pwSchema.validate(this.state.password)) {
			alert(`Format de mot de passe non sécurisé !

Votre mot de passe doit contenir :
- au moins 8 caractères
- au moins une majuscule
- au moins une minuscule
- au moins un chiffre`)
		}
	}

}
