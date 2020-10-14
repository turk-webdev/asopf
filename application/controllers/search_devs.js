const Search = require('../models/search_devs');

// Don't really know if this is right or not, just copied from the other controller
exports.search = (req, res, next) => {
    Search.searchExact().then(([rows, fields]) => {
        res.render('about', {
            devs: rows,
            pageTitle: 'About',
            path: '/about'
        });
    }).catch(err => console.log(err));
};