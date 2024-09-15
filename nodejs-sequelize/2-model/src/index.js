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

app.get('/insert/:nama/:email', (req, res) => {
  user
    .create({
      namaUser: `${req.params.nama}`,
      email: `${req.params.email}`,
    })
    .then((data) => {
      res.send(data);
    });
});

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});
