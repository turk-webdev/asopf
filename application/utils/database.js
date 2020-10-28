const mysql = require('mysql2');

const mysqlHost = process.env.MYSQL_HOSTNAME;
const mysqlPort = process.env.MYSQL_PORT;
const mysqlUser = process.env.MYSQL_USERNAME;
const mysqlPass = process.env.MYSQL_PASSWORD;
const mysqlDB   = process.env.MYSQL_DATABASE;


console.log("mysqlHost="+mysqlHost);
console.log("mysqlPort="+mysqlPort);
console.log("mysqlUser="+mysqlUser);
console.log("mysqlPass="+mysqlPass);
console.log("mysqlDB="+mysqlDB);

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