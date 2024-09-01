// [file system]
const fs = require('fs');

// chalk
const chalk = require('chalk');

// validator
const validator = require('validator');

// membuat folder data jika blm ada
const dirPath = './data';
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath);
}

// membuat file contacts.js jika blm ada
const dataPath = './data/contacts.json';
if (!fs.existsSync(dataPath)) {
  fs.writeFileSync(dataPath, '[]', 'utf-8');
}

// // [readline]
// const readline = require('readline');

// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

// const pertanyaan = (pertanyaan) => {
//   return new Promise((resolve, reject) => {
//     rl.question(pertanyaan, (jawaban) => {
//       resolve(jawaban);
//     });
//   });
// };

const loadKontak = () => {
  const file = fs.readFileSync('data/contacts.json', 'utf-8');
  const contacts = JSON.parse(file);
  return contacts;
};

const simpanKontak = (nama, email, phone) => {
  const contact = { nama, email, phone };
  // const file = fs.readFileSync('data/contacts.json', 'utf-8');
  // const contacts = JSON.parse(file);

  const contacts = loadKontak();

  // cek duplikat
  const duplikat = contacts.find((contact) => contact.nama === nama);
  if (duplikat) {
    console.log(chalk.red(`kontak dengan nama ${nama}, sudah terdaftar!`));
    return false;
  }

  // validasi email
  if (email) {
    if (!validator.isEmail(email)) {
      console.log(chalk.red(`format email tidak valid!`));
      return false;
    }
  }

  // validasi no hp
  if (!validator.isMobilePhone(phone, 'id-ID')) {
    console.log(chalk.red(`format nomor hp tidak valid!`));
    return false;
  }

  contacts.push(contact);

  fs.writeFile('data/contacts.json', JSON.stringify(contacts), (err) => {
    console.log(err);
  });

  console.log(chalk.green.inverse(`Terima kasih, data diterima.`));
  // rl.close();
};

const listKontak = () => {
  const contacts = loadKontak();

  console.log(chalk.cyan.inverse(`Daftar Kontak :`));

  contacts.forEach((element, i) => {
    console.log(`${i + 1}. ${element.nama} - ${element.phone} `);
  });
};

const detailKontak = (nama) => {
  const contacts = loadKontak();

  const contact = contacts.find((contact) => contact.nama.toLowerCase() === nama.toLowerCase());

  if (!contact) {
    console.log(chalk.red(`${nama} tidak ditemukan!`));
    return false;
  }

  console.log(chalk.cyan.inverse(contact.nama));
  console.log(contact.phone);
  if (contact.email) {
    console.log(contact.nama);
  }
};

const hapusKontak = (nama) => {
  const contacts = loadKontak();
  const newContacts = contacts.filter((contact) => contact.nama.toLowerCase() !== nama.toLowerCase());

  if (contacts.length === newContacts.length) {
    console.log(chalk.red(`${nama} tidak ditemukan!`));
    return false;
  }

  fs.writeFile('data/contacts.json', JSON.stringify(newContacts), (err) => {
    console.log(err);
  });

  console.log(chalk.green.inverse(`Data ${nama} berhasil dihapus`));
};

module.exports = {
  // pertanyaan,
  simpanKontak,
  listKontak,
  detailKontak,
  hapusKontak,
};
