function User({ firstName, lastName, email, password }) {
    this.firstName = firstName
    this.lastName = lastName
    this.email = email
    this.password = password
    this.admin = 0
}

module.exports = User
