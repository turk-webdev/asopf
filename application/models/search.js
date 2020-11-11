const db = require('../utils/database');

module.exports = class Search {

    static fetchAll(table, order) {
        var sql = "SELECT * FROM ?? ORDER BY ??";
        return db.query(sql, [table, order]);
    }
    static exact(table, col, query, order) {
        var sql = "SELECT * FROM ?? WHERE ?? = ? ORDER BY ?? DESC";
        return db.query(sql, [table, col, query, order]);
    }

    static contains(table, col, query, order) {
        console.log(`SELECT * FROM ${table} WHERE ${col} LIKE ${query} ORDER BY ${order}`);
        var sql = "SELECT * FROM ?? WHERE ?? LIKE %?% ORDER BY ??";
        return db.query(sql, [table, col, query, order]);
    }

    static startsWith(table, col, query, order) {
        var sql = "SELECT * FROM ?? WHERE ?? LIKE ?% ORDER BY ??";
        return db.query(sql, [table, col, query, order]);
    }

    static endsWith(table, col, query, order) {
        var sql = "SELECT * FROM ?? WHERE ?? LIKE %? ORDER BY ??";
        return db.query(sql, [table, col, query, order]);
    }

    static existsUser(table, col, query) {
        var sql = "SELECT EXISTS(SELECT 1 FROM ?? WHERE ?? = ?) as 'exists'";
        return db.query(sql, [table, col, query]);
    }
    static insertUser(table, email, password, role) {
        var sql = "INSERT INTO ?? (email, password, role) values(?, ?, ?)";
        return db.query(sql, [table, email, password, role]);
    }
    static selectUser(table, col, query) {
        var sql = "SELECT * FROM ?? WHERE ?? = ?";
        return db.query(sql, [table, col, query]);
    }

    static getCountyCovid(county) {
        var sql = "SELECT * FROM covid_data WHERE UPPER(county_code) = UPPER(?) ORDER BY id LIMIT 14;";
        return db.query(sql, [county]);
    }

    static getCountyWildfire(county) {
        var sql = "SELECT * FROM ca_wildfire_data WHERE UPPER(incident_county) = UPPER(?) ORDER BY incident_date_last_update DESC LIMIT 14;";
        return db.query(sql, [county]);
    }

    static getNewCovidData(table) {
        var sql = "SELECT * FROM ?? where date=(SELECT MAX(date) AS 'date' FROM ??) ORDER BY county_code;";
        return db.query(sql, [table, table]);
    }
};