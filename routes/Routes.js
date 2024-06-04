var express = require('express');
var router = express.Router();

/*buat baca index.html yang dulu*/
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/about', function(req, res, next) {
  res.render('about', { title: 'Express' });
});

router.get('/menu', function(req, res, next) {
  res.render('menu', { title: 'Express' });
});

router.get('/about.html#feedback', function(req, res, next) {
  res.render('feedback', { title: 'Express' });
});

module.exports = router;
