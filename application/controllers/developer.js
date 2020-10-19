const Search = require('../models/search');

// The rows are passed to the ejs view as a js object as defined
// in models/developer.js 
exports.getDevelopers = (req, res, next) => {
    Search.fetchAll('developers', 'lastName').then(([rows, fields]) => {
        // Rows - Returns all of the rows of the table selected
        res.render('about', {
            devs: rows,
            pageTitle: 'About',
            path: '/about'
        });
    }).catch(err => console.log(err));
};

// A single row of the table is passed to the devs object
exports.getDeveloperByName = (req, res, next) => {
    var name = req.params.name;
    Search.exact('developers', 'firstName', name).then(([rows, fields]) => {
        res.render('about-dev', {
            devs: rows[0],
            pageTitle: 'About Us',
            path: '/about-us/:name'
        });
    }).catch(err => console.log(err));
};

