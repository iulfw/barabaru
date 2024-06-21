var express = require('express');
var router = express.Router();

// Import Database
var connection = require('../config/database');

router.get('/', (req, res) => {
  res.render('user/index'); // update view path
});

router.post('/', (req, res) => {
  const user = req.body.user;
  const pass = req.body.pass;

  // query the database to check if the user and pass match
  connection.query(`SELECT * FROM user WHERE user =? AND pass =?`, [user, pass], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error logging in');
    } else if (results.length > 0) {
      // Login successful, redirect to a protected page or set a session variable
      req.session.isLoggedIn = true;
      res.redirect('/menu');
    } else {
      res.status(401).send('Invalid user or pass');
    }
  });
});

module.exports = router;