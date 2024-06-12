var express = require('express');
var router = express.Router();

//import database
var connection = require('../config/database');

/**
 * INDEX menu
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
            //render ke view menu index
            res.render('menu/index', {
                data: rows // <-- data menu
            });
        }
    });
});

/**
 * CREATE POST
 */
router.get('/create', function (req, res, next) {
    res.render('menu/create', {
        title: '',
        content: ''
    })
})

/**
 * STORE POST
 */
router.post('/store', function (req, res, next) {
    
    let title   = req.body.title;
    let content = req.body.content;
    let errors  = false;

    if(title.length === 0) {
        errors = true;

        // set flash message
        req.flash('error', "Silahkan Masukkan Title");
        // render to add.ejs with flash message
        res.render('menu/create', {
            title: title,
            content: content
        })
    }

    if(content.length === 0) {
        errors = true;

        // set flash message
        req.flash('error', "Silahkan Masukkan Konten");
        // render to add.ejs with flash message
        res.render('menu/create', {
            title: title,
            content: content
        })
    }

    // if no error
    if(!errors) {

        let formData = {
            title: title,
            content: content
        }
        
        // insert query
        connection.query('INSERT INTO menu SET ?', formData, function(err, result) {
            //if(err) throw err
            if (err) {
                req.flash('error', err)
                 
                // render to add.ejs
                res.render('menu/create', {
                    title: formData.title,
                    content: formData.content                    
                })
            } else {                
                req.flash('success', 'Data Berhasil Disimpan!');
                res.redirect('/menu');
            }
        })
    }

})

module.exports = router;