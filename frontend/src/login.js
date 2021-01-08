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
		<SignupLink />
    </div>
);
  
const SignupLink = () => (
    <div className="signup-link">
		<p className="in-out"> 
			Pas encore inscrit ? {" "}
			<a href="http://localhost:4200/signup" >Inscrivez-vous ici</a>
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
                submitForm={this.submitForm}
                validateField={this.validateField}
            />
        );
    }
}
