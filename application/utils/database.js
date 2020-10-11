const mysql = require('mysql2');

// Creates a single pool with multiple available connections
// Many connections can be open/closed simultaneously to improve efficiency
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'node-complete',
    password: 'even better than'
});

// Using promise chains instead of nested callbacks
module.exports = pool.promise();