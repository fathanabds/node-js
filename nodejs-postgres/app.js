const express = require('express');
const bodyParser = require('body-parser');

const client = require('./connection');
const app = express();

app.use(bodyParser.json());

const port = 3100;

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});

client.connect((err) => {
  if (err) {
    console.log(err.message);
  } else {
    console.log('connected');
  }
});

app.get('/books', (req, res) => {
  client.query(`select * from books`, (err, result) => {
    if (!err) {
      res.send(result.rows);
    }
  });
});

app.post('/books', (req, res) => {
  const { title, description, author } = req.body;
  client.query(`insert into books (title, description, author) values ('${title}', '${description}', '${author}')`, (err, result) => {
    if (!err) {
      res.send('insert success');
    } else {
      res.send(err.message);
    }
  });
});

app.put('/books/:id', (req, res) => {
  const { title, description, author } = req.body;
  client.query(`update books set title = '${title}', description = '${description}', author = '${author}' where id = '${req.params.id}'`, (err, result) => {
    if (!err) {
      res.send('update success');
    } else {
      res.send(err.message);
    }
  });
});

app.delete('/books/:id', (req, res) => {
  client.query(`delete from books where id = '${req.params.id}'`, (err, result) => {
    if (!err) {
      res.send('delete success');
    } else {
      res.send(err.message);
    }
  });
});
