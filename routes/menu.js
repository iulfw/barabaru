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
        id: '',
        type: '',
        name: '',
        price: '',
        descr: ''
    })
})

// Store
router.post('/store', function (req, res, next) {
    let id = req.body.id;
    let type = req.body.type;
    let name = req.body.name;
    let price = req.body.price;
    let descr = req.body.descr;
    let errors = false;

    if (id.length === 0) {
        errors = true;
        req.flash('error', "Please Enter ID");
        res.render('menu/create', {
            id: id,
            type: type,
            name: name,
            price: price,
            descr: descr
        })
    }

    if (type.length === 0) {
        errors = true;
        req.flash('error', "Please Enter Type");
        res.render('menu/create', {
            id: id,
            type: type,
            name: name,
            price: price,
            descr: descr
        })
    }

    if (name.length === 0) {
        errors = true;
        req.flash('error', "Please Enter Name");
        res.render('menu/create', {
            id: id,
            type: type,
            name: name,
            price: price,
            descr: descr
        })
    }

    if (price.length === 0) {
        errors = true;
        req.flash('error', "Please Enter Price");
        res.render('menu/create', {
            id: id,
            type: type,
            name: name,
            price: price,
            descr: descr
        })
    }

    if (descr.length === 0) {
        errors = true;
        req.flash('error', "Please Enter Description");
        res.render('menu/create', {
            id: id,
            type: type,
            name: name,
            price: price,
            descr: descr
        })
    }

    if (!errors) {
        let formData = {
            id: id,
            type: type,
            name: name,
            price: price,
            descr: descr
        }

        connection.query('INSERT INTO menu SET ?', formData, function (err, result) {
            if (err) {
                req.flash('error', err)
                res.render('menu/create', {
                    id: formData.id,
                    type: formData.type,
                    name: formData.name,
                    price: formData.price,
                    descr: formData.descr
                })
            } else {
                req.flash('success', 'Menu Has Been Added');
                res.redirect('/menu');
            }
        })
    }
})

// Edit
router.get('/edit/(:id)', function (req, res, next) {
    let id = req.params.id;

    connection.query('SELECT * FROM menu WHERE id = ' + id, function (err, rows, fields) {
        if (err) throw err

        if (rows.length <= 0) {
            req.flash('error', 'Data Post Dengan ID ' + id + " Tidak Ditemukan")
            res.redirect('/menu')
        } else {
            res.render('menu/edit', {
                id: rows[0].id,
                type: rows[0].type,
                name: rows[0].name,
                price: rows[0].price,
                descr: rows[0].descr
            })
        }
    })
})

// Update
router.post('/update/:id', function (req, res, next) {
    let id = req.params.id;
    let type = req.body.type;
    let name = req.body.name;
    let price = req.body.price;
    let descr = req.body.descr;
    let errors = false;

    if (id.length === 0) {
        errors = true;
        req.flash('error', "Silahkan Masukkan id");
        res.render('menu/edit', {
            id: id,
            type: type,
            name: name,
            price: price,
            descr: descr
        })
    }

    if (type.length === 0) {
        errors = true;
        req.flash('error', "Silahkan Masukkan Type");
        res.render('menu/edit', {
            id: id,
            type: type,
            name: name,
            price: price,
            descr: descr
        })
    }

    if (name.length === 0) {
        errors = true;
        req.flash('error', "Silahkan Masukkan Name");
        res.render('menu/edit', {
            id: id,
            type: type,
            name: name,
            price: price,
            descr: descr
        })
    }

    if (price.length === 0) {
        errors = true;
        req.flash('error', "Silahkan Masukkan Price");
        res.render('menu/edit', {
            id: id,
            type: type,
            name: name,
            price: price,
            descr: descr
        })
    }

    if (descr.length === 0) {
        errors = true;
        req.flash('error', "Silahkan Masukkan Description");
        res.render('menu/edit', {
            id: id,
            type: type,
            name: name,
            price: price,
            descr: descr
        })
    }

    if (!errors) {
        let formData = {
            id: id,
            type: type,
            name: name,
            price: price,
            descr: descr
        }

        connection.query('UPDATE menu SET ? WHERE id = ' + id, formData, function (err, result) {
            if (err) {
                req.flash('error', err)
                res.render('menu/edit', {
                    id: formData.id,
                    type: formData.type,
                    name: formData.name,
                    price: formData.price,
                    descr: formData.descr
                })
            } else {
                req.flash('success', 'Data Berhasil Diupdate!');
                res.redirect('/menu');
            }
        })
    }
})

// Delete
router.get('/delete/(:id)', function (req, res, next) {
    let id = req.params.id;

    connection.query('DELETE FROM menu WHERE id = ' + id, function (err, result) {
        if (err) {
            req.flash('error', err)
            res.redirect('/menu')
        } else {
            req.flash('success', 'Data Berhasil Dihapus!')
            res.redirect('/menu')
        }
    })
})

module.exports = router;