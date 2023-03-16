require('dotenv').config();

const express = require('express');
const compression = require('compression');
const app = express();
const path = require('path');
const PORT = process.env.PORT;

app.use(express.json());
app.use(compression());

const DIST_DIR = path.join(__dirname, '../client/dist');
app.use(express.static(DIST_DIR));

app.get('/', (req, res) => {
  res.send('ok');
})

// ********** MAP ROUTES ********** //
app.get('/api/key', (req, res) => {
  console.log('api key sent');
  res.json({ apiKey: process.env.MAP_API_KEY });
});
// ******************************** //

app.post('/searchFriend', (req, res) => {
  console.log('search param: ', req.body.searchQuery);
})

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
})
