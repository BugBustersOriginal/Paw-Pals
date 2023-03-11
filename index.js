require('dotenv').config();

const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const path = require('path');
const PORT = process.env.PORT;

app.use(express.json());



app.get('/', (req, res) => {
  res.send("connected");
});

io.on('connection', (socket) => {
  console.log('a user connected');
});

server.listen(3000, () => {
  console.log('listening on :'+ PORT);
});
