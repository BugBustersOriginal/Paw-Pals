const axios = require('axios');
require('dotenv').config();

exports.getFriendList = (req, res) => {
  // console.log('friendList controller userId: ', req.body.searchQuery);
  let searchFriend = req.body.searchQuery;
  axios.get(`${process.env.MONGODB_SERVER}/friendList`, { data: { userId: searchFriend } })
    .then((result) => {
      console.log('got friend info: ', result.data);
      let friendInfo = result.data;
      res.status(200).send(friendInfo);
    })
    .catch((err) => {
      res.status(500).send(err);
    });


}

exports.getConversations = (req, res) => {
  // let userId = req.params.userId;
  // axios.get(`${process.env.MONGODB_SERVER}/conversations/${userId}`)
  // .then((result) => {
  //   console.log('got conversations info: ', result.data);
  //   let conversationsInfo = result.data;
  //   res.status(200).send(conversationsInfo);
  // })
  // .catch((err) => {
  //   res.status(500).send(err);
  // });
  res.send([
    {
      participants: [
        {
          username: 'andy',
          profileIcon: 'https://picsum.photos/100/100',
          userId: '1'
        }, {
          username: 'me',
          profileIcon: 'https://picsum.photos/100/100',
          userId: 'testUser'
        }],
      messages: [{
        content: 'hi',
        timestamp: '10am'
      }, {
        content: 'hello',
        timestamp: '11am'
      }]
    },
    {
      participants: [
        {
          username: 'tony',
          profileIcon: 'https://picsum.photos/100/100',
          userId: '2'
        }, {
          username: 'me',
          profileIcon: 'https://picsum.photos/100/100',
          userId: 'testUser'
        }],
      messages: [{
        content: 'how are you',
        timestamp: '1 pm'
      }, {
        content: 'fine',
        timestamp: '2 pm'
      }]
    },

  ])
}