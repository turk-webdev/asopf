const express = require('express');
const router = express.Router();
const covidDataController = require('../controllers/covidData');

router.post('/api', covidDataController.postDataByCol);

module.exports = router;
