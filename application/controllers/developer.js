const Developer = require('../models/developer');

exports.getDevelopers = (req, res, next) => {
    Developer.fetchAll().then(([rows, fields]) => {
        res.render('about', {
            devs: rows,
            pageTitle: 'About',
            path: '/about'
        });
    }).catch(err => console.log(err));
};

exports.getDeveloperByName = (req, res, next) => {
    var name = req.params.name;
    Developer.findByName(name).then(([rows, fields]) => {
        res.render('about-dev', {
            devs: rows[0],
            pageTitle: 'About Us',
            path: '/about-us/:name'
        });
    }).catch(err => console.log(err));
};

exports.getIndex = (req, res, next) => {
    // Use developer info to get index
};
