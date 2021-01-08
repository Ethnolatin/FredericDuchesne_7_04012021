import React from "react"
import Form from './form'

const signupInputs = [
    {
		label: "Prénom",
		type: "text",
		show: true,
		validated: "",
		id: "c"
    }, {
		label: "Nom",
		type: "text",
		show: true,
		validated: "",
		id: "d"
    }, {
		label: "Courriel",
		type: "email",
		show: true,
		validated: "",
		id: "e"
    }, {
		label: "Mot de passe",
		type: "password",
		show: true,
		validated: "",
		id: "f"
    }, {
		label: "Vérification du mot de passe",
		type: "password",
		show: true,
		validated: "",
		id: "g"
    }
];
 
const Signup = ({
    inputs, 
    inUpClick, 
    submitForm, 
    validateField
}) => (
    <div className="signup" >
		<h1>Inscription</h1>
		<hr />
		<Form 
			inputs={inputs} 
			submitForm={submitForm}
			validateField={validateField}
		/>
		<LoginLink inUpClick={inUpClick} />
    </div>
);
  
const LoginLink = ({inUpClick}) => (
    <div className="signup-link">
		<p className="in-out"> 
			Déjà inscrit ? {" "}
			<button onClick={inUpClick}>Identifiez-vous ici</button>
		</p>
    </div>
);

export class SignupWrapper extends React.Component {
	    
    constructor(props) {
        super(props)
        this.state = {
            signupInputs: signupInputs
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
        newState = this.state.signupInputs.slice();
        fieldInState = newState.find(getField);
        fieldInState.validated = validate(value) ? true : false;
        this.setState({signupInputs: newState});
    }

    render () {
        return (
            <Signup 
                inputs={this.state.signupInputs}
                inUpClick={this.inUpClick}
                submitForm={this.submitForm}
                validateField={this.validateField}
            />
        );
    }
}
