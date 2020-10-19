const db = require('../utils/database');

module.exports = class Search {

    static fetchAll(table, order) {
        var sql = "SELECT * FROM ?? ORDER BY ??";
        return db.query(sql, [table, order]);
    }
    static exact(table, col, query) {
        var sql = "SELECT * FROM ?? WHERE ?? = ?";
        return db.query(sql, [table, col, query]);
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
};