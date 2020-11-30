const { get } = require('lodash');
const db = require('../utils/database');

const updateUser = (table, fname, lname, email, phone, county, user_email) => {
    var sql = "UPDATE ?? SET fname = ?, lname = ?, email = ?, phone = ?, county_code = ? WHERE email = ?"
    return db.query(sql, [table, fname, lname, email, phone, county, user_email]);
};

const existsUser = (table, col, query) => {
    var sql = "SELECT EXISTS(SELECT 1 FROM ?? WHERE ?? = ?) as 'exists'";
    return db.query(sql, [table, col, query]);
};

const insertUser = (table, email, password, role) => {
    var sql = "INSERT INTO ?? (email, password, role) values(?, ?, ?)";
    return db.query(sql, [table, email, password, role]);
};

module.exports = {
    updateUser,
    existsUser,
    insertUser,
};