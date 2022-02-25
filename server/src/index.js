const express = require('express');
const cors = require('cors');
require('./db/mongoose.js');

const router = require('./routers/routers.js');

const app = express();

const http = require('http');
const server = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

io.on("connection", (socket) => {
  console.log('New websocket connection');

  socket.on('join', async (data) => {
    try{
      console.log(data);
    }catch(e){
      console.log(e);
    }

    //TODO continuar: posat socket al usuari ,etc.
  });

});

app.use(cors());
app.use(express.json());
app.use(router);

server.listen(3000, () => {
  console.log('listening on port:3000');
});