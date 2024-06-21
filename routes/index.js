var express = require('express');
var router = express.Router();

var connection = require('../config/database');


/* Read Main Website */

router.get('/', function(req, res, next) {
    res.render('index', { title: 'Home' });
});

router.get('/about', function(req, res, next) {
    res.render('about', { title: 'About' });
});

router.get('/menus', function(req, res, next) {
  connection.query('SELECT * FROM menu', function (err, rows) {
    if (err) {
        req.flash('error', err);
        res.render('menus', { title: 'Menu',  data: '' });
    } else {
        res.render('menus', { title: 'Menu',  data: rows });
    }
  });
});

router.get('/feedback', function(req, res, next) {
    res.render('feedback', { title: 'Feedback' });
});

module.exports = router;