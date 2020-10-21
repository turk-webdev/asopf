const Search = require('../models/search');

exports.getPage = (req, res, next) => {
    res.render('add-data', {
        pageTitle: 'Covid Data',
        path: '/covid-data'
    });
};

// The rows are passed to the ejs view as a js object as defined
// in models/developer.js 
exports.getAllData = (req, res, next) => {
    Search.fetchAll('covid-ca-counties', 'lastName').then(([rows, fields]) => {
        // Rows - Returns all of the rows of the table selected
        res.render('add-data', {
            pageTitle: 'Covid Data',
            path: '/covid-data'
        });
    }).catch(err => console.log(err));
};

// A single row of the table is passed to the devs object
exports.postDataByCol = (req, res, next) => {

    console.log("Client Request Recieved!");
    const data = req.body;
    console.log(data);

    Search.exact('statewide_cases', 'county', data.county).then(([rows, fields]) => {
        res.status(200).json(rows);
    }).catch(err => console.log(err));
};
