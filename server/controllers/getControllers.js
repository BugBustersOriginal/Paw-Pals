const axios = require('axios');
require('dotenv').config();

exports.getFriendList =  (req, res) => {
  // console.log('friendList controller userId: ', req.body.searchQuery);
  let searchFriend = req.body.searchQuery;
    axios.get(`${process.env.MONGODB_SERVER}/friendList`, { data: { userId: searchFriend} })
    .then((result) => {
      console.log('got friend info: ', result.data);
      let friendInfo = result.data;
      res.status(200).send(friendInfo);
    })
    .catch((err) => {
      res.status(500).send(err);
    });


}