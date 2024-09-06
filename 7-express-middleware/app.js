const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const morgan = require('morgan');
const app = express();
const port = 3000;

// gunakan EJS
app.set('view engine', 'ejs');

// third party middleware
app.use(expressLayouts);
app.use(morgan('dev'));

// built in middleware
app.use(express.static('public'));

// application level middleware
app.use((req, res, next) => {
  console.log('Time:', Date.now());
  next();
});

app.get('/', (req, res) => {
  const mahasiswa = [
    { nama: 'fathan', email: 'fathan@gmail.com' },
    { nama: 'dina', email: 'dina@gmail.com' },
    { nama: 'ethan', email: 'ethan@gmail.com' },
  ];

  res.render('index', {
    nama: 'fathan',
    title: 'Halaman Home',
    mahasiswa,
    layout: 'layouts/main-layout',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'Halaman About',
    layout: 'layouts/main-layout',
  });
});

app.get('/contact', (req, res) => {
  res.render('contact', {
    title: 'Halaman Contact',
    layout: 'layouts/main-layout',
  });
});

app.get('/product/:id', (req, res) => {
  res.send(`Product ID: ${req.params.id} <br> Category: ${req.query.category}`);
});

app.use('/', (req, res) => {
  res.status(404);
  res.send('<h1>404 Not Found</h1>');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
