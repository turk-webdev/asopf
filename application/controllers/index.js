const Search = require('../models/search');
const Users = require('../models/users');
const nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
        user: 'alexandre.area.epitech@gmail.com',
        pass: 'Wioletta01**'
    }
});


// TODO - We shouldn't be using the Search.whatever() method -- this is a big security risk
//        We can create a separate model - that is fine, but this is ripe to be SQL injected

exports.profile = (req, res, next) => {
    console.log(req.user);
    res.render('profile_' + req.user.role, {
        layout: 'layout',
        logged: req.user ? "yes" : "no",
        user: req.user,
        pageTitle: 'ASOPF | Settings | ' + req.user.fname + ' ' + req.user.lname,
        path: 'profile_' + req.user.role,
        userCounty: req.user ? req.user.county_code : null,
        userAvatar: req.user ? req.user.avatar : null
    });
};

exports.getCovid = (req, res, next) => {
    Search.fetchSome('covid_data', 'date', 'county_code', 7).then(([rows, fields]) => {
        // Rows - Returns all of the rows of the table selected
        res.send(rows);
    }).catch(err => console.log(err));
};

exports.getWildfire = (req, res, next) => {
    Search.fetchSome('ca_wildfire_data', 'incident_date_created', 'incident_name', 7).then(([rows, fields]) => {
        // Rows - Returns all of the rows of the table selected
        res.send(rows);
    }).catch(err => console.log(err));
};

exports.addCovidData = (req, res, next) => {
    var s = JSON.stringify(req.body);
    var json = JSON.parse(s);
    let sql = "";
    sql += "INSERT INTO ??(cases, death, date, county_code, total_cases, total_deaths) VALUES ";
    json.forEach(function (table) {
        sql += " ('" + table.cases + "', '" + table.death + "', '" + table.date + "', '" + table.county_code + "', '" + table.total_cases + "', '" + table.total_deaths + "'),";
    });
    sql = sql.slice(0, -1);
    sql += ";"
    console.log(sql);
    Search.uploadCovid("covid_data", sql).then(([rows, fields]) => {
        res.send('done');
    }).catch(err => console.log(err));
};


exports.addWildfireData = (req, res, next) => {
    var s = JSON.stringify(req.body);
    var json = JSON.parse(s);
    let sql = "";
    sql += "INSERT INTO ??(incident_name, incident_is_final, incident_date_last_update, incident_date_created, incident_administrative_unit, incident_administrative_unit_url, incident_county, incident_location, incident_acres_burned, incident_containment, incident_control, incident_cooperating_agencies, incident_longitude, incident_latitude, incident_type, incident_id, incident_url, incident_date_extinguished, incident_dateonly_extinguished, incident_dateonly_created, is_active, calfire_incident, notification_desired) VALUES ";
    json.forEach(function (table) {
        sql += " ('" + table.incident_name + "', '" + table.incident_is_final + "', '" + table.incident_date_last_update + "', '" + table.incident_date_created + "', '" + table.incident_administrative_unit + "', '" + table.incident_administrative_unit_url + "', '" + table.incident_county + "', '" + table.incident_location + "', '" + table.incident_acres_burned + "', '" + table.incident_containment + "', '" + table.incident_control + "', '" + table.incident_cooperating_agencies + "', '" + table.incident_longitude + "', '" + table.incident_latitude + "', '" + table.incident_type + "', '" + table.incident_id + "', '" + table.incident_url + "', '" + table.incident_date_extinguished + "', '" + table.incident_dateonly_extinguished + "', '" + table.incident_dateonly_created + "', '" + table.is_active + "', '" + table.calfire_incident + "', '" + table.notification_desired + "'),";
    });
    sql = sql.slice(0, -1);
    sql += ";"
    console.log(sql);
    Search.uploadWildfire("ca_wildfire_data", sql).then(([rows, fields]) => {
        res.send('done');
    }).catch(err => console.log(err));
};


exports.alert = (req, res, next) => {
    let from = `ASOPF <i***@gmail.com>`
    var {inlineRadioOptions, title, body} = req.body;
    Users.selectEmail("users", "both", "email").then(([rows, fields]) => {
        rows.forEach((item, index) => {
            var mailOptions = {
                from: from,
                to: item.email,
                subject: title,
                text: body
            };
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                }
            });
          })
    }).catch(err => console.log(err));
    res.redirect('/profile')
};
