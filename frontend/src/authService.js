import React from 'react'

export class AuthService extends React.Component {
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
            loggedIn: false,
        }

    }

    isLoggedIn() {
        console.log(this.status.loggedIn)
        return this.status.loggedIn
    }
}