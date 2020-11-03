const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');
const { isAdmin } = require('../config/isAdmin');
const devController = require('../controllers/developer');

router.get('/', (req, res) => {
    res.render('welcome', {
        pageTitle: 'Welcome',
        path: '/'
    })
});

router.get('/auth-admin', ensureAuthenticated, isAdmin,(req, res, next) => {
    res.render('search', {
        pageTitle: `COVID Data`,
        path: '/search'
    });
});

router.get('/auth', ensureAuthenticated,(req, res, next) => {
    console.log(req.user);
    res.render('search', {
        pageTitle: `COVID Data`,
        path: '/search'
    });
});


router.get('/search/:type', (req, res, next) => {
    let type = req.params.type === 'covid' ? 'COVID' : 'Wildfire';
    res.render('search', {
        pageTitle: `${type} Data`,
        path: '/search'
    });
});

// router.get('/login', (req, res, next) => {
//     res.render('login', {
//         pageTitle: 'Login here',
//         path: '/login'
//     });
// });

// About pages pulling data from db, see controllers/developer.js
router.get('/about-us/', devController.getDevelopers);
router.get('/about-us/:name', devController.getDeveloperByName);

module.exports = router;