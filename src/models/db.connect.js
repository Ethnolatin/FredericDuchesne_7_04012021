import mysql from 'mysql'

const dbConnect = mysql.createConnection({
    user: process.env.DBUSER,
    password: process.env.DBPASSWORD,
    host: 'localhost',
    database: 'groupomania',
})

dbConnect.connect((err) => {
    if (err) throw err
    console.log('Connecté à la base de données !')
})

module.exports = dbConnect
