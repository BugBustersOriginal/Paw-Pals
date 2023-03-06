require('dotenv').config();

const express = require('express');
const compression = require('compression');
const app = express();
const path = require('path');
const PORT = process.env.PORT;

app.use(express.json());
app.use(compression());

app.get('/', (req, res) => {
  res.send('ok');
})

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
})
