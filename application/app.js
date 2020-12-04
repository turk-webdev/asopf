const express = require('express');
const path = require('path');
const session = require('express-session');
const upload = require('express-fileupload');
const passport = require('passport');
const flash = require('express-flash');
const cookieParser = require('cookie-parser');
const expressLayouts = require('express-ejs-layouts');

const app = express();


//Passport config
require('./config/passport')(passport);
//Passport middleware
app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

// File upload middleware
app.use(upload());

app.use(cookieParser())
app.use(flash());

app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + '/public')); // Serves public assets folder
app.set('views', [__dirname + '/views', __dirname + '/views/personal']);

// API Data Streams
app.use(express.json());

//EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.set('layout', 'layout2');

//Bodyparser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));


// Bootstrap
//app.use("/css", express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.use("/js", express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname + '/node_modules/jquery/dist')));

const indexRoutes = require('./routes/index');
const apiRoutes = require('./routes/api');
const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profile');

//Routes
app.use('/', indexRoutes);
app.use(apiRoutes);
app.use(authRoutes);
app.use(profileRoutes);

const PORT = process.env.PORT || 8080;

app.listen(PORT, console.log(`Server started on port ${PORT}`));