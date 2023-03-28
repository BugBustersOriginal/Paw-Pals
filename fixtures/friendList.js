const { FriendList } = require('../db/index.js');

let list = [
  {
  userId: 'batman',
  thumbnailUrl: 'https://pbs.twimg.com/profile_images/874661809139073025/X8yzIhNy_400x400.jpg',
  location: '',
  friends: ['tivo', 'banjo', 'superman', 'shadow'],
  conversations: [],
  incomingNotifications: [],
  sentRequest: []
  },
  {
    userId: 'banjo',
    thumbnailUrl: 'https://media.entertainmentearth.com/assets/images/31eb9024f7c24efaa0d0c07bd0c70193xl.jpg',
    location: '',
    friends: ['superman', 'shadow', 'batman'],
    conversations: [],
    incomingNotifications: [],
    sentRequest: ['doggy']
  },
  {
    userId: 'tivo',
    thumbnailUrl: 'https://hs.sbcounty.gov/cn/Photo%20Gallery/_w/Sample%20Picture%20-%20Koala_jpg.jpg',
    location: '',
    friends: ['superman', 'shadow', 'batman'],
    conversations: [],
    incomingNotifications: [],
    sentRequest: []
  },
  {
    userId: 'testUser',
    thumbnailUrl: 'https://imageresizer.static9.net.au/ZuCFmFVjgVHj8tZFteTBLNpsp8A=/400x0/https%3A%2F%2Fprod.static9.net.au%2Ffs%2F1a7a67fa-48e3-40e3-a041-546fe6c1426f',
    location: '',
    friends: ['superman'],
    conversations: [],
    incomingNotifications: [],
    sentRequest: []
  },
  {
    userId: 'doggy',
    thumbnailUrl: 'https://images.unsplash.com/photo-1517331156700-3c241d2b4d83?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw0MjYyNTJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2Nzk5NDUxOTc&ixlib=rb-4.0.3&q=80&w=1080',
    location: 'USA80021',
    friends: [],
    conversations: [],
    incomingNotifications: [{friendId: 'banjo', type: 'friend request'}, {friendId: 'batman', type: 'saved photo'}],
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
