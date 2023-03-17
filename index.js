require('dotenv').config();
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const path = require('path');
const PORT = process.env.PORT;
const cors = require('cors');
const {Conversation, Message, FriendList} = require('./db/index.js');
const {setPhotoExpiration,sendMessage}=('./db/helperFunctions.js')


app.use(express.json());
const io = new Server(server, {
  cors :{
    origin : 'http://localhost:1234',
    methods:['GET','POST','PUT']
  }
})

app.get('/', (req, res) => {
  res.send("connected");
});

// front end needs to make a newconversation if the conversation has not happened before
app.post("/newConversation", async (req,res) => {

})
app.post("/openedImage/:id", async (req, res) => {
  const imageId = req.params.id;
  try {
    const message = await Message.findByIdAndUpdate(imageId, {
      viewed: true,
      viewTime: new Date()
    });
    // Update corresponding conversation
    const conversationId = message.conversationId;
    await Conversation.findByIdAndUpdate(conversationId, {
      $set: {
        "messages.$[elem].viewed": true,
        "messages.$[elem].viewTime": new Date()
      }
    }, {
      arrayFilters: [{ "elem._id": imageId }]
    });
    res.status(200).send({ message });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'An error occurred while updating an viewed Image' });
  }
});


// use to get the whole conversation when a chat is open
app.get('/conversation/:id', async (req, res) => {
  try {
    const conversationId = req.params.id;
    const conversation = await Conversation.findById(conversationId) // Populate the 'participants' field with only the 'name' attribute

    if (!conversation) {
      return res.status(404).json({ error: 'Conversation not found' });
    }
    return res.json(conversation);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// messageslist will use this route to get all conversations?
app.get("/conversations/:userId", async (req, res) => {
  console.log(req.params.userId);
  const userId = req.params.userId;
  try {
    const conversations = await Conversation.find({
      participants: { $elemMatch: { $eq: userId } }
    });
    console.log(conversations);
    res.json(conversations);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

app.get("/friendList", async (req, res) => {
  console.log('checking friendList')
  let userId = req.body.userId;
  console.log('this is the userId: ', userId);
  try {
    const friendList = await FriendList.find({
      userId: { $elemMatch: { $eq: userId } }
    });
    res.status(200).send(JSON.stringify(friendList));
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

io.on('connection', (socket) => {
  console.log('a user connected');
   // Handle new messages when user is in chat room
   socket.on('new-message', async (data) => {
    // Save message to database
    const message = await Message.create(data);
    const conversation = await Conversation.findOneAndUpdate(
      {_id:data.conversationId},
      {$push: {messages:message}},
      {new:true} // returns back the conversation after adding new message
    )

    // Broadcast message to all users in the conversation room
    socket.to(data.conversationId).emit('new-message', message);
  });

  // Handle user joining conversation
  socket.on('join-conversation', (conversationId) => {
    socket.join(conversationId);
  });

  // Handle user leaving conversation
  socket.on('leave-conversation', (conversationId) => {
    socket.leave(conversationId);
  });
  // Handle getting the current conversation
  socket.on('get-conversation', async (conversationId, participants) => {
    console.log(`conversationId is equal to ${conversationId}`);
    // Retrieve all messages associated with the conversation ID
    try {
      let conversation;
      if(conversationId === null) {
        conversation = new Conversation ({
        participants: [participants.userId, participants.friendId],
        messages:[]
      });
      await conversation.save();
    } else {
      conversation = await Conversation.findById(conversationId);
        if (!conversation) {
          throw new Error('Conversation not found');
        }
        console.log(`conversation is equal to ${JSON.stringify(conversation)}`);
    }
    const messages = conversation.messages.filter((message) => {
      if ( message.type === 'image ') {
        const timeDifference = Math.abs(new Date() - message.openedAt);
        const timeDifferenceInSec = Math.floor(timeDifference/1000);
        return timeDifferenceInSec <=60;
      }
      return true
    })
    // Emit the messages back to the client
    socket.emit('conversation', messages);
    } catch (err) {
      console.error('Error while getting notification', err);
      socket.emit('conversation-error', err.message);
    }
  });



   //Handle if user is on the message/friends list so that they can get notifications
  socket.on('get-notifications', async(userId) => {
    const messageWatcher = Message.watch();
    messageWatcher.on('change', async(change) => {
      if (change.operationType === 'insert') {
        try {
          var conversation = Conversation.findById(change.fullDocument.conversationId);
        if ( conversation.participants.includes(userId)) {
          socket.emit('new-notification', change.fullDocument );
        }
        } catch (err) {
          console.error('Error while sending notification', err);
          socket.emit('conversation-error', err.message);
        }

      }
    })
  });
})

server.listen(PORT, () => {
  console.log('listening on :'+ PORT);
});