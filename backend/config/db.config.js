// imort mysql modelw
const mysql = require('mysql2/promise')
// prepare connection parameter
const dbConfig = {
     connectionLimit: 10,
     password: process.env.DB_PASS,
     user: process.env.DB_USER,
     host: process.env.DB_HPOST,
     database: process.env.DB_NAME,
}

// create the connection
const pool = mysql.createPool(dbConfig)

// create a function that excute sql quries asynchorously
async function query(sql, params) {
    const [rows, fields] = await pool.execute(sql, params)
    return rows;
}
