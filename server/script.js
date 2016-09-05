'use strict'
var appRoot = require('app-root-path');

var http = require('http'),
    express = require('express'),
    socketio = require('socket.io');

var app = express(),
    server = http.createServer(app),
    io = socketio(server);

var MatchMaker = require('./matchmaking/match_maker.js'),
    matchMaker = new MatchMaker(io);

app.use(express.static(appRoot + '/client'));
app.set('port', (process.env.PORT || 5000));
app.get('/', function(request, response) {
  response.sendFile(appRoot + '/client/index.html');
});

server.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

io.on('connection', (sock) => { matchMaker.direct(sock, io); });
