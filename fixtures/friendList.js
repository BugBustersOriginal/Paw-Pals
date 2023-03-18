const { FriendList } = require('../db/index.js');

let list = [
  {
  userId: 'hashedstring',
  friends: ['tivo', 'supdawk', 'batman'],
  requests: []
  },
  {
    userId: 'banjo',
    friends: ['superman', 'shadow', 'batman'],
    requests: [{friendId: 'hashedstring', accepted: false}]
  },
  {
    userId: 'tivo',
    friends: ['superman', 'shadow', 'batman'],
    requests: [{friendId: 'hashedstring', accepted: false}]
  }
]

FriendList.insertMany(list)
.then ((result) => {
  console.log(result);
})
.catch((err) => {
  console.log(`error: ${err}`);
})
