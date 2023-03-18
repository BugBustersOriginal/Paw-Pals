const axios = require('axios');
require('dotenv').config();

exports.sendFriendRequest = (req, res) => {
  // console.log('friendRequest Controller', req.body);
  let friendRequestObj = req.body;
  axios.post(`${process.env.MONGODB_SERVER}/friendRequest`, {data: {friendRequestObj}})
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