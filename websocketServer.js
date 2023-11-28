// This code represents the WebSocket server setup
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });

  // Handle messaging between doctors here
  socket.on('doctorMessage', (message) => {
    // Broadcast the message to other doctors or handle logic as per your requirement
    io.emit('doctorMessage', message);
  });
});

server.listen(3001, () => {
  console.log('Server running on port 3001');
});
