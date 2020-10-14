const db = require('../utils/database');

module.exports = class SearchDeveloper {
    static searchExact(col, query) {
        var sql = 'SELECT * FROM developers WHERE ' + col + '=' + query + ' ORDER BY firstName';
        return db.execute(sql);
    }

    static searchContains(col, query) {
        var sql = 'SELECT * FROM developers WHERE ' + col + ' LIKE %' + query + '% ORDER BY firstName';
        return db.execute(sql);
    }

    static searchStartsWith(col, query) {
        var sql = 'SELECT * FROM developers WHERE ' + col + ' LIKE ' + query + '% ORDER BY firstName';
        return db.execute(sql);
    }

    static searchEndsWith(col, query) {
        var sql = 'SELECT * FROM developers WHERE ' + col + ' LIKE %' + query + ' ORDER BY firstName';
        return db.execute(sql);
    }
};