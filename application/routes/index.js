const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');
const { isAdmin } = require('../config/isAdmin');

const devController = require('../controllers/developer.controller');
const covidController = require('../controllers/covid.controller');
const covidDemoController = require('../controllers/covidDemo.controller');

const Search = require('../models/search');
const covidDemo = require('../models/covidDemographics');


router.get('/', (req, res) => {
    res.render('welcome', {
        layout: 'layout',
        logged: req.user ? "yes" : "no",
        pageTitle: 'A Song Of Plague & Fire',
        path: '/',
        userCounty: req.user ? req.user.county_code : null,
        userAvatar: req.user ? req.user.avatar : null
    })
});

router.get('/dash', ensureAuthenticated, (req, res) => {
    const { county_code } = req.user;
    var countyData, ageData, sexData, ethnicData;
    
    Search.getCountyCovidLimit(county_code, 5)
    .then(([rows, fields]) => {
        countyData = rows;
        console.log(countyData);
        return covidDemo.getLatestDataByTable('covid_age_data');
    })
    .then(([rows, fields]) => {
        ageData = rows;
        return covidDemo.getLatestDataByTable('covid_sex_data'); 
    })
    .then(([rows, fields]) => {
        sexData = rows;
        return covidDemo.getLatestDataByTable('covid_ethnicity_data');
    })
    .then(([rows, fields]) => {
        ethnicData = rows;
        res.render('dash', { 
            layout: 'layout2',
            logged: req.user ? "yes" : "no", 
            pageTitle: req.user ? 'ASOPF | Dashboard | ' + req.user.fname + ' ' + req.user.lname : 'ASOPF | Dashboard', 
            path: '/dash',
            userCounty: req.user ? req.user.county_code : null,
            userAvatar: req.user ? req.user.avatar : null,
            covidCountyData: countyData,
            covidAgeData: ageData,
            covidSexData: sexData,
            covidEthnicityData: ethnicData
        });
    })
    .catch(err => console.log(err));
});

// About pages pulling data from db, see controllers/developer.js
router.get('/about-us/', devController.getDevelopers);
router.get('/about-us/:name', devController.getDeveloperByName);

// router.get('/covid-demo/:demo', covidDemoController.getByDemographic);
router.get('/covid-demo', covidDemoController.getBasicPage);
router.get('/covid-demo/:demo', covidDemoController.getTableData);
router.post('/covid-demo', covidDemoController.advancedFilter);

router.get('/covid/', covidController.covid);
router.get('/covid/:county', covidController.covidCountyInit);
router.post('/covid/:county', covidController.covidAdvFilter);
router.get('/wildfire/:county', covidController.wildfireCountyInit);
router.get('/wildfire/', covidController.wildfireCountyInit);

module.exports = router;