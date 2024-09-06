// [file system]
const fs = require('fs');

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

// ambil semua data kontak
const loadKontak = () => {
  const fileBuffer = fs.readFileSync('data/contacts.json', 'utf-8');
  const contacts = JSON.parse(fileBuffer);
  return contacts;
};

// cari kontak berdasarkan nama
const findKontak = (nama) => {
  const contacts = loadKontak();

  const contact = contacts.find((contact) => contact.nama === nama);

  return contact;
};

module.exports = { loadKontak, findKontak };
