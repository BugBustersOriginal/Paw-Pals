const axios = require('axios');
require('dotenv').config();

exports.getUserInfo =  (req, res) => {
  // console.log('userInfo controller', req.query.userId);


    // console.log('friendList controller userId: ', req.body.searchQuery);
    // let userId = req.query.userId;
    //   axios.get(`${process.env.MONGODB_SERVER}/friendList`, { data: { userId: userId} })
    //   .then((result) => {
    //     // console.log('got user info: ', result.data);
    //     let userInfo = result.data;
    //     res.status(200).send(userInfo);
    //   })
    //   .catch((err) => {
    //     res.status(500).send(err);
    //   });


    // let userId = req.query.userId;
    //   axios.get(`${process.env.MONGODB_SERVER}/getUserInfo`, { data: { userId: userId} })
    //   .then((result) => {
    //     // console.log('got user info: ', result.data);
    //     let userInfo = result.data;
    //     res.status(200).send(userInfo);
    //   })
    //   .catch((err) => {
    //     res.status(500).send(err);
    //   });
}


exports.getFriendList = (req, res) => {
  // console.log('line 35 friendList controller userId: ', req.params.userId);
  // // console.log('line 36', req.body.searchQuery)
  // let searchFriend = req.params.userId;
  // console.log(searchFriend, 'line 38')
  // axios.get(`${process.env.MONGODB_SERVER}/friendList`, { params: { userId: searchFriend } })
  //   .then((result) => {
  //     console.log('got friend info: ', result);
  //     let friendInfo = result.data;
  //     res.status(200).send(friendInfo);
  //   })
  //   .catch((err) => {
  //     res.status(500).send(err);
  //   });

  // console.log(req, 'line 35 getControllers');
  // let searchFriend = req.body.searchQuery;
  // let userId = req.params.userId
  // axios.get(`${process.env.MONGODB_SERVER}/friendList/${userId}`)
  //   .then((result) => {
  //     console.log('got friend info: ', result.data);
  //     let friendInfo = result.data;
  //     res.status(200).send(friendInfo);
  //   })
  //   .catch((err) => {
  //     res.status(500).send(err);
  //   });

  let userId = req.params.userId
  getUserInfo(userId)
  .then( (userInfo) => {
    const friends = userInfo.friends;
    //getAll is an option
    return Promise.all(friends.map( (friend )=> {
      return getConversation(userId, friend)
    }))
    .then( (conversations) => {
      return conversations.map( (conversation, i) => {
        return {
          friend: friends[i],
          messages: conversation?.messages
        }
      })
    })
  })
  .then( (conversations) => {
   res.status(200).send(conversations)
  })
    .catch((err) => {
      res.status(500).send(err);
    });
}

async function getConversation(userOne, userTwo) {
  const conversations = {
    batman: {
      tivo: {
        participants: ['batman', 'tivo'],
        messages: [
          {
            content: "How are you",
            createdAt: '10am'
          },
          {
            content: "I'm doing great",
            createdAt: '11am'
          },
        ]
      },
      superman: {
        participants: ['batman', 'superman'],
        messages: [
          {
            content: "How are you, Superman",
            createdAt: '1pm'
          },
          {
            content: "I'm doing great!",
            createdAt: '2pm'
          },
        ]
      }
    }
  }
  return conversations[userOne][userTwo]
}

async function getUserInfo(userId) {
  const userInfo = ({
    userId: 'batman',
    thumbnailUrl: 'https://pbs.twimg.com/profile_images/874661809139073025/X8yzIhNy_400x400.jpg',
    location: '',
    friends: ['tivo', 'banjo', 'superman', 'shadow'],
    incomingRequests: [],
    sentRequest: []
  })

  return userInfo
}

async function getFriendProfileIcon(friendName) {
  const friendInfo = ({
    friendName: 'tivo',
    thumbnailUrl: 'https://pbs.twimg.com/profile_images/874661809139073025/X8yzIhNy_400x400.jpg',
  },
  {
    friendName: 'bango',
    thumbnailUrl: 'https://pbs.twimg.com/profile_images/874661809139073025/X8yzIhNy_400x400.jpg',
  },
  {
    friendName: 'superman',
    thumbnailUrl: 'https://pbs.twimg.com/profile_images/874661809139073025/X8yzIhNy_400x400.jpg',
  },
  {
    friendName: 'shadow',
    thumbnailUrl: 'https://pbs.twimg.com/profile_images/874661809139073025/X8yzIhNy_400x400.jpg',
  })

  return friendInfo.thumbnailUrl;
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


  // res.send([
  //   {
  //     participants: [
  //       {
  //         username: 'andy',
  //         profileIcon: 'https://picsum.photos/100/100',
  //         userId: '1'
  //       }, {
  //         username: 'me',
  //         profileIcon: 'https://picsum.photos/100/100',
  //         userId: 'testUser'
  //       }],
  //     messages: [{
  //       content: 'hi',
  //       createdAt: '10am'
  //     }, {
  //       content: 'hello',
  //       createdAt: '11am'
  //     }]
  //   },
  //   {
  //     participants: [
  //       {
  //         username: 'tony',
  //         profileIcon: 'https://picsum.photos/100/100',
  //         userId: '2'
  //       }, {
  //         username: 'me',
  //         profileIcon: 'https://picsum.photos/100/100',
  //         userId: 'testUser'
  //       }],
  //     messages: [{
  //       content: 'how are you',
  //       createdAt: '1 pm'
  //     }, {
  //       content: 'fine',
  //       createdAt: '2 pm'
  //     }]
  //   },

  // ])
}