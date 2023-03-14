const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/Pawpals', { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => console.error('Error connecting to MongoDB', err));

let messagesSchema = new mongoose.Schema({
  sender: String,
  content: String,
  createdAt: {type: Date, default: Date.now},
  openedAt: Date,// field to record when a photo was opened
  expiresAt: {type: Date, index : {expireAfterSeconds:0}},
  type: {type: String, enum:['text', 'image'], required: true}
})

let conversationsSchema = new mongoose.Schema({
 participiants : [String],
 messages:[messagesSchema]
})
let Message = mongoose.model('Messages', messagesSchema);
let Conversation = mongoose.model('Conversations', conversationsSchema);




module.exports = { Message, Conversation}