const axios = require('axios');
require('dotenv').config();

exports.sendFriendRequest = (req, res) => {
  console.log('got friendRequest Controller', req.body);
}