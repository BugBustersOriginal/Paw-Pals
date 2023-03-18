const { FriendList } = require('../db/index.js');

let list = {
  userId: 'hashedstring',
  friends: ['tivo', 'supdawk', 'batman'],
  requests: []
}

FriendList.insertMany(list)
.then ((result) => {
  console.log(result);
})
.catch((err) => {
  console.log(`error: ${err}`);
})
