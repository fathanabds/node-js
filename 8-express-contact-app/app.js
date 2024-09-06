const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const { loadKontak, findKontak } = require('./utils/contacts.js');

const app = express();
const port = 3000;

// gunakan EJS
app.set('view engine', 'ejs');

// third party middleware
app.use(expressLayouts);

// built in middleware
app.use(express.static('public'));

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
  const contacts = loadKontak();

  res.render('contact', {
    title: 'Halaman Contact',
    layout: 'layouts/main-layout',
    contacts,
  });
});

app.get('/contact/:nama', (req, res) => {
  const contact = findKontak(req.params.nama);

  res.render('detail', {
    title: 'Halaman Detail Kontak',
    layout: 'layouts/main-layout',
    contact,
  });
});

app.use('/', (req, res) => {
  res.status(404);
  res.send('<h1>404 Not Found</h1>');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
