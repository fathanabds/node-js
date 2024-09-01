const { type } = require('os');
const yargs = require('yargs');
const contacts = require('./contacts');

yargs
  .command({
    command: 'add',
    describe: 'menambahkan kontak baru',
    builder: {
      nama: {
        describe: 'nama lengkap',
        demandOption: true,
        type: 'string',
      },
      email: {
        describe: 'email',
        demandOption: false,
        type: 'string',
      },
      phone: {
        describe: 'nomor hp',
        demandOption: true,
        type: 'string',
      },
    },
    handler(argv) {
      contacts.simpanKontak(argv.nama, argv.email, argv.phone);
    },
  })
  .demandCommand();

yargs.command({
  command: 'list',
  describe: 'menampilkan semua nama dan nomor hp kontak',
  handler() {
    contacts.listKontak();
  },
});

yargs.command({
  command: 'detail',
  describe: 'menampilkan kontak berdasarkan nama',
  builder: {
    nama: {
      describe: 'nama kontak yang ingin ditampilkan',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    contacts.detailKontak(argv.nama);
  },
});

yargs.command({
  command: 'delete',
  describe: 'menghapus kontak berdasarkan nama',
  builder: {
    nama: {
      describe: 'nama kontak yang ingin dihapus',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    contacts.hapusKontak(argv.nama);
  },
});

yargs.parse();

// const { pertanyaan, simpanKontak } = require('./contacts.js');

// const main = async () => {
//   const nama = await pertanyaan('Masukkan Nama Anda : ');
//   const email = await pertanyaan('Masukkan Email Anda : ');
//   const noHp = await pertanyaan('Masukkan No HP Anda : ');

//   simpanKontak(nama, email, noHp);
// };

// main();

// const pertanyaan2 = () => {
//   return new Promise((resolve, reject) => {
//     rl.question('Masukkan email Anda: ', (email) => {
//       resolve(email);
//     });
//   });
// };

// const pertanyaan3 = () => {
//   return new Promise((resolve, reject) => {
//     rl.question('Masukkan no HP Anda: ', (noHp) => {
//       resolve(noHp);
//     });
//   });
// };

// rl.question('Masukkan nama Anda: ', (nama) => {
//   rl.question('Masukkan no HP Anda: ', (noHp) => {
//     const contact = { nama, noHp };
//     const file = fs.readFileSync('data/contacts.json', 'utf-8');
//     const contacts = JSON.parse(file);

//     contacts.push(contact);

//     fs.writeFile('data/contacts.json', JSON.stringify(contacts), (err) => {
//       console.log(err);
//     });

//     console.log(`Terima kasih, data diterima`);
//     rl.close();
//   });
// });
