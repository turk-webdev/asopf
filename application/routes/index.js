const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');
const { isAdmin } = require('../config/isAdmin');
const devController = require('../controllers/developer');
const searchController = require('../controllers/search');
const indexController = require('../controllers/index');

// router.get('/', (req, res) => {
//     res.render('home', {
//         pageTitle: 'A Song Of Plague & Fire',
//         path: '/'
//     })
// });

router.get('/', (req, res) => {
    res.render('welcome', {
        logged: req.user ? "yes" : "no",
        pageTitle: 'A Song Of Plague & Fire',
        path: '/'
    })
});


router.get('/profile/',ensureAuthenticated, indexController.profile);
router.get('/profile/getCovid/', indexController.getCovid);
router.get('/profile/getWildfire/', indexController.getWildfire);
router.post('/profile/addCovidData/', indexController.addCovidData);
router.post('/profile/addWildfireData/', indexController.addWildfireData);

// router.get('/login', (req, res, next) => {
//     res.render('login', {
//         pageTitle: 'Login here',
//         path: '/login'
//     });
// });

// About pages pulling data from db, see controllers/developer.js
router.get('/about-us/', devController.getDevelopers);
router.get('/about-us/:name', devController.getDeveloperByName);

router.get('/covid/', searchController.covid);
router.get('/covid/:county', searchController.covidCountyInit);
router.get('/wildfire/:county', searchController.wildfireCountyInit);

module.exports = router;