const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/Pawpals',{ useUnifiedTopology: true, useNewUrlParser:true }, function() {
  //mongoose.connection.db.dropDatabase();
  console.log('connected!')
});

let messagesSchema = new mongoose.Schema({
  sender: String,
  content: String,
  createdAt: {type: Date, default: Date.now},
  openedAt: Date,// field to record when a photo was opened
  expiresAt: {type: Date, index : {expireAfterSeconds:0}},
  type: {type: String, enum:['text', 'image'], required: true}
})

let conversationsSchema = new mongoose.Schema({
 participiants : String,
 messages:[messagesSchema]
})
let Message = mongoose.model('Messages', messagesSchema);
let Conversation = mongoose.model('Conversations', conversationsSchema);


const setPhotoExpiration = async (conversationId, messageId, expirationDate) => {
  const conversation = await Conversation.findById(conversationId);
  const message = conversation.messages.id(messageId);
    if (message.type === 'photo') {
      //check if the message is expired
      if(!message.expiresAt) {
        // set the expiration date to 60 seconds after the message is viewed
        const expirationDate = new Date(Date.now() + 60 * 1000);
        message.expiresAt = expirationDate;
        //save the changes to the db
        await conversation.save();
      }
    }
}