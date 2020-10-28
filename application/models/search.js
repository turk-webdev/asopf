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
    static insertUser(table, email, pw, perm) {
        var sql = "INSERT INTO ?? (email, pw, permissions) values(?, ?, ?)";
        return db.query(sql, [table, email, pw, perm]);
    }
    static selectUser(table, col, query) {
        var sql = "SELECT * FROM ?? WHERE ?? = ?";
        return db.query(sql, [table, col, query]);
    }
};