const mysql = require('mysql');

const db = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: 'cosmicCollapse#87',
    database: 'login_register'
})

module.exports = db;