import React from "react"

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

export default (Form);