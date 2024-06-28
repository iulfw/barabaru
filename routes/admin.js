var express = require('express');
var router = express.Router();
var multer = require('multer');
var path = require('path');

// Import Database
var connection = require('../config/database');

// Set Storage Engine
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.join(__dirname, '../public/assets/menu/upload'));
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

// Initialize Upload
var upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 }, 
    // fileFilter: function(req, file, cb) {
    //     checkFileType(file, cb);
    // }
}).single('pic');

// Index
router.get('/', function (req, res, next) {

    if (!req.session.isLoggedIn) {
        res.redirect('/login');
        return;
    }
    const userName = req.session.userName;

    connection.query('SELECT * FROM menu ORDER BY id ASC', function (err, rows) {
        if (err) {
            req.flash('error', err);
            res.render('admin', {
                data: '',
                userName: userName
            });
        } else {
            res.render('admin/index', {
                data: rows,
                userName: userName
            });
        }
    });
});

// Create
router.get('/create', function (req, res, next) {
    res.render('admin/create', {
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

    upload(req, res, function (err) {
        if (err) {
            req.flash('error', err);
            return res.redirect('/admin/create');
        }

        let id = req.body.id;
        let type = req.body.type;
        let pic = req.file ? `/assets/menu/upload/${req.file.filename}` : '';
        let name = req.body.name;
        let price = req.body.price;
        let descr = req.body.descr;
        let errors = false;

        if (id.length === 0) {
            errors = true;
            req.flash('error', "Please Enter an ID");
            res.render('admin/create', {
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
            res.render('admin/create', {
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
            res.render('admin/create', {
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
            res.render('admin/create', {
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
                    res.render('admin/create', {
                        id: formData.id,
                        type: formData.type,
                        pic: formData.pic,
                        name: formData.name,
                        price: formData.price,
                        descr: formData.descr
                    })
                } else {
                    req.flash('success', 'Menu Has Been Added');
                    res.redirect('/admin');
                }
            })
        }
    })
})

// Edit
router.get('/edit/:id', function (req, res, next) {
    let id = req.params.id;

    connection.query('SELECT * FROM menu WHERE id = ?', [id], function (err, rows, fields) {
        if (err) throw err

        if (rows.length <= 0) {
            req.flash('error', 'Menu ID ' + id + " is Unavailable")
            res.redirect('/admin')
        } else {
            res.render('admin/edit', {
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
    upload(req, res, function (err) {
        if (err) {
            req.flash('error', err);
            return res.redirect(`/admin/edit/${id}`);
        }

        let new_id = req.body.id;
        let type = req.body.type;
        let pic = req.file ? `/assets/menu/upload/${req.file.filename}` : req.body.old_pic;
        let name = req.body.name;
        let price = req.body.price;
        let descr = req.body.descr;
        let errors = false;

        if (new_id.length === 0) {
            errors = true;
            req.flash('error', "Please Enter ID");
            res.render('admin/edit', {
                id: new_id,
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
            res.render('admin/edit', {
                id: new_id,
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
            res.render('admin/edit', {
                id: new_id,
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
            res.render('admin/edit', {
                id: new_id,
                type: type,
                pic: pic,
                name: name,
                price: price,
                descr: descr
            })
        }

        if (!errors) {
            let formData = {
                id: new_id,
                type: type,
                pic: pic,
                name: name,
                price: price,
                descr: descr
            }

            connection.query('UPDATE menu SET ? WHERE id = ?', [formData, id], function (err, result) {
                if (err) {
                    req.flash('error', err)
                    res.render('admin/edit', {
                        id: formData.id,
                        type: formData.type,
                        pic: formData.pic,
                        name: formData.name,
                        price: formData.price,
                        descr: formData.descr
                    })
                } else {
                    req.flash('success', 'Menu Has Been Updated');
                    res.redirect('/admin');
                }
            })
        }
    })
})

// Delete
router.get('/delete/:id', function (req, res, next) {
    let id = req.params.id;

    connection.query('DELETE FROM menu WHERE id = ?', [id], function (err, result) {
        if (err) {
            req.flash('error', err)
            res.redirect('/admin')
        } else {
            req.flash('success', 'Menu Has Been Deleted')
            res.redirect('/admin')
        }
    })
})

module.exports = router;