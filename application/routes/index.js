const express = require('express');
const router = express.Router();
const devController = require('../controllers/developer');

router.get('/', (req, res) => {
    res.render('welcome', {
        pageTitle: 'Welcome',
        path: '/'
    })
});

router.get('/search/:type', (req, res, next) => {
    let type = req.params.type === 'covid' ? 'COVID' : 'Wildfire';
    res.render('search', {
        pageTitle: `${type} Data`,
        path: '/search'
    });
});

// About pages pulling data from db, see controllers/developer.js
router.get('/about-us/', devController.getDevelopers);
router.get('/about-us/:name', devController.getDeveloperByName);

module.exports = router;