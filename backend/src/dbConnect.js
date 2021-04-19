import mysql from 'mysql'

const dbConnect = mysql.createConnection({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
})

dbConnect.connect((err) => {
    if (err) throw err
    console.log('Connected to', dbConnect.config.database, 'database!')
})

module.exports = dbConnect
