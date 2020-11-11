const Search = require('../models/search');

exports.getDataForCounty = (req,res,next) => {
    res.render('search', {
        logged: req.user ? "yes" : "no",
        pageTitle: 'COVID Data for'
    });
}