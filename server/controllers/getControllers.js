const axios = require('axios');
require('dotenv').config();

exports.getFriendList =  (req, res) => {
  console.log('get friendList controller');
    axios.get(`${process.env.MONGODB_SERVER}/friendList`, { data: { userId: '8909'} })
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(500).send(err);
    });


}