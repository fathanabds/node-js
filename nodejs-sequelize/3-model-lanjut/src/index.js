import express from 'express';
const app = express();
const port = 3000;

// import sequelize from './utils/db.js';
// import user from './models/userModel.js';
import db from './models/index.js';
const user = db.models.User;

app.get('/', (req, res) => {
  try {
    user.findAll().then((data) => {
      res.send(data);
    });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
});

app.get('/insert', (req, res) => {
  let orang = user.build({
    namaUser: `dina`,
    email: `salma`,
  });
  orang.save().then((data) => {
    res.send(data);
  });

  // user
  //   .create({
  //     namaUser: `fathan`,
  //     email: `abdul`,
  //   })
  //   .then((data) => {
  //     res.send(data);
  //   });
});

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});
