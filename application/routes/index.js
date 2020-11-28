const express = require('express');
const router = express.Router();

const devController = require('../controllers/developer.controller');
const covidController = require('../controllers/covid.controller');
const covidDemoController = require('../controllers/covidDemo.controller');


const apiRouter = require('./api');
const profileRouter = require('./profile');


router.get('/', (req, res) => {
    res.render('welcome', {
        logged: req.user ? "yes" : "no",
        pageTitle: 'A Song Of Plague & Fire',
        path: '/'
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
router.get('/wildfire/:county', covidController.wildfireCountyInit);

module.exports = router;