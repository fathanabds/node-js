import express from 'express';
const app = express();
const port = 3000;

import user from './models/userModel.js';
import sequelize from './utils/db.js';
import { Op } from 'sequelize';

app.get('/', async (req, res) => {
  try {
    let data = await user.findAll({
      attributes: ['userId', 'namaUser', 'email', 'age', 'isActive'],
      where: {
        userId: [1, 2, 3],
        [Op.and]: [
          {
            email: {
              [Op.like]: '%th%',
            },
          },
        ],

        // [Op.or]: [{ age: 20 }, { age: 25 }],

        // age: {
        //   [Op.or]: [20, 25],
        // },
      },
    }); // query select
    res.send(data);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
});

app.get('/insert', async (req, res) => {
  await user
    .bulkCreate([
      {
        namaUser: `fathan`,
        email: `fathan@gmail.com`,
        age: 25,
      },
      {
        namaUser: `abdul`,
        email: `abdul@gmail.com`,
        age: 29,
      },
    ])
    .then((data) => {
      res.send(data);
    }); // insert banyak data (> 1)

  // let orang = user.build({
  //   namaUser: `dina`,
  //   email: `salma`,
  //   age: 20,
  // });
  // orang.save().then((data) => {
  //   res.send(data);
  // }); // insert 1 data
});

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});
