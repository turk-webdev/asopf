const { get } = require('lodash');
const db = require('../utils/database');

module.exports = class Search {

    static fetchAll(table, order) {
        var sql = "SELECT * FROM ?? ORDER BY ??";
        return db.query(sql, [table, order]);
    }
    static fetchSome(table, order, order2, limit) {
        var sql = "SELECT * FROM ?? ORDER BY ?? DESC, ?? LIMIT ?";
        return db.query(sql, [table, order,order2, limit]);
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

    static selectUser(table, col, query) {
        var sql = "SELECT * FROM ?? WHERE ?? = ?";
        return db.query(sql, [table, col, query]);
    }

    static getCountyCovidLimit(county, limit) {
        var sql = "SELECT * FROM covid_data WHERE UPPER(county_code) = UPPER(?) ORDER BY date DESC LIMIT ?;";
        return db.query(sql, [county, limit]);
    }

    static getCountyCovidRange(county, start, end) {
        var sql = "SELECT * FROM covid_data WHERE UPPER(county_code) = UPPER(?) AND date BETWEEN ? AND ?;";
        return db.query(sql, [county, start, end]);
    }

    static getCountyWildfire(county) {
        var sql = "SELECT * FROM ca_wildfire_data WHERE UPPER(incident_county) = UPPER(?) ORDER BY incident_date_last_update DESC LIMIT 14;";
        return db.query(sql, [county]);
    }

    static getNewCovidData(table) {
        console.log('getNewCovidData');
        var sql = "SELECT * FROM ?? where date=(SELECT MAX(date) AS 'date' FROM ??) ORDER BY county_code;";
        return db.query(sql, [table, table]);
    }
    
    static uploadCovid(table, sql) {
        return db.query(sql, [table]);
    }

    static uploadWildfire(table, sql) {
        return db.query(sql, [table]);
    }
};