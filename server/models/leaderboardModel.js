const { Pool } = require('pg');
require('dotenv').config();

console.log('process.env.DB_URI in model', process.env.DB_URI)
const pool = new Pool({
    connectionString: process.env.DB_URI
});

module.exports = {
    query: (text, params, callback) => {
        console.log('query executed', text);
        return pool.query(text, params, callback); 
    }
}
