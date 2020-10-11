const express = require('express');
const router = express.Router();
const devController = require('../controllers/developer');

router.get('/', (req, res) => {
    res.render('welcome', {
        pageTitle: 'Welcome',
        path: '/'
    })
});

router.get('/add-data', (req, res, next) => {
    res.render('add-data', {
        pageTitle: 'Add Covid Data',
        path: '/add-data'
    });
});

router.post('/view-data', (req, res, next) => {
    res.redirect('/view-data');
});

router.get('/about-us/', devController.getDevelopers);

router.get('/about-us/:name', devController.getDeveloperByName);

module.exports = router;