const express = require('express');
const router = express.Router();
const app = express();

app.use('/assets', express.static(__dirname + '/assets')); // Serves public assets folder


router.get('/', (req, res) => res.render('welcome'));

router.get('/about-us/', (req, res) => res.render('about'));


router.get('/about-us/:name', function(req, res) {
    var name = req.params.name;
    res.render(name);
});

module.exports = router;