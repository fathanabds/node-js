const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const { body, validationResult, check } = require('express-validator');
const { loadKontak, findKontak, addKontak, cekDuplikat } = require('./utils/contacts.js');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');

const app = express();
const port = 3000;

// gunakan EJS
app.set('view engine', 'ejs');

// third party middleware
app.use(expressLayouts);

// built in middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// konfigurasi flash
app.use(cookieParser('secret'));
app.use(
  session({
    cookie: { maxAge: 6000 },
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
  })
);
app.use(flash());

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
    msg: req.flash('msg'),
  });
});

// halaman tambah data kontak
app.get('/contact/add', (req, res) => {
  res.render('add-contact', {
    title: 'Form Tambah Data Kontak',
    layout: 'layouts/main-layout',
  });
});

// proses data kontak
app.post(
  '/contact',
  [
    body('nama').custom((value) => {
      const duplikat = cekDuplikat(value);
      if (duplikat) {
        throw new Error('Nama kontak sudah terdaftar!');
      }
      return true;
    }),
    check('email', 'Email tidak valid!').isEmail(),
    check('phone', 'Nomor HP tidak valid!').isMobilePhone('id-ID'),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // return res.status(400).json({ errors: errors.array() });
      res.render('add-contact', {
        title: 'Form Tambah Data Kontak',
        layout: 'layouts/main-layout',
        errors: errors.array(),
      });
    } else {
      addKontak(req.body);
      // kirimkan flash message
      req.flash('msg', 'Data kontak berhasil ditambahkan.');
      res.redirect('/contact');
    }
  }
);

// halaman detail kontak
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
