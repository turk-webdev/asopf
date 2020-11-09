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
            pageTitle: 'covid data',
            path: '/covid',
            counties: data
        });
    }).catch(err => console.log(err));
};

