const Search = require('../models/search');

exports.getDataForCounty = (req,res,next) => {
    res.render('search', {
        pageTitle: 'COVID Data for'
    });
}