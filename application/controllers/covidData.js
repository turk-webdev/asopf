const Search = require('../models/search');

exports.getPage = (req, res, next) => {
    res.render('add-data', {
        layout: 'layout',
        logged: req.user ? "yes" : "no",
        pageTitle: 'Covid Data',
        path: '/covid-data',
        userCounty: req.user ? req.user.county_code : null,
        userAvatar: req.user ? req.user.avatar : null
    });
};

// The rows are passed to the ejs view as a js object as defined
// in models/developer.js 
exports.getAllData = (req, res, next) => {
    Search.fetchAll('covid-ca-counties', 'lastName').then(([rows, fields]) => {
        // Rows - Returns all of the rows of the table selected
        res.render('add-data', {
            layout: 'layout',
            logged: req.user ? "yes" : "no",
            pageTitle: 'Covid Data',
            path: '/covid-data',
            userCounty: req.user ? req.user.county_code : null,
            userAvatar: req.user ? req.user.avatar : null
        });
    }).catch(err => console.log(err));
};

// A single row of the table is passed to the devs object
exports.postDataByCol = (req, res, next) => {

    console.log("Client Request Recieved!");
    const data = req.body;
    console.log(data);

    if (data.county != '' && data.county != 'undefined') {
        Search.exact('statewide_cases', 'county', data.county, 'date').then(([rows, fields]) => {
            console.log("Query for County");
            res.status(200).json(rows);
        }).catch(err => console.log(err));
    } else if (data.date != '' && data.date != 'undefined') {
        Search.exact('statewide_cases', 'date', data.date, 'date').then(([rows, fields]) => {
            console.log("Query for Date");
            res.status(200).json(rows);
        }).catch(err => console.log(err));
    } else if (data.deaths != '' && data.deaths != 'undefined') {
        Search.exact('statewide_cases', 'newcountdeaths', data.deaths, 'date').then(([rows, fields]) => {
            console.log("Query for New Count Deaths");
            res.status(200).json(rows);
        }).catch(err => console.log(err));
    } else if (data.cases != '' && data.cases != 'undefined') {
        Search.exact('statewide_cases', 'newcountconfirmed', data.cases, 'date').then(([rows, fields]) => {
            console.log("Query for New Count Confirmed");
            res.status(200).json(rows);
        }).catch(err => console.log(err));
    } else {
        res.status(200).json({ status: "No input given."});
    }
};