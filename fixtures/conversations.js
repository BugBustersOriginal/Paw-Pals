const {Conversation, Message} = require('../db/index.js');

const conversations = [
  {
    "_id": "6173c3d2a87a173a1b6f60e6",
    "participants": [1, 2],
    "messages": [
      {
        "_id": "617c0e3c633f37e1f2d79db0",
        "sender": 1,
        "content": "Hi there!",
        "createdAt": "2021-11-01T12:00:00.000Z",
        "openedAt":null,
        "viewed": false,
        "type":"text",
        "viewTime": null,
        "conversationId": "6173c3d2a87a173a1b6f60e6"
      },
      {
        "_id": "617c0e3c633f37e1f2d79db1",
        "sender": 2,
        "content": "How are you?",
        "createdAt": "2021-11-01T12:01:30.000Z",
        "openedAt":null,
        "viewed": false,
        "type":"text",
        "viewTime": null,
        "conversationId": "6173c3d2a87a173a1b6f60e6"
      },
      {
        "_id": "617c0e3c633f37e1f2d79db2",
        "sender": 1,
        "content": "I'm doing great, how about you?",
        "createdAt": "2021-11-01T12:01:30.000Z",
        "openedAt":null,
        "viewed": false,
        "type":"text",
        "viewTime": null,
        "conversationId": "6173c3d2a87a173a1b6f60e6"
      }
    ]
  }
];

Conversation.insertMany(conversations)
.then ((result) => {
  console.log(result);
})
.catch((err) => {
  console.log(`error: ${err}`);
})