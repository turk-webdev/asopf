const express = require('express');
const router = express.Router();



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

router.get('/about-us/', (req, res) => {
    res.render('about', {
        pageTitle: 'About',
        path: '/about'
    });
});


router.get('/about-us/:name', function(req, res) {
    var name = req.params.name;
    res.render(name);
});

module.exports = router;