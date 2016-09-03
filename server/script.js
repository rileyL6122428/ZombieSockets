'use strict'
var appRoot = require('app-root-path');

var http = require('http');
var express = require('express');
var socketio = require('socket.io');

var app = express();
var server = http.createServer(app);
var io = socketio(server);

var MatchMaker = require('./matchmaking/match_maker.js');
var matchMaker = new MatchMaker();

app.use(express.static(appRoot + '/client'));
app.set('port', (process.env.PORT || 5000));
app.get('/', function(request, response) {
  response.sendFile(appRoot + '/client/index.html');
});

server.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

io.on('connection', (sock) => { matchMaker.direct(sock, io); });
