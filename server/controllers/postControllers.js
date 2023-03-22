const axios = require('axios');
require('dotenv').config();

exports.sendFriendRequest = (req, res) => {
  console.log('friendRequest Controller', req.body);
  let friendRequestObj = req.body;
  axios.post(`${process.env.MONGODB_SERVER}/friendRequest`, {data: friendRequestObj})
  .then((result) => {
    console.log('successful friendRequest status: ', result.status);
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
  console.log('accept request controller', req.body);
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
  // console.log('friendList controller userId: ', req.body.searchQuery);
  let searchFriend = req.body.searchQuery;
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

