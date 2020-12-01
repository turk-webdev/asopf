const { get } = require('lodash');
const db = require('../utils/database');

module.exports = class CovidDemographics {
    static getDataByTable(table) {
        var sql = "SELECT * FROM ?? ORDER BY date DESC"
        return db.query(sql, [table]);
    }

    static getLatestDataByTable(table) {
        var sql = "SELECT * FROM ?? ORDER BY date DESC LIMIT 5";
        return db.query(sql, [table]);
    }

    static getDataInRange(table, start, end) {
        var sql = "SELECT * FROM ?? WHERE (date >= ? AND date <= ?)";
        return db.query(sql, [table,start,end]);
    }
};