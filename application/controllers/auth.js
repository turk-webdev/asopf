const { createPool } = require('mysql2/promise');
const passport = require('passport');
const Search = require('../models/search');

// A single row of the table is passed to the devs object
exports.getLogin = (req, res, next) => {
    res.render('login', {
        logged: req.user ? "yes" : "no",
        pageTitle: 'Login',
        path: '/login'
    });
};

exports.getSignup = (req, res, next) => {
    res.render('register',
        {
            logged: req.user ? "yes" : "no",
            pageTitle: 'Register',
            path: '/login'
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
    const { name, email, password, password2 } = req.body;
    let errors = [];
    if (!name || !email || !password || !password2) {
        errors.push({ msg: 'Please fill in all fields' })
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
            name,
            email,
            password,
            password2,
            path: '/login'
        });
    } else {
        //Check if email exists
        Search.existsUser('users', 'email', email).then(([rows, fields]) => {
            if (rows[0].exists == 1) {
                errors.push({ msg: "Email already exists" })
                res.render('register', {
                    logged: req.user ? "yes" : "no",
                    errors,
                    name,
                    email,
                    password,
                    password2,
                    path: '/login'
                });
            }
        }).catch(err => console.log(err));
        Search.insertUser('users', email, password, 'basic').then(([rows, fields]) => {
            res.render('login', {
                logged: req.user ? "yes" : "no",
                pageTitle: 'Login',
                path: '/login'
            });
        }).catch(err => console.log(err));
    }
};


exports.postUpdate = (req, res, next) => {
    var { fname, lname, email, phone, adress, county } = req.body;
    var user_email = req.user.email;
    if (!fname) {
        fname = req.user.fname;
    } if (!lname) {
        lname = req.user.lname;
    } if (!email) {
        email = req.user.email;
    } if (!phone) {
        phone = req.user.phone;
    } if (!adress) {
        adress = req.user.adress;
    } if (!county) {
        county = req.user.county;
    }
    Search.updateUser('users', fname, lname, email, phone, adress, county, user_email).then(([rows, fields]) => {
        req.flash('info', 'Your profile has been updated');
        res.redirect('/profile');
    }).catch(err => console.log(err));
};

