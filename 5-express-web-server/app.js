const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  // res.send('Hello World!');
  // res.json({
  //   nama: 'fathan',
  //   email: 'fathan@gmail.com',
  // });
  res.sendFile('./index.html', { root: __dirname });
});

app.get('/about', (req, res) => {
  res.sendFile('./about.html', { root: __dirname });
});

app.get('/product/:id', (req, res) => {
  res.send(`Product ID: ${req.params.id} <br> Category: ${req.query.category}`);
});

app.use('/', (req, res) => {
  res.status(404);
  res.send('404 Not Found');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// const http = require('http');
// const fs = require('fs');

// const renderHTML = (path, res) => {
//   fs.readFile(path, (err, data) => {
//     if (err) {
//       res.writeHead(404);
//       res.write('Error: File not found!');
//     } else {
//       res.write(data);
//     }
//     res.end();
//   });
// };

// http
//   .createServer((req, res) => {
//     res.writeHead(200, {
//       'Content-Type': 'text/html',
//     });

//     const url = req.url;

//     if (url === '/about') {
//       renderHTML('./about.html', res);
//     } else {
//       renderHTML('./index.html', res);
//     }
//   })
//   .listen(3000, () => {
//     console.log(`server is listening on port 3000`);
//   });
