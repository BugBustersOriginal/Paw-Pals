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
  // set index so mongo can delete images faster.
  expiresAt: {type: Date, index : {expireAfterSeconds:0}},
  type: {type: String, enum:['text', 'image'], required: true},
  conversationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'Conversation',
    required: true
  }
})

// mongoose middleware that will be triggered after a document has been deleted from the 'messagesSchema' collection
messagesSchema.post('findOneAndDelete', async function (doc) {
  // doc contains the deleted message document
  const conversationId = doc.conversationId;
  //update the conversation document after
  await Conversation.findByIdAndUpdate(conversationId, {
    //pull operator removes from an existing array all instances of a value or values that match a specified conditin
    $pull: { messages: doc._id }
  });
});

let conversationsSchema = new mongoose.Schema({
 participiants : [String],
 messages:[messagesSchema]
})
let Message = mongoose.model('Messages', messagesSchema);
let Conversation = mongoose.model('Conversations', conversationsSchema);


module.exports = { Message, Conversation}