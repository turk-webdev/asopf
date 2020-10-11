const Developer = require('../models/developer');

exports.getDevelopers = (req, res, next) => {
    Developer.fetchAll().then(([rows, fieldData]) => {
        res.render(name, {
            devs: rows,
            pageTitle: 'About Us',
            path: '/about-us/:name'
        });
    }).catch(err => console.log(err));
};

exports.getDeveloper = (req, res, next) => {
    // Find developer by id or name
};

exports.getIndex = (req, res, next) => {
    // Use developer info to get index
};
