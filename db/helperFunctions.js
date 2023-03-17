const {Conversation, Message} = require('./index.js');



const setPhotoExpiration = async (conversationId, messageId) => {
  try {
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
  } catch(error) {
    console.error(error);
  }
}

const sendMessage= async (conversationId, messageData) => {
  try {
    const conversation = await Conversation.findOne({ conversationId });
    if (!conversation) {
      throw new Error("Conversation not found");
    }
    const message = {
      senderId: messageData.senderId,
      messageText: messageData.messageText,
      messageType: messageData.messageType,
      createdAt: new Date(),
    };
    // Add the message to the conversation's messages array
    conversation.messages.push(message);
    await conversation.save();
    return message;
  } catch (error) {
    console.error(error);
  }
}

module.exports = { setPhotoExpiration, sendMessage}