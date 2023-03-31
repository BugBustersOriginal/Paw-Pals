require('dotenv').config();
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const path = require('path');
const PORT = process.env.PORT;
const cors = require('cors');

/*** libraries for allowing photo upload to mongodb */
const multer = require('multer');
const {GridFsStorage} = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const crypto = require('crypto');


/************************************************** */
const {Conversation, Message, FriendList} = require('./db/index.js');
const {locationString} = require('./serverHelper.js');

/***** helper functions for debugging socker rooms */

app.use(cors());
function getRoomsByUser(id){
  let usersRooms = [];
  let rooms = io.sockets.adapter.rooms;

  for(let room in rooms){
      if(rooms.hasOwnProperty(room)){
          let sockets = rooms[room].sockets;
          if(id in sockets)
              usersRooms.push(room);
      }
  }

  return usersRooms;
}
/********************************************** */

app.use(express.json());
const io = new Server(server, {
  cors :{

    origin : [process.env.CORS_ORIGIN1, process.env.CORS_ORIGIN2],

    methods:['GET','POST','PUT']
  }
})

app.get('/', (req, res) => {
  res.send("connected");
});

// front end needs to make a newconversation if the conversation has not happened before

app.post("/newConversation", async (req,res) => {
//will provide list of participants (JSON body)
//will need to determine if there is already a convo between these 2 participants
//if yes, send that convo
//if no, create new convo and send that convo
})
app.post("/openedImage/:id", async (req, res) => {
  const imageId = req.params.id;
  try {
    const updatedMessage = await Message.findOneAndUpdate(
      { _id: messageId, type: 'image'},
      { $set: { viewed: true } },
      { new: true }
    );
    if (!updatedMessage) {
      return res.status(404).send({ error: 'Message not found or does not contain an image' });
    }
    console.log(`convoId is equal to ${updatedMessage.conversationId}`);
    const conversationId = updatedMessage.conversationId;
    const updatedConversation = await Conversation.findOneAndUpdate(
      { _id: conversationId, 'messages._id': messageId },
      { $set: { 'messages.$.viewed': true } },
      { new: true }
    );
    res.status(200).send(updatedConversation);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'An error occurred while updating an viewed Image' });
  }
});


/// use to get the whole conversation when a chat is open
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
  console.log(`friendlist~`)
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

//API for getting userInfo and creating new model if new user does not exist
app.get("/getUserInfo", async (req, res) => {
  // it this userId should change to et userId = req.query.userId;
  let userId = req.body.userId;
  // console.log(1111,userId)
  try {
    const user = await FriendList.find({userId});
    // if (user.length === 0) {
    //   let userId = req.query.username;
    //   console.log(11111,userId)
    //   let thumbnailUrl = req.query.avatar_url;
    //   let location = locationString(req.query);
    //   const newUser = new FriendList({
    //     userId: userId,
    //     thumbnailUrl,
    //     location,
    //     friends: [],
    //     conversations: [],
    //     incomingRequests: [],
    //     sentRequest: []
    //   });
    //   await newUser.save();
    //   res.status(200).send('save to mongodb success');
    //   return;
    // }
    res.status(200).send(user[0])
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
})

app.post("/register", async (req, res) => {
  console.log('register req: ', req.body);
  let userId = req.body.username;
  let thumbnailUrl = req.body.avatar_url;
  let location = locationString(req.body);
  const newUser = new FriendList({
    userId: userId,
    thumbnailUrl,
    location,
    friends: [],
    conversations: [],
    incomingRequests: [],
    sentRequest: []
  });
  try {
    await newUser.save();
    res.status(200).send(`${req.body.username} save success`);
  } catch (err) {
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
  let update = {$push: { incomingNotifications: {friendId: userId, type: 'friend request'}  }};
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
});

app.post('/imgDled', async (req, res) => {
  let sender = req.body.sender;
  let downloader = req.body.downloader;

  let update = {$push: { incomingNotifications: {friendId: sender, type: 'saved photo'}  }};
  let userFilter = {friendId: sender};
  // console.log('got friendRequest in server: ', req.body.data.friendRequestObj);
  try {
    const pending = await FriendList.updateOne(userFilter, update)
    res.status(201).send();
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

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
    const removeFriendRequest = await FriendList.updateOne(friendFilter, { $pull: { sentRequest: userId } })
    const userUpdate = await FriendList.updateOne(userFilter, updateUserFriends)
    const removeSentRequest = await FriendList.updateOne(userFilter, {$pull: {incomingNotifications: {friendId: friendId}}})
    // console.log('mongodb accept updated')
    res.status(201).send();
  } catch(err) {
    console.error(err);
    res.status(500).send(err);
  }
})

app.post('/dismissNotification', async (req, res) => {
  let dismissObj = req.body.data;
  let userId = req.body.data.userId;
  let friendId = req.body.data.friendId;
  let userFilter = {userId: userId};
  console.log('dismiss hit', dismissObj);

  try {
    const updateUser = await FriendList.updateOne(userFilter, {$pull: {incomingNotifications: {friendId: friendId}}})
    res.status(201).send();
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
})

io.on('connection', async (socket) => {
  console.log('a user connected');
   // Handle new messages when user is in chat room
   socket.on('new-message', async (data) => {

    if(data !== ''){
      console.log("data", data)
      try {
        const message = await Message.create(data);
        const conversation = await Conversation.findOneAndUpdate(
          {_id:data.conversationId},
          {$push: {messages:message}},
          {new:true} // returns back the conversation after adding new message
        )
      // Broadcast message to all users in the conversation room
        io.to(data.conversationId).emit('new-message', message);
      } catch (err) {
        console.error(`error while sending new-message ${err}`)
      }
    }

  });

  // Handle user joining conversation
  socket.on('join-conversation', async (conversationId, participants) => {
    try {
      if(!conversationId) {
        const conversation = await Conversation.create({participants:[...participants]});
        conversationId = conversation._id;
        await socket.emit('new-conversation', {conversationId: conversation._id});
      }
      await socket.join(conversationId);
      await socket.emit('join-success',conversationId)
    } catch(err) {
      console.error(`error while joining a socket room ${err}`);
      socket.emit('join-error',err)
    }
  });

  // Handle user leaving conversation
  socket.on('leave-conversation', (conversationId) => {
    socket.leave(conversationId);
  });
  // Handle getting the current conversation
  socket.on('get-conversation', async (participants) => {
      // Retrieve all messages associated with the conversation ID
      console.log(`participants is equal to ${participants}`)
         try {
           const conversation = await Conversation.findOne({
              participants:{
                $all: participants.sort()
              }
           }, { _id: 1, messages: 1 }).populate('messages')
           if(!conversation) {

            const newConversation = await Conversation.create({participants:[...participants]});
            await socket.emit('conversation', newConversation);
            return;
           }
           const messages = conversation.messages.filter((message) => {
                if ( message.type === 'image ') {
                  const timeDifference = Math.abs(new Date() - message.openedAt);
                  const timeDifferenceInSec = Math.floor(timeDifference/1000);
                  return timeDifferenceInSec <=60;
                }
                return true
              })
              conversation.messages = [...messages];

            socket.emit('conversation', conversation);

         } catch(err) {
           console.error('error while getting initial conversation ${err}');
           socket.emit('conversation-error', err);
         }
    //   try {
    //     let conversation = await Conversation.findById(conversationId);
    //       if (!conversation) {
    //         throw new Error('Conversation not found');
    //       }
    //       //console.log(`conversation is equal to ${JSON.stringify(conversation)}`);
    //   const messages = conversation.messages.filter((message) => {
    //     if ( message.type === 'image ') {
    //       const timeDifference = Math.abs(new Date() - message.openedAt);
    //       const timeDifferenceInSec = Math.floor(timeDifference/1000);
    //       return timeDifferenceInSec <=60;
    //     }
    //     return true
    //   })
    //   // Emit the messages back to the client
    //   console.log('emitting convo back to frontend')
    //   socket.emit('conversation', messages);
    // } catch(err) {
    //   console.error(`error while getting conversaion ${err}`);
    //   socket.emit('conversation-error', err);
    // }

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