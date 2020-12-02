const Search = require('../models/search');
var fs = require("fs");
const { dirname } = require('path');
var lodash = require('lodash');

exports.covid = (req, res, next) => {
    Search.getNewCovidData('covid_data').then(([rows, fields]) => {
        var rawdata = fs.readFileSync(__dirname + "/counties.json");
        let data = JSON.parse(rawdata);
        data.features.forEach((table) => {
            var picked = lodash.filter(rows, x => x.county_code === table.attributes.name);
            if (picked.length !== 0) {
                let tmp = JSON.parse(JSON.stringify(picked[0]));
                table.attributes["total_cases"] = tmp.total_cases;
                table.attributes["total_deaths"] = tmp.total_deaths;
                table.attributes["cases"] = tmp.cases;
                table.attributes["death"] = tmp.death;
            }
        });
        res.render('covid', {
            layout: 'layout',
            logged: req.user ? "yes" : "no",
            pageTitle: 'ASOPF | COVID Data',
            pageTitle: 'covid data',
            path: '/covid',
            counties: data,
            countyInit: false,
            userCounty: req.user ? req.user.county_code : null,
            userAvatar: req.user ? req.user.avatar : null
        });
    }).catch(err => console.log(err));
};

exports.wildfireCountyInit = (req, res, next) => {
    let countyString = req.params.county;
    Search.getCountyWildfire(countyString)
    .then(([rows,fields]) => {
        res.render('wildfire', {
            layout: 'layout',
            logged: req.user ? "yes" : "no",
            pageTitle: `ASOPF | ${countyString} | Wildfire Data`,
            path: '/wildfire',
            county: countyString,
            data: rows,
            userCounty: req.user ? req.user.county_code : null,
            userAvatar: req.user ? req.user.avatar : null
        });
    });
};

// TODO: Fix this .then chaining
exports.covidCountyInit = (req, res, next) => {
    let countyString = req.params.county;
    var data;
    // Build the map as per usual
    Search.getNewCovidData('covid_data')
    .then(([rows, fields]) => {
        let rawdata = fs.readFileSync(__dirname + "/counties.json");
        data = JSON.parse(rawdata);
        data.features.forEach((table) => {
            let picked = lodash.filter(rows, x => x.county_code === table.attributes.name);
            let tmp = JSON.parse(JSON.stringify(picked[0]));
            table.attributes["total_cases"] = tmp.total_cases;
            table.attributes["total_deaths"] = tmp.total_deaths;
            table.attributes["cases"] = tmp.cases;
            table.attributes["death"] = tmp.death;
        });
        Search.getCountyCovidLimit(countyString, 14)
        .then(([rows, fields]) => { 
            res.render('covid', {
                layout: 'layout',
                logged: req.user ? "yes" : "no",
                pageTitle: `ASOPF | ${countyString} | COVID Data`,
                path: '/covid',
                countyInit: true,
                counties: data,
                dataTable: rows,
                county: countyString,
                userCounty: req.user ? req.user.county_code : null,
                userAvatar: req.user ? req.user.avatar : null
            });
        });
    }).catch(err => console.log(err));

    
};

exports.covidAdvFilter = (req, res, next) => {
    const { start_date, end_date, search_type } = req.body;
    const county = req.params.county;
    
    // If we didn't get start & end date fields, the user
    // chose a 14 or 30 day report
    if (start_date == '' && end_date == '') {
        const limit = search_type == '0' ? 14 : 30;
        var data;
        // Build the map as per usual
        Search.getNewCovidData('covid_data')
        .then(([rows, fields]) => {
            let rawdata = fs.readFileSync(__dirname + "/counties.json");
            data = JSON.parse(rawdata);
            data.features.forEach((table) => {
                let picked = lodash.filter(rows, x => x.county_code === table.attributes.name);
                let tmp = JSON.parse(JSON.stringify(picked[0]));
                table.attributes["total_cases"] = tmp.total_cases;
                table.attributes["total_deaths"] = tmp.total_deaths;
                table.attributes["cases"] = tmp.cases;
                table.attributes["death"] = tmp.death;
            });

            return;
        })
        .then(() => {
            return Search.getCountyCovidLimit(county, limit)
        })
        .then(([rows, fields]) => {
            res.render('covid', {
                layout: 'layout',
                logged: req.user ? "yes" : "no",
                pageTitle: `ASOPF | ${county} | COVID Data`,
                path: '/covid',
                countyInit: true,
                counties: data,
                dataTable: rows,
                county: county,
                userCounty: req.user ? req.user.county_code : null,
                userAvatar: req.user ? req.user.avatar : null
            });
        }).catch(err => console.log(err));
        
    } else {
        var data;
        // Build the map as per usual
        Search.getNewCovidData('covid_data')
        .then(([rows, fields]) => {
            let rawdata = fs.readFileSync(__dirname + "/counties.json");
            data = JSON.parse(rawdata);
            data.features.forEach((table) => {
                let picked = lodash.filter(rows, x => x.county_code === table.attributes.name);
                let tmp = JSON.parse(JSON.stringify(picked[0]));
                table.attributes["total_cases"] = tmp.total_cases;
                table.attributes["total_deaths"] = tmp.total_deaths;
                table.attributes["cases"] = tmp.cases;
                table.attributes["death"] = tmp.death;
            });

            return;
        })
        .then(() => {
            return Search.getCountyCovidRange(county, start_date, end_date)
        })
        .then(([rows, fields]) => {
            res.render('covid', {
                layout: 'layout',
                logged: req.user ? "yes" : "no",
                pageTitle: `ASOPF | ${county} | COVID Data`,
                path: '/covid',
                countyInit: true,
                counties: data,
                dataTable: rows,
                county: county,
                userCounty: req.user ? req.user.county_code : null,
                userAvatar: req.user ? req.user.avatar : null
            });
        }).catch(err => console.log(err));

    }
};

