import React from "react"
import Form from './form'

const loginInputs = [
	{
		label: "Courriel",
		type: "email",
		show: true,
		validated: "",
		id: "a"
	}, {
		label: "Mot de passe",
		type: "password",
		show: true,
		validated: "",
		id: "b"
	}
];
  
const Login = ({
    inputs, 
    inUpClick, 
    submitForm, 
    validateField
}) => (
    <div className="login" >
		<h1>Bienvenue !</h1>
		<hr />
		<Form 
			inputs={inputs} 
			submitForm={submitForm}
			validateField={validateField}
		/>
		<SignupLink inUpClick={inUpClick} />
    </div>
);
  
const SignupLink = ({inUpClick}) => (
    <div className="signup-link">
		<p className="in-out"> 
			Pas encore inscrit ? {" "}
			<button onClick={inUpClick}>Inscrivez-vous ici</button>
		</p>
    </div>
);

export class LoginWrapper extends React.Component {
	    
    constructor(props) {
        super(props)
        this.state = {
            loginInputs: loginInputs
        }
    }

    submitForm (e) {
        e.preventDefault();
    }

    validateField(event, id) {
        let newState, fieldInState;
        const value = event.target.value;
        const getField = (field) => (field.id === id);
        const validate = (v) => (v.length > 0);
        newState = this.state.loginInputs.slice();
        fieldInState = newState.find(getField);
        fieldInState.validated = validate(value) ? true : false;
        this.setState({loginInputs: newState});
    }

    render () {
        return (
            <Login 
                inputs={this.state.loginInputs}
                inUpClick={this.inUpClick}
                submitForm={this.submitForm}
                validateField={this.validateField}
            />
        );
    }
}
