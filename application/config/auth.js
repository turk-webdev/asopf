module.exports = {
    ensureAuthenticated: function(req, res, next) {
        if(req.isAuthenticated()){
            return next();
        }
        // req.flash('Please log in to use this feature');
        res.redirect('/login');
    }
}