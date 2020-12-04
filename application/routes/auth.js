const express = require('express');
const authController = require('../controllers/auth');
const passport = require('passport');
const router = express.Router();

// Get pages for user login/signup
router.get('/login', authController.getLogin);
router.get('/register', authController.getSignup);

//Register Handle
router.post('/login', authController.postLogin);
router.post('/register', authController.postSignup);

router.post('/update', authController.postUpdate);

//Logout Handle
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

module.exports = router;