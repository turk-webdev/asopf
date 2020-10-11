const mysql = require('mysql2');

const mysqlHost = process.env.MYSQL_HOST;
const mysqlPort = process.env.MYSQL_PORT;
const mysqlUser = process.env.MYSQL_USER;
const mysqlPass = process.env.MYSQL_PASS;
const mysqlDB   = process.env.MYSQL_DB;


// Creates a single pool with multiple available connections
// Many connections can be open/closed simultaneously to improve efficiency
const pool = mysql.createPool({
    host: mysqlHost,
    user: mysqlUser,
    database: mysqlDB,
    password: mysqlPass,
});


// Using promise chains instead of nested callbacks
module.exports = pool.promise();