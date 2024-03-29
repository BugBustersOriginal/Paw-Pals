const axios = require('axios');
require('dotenv').config();

exports.sendFriendRequest = (req, res) => {
  // console.log('friendRequest Controller', req.body);
  let friendRequestObj = req.body;
  axios.post(`${process.env.MONGODB_SERVER}/friendRequest`, {data: friendRequestObj})
  .then((result) => {
    // console.log('successful friendRequest status: ', result.status);
    // let succ = result.data;
    // res.status(201).send();
    res.status(201).send();
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send(err);
  })
}

exports.acceptRequest = (req, res) => {
  // console.log('accept request controller', req.body);
  let acceptRequestObj = req.body;
  axios.post(`${process.env.MONGODB_SERVER}/acceptRequest`, {data: acceptRequestObj})
  .then((result) => {
    console.log('accept Request succuess');
    res.status(201).send();
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send(err);
  })
}

exports.getFriendList =  (req, res) => {
  //  console.log('friendList controller POST userId: ', req.body.searchQuery);
  //  console.log(process.env.MONGODB_SERVER);
  let searchFriend = req.body.searchQuery;
  console.log("process", process.env.MONGODB_SERVER)
    axios.get(`${process.env.MONGODB_SERVER}/friendList`, { data: { userId: searchFriend} })
    .then((result) => {
      // console.log('got friend info: ', result.data);
      let friendInfo = result.data;
      res.status(200).send(friendInfo);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
}

exports.dismissNotification = (req, res) => {
  let dismissObj = req.body;
  // console.log('dismiss controlller', dismissObj);
  axios.post(`${process.env.MONGODB_SERVER}/dismissNotification`, {data: dismissObj})
}

exports.changeProfilePicure = (req,res) => {
  let changePFP = req.body;
  axios.post(`${process.env.MONGODB_SERVER}/changeprofilepicture`, { data: changePFP })
    .then((result) => {
      console.log('accept Request succuess');
      res.status(201).send();
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send(err);
    })
}