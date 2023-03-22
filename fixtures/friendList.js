const { FriendList } = require('../db/index.js');

let list = [
  {
  userId: 'batman',
  thumbnailUrl: 'https://pbs.twimg.com/profile_images/874661809139073025/X8yzIhNy_400x400.jpg',
  friends: ['tivo', 'banjo'],
  requests: []
  },
  {
    userId: 'banjo',
    thumbnailUrl: 'https://lh3.googleusercontent.com/pw/AMWts8ApWd_VRMRW6KDgaHYb4Xx17ZQrcXL8sWlhD4D9wsSDUu2ahBcVdQX9qAhDlJXeY0QrL8LqlKzMJcpTuT4mimWxP-NDncx3I_EfSbNReUvHJGsL4sdnf4Y2I9lxIbJ-A0k7490qbV3metp-kVuNHSCJCA=w1800-h1634-no?authuser=0',
    friends: ['superman', 'shadow', 'batman'],
    requests: [{friendId: 'hashedstring', accepted: false}]
  },
  {
    userId: 'tivo',
    thumbnailUrl: 'https://hs.sbcounty.gov/cn/Photo%20Gallery/_w/Sample%20Picture%20-%20Koala_jpg.jpg',
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
