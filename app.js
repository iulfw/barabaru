var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var flash   = require('express-flash');
var session = require('express-session');

var mainRouter = require('./routes/main');
var userRouter = require('./routes/login');
var menuRouter = require('./routes/admin');

var app = express();

// View Engine Setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({ 
    cookie: { 
        maxAge: 60000 
    },
    store: new session.MemoryStore(),
    saveUninitialized: true,
    resave: true,
    secret: 'secret'
}))

app.use(flash());

function isAuthenticated(req, res, next) {
    if (req.session.isLoggedIn) {
        return next();
    }
    res.redirect('/login');
}

app.use('/', mainRouter);
app.use('/login', userRouter);
app.use('/admin', isAuthenticated, menuRouter);

// Catch 404 and Forward to Error Handler
app.use(function(req, res, next) {
    next(createError(404));
});

// Error Handler
app.use(function(err, req, res, next) {
    // Set Locals
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // Render The Error Page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;