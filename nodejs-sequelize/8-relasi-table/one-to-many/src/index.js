import express from 'express';
const app = express();
const port = 3000;

import db from './models/userPostModel.js';

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});
