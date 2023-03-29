const axios = require('axios');
require('dotenv').config();

exports.getUserInfo =  (req, res) => {
    let userId = req.query.userId;
      axios.get(`${process.env.MONGODB_SERVER}/getUserInfo`, { data: { userId: userId} })
      .then((result) => {
        let userInfo = result.data;
        // console.log(userInfo, 'line 9')
        res.status(200).send(userInfo);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
}


exports.getFriendList = (req, res) => {
  let searchFriend = req.body.searchQuery;
  axios.get(`${process.env.MONGODB_SERVER}/friendList`, { params: { userId: searchFriend } })
    .then((result) => {
      // console.log('got friend info: ', result.data);
      let friendInfo = result.data;
      res.status(200).send(friendInfo);
    })
    .catch((err) => {
      res.status(500).send(err);
    });

  }

//MaryAnn
exports.getLatestChat = (req, res) => {
  let userId = req.params.userId
  getUserFriendInfo(userId)
  .then( (userInfo) => {
    const friends = userInfo.friends;
    console.log(friends, 'line 38')
    return Promise.all([
      Promise.all(friends.map( (friend )=> {
        return getConversation(userId, friend)
      })),
      Promise.all(friends.map( (friend )=> {
        //
        return getUserFriendInfo(friend)
      }))
    ])
    .then( ([conversations, friendsInfo]) => {
      // const conversations = promises[0];
      // const friendsInfo = promises[1];

      return conversations.map( (conversation, i) => {
        console.log(friendsInfo, 'line 52')
        // console.log(messages, 'line 53')
        return {
          friend: friendsInfo[i],
          messages: conversation?.messages
        }
      })
    })
  })
  .then( (conversations) => {
    console.log(conversations, 'line 60 getControllers')
    res.status(200).send(conversations)
  })
    .catch((err) => {
      console.error(err)
      res.status(500).send(err);
    });
}

//MaryAnn
function getConversation(userOne, userTwo) {
  return axios.get(`${process.env.MONGODB_SERVER}/conversations/${userOne}`)
    .then((result) => {
      let conversationInfo = result.data.find( (conversation) => {
        return conversation.participants.includes(userTwo);
      });
      return conversationInfo;
    })
}

//MaryAnn
function getUserFriendInfo(userId) {

  return axios.get(`${process.env.MONGODB_SERVER}/getUserInfo`, { data: { userId: userId} })
    .then((result) => {
      let userFriendInfo = result.data;
      console.log('line, 86 got user friend info: ', userFriendInfo);
      return userFriendInfo;
    })
}

//MaryAnn
// async function getFriendProfileIcon(friendName) {
//   const friendInfo = ({
//     friendName: 'tivo',
//     thumbnailUrl: 'https://hs.sbcounty.gov/cn/Photo%20Gallery/_w/Sample%20Picture%20-%20Koala_jpg.jpg',
//   },
//   {
//     friendName: 'bango',
//     thumbnailUrl: 'https://media.entertainmentearth.com/assets/images/31eb9024f7c24efaa0d0c07bd0c70193xl.jpg',
//   },
//   {
//     friendName: 'superman',
//     thumbnailUrl: 'https://imageresizer.static9.net.au/ZuCFmFVjgVHj8tZFteTBLNpsp8A=/400x0/https%3A%2F%2Fprod.static9.net.au%2Ffs%2F1a7a67fa-48e3-40e3-a041-546fe6c1426f',
//   },
//   {
//     friendName: 'shadow',
//     thumbnailUrl: 'https://pbs.twimg.com/profile_images/874661809139073025/X8yzIhNy_400x400.jpg',
//   })

//   return friendInfo.thumbnailUrl;
// }

exports.getConversations = (req, res) => {
  let userId = req.params.userId;
  axios.get(`${process.env.MONGODB_SERVER}/conversations/${userId}`)
  .then((result) => {
    console.log('friends list: ', result.data);
    let friendsList = result.data;
    res.status(200).send(friendsList);
  })
  .catch((err) => {
    res.status(500).send(err);
  });
}