var express = require('express');
var router = express.Router();

/* Read Previous File */

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home' });
});

router.get('/about', function(req, res, next) {
  res.render('about', { title: 'About' });
});

router.get('/menu', function(req, res, next) {
  res.render('menu', { title: 'Menu' });
});

router.get('/feedback', function(req, res, next) {
  res.render('feedback', { title: 'Feedback' });
});

module.exports = router;
