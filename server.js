const express = require('express');
const path = require('path');
const app = express();
var router = express.Router();

// Set View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve Static Files
app.use(express.static(path.join(__dirname, 'public')));

// Define Router
var indexRouter = require('./routes/index');
var userRouter = require('./routes/user');
var menuRouter = require('./routes/menu');

app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/menu', menuRouter);

// Render Front-End
app.get('/', (req, res) => {
  res.render('index');
});

router.get('/menus', (req, res) => {
  res.render('menus');
});

app.get('/about', (req, res) => {
    res.render('about');
});

router.get('/user', (req, res) => {
    res.render('user/index');
});

app.get('/menu', (req, res) => {
  res.render('menu/index');
});

app.get('/404', (req, res) => {
  res.render('404');
});

// Start Server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is Running on Port ${port}`);
});