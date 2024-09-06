const express = require('express');
const expressLayouts = require('express-ejs-layouts');

const { body, validationResult, check } = require('express-validator');
const methodOverride = require('method-override');

const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');

require('./utils/db');
const Contact = require('./model/contact');

const app = express();
const port = 3000;

// setup method override
app.use(methodOverride('_method'));

// setup EJS
app.set('view engine', 'ejs');
app.use(expressLayouts);
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

app.listen(port, () => {
  console.log(`mongo contact app | listening at http://localhost:${port}`);
});

// halaman home
app.get('/', (req, res) => {
  const mahasiswa = [
    { name: 'fathan', email: 'fathan@gmail.com' },
    { name: 'dina', email: 'dina@gmail.com' },
    { name: 'ethan', email: 'ethan@gmail.com' },
  ];

  res.render('index', {
    name: 'fathan',
    title: 'Halaman Home',
    mahasiswa,
    layout: 'layouts/main-layout',
  });
});

// halaman about
app.get('/about', (req, res) => {
  res.render('about', {
    title: 'Halaman About',
    layout: 'layouts/main-layout',
  });
});

// halaman contact
app.get('/contact', async (req, res) => {
  const contacts = await Contact.find();
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

// proses tambah data kontak
app.post(
  '/contact',
  [
    body('name').custom(async (value) => {
      const duplikat = await Contact.findOne({ name: value });
      if (duplikat) {
        throw new Error('Nama kontak sudah terdaftar!');
      }
      return true;
    }),
    check('email', 'Email tidak valid!').isEmail(),
    check('phone', 'Nomor HP tidak valid!').isMobilePhone('id-ID'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render('add-contact', {
        title: 'Form Tambah Data Kontak',
        layout: 'layouts/main-layout',
        errors: errors.array(),
      });
    } else {
      await Contact.insertMany(req.body);
      // kirimkan flash message
      req.flash('msg', 'Data kontak berhasil ditambahkan.');
      res.redirect('/contact');
    }
  }
);

// hapus kontak
app.delete('/contact', async (req, res) => {
  await Contact.deleteOne({ name: req.body.name });
  // kirimkan flash message
  req.flash('msg', 'Data kontak berhasil dihapus.');
  res.redirect('/contact');
});

// halaman edit data kontak
app.get('/contact/edit/:nama', async (req, res) => {
  const contact = await Contact.findOne({ name: req.params.nama });
  res.render('edit-contact', {
    title: 'Form Ubah Data Kontak',
    layout: 'layouts/main-layout',
    contact,
  });
});

// proses ubah data kontak
app.put(
  '/contact',
  [
    body('name').custom(async (value, { req }) => {
      const duplikat = await Contact.findOne({ name: value });
      if (duplikat && value != req.body.oldName) {
        throw new Error('Nama kontak sudah terdaftar!');
      }
      return true;
    }),
    check('email', 'Email tidak valid!').isEmail(),
    check('phone', 'Nomor HP tidak valid!').isMobilePhone('id-ID'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // return res.status(400).json({ errors: errors.array() });
      res.render('edit-contact', {
        title: 'Form Ubah Data Kontak',
        layout: 'layouts/main-layout',
        errors: errors.array(),
        contact: req.body,
      });
    } else {
      await Contact.updateOne(
        { _id: req.body.id },
        {
          $set: {
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
          },
        }
      );
      // kirimkan flash message
      req.flash('msg', 'Data kontak berhasil diubah.');
      res.redirect('/contact');
    }
  }
);

// halaman detail kontak
app.get('/contact/:name', async (req, res) => {
  const contact = await Contact.findOne({ name: req.params.name });
  res.render('detail', {
    title: 'Halaman Detail Kontak',
    layout: 'layouts/main-layout',
    contact,
  });
});
