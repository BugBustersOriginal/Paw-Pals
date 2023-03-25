const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/Pawpals', { useNewUrlParser: true })
  .then(() => {
   //mongoose.connection.db.dropDatabase()
    console.log('Connected to MongoDB');
  })
  .catch(err => console.error('Error connecting to MongoDB', err));

let messagesSchema = new mongoose.Schema({
  sender: String, // will just be an user id coming from login /signup database?
  content: String,
  image: {data: Buffer,contentType: String},
  participants : [String],
  createdAt: {type: Date, default: Date.now},
  openedAt: Date,// field to record when a photo was opened
  viewed:{type:Boolean, default: false},
  expirationTime : {type: Number},
  type: {type: String, enum:['text', 'image'], required: true},
  conversationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'Conversation',
    required: true
  }
})


let conversationsSchema = new mongoose.Schema({
 participants : [String], // will be an array of 2 user ids?
 messages:[messagesSchema]
})


let friendListSchema = new mongoose.Schema({
  userId: String,
  thumbnailUrl: String,
  location: String,
  friends: [String],
  conversations: [],
  incomingRequests: [],
  sentRequest: []
})



let Message = mongoose.model('Messages', messagesSchema);
let Conversation = mongoose.model('Conversations', conversationsSchema);
let FriendList = mongoose.model('FriendList', friendListSchema);


module.exports = { Message, Conversation, FriendList}