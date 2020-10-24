const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');

const app = express();

app.use(express.static(__dirname + '/views'));
//app.use(express.static(__dirname + '/public/assets')); // Serves public assets folder
app.use(express.static(path.join(__dirname, 'public'))); // Serves public assets folder
app.set('views', [__dirname + '/views', __dirname + '/views/personal']);

// API Data Streams
app.use(express.json());

//EJS
app.use(expressLayouts);
app.set('view engine', 'ejs')

//Bodyparser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

const apiRoutes = require('./routes/api');

//Routes
app.use('/', require('./routes/index'));
app.use(apiRoutes);


const PORT = process.env.PORT || 8080;

app.listen(PORT, console.log(`Server started on port ${PORT}`));