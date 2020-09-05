const express = require('express');
const router = express.Router();


router.get('/', (req, res) => res.render('welcome'));

router.get('/about-us/', (req, res) => res.render('about'));
router.get('/about-us/:name', function(req, res) {
    var name = req.params.name;
    res.render(name);
});

module.exports = router;