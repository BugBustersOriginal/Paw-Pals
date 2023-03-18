require('dotenv').config();
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const path = require('path');
const PORT = process.env.PORT;
const cors = require('cors');
const {Conversation, Message} = require('./db/index.js');
const {setPhotoExpiration,sendMessage}=('./db/helperFunctions.js')


app.use(express.json());
const io = new Server(server, {
  cors :{
    origin : 'http://localhost:3033',
    methods:['GET','POST','PUT']
  }
})

app.get('/', (req, res) => {
  res.send("connected");
});

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
  const userId = req.params.userId;
  try {
    const conversations = await Conversation.find({
      participants: { $elemMatch: { $eq: userId } }
    });
    res.json(conversations);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

io.on('connection', (socket) => {
  console.log('a user connected');
   // Handle new message
   socket.on('new-message', async (data) => {
    if(data !== ''){
      console.log("data", data)
    // Save message to database
    // const message = await Message.create(data);

    // // Broadcast message to all users in the conversation
    // socket.to(data.conversationId).emit('new-message', message);
    }



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
  socket.on('get-conversation', async (conversationId) => {
    // Retrieve all messages associated with the conversation ID
    const messages = await Conversation.find({_id:conversationId});
    // Emit the messages back to the client
    socket.emit('conversation', messages);
  });
});

server.listen(3000, () => {
  console.log('listening on :'+ PORT);
});
