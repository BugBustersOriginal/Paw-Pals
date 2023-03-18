const axios = require('axios');
require('dotenv').config();

exports.sendFriendRequest = (req, res) => {
  // console.log('friendRequest Controller', req.body);
  let friendRequestObj = req.body;
  axios.post(`${process.env.MONGODB_SERVER}/friendRequest`, {data: {friendRequestObj}});
}