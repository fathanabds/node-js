// // CORE MODULE
// // [file system]
const fs = require('fs');

// // menulis string ke dlm file (sync)
// try {
//   fs.writeFileSync('text.txt', 'Hello world secara synchronous!');
// } catch (err) {
//   console.log(err);
// }

// // menulis string ke dlm file (async)
// fs.writeFile('data/text.txt', 'Hello world secara asynchronous!', (err) => {
//   console.log(err);
// });

// // membaca data (sync)
// try {
//   console.log(fs.readFileSync('text.txt').toString());
// } catch (err) {
//   console.log(err);
// }

// // membaca data (async)
// // utf-8 >> DISPLAY file dalam bahasa latin, bisa juga digunakan utk parameter readFileSync
// fs.readFile('data/text.txt', 'utf-8', (err, data) => {
//   if (err) throw err;
//   console.log(data);
// });

// [readline]
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question('Masukkan nama Anda: ', (nama) => {
  rl.question('Masukkan no HP Anda: ', (noHp) => {
    const contact = { nama, noHp };
    const file = fs.readFileSync('data/contacts.json', 'utf-8');
    const contacts = JSON.parse(file);

    contacts.push(contact);

    fs.writeFile('data/contacts.json', JSON.stringify(contacts), (err) => {
      console.log(err);
    });

    console.log(`Terima kasih, data diterima`);
    rl.close();
  });
});
