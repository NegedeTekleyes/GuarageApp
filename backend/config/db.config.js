// import postgres module
const { Pool } = require('pg');

// prepare connection parameters
const pool = new Pool ({
    connectionLimit: 10,
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 5432,
  password: process.env.DB_PASS,
});

// create connection pool
// const pool = new Pool(dbConfig);

// test connection
pool.connect()
  .then(() => console.log("PostgreSQL Connected"))
  .catch(() => console.log("PostgreSQL Not Connected"));

// create a function that executes SQL queries asynchronously
async function query(sql, params) {
  const res = await pool.query(sql, params);
  return res.rows;
}

module.exports = pool;