const { get } = require('lodash');
const db = require('../utils/database');

module.exports = class CovidDemographics {
    static getDataByTable(table) {
        let sql = "SELECT * FROM ?? ORDER BY date DESC";
        return db.query(sql, [table]);
    }

    static getLatestDataByTable(table) {
        // Depending on the demographic, 
        // we only want a certain number of rows
        let limit = 1;
        switch (table) {
            case 'covid_age_data':
                limit = 4;
                break;
            case 'covid_sex_data':
                limit = 2;
                break;
            default:
                limit = 8;
        }

        let sql = "SELECT * FROM ?? ORDER BY date DESC, id ASC LIMIT ?";
        return db.query(sql, [table, limit]);
    }

    static getDataInRange(table, start, end) {
        let sql = "SELECT * FROM ?? WHERE (date >= ? AND date <= ?)";
        return db.query(sql, [table,start,end]);
    }
};