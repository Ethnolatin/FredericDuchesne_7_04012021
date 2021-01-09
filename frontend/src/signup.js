import React from "react"
// import Form from './form'

const signupInputs = [
    {
		label: "Prénom",
		type: "text",
		validated: "",
		id: "c"
    }, {
		label: "Nom",
		type: "text",
		validated: "",
		id: "d"
    }, {
		label: "Courriel",
		type: "email",
		validated: "",
		id: "e"
    }, {
		label: "Mot de passe",
		type: "password",
		validated: "",
		id: "f"
    }, {
		label: "Vérification du mot de passe",
		type: "password",
		validated: "",
		id: "g"
    }
];
 
const Signup = ({
    inputs, 
    submitForm, 
    validateField
}) => (
    <div className="login" >
		<h1>Inscription</h1>
		<hr />
		<Form 
			inputs={inputs} 
			submitForm={submitForm}
			validateField={validateField}
		/>
		<LoginLink />
    </div>
);
  
const LoginLink = () => (
    <div className="signup-link">
		<p className="in-out"> 
			Déjà inscrit ? {" "}
			<a href="http://localhost:4200" >Identifiez-vous ici</a>
		</p>
    </div>
);

const Form = ({
    inputs, 
    submitForm, 
    validateField
}) => {
    const inputsMapped = inputs.map((input) => (
		<Input 
			key={input.id+Date.now}
			label={input.label} 
			type={input.type}
			validated={input.validated}
			id={input.id}
			validateField={validateField}
		/>
    ));
    
    return (
		<form onSubmit={submitForm}>
			{inputsMapped}
			<Submit />
		</form>
    );
};

const Submit = () => (
    <div>
		<hr />
		<button
			className="submit-button"
			type="submit"
		> Valider
		</button>
    </div>
);
  
const Input = ({
    label, 
    type, 
    validated, 
    id, 
    validateField
}) => (
    <div className= "field">
		<label className="label">{label}
			<i className={validated ? "fa fa-check animate-check" : ""} aria-hidden="true"></i>
		</label>
		<br />
		<input 
			className="input" 
			type={type}
			onBlur={(e)=>{validateField(e, id);}}
		/>
    </div>
);


export class SignupWrapper extends React.Component {
	    
    constructor(props) {
        super(props)
        this.state = {
            signupInputs: signupInputs
        }
    }

    inUpClick () {
        this.setState({signUp: !this.state.signUp});
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
                submitForm={this.submitForm}
                validateField={this.validateField}
            />
        );
    }
}
