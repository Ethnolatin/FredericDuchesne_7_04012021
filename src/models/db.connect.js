import mysql from 'mysql'

const dbConnect = mysql.createConnection({
    user: process.env.DBUSER,
    password: process.env.DBPASSWORD,
    host: 'localhost',
    database: 'groupomania',
})

dbConnect.connect((err) => {
    if (err) throw err
    console.log('Connected to', dbConnect.config.database, 'database!')
})

module.exports = dbConnect
