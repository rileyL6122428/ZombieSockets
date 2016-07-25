'use strict'

var http = require('http');
var express = require('express');
var socketio = require('socket.io');

var app = express();
var server = http.createServer(app);
var io = socketio(server);

var ZombieGame = require('./ZombieTestLogic/ZombieGame.js');
let waitingPlayer;

io.on('connection', onConnection);
app.use(express.static(__dirname + '/client'));
server.listen(3000, () => console.log('Ready to work'));

function onConnection(sock) {
  sock.on('move', function() {
    console.log("moving");
    io.emit('move', [5,0])
  });

  if(waitingPlayer) {
    new ZombieGame(waitingPlayer, sock);
    waitingPlayer = null;
  } else {
    waitingPlayer = sock;
    sock.emit('msg', 'you are waiting for a second player')
  }
}
