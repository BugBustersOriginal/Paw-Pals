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
const {postSignUp, postLogIn, getLogOut, getAuthLogin, forgetPassword, changePassword} = require('./controllers/index.js');
const {getRandomPhoto} = require('./lib/randomPhoto.js')
const pgPool = require('../database/index.js');
app.use(express.json());
app.use(compression());
app.use(express.urlencoded({ extended: true }));
const DIST_DIR = path.join(__dirname, '../client/dist');
app.use(express.static(DIST_DIR));
app.use(session({
  store: new pgSession({
    pool: pgPool,
    tableName: 'session',
  }),
  secret: 'pawpal',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge:  60 * 60 * 1000} // 60mins valid
  })
);

app.get('/getUserInfo', getControllers.getUserInfo);

const reRoute = (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '../client/dist/index.html'), function(err) {
    if (err) {
      res.status(500).send(err);
    }})
};
app.get('/', reRoute);
app.get('/register', reRoute);
/*******add getAuth middleware, made auth first ***************************************/
const getAuth = (req, res, next) => {

  if (req.url === '/login') {
    if(req.session.userId) {

      res.redirect('/home');
    } else {
      next();
    }
  } else {
    if(req.session.userId) {

      next();
    } else {
      res.redirect('/login');
    }
  }
};
app.get('/login', getAuth, reRoute);
app.get('/forgotpassword', getAuth, reRoute);
app.get('/home', getAuth, reRoute);
app.get('/map',getAuth, reRoute);
app.get('/friendtile',getAuth, reRoute);
app.get('/messagewindow', getAuth, reRoute);
app.get('/notifications',getAuth,reRoute);
app.get('/profile',getAuth,reRoute);
app.get('/authUser', getAuthLogin);


app.get('/randomPhoto', getRandomPhoto);

//MaryAnn's route
app.get('/latestChat/:userId', getControllers.getLatestChat);

// app.get('/friendList/:userId', getControllers.getFriendList);


app.post('/searchFriend', postControllers.getFriendList);

app.post('/sendFriendRequest', postControllers.sendFriendRequest);

app.post('/conversations/:userId', getControllers.getConversations);

app.post('/forgotpassword', forgetPassword);

app.post('/changepassword', changePassword);

app.post('/changePFP', postControllers.changeProfilePicure)

app.post('/signup', postSignUp);
app.post('/login',postLogIn);
app.get('/logout', getLogOut);

app.post('/retrieveFriends', getControllers.getFriendList);

app.post('/acceptRequest', postControllers.acceptRequest);

app.post('/dismissNotification', postControllers.dismissNotification);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
})
