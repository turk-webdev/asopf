const db = require('../utils/database');


module.exports = class Developer {
    constructor(id, firstName, lastName, jobTitle, imageUrl, grade, major, school, description) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.jobTitle = jobTitle;
        this.imageUrl = imageUrl;
        this.grade = grade;
        this.major = major;
        this.school = school;
        this.description = description;
    }

    static fetchAll() {
        var sql = 'SELECT * FROM developers ORDER BY firstName';
        return db.execute(sql);
    }

    static findById(id) {

    }

    static findByName(name) {
        var sql = 'SELECT * FROM developers WHERE firstName = ?';
        return db.execute(sql, [name]);
    }
};