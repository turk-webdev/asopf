module.exports = {
    isAdmin: function (req, res, next) {
        if (req.user.role == "admin") {
            return next();
        }
        req.flash('info', 'You need to be an admin to use this feature');
        res.redirect('/login');
    }
}