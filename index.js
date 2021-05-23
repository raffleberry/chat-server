const dotenv = require('dotenv');
dotenv.config();

const express = require("express");
const app = express();
app.use(express.static('public'));

var server = app.listen(process.env.PORT, () => {
  console.log(`listening on PORT:${process.env.PORT}`);
});

const { Server } = require('socket.io');

const io = new Server(server);

io.on('connection', (socket) => {
  console.log(`A user has connected ${socket.id}`);

  socket.on('disconnect', (reason) => {
    console.log(`User Disconnected - Reason: ${reason}`)
  });

  socket.on('chat message', (msg) => {
    socket.broadcast.emit('chat message', msg);
  });
})