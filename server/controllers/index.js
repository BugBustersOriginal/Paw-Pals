const {createUser, getUser, getUserById, updatePassward} = require('../model')
const {compareHash} = require('../lib/hashUtils.js')

const postSignUp = async (req, res) => {
  // if photo is undefined, give a default photo
  if (req.body.photo === undefined) {
    req.body.photo = 'https://as2.ftcdn.net/v2/jpg/03/03/62/45/1000_F_303624505_u0bFT1Rnoj8CMUSs8wMCwoKlnWlh5Jiq.jpg';
  }
  // check request has both username and password
  if (req.body.username === undefined || req.body.password === undefined) {
    res.send({
      'reminder':'should input both username and password, redirect to signup page',
      'url':'/register'
    });
  }
  const {username} = req.body;

  try {
    let findUser = await getUser({username});
    if (findUser === null) {
      //new user,send body data into createUser function
     let addUser = await createUser(req.body);

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
          req.session.userId = userId;
          // Wait for the session data to be saved to the database
          await new Promise((resolve, reject) => {
            req.session.save((err) => {
              if (err) {
                reject(err);
              } else {
                resolve(console.log(`set session success, userId=${userId}`));
              }
            });
          });
          //render to app main page
          res.send({
            'reminder': 'seesion set success, render app main page',
            'userId': `${userId}`,
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
module.exports = {postSignUp, postLogIn, getLogOut};

