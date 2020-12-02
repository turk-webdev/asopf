const { get } = require('lodash');
const db = require('../utils/database');

const updateUser = (table, fname, lname, email, phone, county, user_email) => {
    var sql = "UPDATE ?? SET fname = ?, lname = ?, email = ?, phone = ?, county_code = ? WHERE email = ?"
    return db.query(sql, [table, fname, lname, email, phone, county, user_email]);
};

const updateUserWithImage = (table, fname, lname, email, phone, county, avatar, user_email) => {
    var sql = "UPDATE ?? SET fname = ?, lname = ?, email = ?, phone = ?, county_code = ?, avatar = ? WHERE email = ?"
    return db.query(sql, [table, fname, lname, email, phone, county, avatar, user_email]);
};

const existsUser = (table, col, query) => {
    var sql = "SELECT EXISTS(SELECT 1 FROM ?? WHERE ?? = ?) as 'exists'";
    return db.query(sql, [table, col, query]);
};

const insertUser = (table, fname, lname, email, password, notify, role, phone, county_code) => {
    var sql = "INSERT INTO ?? (fname, lname, email, password, notify, role, phone, county_code) values(?, ?, ?, ?, NULLIF(?, ''), ?, NULLIF(?, ''), NULLIF(?, ''))";
    return db.query(sql, [table, fname, lname, email, password, notify, role, phone, county_code]);
};

const selectEmail = (table, n1, n2) => {
    var sql = "SELECT email FROM ?? where notify = ? or notify = ? ";
    return db.query(sql, [table, n1, n2]);
};

module.exports = {
    updateUser,
    updateUserWithImage,
    existsUser,
    insertUser,
    selectEmail
};