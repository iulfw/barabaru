var express = require('express');
var router = express.Router();

// Import Database
var connection = require('../config/database');

// Index
router.get('/', function (req, res, next) {
    connection.query('SELECT * FROM menu ORDER BY id desc', function (err, rows) {
        if (err) {
            req.flash('error', err);
            res.render('menu', {
                data: ''
            });
        } else {
            res.render('menu/index', {
                data: rows
            });
        }
    });
});

// Create
router.get('/create', function (req, res, next) {
    res.render('menu/create', {
        title: '',
        content: ''
    })
})

// Store
router.post('/store', function (req, res, next) {
    
    let title   = req.body.title;
    let content = req.body.content;
    let errors  = false;

    if(title.length === 0) {
        errors = true;

        req.flash('error', "Please Enter { }");
        res.render('menu/create', {
            title: title,
            content: content
        })
    }

    if(content.length === 0) {
        errors = true;

        req.flash('error', "Please Enter { }");
        res.render('menu/create', {
            title: title,
            content: content
        })
    }

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
                req.flash('success', 'Menu Has Been Added');
                res.redirect('/menu');
            }
        })
    }

})

// Edit
router.get('/edit/(:id)', function(req, res, next) {

    let id = req.params.id;
   
    connection.query('SELECT * FROM menu WHERE id = ' + id, function(err, rows, fields) {
        if(err) throw err
         
        // if user not found
        if (rows.length <= 0) {
            req.flash('error', 'Data Post Dengan ID ' + id + " Tidak Ditemukan")
            res.redirect('/menu')
        }
        // if book found
        else {
            // render to edit.ejs
            res.render('menu/edit', {
                id:      rows[0].id,
                title:   rows[0].title,
                content: rows[0].content
            })
        }
    })
})

// Update
router.post('/update/:id', function(req, res, next) {

    let id      = req.params.id;
    let title   = req.body.title;
    let content = req.body.content;
    let errors  = false;

    if(title.length === 0) {
        errors = true;

        // set flash message
        req.flash('error', "Silahkan Masukkan Title");
        // render to edit.ejs with flash message
        res.render('menu/edit', {
            id:         req.params.id,
            title:      title,
            content:    content
        })
    }

    if(content.length === 0) {
        errors = true;

        // set flash message
        req.flash('error', "Silahkan Masukkan Konten");
        // render to edit.ejs with flash message
        res.render('menu/edit', {
            id:         req.params.id,
            title:      title,
            content:    content
        })
    }

    // if no error
    if( !errors ) {   
 
        let formData = {
            title: title,
            content: content
        }

        // update query
        connection.query('UPDATE menu SET ? WHERE id = ' + id, formData, function(err, result) {
            //if(err) throw err
            if (err) {
                // set flash message
                req.flash('error', err)
                // render to edit.ejs
                res.render('menu/edit', {
                    id:     req.params.id,
                    name:   formData.name,
                    author: formData.author
                })
            } else {
                req.flash('success', 'Data Berhasil Diupdate!');
                res.redirect('/menu');
            }
        })
    }
})

// Delete
router.get('/delete/(:id)', function(req, res, next) {

    let id = req.params.id;
     
    connection.query('DELETE FROM menu WHERE id = ' + id, function(err, result) {
        //if(err) throw err
        if (err) {
            // set flash message
            req.flash('error', err)
            // redirect to menu page
            res.redirect('/menu')
        } else {
            // set flash message
            req.flash('success', 'Data Berhasil Dihapus!')
            // redirect to menu page
            res.redirect('/menu')
        }
    })
})

module.exports = router;