import React from 'react'
import { AuthContext } from './authContext'
import {ajaxPost} from './ajax'
import logo from './images/logo.svg'
import iconTextWhite from './images/icon-left-font-monochrome-white.svg'
import groupomaniaWhite from './images/groupomaniaWhite.png'
import { Homepage } from './homepage'
import { pwSchema } from './pwSchema'

export class Login extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			userId: '',
			token: '',
			firstName: '',
			lastName: '',
			email: '',
			password:'',
            passwordCtrl: '',
			pwType: 'password',
            pwCtrlType: 'password',
			errorMessage: '',
			loginPage: true,
			loggedIn: false,
		}

		this.handleInputChange = this.handleInputChange.bind(this)
		this.loginSubmit = this.loginSubmit.bind(this)
		this.signupSubmit = this.signupSubmit.bind(this)
	}

	handleInputChange(event) {
		const target = event.target
		const name = target.name
		const value = target.value
		this.setState({[name]:value})
	}

	loginSubmit(event) {
		event && event.preventDefault()
		const loginData = {email: this.state.email, password: this.state.password}
		ajaxPost('http://localhost:3000/api/auth/login', loginData)
			.then((response)=> {
				this.setState({...response, loggedIn: true})
			})
			.catch((err) => {
				this.setState({errorMessage: err})
				console.log({err})
			})
	}

	signupSubmit(event) {
		event && event.preventDefault()
		const password = this.state.password
        if (!pwSchema.validate(password)) {
            this.setState({errorMessage: 'Format de mot de passe non valide'})
			alert(`Format de mot de passe requis :
- au moins 8 caractères
- au moins une majuscule
- au moins une minuscule
- au moins un chiffre`)
		} else if (password !== this.state.passwordCtrl) {
            this.setState({errorMessage: 'Les deux mots de passe sont différents'})
        } else {
            this.setState({errorMessage: ''})
            const signupData = {
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                email: this.state.email,
                password: this.state.password
            }
            ajaxPost('http://localhost:3000/api/auth/signup', signupData)
			.then((response)=> {
				this.setState({...response})
				console.log(this.status)
				this.loginSubmit()
                })
                .catch((err) => {
                    this.setState({errorMessage: err})
                    console.log(err)
                })
        }
	}

	handleClick(pw) {
		this.state[pw] === 'password' ? 
			this.setState({[pw]: 'text'}) :
			this.setState({[pw]: 'password'})
    }

	render () {
		const nameFields = (<>
			<div className='field'>
				<label className='label'>Prénom</label>
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
				<label className='label'>Nom</label>
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
				<label className='label'>Courriel</label>
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
				<label className='label'>Mot de passe</label>
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
				<label className='label'>Vérification du mot de passe</label>
				<br />
				<input
					className='input'
					type={this.state.pwCtrlType}
					name='passwordCtrl'
					value={this.state.passwordCtrl}
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
				<img src={logo} className='homeLogo' alt='logo' />
				<img src={groupomaniaWhite} className='logoText' alt='Groupomania' />
			</div>
		) : (
			<img src={iconTextWhite} className='logoText' alt='logo Groupomania' />
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
		const handleSubmit = loginPage ? this.loginSubmit : this.signupSubmit

		const value = {
			userId: this.state.userId,
			token: this.state.token,
			firstName: this.state.firstName,
			lastName: this.state.lastName
		}

		return (
			<AuthContext.Provider value={value}>
				{!this.state.loggedIn ? (
					<div className='auth'>
						{headerLogo}	
						<form onSubmit={handleSubmit} className='loginForm'>
							<h1>{title}</h1>
							<hr />
							{formFields}
							<hr />
							<div className={this.state.errorMessage === '' ? 'noErrorMessage' : 'errorMessage'} >{this.state.errorMessage}</div>
							<button type='submit' className='submit-button' >Valider</button>
							<p className='in-out'> 
								{footerMessage}
								<span onClick={() => this.setState({loginPage: !this.state.loginPage})} >{toggleButton}</span>
							</p>
						</form>
					</div>
				) : (
					<Homepage/>
				)}
			</AuthContext.Provider>
		)
	}
}
