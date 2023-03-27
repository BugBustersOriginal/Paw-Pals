const axios = require('axios');
require('dotenv').config();

exports.getUserInfo =  (req, res) => {
  // console.log('userInfo controller', req.query.userId);


    // console.log('friendList controller userId: ', req.body.searchQuery);
    let userId = req.query.userId;
      axios.get(`${process.env.MONGODB_SERVER}/getUserInfo`, { data: { userId: userId} })
      .then((result) => {
        // console.log('got user info: ', result.data);
        let userInfo = result.data;
        res.status(200).send(userInfo);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
}


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
  //   console.log('friends list: ', result.data);
  //   let friendsList = result.data;
  //   res.status(200).send(friendsList);
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
        createdAt: '10am'
      }, {
        content: 'hello',
        createdAt: '11am'
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
        createdAt: '1 pm'
      }, {
        content: 'fine',
        createdAt: '2 pm'
      }]
    },

  ])
}

exports.getNotifications = (req, res) => {
  let friendList = req.query;
  // console.log('get notification friendList: ', friendList)
  axios.get(`${process.env.MONGODB_SERVER}/getNotifications`, { data: friendList })
}