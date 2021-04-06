import mysql from 'mysql'

const dbConnect = mysql.createConnection({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: 'localhost',
    database: 'groupomania',
})

dbConnect.connect((err) => {
    if (err) throw err
    console.log('Connected to', dbConnect.config.database, 'database!')
})

module.exports = dbConnect
