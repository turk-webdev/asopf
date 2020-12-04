const { createPool } = require('mysql2/promise');
const passport = require('passport');
const Users = require('../models/users');

// A single row of the table is passed to the devs object
exports.getLogin = (req, res, next) => {
    res.render('login', {
        logged: req.user ? "yes" : "no",
        pageTitle: 'ASOPF | Login',
        path: '/login',
        userCounty: req.user ? req.user.county_code : null,
        userAvatar: req.user ? req.user.avatar : null
    });
};

exports.getSignup = (req, res, next) => {
    res.render('register',
        {
            logged: req.user ? "yes" : "no",
            pageTitle: 'ASOPF | Register',
            path: '/login',
            userCounty: req.user ? req.user.county_code : null,
            userAvatar: req.user ? req.user.avatar : null
        });
};

exports.postLogin = (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true
    })(req, res, next);
};

exports.postSignup = (req, res, next) => {
    var { fname, lname, email, password, password2, phone, county, notifications } = req.body;
    let errors = [];
    if (!fname || !lname || !email || !password || !password2) {
        errors.push({ msg: 'Please fill in all required fields' })
    }

    //Check Password match
    if (password !== password2) {
        errors.push({ msg: "Passwords do not match" })
    }

    //Check password length
    if (password.length < 6) {
        errors.push({ msg: "Password should be at least 6 characters" })
    }

    if (errors.length > 0) {
        res.render('register', {
            logged: req.user ? "yes" : "no",
            errors,
            fname,
            lname,
            email,
            password,
            password2,
            path: '/login',
            pageTitle: 'ASOPF | Register',
            userCounty: req.user ? req.user.county_code : null,
            userAvatar: req.user ? req.user.avatar : null
        });
    }
    else {
        //Check if email exists
        Users.existsUser('users', 'email', email)
            .then(([rows, fields]) => {
                if (rows[0].exists == 1) {
                    errors.push({ msg: "Email already exists" })
                    res.render('register', {
                        logged: req.user ? "yes" : "no",
                        errors,
                        pageTitle: 'ASOPF | Login',
                        fname,
                        lname,
                        email,
                        password,
                        password2,
                        path: '/login',
                        userCounty: req.user ? req.user.county_code : null,
                        userAvatar: req.user ? req.user.avatar : null
                    });
                }
            })
            .catch(err => console.log(err));
        Users.insertUser('users', fname, lname, email, password, notifications, "basic", phone, county)
            .then(([rows, fields]) => {
                res.render('login', {
                    logged: req.user ? "yes" : "no",
                    pageTitle: 'ASOPF | Login',
                    path: '/login',
                    userCounty: req.user ? req.user.county_code : null,
                    userAvatar: req.user ? req.user.avatar : null
                });
            })
            .catch(err => console.log(err));
    }
};


exports.postUpdate = (req, res, next) => {
    let { fname, lname, email, phone, county } = req.body;
    let userEmail = req.user.email;

    // Safety - if any of these fields are missing from the body, we use the user's existing record 
    if (!fname) { fname = req.user.fname; }
    if (!lname) { lname = req.user.lname; }
    if (!email) { email = req.user.email; }
    if (!phone) { phone = req.user.phone; }
    if (!county) { county = req.user.county; }

    // We have two separate handlers based on whether the user is updating their image or not
    if (req.files) {
        let avatar = req.files.avatar;
        let filename = avatar.name;

        if (avatar.mimetype == "image/jpeg" ||
            avatar.mimetype == "image/png" ||
            avatar.mimetype == "image/gif") {
            avatar.mv('./public/img/upload/' + filename, (err) => {
                if (err) {
                    req.flash('ERROR', err);
                }
            });
        } else {
            req.flash('ERROR', 'You must upload an image file (jpg, gif, png) for your avatar.');
        }

        Users.updateUserWithImage('users', fname, lname, email, phone, county, filename, userEmail)
            .then(([rows, fields]) => {
                req.flash('info', 'Your profile has been updated');
                res.redirect('/profile');
            })
            .catch(err => console.log(err));
    } else {
        Users.updateUser('users', fname, lname, email, phone, county, userEmail)
            .then(([rows, fields]) => {
                req.flash('info', 'Your profile has been updated');
                res.redirect('/profile');
            })
            .catch(err => console.log(err));
    }


};