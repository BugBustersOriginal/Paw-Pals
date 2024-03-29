require('dotenv').config();
const {createUser, getUser, getUserById, updatePassward} = require('../model')
const {compareHash} = require('../lib/hashUtils.js')
const axios = require('axios');
const postSignUp = async (req, res) => {

  // if photo is undefined, give a default photo  || req.body.photo === ''
  if (req.body.photo === undefined ) {
    req.body.photo = 'https://as2.ftcdn.net/v2/jpg/03/03/62/45/1000_F_303624505_u0bFT1Rnoj8CMUSs8wMCwoKlnWlh5Jiq.jpg';
  }
  // check request has both username and password
  if (req.body.username === undefined || req.body.password=== undefined) {
    res.send({
      'reminder':'username and password is required, redirect to signup page',
      'url':'/register'
    });
  }
  const {username} = req.body;

  try {
    let findUser = await getUser({username});
    if (findUser === null) {
      //new user,send body data into createUser function
     let addUser = await createUser(req.body);
    //  console.log('adduser', addUser)
     let {username, avatar_url, address1, address2, city, state, country, zipcode} = addUser;
     let register = await axios.post(`${process.env.MONGODB_SERVER}/register`, {username, avatar_url, address1, address2, city, state, country, zipcode});
     console.log('register to mongodb',register.data);
     //render login page, can it go direct into main page?
     res.send({
      'reminder': 'signup success, should render login page',
      'url':'/login'
    });
    } else {
     //user exist, render signup page
     res.send({
      'reminder': 'alert user that username exist, if want to login please move to login page, or get a new username, rerender signup page',
      'alert': `${req.body.username} exist, get a new username or go to login `,
      'url':'/register'
     });
    }
  } catch (err) {
    console.log('signup error', err);
  }
};



const postLogIn = async (req, res) => {
  //check users first login or has session in request
  //no userid in req.session, first login or cookie expired
  if (req.session.userId === undefined) {
    // username and password all filled in
    if (req.body.username === undefined || req.body.password === undefined) {
      res.send({
        'reminder': 'should input both username and password,redirect to login page',
        'url': '/login'
      });
    } else {
      let {username, password} = req.body;
      let findUser = await getUser({username});
      if (findUser === null) {
        //user not exist in db users, redirect to signup page
        res.send({
          'reminder':'new user, redirect to signup page',
          'url':'/register',
          'alert':`${req.body.username} is a new user, register first`
        });
      } else {
        //exist user, compare password in db
        let salt = findUser.salt;
        let passwordHashed = findUser.password;
        if (compareHash(req.body.password, passwordHashed, salt)) {
          //password correct, assign a new session and save sessionid into cookie
          let userId = findUser.id;
          let {username, avatar_url, address1, address2, city, state, country, zipcode} = findUser;
          req.session.userId = userId;
          // Wait for the session data to be saved to the database
          await new Promise((resolve, reject) => {
            req.session.save((err) => {
              if (err) {
                reject(err);
              } else {
                resolve(console.log(`set session success, userId=${username}`));
              }
            });
          });
          //render to app main page
          res.send({
            'reminder': 'seesion set success, render app main page',
            'user': {username, avatar_url, address1, address2, city, state, country, zipcode},
            'url':'/home'
          })
        } else {
          //user exist, password not correct, redirect to login page
          res.send({
            'reminder': 'password incorrect, redirect to login page',
            'url':'/login',
            'alert':'password incorrect'
          });
        }
      }
    }
  } else {
    res.send({
      'reminder':'exist user, render app main page',
      'url':'/home'
    })
  }
};
const getLogOut = async(req, res) => {
  const userId  = req.session.userId;
  req.session.destroy();
  res.clearCookie('connect.sid');
  console.log(`userId=${userId} delete success`);
  res.send({
    'reminder':'render login page',
    'url':'/login'
  });

};
//cookie login
const getAuthLogin = async (req, res) => {
  if (req.session.userId) {
    let id = req.session.userId;
    let findUser = await getUserById({id});
    let {username, avatar_url, address1, address2, city, state, country, zipcode} = findUser;
    res.send({username, avatar_url, address1, address2, city, state, country, zipcode});
    return;
  }
  res.send();
}

const forgetPassword = async (req, res) => {
  //part1 way:
  //suppose req.body = {username: "debrazhang", firstname: "debra", lastname:"zhang", newPassword: ""}
  if (!req.body.username || !req.body.firstname || !req.body.lastname) {
    res.send('input should have username, firstname, and lastname, render forgetPassword page');
    return;
  }
  let findUser = await getUser({username: req.body.username});
  if (findUser === null) {
    //user not exist in db users, redirect to signup page
    res.send('new user, redirect to signup page');
  } else {
    //check firstname and lastname is correct
    if (findUser.firstname === req.body.firstname && findUser.lastname === req.body.lastname) {
      //vertify success
      if (!req.body.newPassword) {
        res.send('input should have newPassword, render forgetPassword page')
        return;
      }
      await updatePassward(findUser.id, req.body.newPassword);
      console.log('set new password success');
      res.send('set new password success, render login page');

    } else {
      res.send('verity wrong, render login page');
   }


  }
};

const changePassword = async (req, res) => {
  //part1 way:
  //suppose req.body = {username: "debrazhang", newPassword: ""}
  let findUser = await getUser({username: req.body.username});
  if (!req.body.newPassword) {
    res.send('input should have newPassword, render forgetPassword page')
    return;
  }
  await updatePassward(findUser.id, req.body.newPassword);
  console.log('set new password success');
  res.send('set new password success, render login page');
};

module.exports = {postSignUp, postLogIn, getLogOut, getAuthLogin, forgetPassword, changePassword};

