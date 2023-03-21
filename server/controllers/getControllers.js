const axios = require('axios');
require('dotenv').config();

exports.getUserInfo =  (req, res) => {
  // console.log('userInfo controller', req.query.userId);


    // console.log('friendList controller userId: ', req.body.searchQuery);
    let userId = req.query.userId;
      axios.get(`${process.env.MONGODB_SERVER}/friendList`, { data: { userId: userId} })
      .then((result) => {
        // console.log('got user info: ', result.data);
        let userInfo = result.data;
        res.status(200).send(userInfo);
      })
      .catch((err) => {
        res.status(500).send(err);
      });




}