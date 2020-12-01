exports.testPage1 = (req, res, next) => {
    console.log(req.user);
    res.render('bootstrapTest1', {
        logged: req.user ? "yes" : "no",
        user: req.user,
        pageTitle: req.user.role,
    });
};
