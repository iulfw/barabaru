var express = require('express');
var router = express.Router();

//import database
var connection = require('./config/database.js');

/**
 * INDEX POSTS
 */
router.get('/', function (req, res, next) {
    //query
    connection.query('SELECT * FROM menu ORDER BY id desc', function (err, rows) {
        if (err) {
            req.flash('error', err);
            res.render('menu', {
                data: ''
            });
        } else {
            //render ke view posts index
            res.render('./views/menu/index.ejs', {
                data: rows // <-- data posts
            });
        }
    });
});

module.exports = router;


