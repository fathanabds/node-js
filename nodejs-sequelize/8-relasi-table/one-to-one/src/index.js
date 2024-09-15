import express from 'express';
const app = express();
const port = 3000;

import db from './models/penjualKotaModel.js';

app.get('/', async (req, res) => {
  let dataPenjual = await db.models.Kota.findAll({
    include: [
      {
        model: db.models.Penjual,
        where: {
          alamatPenjual: 'tambun',
        },
      },
    ],
  });
  res.send(dataPenjual);
});

app.get('/insert', async (req, res) => {
  let data = await db.models.Penjual.bulkCreate([
    {
      namaPenjual: `salma`,
      alamatPenjual: 'tambun',
      idKota: 2,
    },
  ]);

  // let data = await db.models.Kota.bulkCreate([
  //   {
  //     namaKota: 'bekasi',
  //   },
  // ]);

  res.send(data); // insert banyak data (> 1)
});

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});
