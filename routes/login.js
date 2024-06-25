var express = require('express');
var router = express.Router();

// Import Database
var connection = require('../config/database');

router.get('/', (req, res) => {
    res.render('login/index');
});

router.post('/', (req, res) => {
    const user = req.body.user;
    const pass = req.body.pass;

    // Database Query to Match User and Pass
    connection.query(`SELECT * FROM user WHERE user =? AND pass =?`, [user, pass], (err, results) => {
        if (err) {
        console.error(err);
        res.status(500).send('Error Logging In');
        } else if (results.length > 0) {
        // Login Redirect
        req.session.isLoggedIn = true;
        res.redirect('/admin');
        } else {
        res.status(401).send('Invalid User or Pass');
        }
    });
});

module.exports = router;