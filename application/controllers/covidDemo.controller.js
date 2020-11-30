const CovidDemo = require('../models/covidDemographics');

exports.getTableData = (req, res, next) => {
    let tableName = req.params.demo.toString().toLowerCase();
    let type = '';

    if (tableName.includes('age')) {
        tableName = 'covid_age_data';
        type = 'age';
    } else if (tableName.includes('ethnic')) {
        tableName = 'covid_ethnicity_data';
        type = 'ethnic';
    } else if (tableName.includes('sex')) {
        tableName = 'covid_sex_table';
        type = 'sex';
    }

    CovidDemo.getDataByTable(tableName)
    .then(([rows, fields]) => {
        res.render('covid-demo', {
            logged: req.user ? "yes" : "no",
            pageTitle: 'Demographic Data',
            path: '/covid/demographic',
            type: type,
            data: rows
        });
    });



};

exports.advancedFilter = (req, res, next) => {
    const { demo } = req.body;
    const { date_range } = req.body;
    const { start_date } = req.body;
    const { end_date } = req.body;

    if (date_range == 0) {
        CovidDemo.getDataByTable(`covid_${demo}_data`)
        .then(([rows, fields]) => {
            res.render('covid-demo', {
                logged: req.user ? "yes" : "no",
                pageTitle: 'Demographic Data',
                path: '/covid/demographic',
                type: demo,
                data: rows
            });
        })
        .catch((err) => {
            console.log(err);
        });
    } else if (date_range == 1) {
        CovidDemo.getLatestDataByTable(`covid_${demo}_data`)
        .then(([rows, fields]) => {
            
            res.render('covid-demo', {
                logged: req.user ? "yes" : "no",
                pageTitle: 'Demographic Data',
                path: '/covid/demographic',
                type: demo,
                data: rows
            });
        })
        .catch((err) => {
            console.log(err);
        });
    } else if (date_range == 2) {
        CovidDemo.getDataInRange(`covid_${demo}_data`, start_date, end_date)
        .then(([rows, fields]) => {
            
            res.render('covid-demo', {
                logged: req.user ? "yes" : "no",
                pageTitle: 'Demographic Data',
                path: '/covid/demographic',
                type: demo,
                data: rows
            });
        })
        .catch((err) => {
            console.log(err);
        });
    }
};

exports.getBasicPage = (req, res, next) => {
    res.render('covid-demo', {
        logged: req.user ? "yes" : "no",
        pageTitle: 'Demographic Data',
        path: '/covid/demographic',
        type: '',
    });
}