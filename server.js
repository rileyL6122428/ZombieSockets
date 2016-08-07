'use strict'

var http = require('http');
var express = require('express');
var socketio = require('socket.io');

var app = express();
var server = http.createServer(app);
var io = socketio(server);

var ZombieGame = require('./game_logic/ZombieGame.js');
let waitingPlayer;

io.on('connection', onConnection);

app.use(express.static(__dirname + '/client'));
app.set('port', (process.env.PORT || 5000));
app.get('/', function(request, response) {
  res.sendfile(__dirname + 'client/index.html');
});

server.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

function onConnection(sock) {
  io.emit('handShake', 'Hand Shake Established');
  setUpGame(sock);
}

function setUpGame(sock) {
  if(waitingPlayer) {

    new ZombieGame(waitingPlayer, sock, io);
    waitingPlayer = null;
    io.emit('msg', 'you are matched!');
  } else {
    waitingPlayer = sock;
    sock.emit('msg', 'you are waiting for a second player');
  }
}
