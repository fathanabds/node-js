const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const app = express();
const port = 3000;

// gunakan EJS
app.set('view engine', 'ejs');
app.use(expressLayouts);

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
  res.send('404 Not Found');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
