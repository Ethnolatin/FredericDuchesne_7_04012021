import React from 'react'
import ReactPasswordToggleIcon from 'react-password-toggle-icon'

export class Login extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			email: "",
			password:""
		}

		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.inputRef = React.createRef()
	}

	handleInputChange(event) {
		const target = event.target
		const value = target.value
		const name = target.name
		this.setState({[name]:value})
	}

	handleSubmit(event) {
		alert('Les identifiants ont été soumis : ' + (JSON.stringify(this.state)));
		event.preventDefault();
	}
	

	render () {
		return (
			<form onSubmit={this.handleSubmit} className="login">
				<h1>Bienvenue !</h1>
				<hr />
				<div className="field">
					<label className="label">Courriel</label>
					<br />
					<input
						className="input"
						type="email"
						name="email"
						value={this.state.email}
						onChange={this.handleInputChange}
						id="email"
						pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
						title="pseudo@domaine.ext"
						required
						placeholder="pseudo@domaine.ext"
					/>
				</div>
				<div className="field">
					<label className="label">Mot de passe</label>
					<br />
					<input
						className="input"
						type="text"
						name="password"
						value={this.state.password}
						onChange={this.handleInputChange}
						id="password"
						required
						ref={this.inputRef}
					/>
					<ReactPasswordToggleIcon
						inputRef={this.inputRef}
						style={{"fontSize": "0.8rem", "position": "relative"}}
					/>
				</div>
				<hr />
				<button type="submit" className="submit-button" >Valider</button>
				<div className="signup-link">
					<p className="in-out"> 
						Pas encore inscrit ? {" "}
						<a href="http://localhost:4200/signup" >Inscrivez-vous ici</a>
					</p>
				</div>
			</form>
		)
	}
}