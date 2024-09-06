const { MongoClient, FindCursor } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;

// Connection URL
const url = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'wpu';
client.connect();

// pilih database
const db = client.db(dbName);

async function main() {
  // menambahkan 1 data ke collection mahasiswa
  // const insertOne = await db.collection('mahasiswa').insertOne({ nama: 'dina', email: 'dina@gmail.com' });
  // console.log('Inserted documents (one) =>', insertOne);

  // menambahkan banyak data
  // const insertMany = await db.collection('mahasiswa').insertMany([
  //   { nama: 'dina', email: 'dina@gmail.com' },
  //   { nama: 'salma', email: 'salma@gmail.com' },
  // ]);
  // console.log('Inserted documents (many) =>', insertMany);

  // menampilkan semua data di collection 'mahasiswa'
  // const findResult = await db.collection('mahasiswa').find().toArray();
  // console.log('Found documents =>', findResult);

  // menampilkan data berdasarkan nama di collection 'mahasiswa'
  // const filteredName = await db.collection('mahasiswa').find({ nama: 'fathan' }).toArray();
  // console.log('Found documents filtered by { nama: "fathan" } =>', filteredName);

  // menampilkan data berdasarkan object ID di collection 'mahasiswa'
  // const filteredId = await db
  //   .collection('mahasiswa')
  //   .find({ _id: new ObjectId('66d81ad9049cde896da87d19') })
  //   .toArray();
  // console.log('Found documents filtered by { _id: new ObjectId("66d81ad9049cde896da87d19") } =>', filteredId);

  // mengubah 1 data berdasarkan kriteria
  // const updateOne = await db.collection('mahasiswa').updateOne({ _id: new ObjectId('66d81ad9049cde896da87d19') }, { $set: { nama: 'fadillah salma' } });
  // console.log('Updated documents =>', updateOne);

  // mengubah banyak data berdasarkan kriteria
  const updateMany = await db.collection('mahasiswa').updateMany({ nama: 'dina' }, { $set: { nama: 'dina doank' } });
  console.log('Updated documents =>', updateMany);
}

// main();

// [selain menggunakan function async await, bisa juga menggunakan then catch || karena hasil dari semua method untuk crud mongodb adalah promise] >> bisa ditampung ke variable atau langsung chaining

// menghapus 1 data berdasarkan kriteria (jika ada banyak document dengan nama: 'dina doank, hanya hapus yang pertama)
// const deleteOne = db.collection('mahasiswa').deleteOne({ nama: 'dina doank' });
// deleteOne.then((result) => console.log('Deleted documents =>', result)).catch((error) => console.log(error));

// menghapus banyak data berdasarkan kriteria
db.collection('mahasiswa')
  .deleteMany({ nama: 'dina doank' })
  .then((result) => console.log('Deleted documents =>', result))
  .catch((error) => console.log(error));
