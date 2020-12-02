const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');
const { isAdmin } = require('../config/isAdmin');

const devController = require('../controllers/developer.controller');
const covidController = require('../controllers/covid.controller');
const covidDemoController = require('../controllers/covidDemo.controller');


router.get('/', (req, res) => {
    res.render('welcome', {
        logged: req.user ? "yes" : "no",
        pageTitle: 'A Song Of Plague & Fire',
        path: '/',
        userCounty: req.user ? req.user.county_code : null,
        userAvatar: req.user ? req.user.avatar : null
    })
});

router.get('/dash', (req, res) => {
    res.render('dash', { 
        logged: req.user ? "yes" : "no", 
        pageTitle: req.user ? 'ASOPF | Dashboard | ' + req.user.fname + ' ' + req.user.lname : 'ASOPF | Dashboard', 
        path: '/dash',
        userCounty: req.user ? req.user.county_code : null,
        userAvatar: req.user ? req.user.avatar : null
    })
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

module.exports = router;