const axios = require('axios');
require('dotenv').config();

exports.getUserInfo =  (req, res) => {
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
  console.log('line 35 friendList controller userId: ', req.params.userId);
  console.log('line 36', req.body.searchQuery)
  let searchFriend = req.params.userId;
  console.log(searchFriend, 'line 38')
  axios.get(`${process.env.MONGODB_SERVER}/friendList`, { params: { userId: searchFriend } })
    .then((result) => {
      console.log('got friend info: ', result);
      let friendInfo = result.data;
      res.status(200).send(friendInfo);
    })
    .catch((err) => {
      res.status(500).send(err);
    });

  }

  exports.getLatestChat = (req, res) => {
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
        console.error(err)
        res.status(500).send(err);
      });
  }




 function getConversation(userOne, userTwo) {

  return axios.get(`${process.env.MONGODB_SERVER}/conversations/${userOne}`)
    .then((result) => {


      let conversationInfo = result.data.find( (conversation) => {
        return conversation.participants.includes(userTwo)
      });
      console.log('got convervations: ', conversationInfo);
      return conversationInfo
    })

  // const conversations = {
  //   batman: {
  //     tivo: {
  //       participants: ['batman', 'tivo'],
  //       messages: [
  //         {
  //           content: "How are you",
  //           createdAt: '10am'
  //         },
  //         {
  //           content: "I'm doing great",
  //           createdAt: '11am'
  //         },
  //       ]
  //     },
  //     superman: {
  //       participants: ['batman', 'superman'],
  //       messages: [
  //         {
  //           content: "How are you, Superman",
  //           createdAt: '1pm'
  //         },
  //         {
  //           content: "I'm doing great!",
  //           createdAt: '2pm'
  //         },
  //       ]
  //     }
  //   }
  // }
  // return conversations[userOne][userTwo]
}

function getUserInfo(userId) {

  return axios.get(`${process.env.MONGODB_SERVER}/friendList/${userId}`)
    .then((result) => {
      let friendInfo = result.data;
      console.log('got friend info: ', friendInfo.friends);
      return friendInfo
    })


  // const userInfo = ({
  //   userId: 'batman',
  //   thumbnailUrl: 'https://pbs.twimg.com/profile_images/874661809139073025/X8yzIhNy_400x400.jpg',
  //   location: '',
  //   friends: ['tivo', 'banjo', 'superman', 'shadow'],
  //   incomingRequests: [],
  //   sentRequest: []
  // })

  // return userInfo
}

async function getFriendProfileIcon(friendName) {
  const friendInfo = ({
    friendName: 'tivo',
    thumbnailUrl: 'https://hs.sbcounty.gov/cn/Photo%20Gallery/_w/Sample%20Picture%20-%20Koala_jpg.jpg',
  },
  {
    friendName: 'bango',
    thumbnailUrl: 'https://media.entertainmentearth.com/assets/images/31eb9024f7c24efaa0d0c07bd0c70193xl.jpg',
  },
  {
    friendName: 'superman',
    thumbnailUrl: 'https://imageresizer.static9.net.au/ZuCFmFVjgVHj8tZFteTBLNpsp8A=/400x0/https%3A%2F%2Fprod.static9.net.au%2Ffs%2F1a7a67fa-48e3-40e3-a041-546fe6c1426f',
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
}