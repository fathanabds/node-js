import express from 'express';
const app = express();
const port = 3000;

import user from './models/userModel.js';
import sequelize from './utils/db.js';
import { Op, Sequelize } from 'sequelize';

app.get('/', async (req, res) => {
  try {
    let data = await sequelize.query('SELECT * FROM users WHERE "isActive" = $status', {
      bind: { status: true },
      type: sequelize.QueryTypes.SELECT,
    });

    // let data = await sequelize.query('select * from users', { model: user, mapToModel: true, type: sequelize.QueryTypes.SELECT }); // query select + map ke model user
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
        firstName: 'fathan',
        lastName: 'abdul',
        username: `fathanabd`,
        email: `FATHAN@gmail.com`,
        password: '123456',
        age: 25,
      },
    ])
    .then((data) => {
      res.send(data);
    }); // insert banyak data (> 1)
});

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});
