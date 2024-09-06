const { name } = require('ejs');
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/wpu').then(() => console.log('Connected!'));

// // menambah 1 data
// const contact1 = new Contact({
//   name: 'dina',
//   phone: '081210491111',
//   email: 'dina@gmail.com',
// });

// // simpan ke collection
// contact1.save().then((contact) => console.log(contact));
