import React from "react"

const Form = ({
    inputs, 
    submitForm, 
    validateField
}) => {
    const inputsMapped = inputs.map((input) => (
		<Input 
			label={input.label} 
			type={input.type}
			show={input.show}
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
    show, 
    validated, 
    id, 
    validateField
}) => (
    <div className={show ? "field field-in" : "field"}>
		<label className="label">{label}
			<i className={validated ? "fa fa-check animate-check" : ""} aria-hidden="true"></i>
		</label>
		<br />
		<input 
			className="input" 
			type={type}
			onBlur={()=>{validateField(Event, id);}}
		/>
    </div>
);

export default (Form)