const express = require('express');
const path = require('path');
const app = express();

// Set View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve Static Files
app.use(express.static(path.join(__dirname, 'public')));

// Render Front-End
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/menus', (req, res) => {
    res.render('menus');
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/user', (req, res) => {
    res.render('user/index');
});

// Start Server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});