import React from 'react'

export class Signup extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
            firstName: '',
            lastName: '',
			email: '',
            password:'',
            passwordCtrl: '',
            pwType: 'password',
            pwcType: 'password',
            pwError: false
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
        event.preventDefault();
        if (this.state.password !== this.state.passwordCtrl) {
            this.setState({pwError: true})
        } else {
            this.setState({pwError: false})
            console.log('Les infos ont été envoyées : ' + (this.state.firstName) + '+' + (this.state.lastName) + '+' + (this.state.email) + '+' + (this.state.password))
        }

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
				<div className='field'>
					<label className='label'>Vérification du mot de passe</label>
					<br />
					<input
						className='input'
						type={this.state.pwcType}
						name='passwordCtrl'
						value={this.state.passwordCtrl}
						onChange={this.handleInputChange}
						id='passwordCtrl'
						required
					/>
					<div
						className='toggle'
						onClick={() => this.handleClick('pwcType')}
          			>
            		    {this.state.pwcType === 'text' ?
                            'Masquer le mot de passe' :
                            'Afficher le mot de passe'
                        }
            		</div>
				</div>
				<hr />
				<button type='submit' className='submit-button' >Valider</button>
                <div>{this.state.pwError ? 'Les deux mots de passe sont différents' : ""}</div>
                <p className='in-out'> 
                    Déjà inscrit ? {' '}
                    <a href='http://localhost:4200' >Identifiez-vous ici</a>
                </p>
			</form>
		)
	}
}