const { createPool } = require('mysql2/promise');
const passport = require('passport');
const Search = require('../models/search');

// A single row of the table is passed to the devs object
exports.getLogin = (req, res, next) => {
    res.render('login', {
        pageTitle: 'Login',
        path: '/login'
    });
};

exports.getSignup = (req, res, next) => {
    res.render('register',
        {
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
                pageTitle: 'Login',
                path: '/login'
            });
        }).catch(err => console.log(err));
    }
};

