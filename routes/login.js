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
    connection.query('SELECT * FROM user WHERE user = ? AND pass = ?', [user, pass], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ success: false, message: 'Error Logging In' });
        } else if (results.length > 0) {
            req.session.isLoggedIn = true;
            req.session.userName = results[0].name;
            res.json({ success: true });
        } else {
            res.status(401).json({ success: false, message: 'Invalid User or Pass' });
        }
    });
});

// Logout Route
router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return console.error(err);
        }
        res.redirect('/login');
    });
});

module.exports = router;