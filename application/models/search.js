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

    
    static getNewCovidData(table) {
        var sql = "SELECT * FROM asopf_test.?? where date=(SELECT MAX(date) AS 'date' FROM asopf_test.??) ORDER BY county_code;";
        return db.query(sql, [table, table]);
    }
};