const { get } = require('lodash');
const db = require('../utils/database');

module.exports = class CovidDemographics {
    static getDataByTable(table) {
        var sql = "SELECT * FROM ?? ORDER BY date DESC"
        return db.query(sql, [table]);
    }

    
};