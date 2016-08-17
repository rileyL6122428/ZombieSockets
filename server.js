'use strict'

var http = require('http');
var express = require('express');
var socketio = require('socket.io');

var app = express();
var server = http.createServer(app);
var io = socketio(server);

var MatchMaker = require('./server_side_logic/matchmaking/match_maker.js');
var matchMaker = new MatchMaker();
// var ZombieGame = require('./server_side_logic/game/ZombieGame.js');


app.use(express.static(__dirname + '/client'));
app.set('port', (process.env.PORT || 5000));
app.get('/', function(request, response) {
  res.sendfile(__dirname + 'client/index.html');
});

server.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

io.on('connection', onConnection);

function onConnection(sock) {
  io.emit('handShake', 'Hand Shake Established');
  matchMaker.direct(sock, io);
}

// function onConnection(sock) {
//   io.emit('handShake', 'Hand Shake Established');
//   setUpGame(sock);
// }
//
// var playerSocks = [];
//
// function setUpGame(sock) {
//   playerSocks.push(sock);
//
//   if(playerSocks.length === 2) {
//     new ZombieGame(playerSocks, io);
//     io.emit('msg', 'you are matched!');
//     playerSocks = [];
//
//   } else {
//     sock.emit('msg', 'you are waiting for more players');
//   }
// }
