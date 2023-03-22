require('dotenv').config();
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const express = require('express');
const compression = require('compression');
const app = express();
const path = require('path');
const PORT = process.env.PORT;
const getControllers = require('./controllers/getControllers.js');
const postControllers = require('./controllers/postControllers.js');

app.use(express.json());
app.use(compression());

const DIST_DIR = path.join(__dirname, '../client/dist');
app.use(express.static(DIST_DIR));

const reRoute = (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '../client/dist/index.html'), function(err) {
  if (err) {
    res.status(500).send(err);
  }})
}
app.get('/login', reRoute);
app.get('/register', reRoute);
app.get('/', reRoute);
app.get('/home*', reRoute);
app.get('/map*', reRoute);
app.get('/friendtile*', reRoute);
app.get('/messagewindow*', reRoute);

// app.get('/getFriendList', getControllers.getFriendList);
// app.get('/friendList', (req, res) => {
//   console.log('getFriendList route');
// });

app.post('/searchFriend', getControllers.getFriendList);

app.post('/sendFriendRequest', postControllers.sendFriendRequest);

app.post('/conversations/:userId', getControllers.getConversations);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
})
