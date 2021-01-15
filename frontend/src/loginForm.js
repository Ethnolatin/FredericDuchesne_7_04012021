import React from 'react'
import {ajaxPost} from './ajax'
export class Login extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			email: '',
			password:'',
			pwlType: 'password',
			errorMessage: '',
			userId: '',
			userFirstName: '',
			userLastName: '',
			loggedIn: false
		}

		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleInputChange(event) {
		const target = event.target
		const name = target.name
		const value = target.value
		this.setState({[name]:value})
	}

	handleSubmit(event) {
		event.preventDefault()
		const loginData = {"email": this.state.email, "password": this.state.password}
		ajaxPost('http://localhost:3000/api/auth/login', loginData)
			.then((response)=> {
				this.setState({...response})
				window.location = '/'
			})
			.catch((err) => {
				this.setState({'errorMessage' : 'Connexion impossible'})
				console.log({err})
			})
	}
	
	handleClick(pw) {
		this.state[pw] === 'password' ? 
			this.setState({[pw]: 'text'}) :
			this.setState({[pw]: 'password'})
    }

	render () {
		return (
			<form onSubmit={this.handleSubmit} className='login'>
				<h1>Bienvenue !</h1>
				<hr />
				<div className='field'>
					<label className='label'>Courriel</label>
					<br />
					<input
						className='input'
						type='email'
						name='email'
						value={this.state.email}
						onChange={this.handleInputChange}
						id='email'
						pattern='[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$'
						title='pseudo@domaine.ext'
						required
						placeholder='pseudo@domaine.ext'
					/>
				</div>
				<div className='field'>
					<label className='label'>Mot de passe</label>
					<br />
					<input
						className='input'
						type={this.state.pwlType}
						name='password'
						value={this.state.password}
						onChange={this.handleInputChange}
						id='password'
						required
					/>
					<div
						className='toggle'
						onClick={() => this.handleClick('pwlType')}
          			>
            		    {this.state.pwlType === 'text' ?
							'Masquer le mot de passe' :
							'Afficher le mot de passe'
						}
            		</div>
				</div>
				<hr />
                <div className={this.state.errorMessage === "" ? 'noErrorMessage' : 'errorMessage'} >{this.state.errorMessage}</div>
				<button type='submit' className='submit-button' >Valider</button>
				<p className='in-out'> 
					Pas encore inscrit ? {' '}
					<a href='/signup' >Inscrivez-vous ici</a>
				</p>
			</form>
		)
	}
}