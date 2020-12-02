const Search = require('../models/search');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

module.exports = function (passport) {
    passport.use(
        new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
            //Match User
            console.log(email, password);
            Search.selectUser('users', 'email', email).then(([rows, fields]) => {
                if (!rows[0]){
                    return done(null, false, { messages: "Unknown User" })
                }
                if (rows[0].password == password) {
                    return done(null, { id: rows[0].id, email: rows[0].email, permissions: rows[0].permissions })
                } else {
                    return done(null, false, { messages: "Incorrect Password" })
                }
            }).catch(err => console.log(err));
        })
    );

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
    passport.deserializeUser((id, done) => {
        Search.selectUser('users', 'id', id).then(([rows, fields]) => {
            done(null, rows[0]);
        }).catch(err => console.log(err));
    });
}