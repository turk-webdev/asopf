const { ensureAuthenticated } = require('../config/auth');
const { isAdmin } = require('../config/isAdmin');

const indexController = require('../controllers/index');

const express = require('express');
const router = express.Router();

router.get('/profile/',ensureAuthenticated, indexController.profile);
router.get('/profile/getCovid/', indexController.getCovid);
router.get('/profile/getWildfire/', indexController.getWildfire);
router.post('/profile/addCovidData/', indexController.addCovidData);
router.post('/profile/addWildfireData/', indexController.addWildfireData);