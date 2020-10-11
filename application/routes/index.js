const express = require('express');
const router = express.Router();
const Developer = require('../models/developer');

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
    Developer.fetchAll().then(([rows, fields]) => {
        res.render('about', {
            devs: rows,
            pageTitle: 'About',
            path: '/about'
        });
    }).catch(err => console.log(err));
});

router.get('/about-us/:name', function (req, res) {
    var name = req.params.name;
    Developer.findByName(name).then(([rows, fields]) => {
        res.render('about-dev', {
            devs: rows[0],
            pageTitle: 'About Us',
            path: '/about-us/:name'
        });
    }).catch(err => console.log(err));
});

module.exports = router;