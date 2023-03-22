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

app.get("/friendList", async (req, res) => {
  let userId = req.body.userId;
  // console.log('checking friendList', userId);
  try {
    const friend = await FriendList.find({userId})
    // console.log('got friend: ', friend[0]);
    res.status(200).send(friend[0])
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

// [
//   {
//     _id: new ObjectId("64160b46cc57fa46efca1bed"),
//     userId: 'tivo',
//     friends: [ 'superman', 'shadow', 'batman' ],
//     requests: [
//       [Object], [Object],
//       [Object], [Object],
//       [Object], [Object],
//       [Object], [Object],
//       [Object], [Object]
//     ],
//     __v: 0
//   }
// ]

app.post('/friendRequest', async (req, res) => {
  let friendId = req.body.data.selectedUser;
  let userId = req.body.data.userId;
  let friendFilter = {userId: friendId};
  let update = {$push: { incomingRequests: userId  }};
  let pendingRequest = {$push: {sentRequest: friendId}};
  let userFilter = {userId: userId};
  // console.log('got friendRequest in server: ', req.body.data.friendRequestObj);
  try {
    const friend = await FriendList.updateOne(friendFilter, update)
    const pending = await FriendList.updateOne(userFilter, pendingRequest)
    res.status(201).send();
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
})

app.post('/acceptRequest', async (req, res) => {
  console.log('accept friend request server', req.body.data);
  let userId = req.body.data.userId;
  let friendId = req.body.data.friendId;
  let friendFilter = {userId: friendId};
  let userFilter = {userId: userId};
  let update = {$push: {friends: userId}};
  let updateUserFriends = {$push: {friends: friendId}}
  try {
    const accept = await FriendList.updateOne(friendFilter, update)
    const removeFriendRequest = await FriendList.updateOne(friendFilter, {$pull: {incomingRequests: userId}})
    const userUpdate = await FriendList.updateOne(userFilter, updateUserFriends)
    const removeSentRequest = await FriendList.updateOne(userFilter, {$pull: {sentRequests: friendId}})
    console.log('mongodb accept updated')
    res.status(201).send();
  } catch(err) {
    console.error(err);
    res.status(500).send(err);
  }
})

io.on('connection', (socket) => {
  console.log('a user connected');
   // Handle new message
   socket.on('new-message', async (data) => {
    // Save message to database
    const message = await Message.create(data);

    // Broadcast message to all users in the conversation
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
  socket.on('get-conversation', async (conversationId) => {
    // Retrieve all messages associated with the conversation ID
    const messages = await Conversation.find({_id:conversationId});
    // Emit the messages back to the client
    socket.emit('conversation', messages);
  });
});

server.listen(PORT, () => {
  console.log('listening on :'+ PORT);
});
