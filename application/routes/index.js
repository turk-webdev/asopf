const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');
const devController = require('../controllers/developer');

router.get('/', (req, res) => {
    res.render('welcome', {
        pageTitle: 'Welcome',
        path: '/'
    })
});

router.get('/search', (req, res, next) => {
    res.render('search', {
        pageTitle: 'Search Database',
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