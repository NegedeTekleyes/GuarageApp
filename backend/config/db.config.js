// import posgress modules
const {pool} =  require('pg');

// prepare connection parameter
const dbConfig = {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 5432,
    password: process.env.DB_PASS,
}
// create connection pool
const pool = new Pool(dbConfig);

// create a function excutes sql queries asynchronously
async function query(sql,params) {
    const res = await pool.query(sql,params)
    return res.rows;
    
}
module.exports = {query}