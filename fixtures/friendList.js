const { FriendList } = require('../db/index.js');

let list = [
  {
  userId: 'batman',
  thumbnailUrl: 'https://pbs.twimg.com/profile_images/874661809139073025/X8yzIhNy_400x400.jpg',
  friends: ['tivo', 'banjo', 'testUser'],
  incomingRequests: [],
  sentRequest: []
  },
  {
    userId: 'banjo',
    thumbnailUrl: 'https://media.entertainmentearth.com/assets/images/31eb9024f7c24efaa0d0c07bd0c70193xl.jpg',
    friends: ['superman', 'shadow', 'batman'],
    incomingRequests: [],
    sentRequest: []
  },
  {
    userId: 'tivo',
    thumbnailUrl: 'https://hs.sbcounty.gov/cn/Photo%20Gallery/_w/Sample%20Picture%20-%20Koala_jpg.jpg',
    friends: ['superman', 'shadow', 'batman'],
    incomingRequests: [],
    sentRequest: []
  },
  {
    userId: 'testUser',
    thumbnailUrl: 'https://imageresizer.static9.net.au/ZuCFmFVjgVHj8tZFteTBLNpsp8A=/400x0/https%3A%2F%2Fprod.static9.net.au%2Ffs%2F1a7a67fa-48e3-40e3-a041-546fe6c1426f',
    friends: ['superman', 'banjo', 'batman'],
    incomingRequests: [],
    sentRequest: []
  }
]

FriendList.insertMany(list)
.then ((result) => {
  console.log(result);
})
.catch((err) => {
  console.log(`error: ${err}`);
})
