const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');
const { isAdmin } = require('../config/isAdmin');
const devController = require('../controllers/developer.controller');
const covidController = require('../controllers/covid.controller');
const profileController = require('../controllers/profile');
const bsTestController = require('../controllers/bootstrapTest');

router.get('/', (req, res) => {
    res.render('welcome', {
        logged: req.user ? "yes" : "no",
        pageTitle: 'A Song Of Plague & Fire',
        path: '/'
    })
});

router.get('/dash', (req, res) => {
    res.render('dash',{ 
        logged: req.user ? "yes" : "no", 
        pageTitle: 'A Song Of Plague & Fire', 
        path: '/dash' 
    })
});

router.get('/profile/', ensureAuthenticated, profileController.profile);
router.get('/profile/getCovid/', profileController.getCovid);
router.get('/profile/getWildfire/', profileController.getWildfire);
router.post('/profile/addCovidData/', profileController.addCovidData);
router.post('/profile/addWildfireData/', profileController.addWildfireData);

// About pages pulling data from db, see controllers/developer.js
router.get('/about-us/', devController.getDevelopers);
router.get('/about-us/:name', devController.getDeveloperByName);

router.get('/covid/', covidController.covid);
router.get('/covid/:county', covidController.covidCountyInit);
router.get('/wildfire/:county', covidController.wildfireCountyInit);

router.get('/bootstrapTest/1', bsTestController.testPage1);

module.exports = router;