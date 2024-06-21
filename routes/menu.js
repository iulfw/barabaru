var express = require('express');
var router = express.Router();
var multer = require('multer');

// Import Database
var connection = require('../config/database');

// Set Storage Engine
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './public/assets/menu');
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

// Initialize Upload
var upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 }, 
    fileFilter: function(req, file, cb) {
        checkFileType(file, cb);
    }
}).single('pic');

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
        menu: {
            id: '',
            type: '',
            pic: '',
            name: '',
            price: '',
            descr: ''
        }
    })
})

// Store
router.post('/store', function (req, res, next) {
    let id = req.body.id;
    let type = req.body.type;
    let pic = req.body.pic;
    let name = req.body.name;
    let price = req.body.price;
    let descr = req.body.descr;
    let errors = false;

    if (id.length === 0) {
        errors = true;
        req.flash('error', "Please Enter an ID");
        res.render('menu/create', {
            id: id,
            type: type,
            pic: pic,
            name: name,
            price: price,
            descr: descr
        })
    }

    if (type.length === 0) {
        errors = true;
        req.flash('error', "Please Select a Type");
        res.render('menu/create', {
            id: id,
            type: type,
            pic: pic,
            name: name,
            price: price,
            descr: descr
        })
    }

    if (name.length === 0) {
        errors = true;
        req.flash('error', "Please Enter a Name");
        res.render('menu/create', {
            id: id,
            type: type,
            pic: pic,
            name: name,
            price: price,
            descr: descr
        })
    }

    if (price.length === 0) {
        errors = true;
        req.flash('error', "Please Enter a Price");
        res.render('menu/create', {
            id: id,
            type: type,
            pic: pic,
            name: name,
            price: price,
            descr: descr
        })
    }

    if (!errors) {
        let formData = {
            id: id,
            type: type,
            pic: pic,
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
                    pic: formData.pic,
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
router.get('/edit/:id', function (req, res, next) {
    let id = req.params.id;

    connection.query('SELECT * FROM menu WHERE id = ?', [id], function (err, rows, fields) {
        if (err) throw err

        if (rows.length <= 0) {
            req.flash('error', 'Menu ID ' + id + " is Unavailable")
            res.redirect('/menu')
        } else {
            res.render('menu/edit', {
                id: rows[0].id,
                type: rows[0].type,
                pic: rows[0].pic,
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
    let pic = req.body.pic;
    let name = req.body.name;
    let price = req.body.price;
    let descr = req.body.descr;
    let errors = false;

    if (id.length === 0) {
        errors = true;
        req.flash('error', "Please Enter ID");
        res.render('menu/edit', {
            id: id,
            type: type,
            pic: pic,
            name: name,
            price: price,
            descr: descr
        })
    }

    if (type.length === 0) {
        errors = true;
        req.flash('error', "Please Enter Type");
        res.render('menu/edit', {
            id: id,
            type: type,
            pic: pic,
            name: name,
            price: price,
            descr: descr
        })
    }

    if (name.length === 0) {
        errors = true;
        req.flash('error', "Please Enter Name");
        res.render('menu/edit', {
            id: id,
            type: type,
            pic: pic,
            name: name,
            price: price,
            descr: descr
        })
    }

    if (price.length === 0) {
        errors = true;
        req.flash('error', "Please Enter Price");
        res.render('menu/edit', {
            id: id,
            type: type,
            pic: pic,
            name: name,
            price: price,
            descr: descr
        })
    }

    if (!errors) {
        let formData = {
            id: id,
            type: type,
            pic: pic,
            name: name,
            price: price,
            descr: descr
        }

        connection.query('UPDATE menu SET ? WHERE id = ?', [formData, id], function (err, result) {
            if (err) {
                req.flash('error', err)
                res.render('menu/edit', {
                    id: formData.id,
                    type: formData.type,
                    pic: formData.pic,
                    name: formData.name,
                    price: formData.price,
                    descr: formData.descr
                })
            } else {
                req.flash('success', 'Menu Has Been Updated');
                res.redirect('/menu');
            }
        })
    }
})

// Delete
router.get('/delete/:id', function (req, res, next) {
    let id = req.params.id;

    connection.query('DELETE FROM menu WHERE id = ?', [id], function (err, result) {
        if (err) {
            req.flash('error', err)
            res.redirect('/menu')
        } else {
            req.flash('success', 'Menu Has Been Deleted')
            res.redirect('/menu')
        }
    })
})

module.exports = router;