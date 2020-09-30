const express = require('express');
const router = express.Router();

// get the client
const mysql = require('mysql2');

// create the connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'azertyuiop',
    database: 'asopf'
});


router.get('/', (req, res) => res.render('welcome'));

router.get('/about-us/', (req, res) => res.render('about'));


router.get('/about-us/:name', function (req, res) {
    connection.query(
        'SELECT * FROM `users`',
        function (err, results, fields) {
            console.log(results); // results contains rows returned by server
            console.log(fields); // fields contains extra meta data about results, if available
        }
    );
    var name = req.params.name;
    res.render(name);
});

module.exports = router;