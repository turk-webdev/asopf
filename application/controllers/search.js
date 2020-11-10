const Search = require('../models/search');
var fs = require("fs");
const { dirname } = require('path');
var lodash = require('lodash');

exports.covid = (req, res, next) => {
    Search.getNewCovidData('covid_data').then(([rows, fields]) => {
        var rawdata = fs.readFileSync(__dirname + "/counties.json");
        let data = JSON.parse(rawdata);
        data.features.forEach(function(table) {
            var picked = lodash.filter(rows, x => x.county_code === table.attributes.name);
            let tmp = JSON.parse(JSON.stringify(picked[0]));
            table.attributes["total_cases"] = tmp.total_cases;
            table.attributes["total_deaths"] = tmp.total_deaths;
            table.attributes["cases"] = tmp.cases;
            table.attributes["death"] = tmp.death;
        });
        res.render('covid', {
            pageTitle: 'ASOPF | COVID Data',
            path: '/covid',
            countyInit: false,
            counties: data
        });
    }).catch(err => console.log(err));
};

exports.countyInit = (req, res, next) => {
    let countyString = req.params.county;
    let countyCode = 0;

    Search.exact('counties','name',countyString,'id')
    .then(rows => { 
        countyCode = rows[0].county_code;
        countyString = rows[0].name;
    }).catch(err => alert(err));

    // Render the map as per usual
    var rawdata = fs.readFileSync(__dirname + "/counties.json");
    let data = JSON.parse(rawdata);
    data.features.forEach(function(table) {
        var picked = lodash.filter(rows, x => x.county_code === table.attributes.name);
        let tmp = JSON.parse(JSON.stringify(picked[0]));
        table.attributes["total_cases"] = tmp.total_cases;
        table.attributes["total_deaths"] = tmp.total_deaths;
        table.attributes["cases"] = tmp.cases;
        table.attributes["death"] = tmp.death;
    });

    var data2; 
    Search.exact('covid_data','county_code',countyCode,'id')
    .then(rows => {
        
    });
    res.render('covid', {
        pageTitle: `ASOPF | ${countyString} | COVID Data`,
        path: '/covid',
        countyInit: true,
        counties: data,
        dataTable: data2
    });
};

