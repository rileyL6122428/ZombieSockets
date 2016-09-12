var ZombieGame = require('../game/ZombieGame.js');
var GameConstants = require('../../constants.js');
var ClientUpdater = require('./client_updater.js');

function MatchMaker(io) {
  this.io = io;

  this.initializeHolders();
  ClientUpdater.initialize(this.games, this.players, this.unallocatedSocks);
}

MatchMaker.prototype.initializeHolders = function () {
  this.unallocatedSocks = [];
  this.players = [];
  this.games = [];
  for (var i = 0; i < GameConstants.GAME_TOTAL; i++) {
    this.players.push([]);
  }
};

MatchMaker.prototype.direct = function (sock) {
  this.unallocatedSocks.push(sock);
  sock.emit('To Matchmaking')
  sock.on('disconnect', ejectSockFromWaiting.bind(this, sock)); //NOTE NEED EQUIVALENT FOR GAME PLAYERS
  sock.on('select game', joinGame.bind(this, sock));
  ClientUpdater.updateWaitingPlayers();
};

MatchMaker.prototype.receiveFromFinishedGame = function (players, gameIdx) {
  this.players[gameIdx] = [];
  var that = this;
  
  players.forEach(function (player) {
    joinGame.call(that, player.sock, {gameIdx: gameIdx});
  });
};

function ejectSockFromWaiting(sock) {
  for (var i = 0; i < this.unallocatedSocks.length; i++) {
    if(sock === this.unallocatedSocks[i]) {
      this.unallocatedSocks.splice(i, 1);
      break;
    }
  }
  ClientUpdater.updateWaitingPlayers();
}

function joinGame(sock, data) {
  debugger
  var gameIdx = data.gameIdx,
      players = this.players[gameIdx];

  if(players.length === GameConstants.PLAYER_TOTAL) {
    sock.emit('game full notification');

  } else if(players.length === GameConstants.PLAYER_TOTAL - 1) {
    ejectSockFromWaiting.call(this, sock);
    players.push(sock);
    players.forEach((playerSock) => { playerSock.emit('To Game'); });
    this.games[gameIdx] = new ZombieGame(players, this.io, gameIdx, this);

  } else {
    ejectSockFromWaiting.call(this, sock);
    players.push(sock);
    sock.emit('To Purgatory');
    ClientUpdater.updateAll(gameIdx);
  }
}

module.exports = MatchMaker;
