var ZombieGame = require('../game/ZombieGame.js');
var GameConstants = require('../utils/constants.js');
var ClientUpdater = require('./client_updater.js');

function MatchMaker() {
  this.initializeHolders();
  ClientUpdater.initialize(this.games, this.players, this.unallocatedSocks);
}

MatchMaker.prototype.initializeHolders = function () {
  this.unallocatedSocks = [];
  this.players = [];
  this.games = [];
  for (var i = 0; i < GameConstants.GAME_TOTAL; i++) {
    this.players.push([]);
    this.games  .push([]);
  }
};

MatchMaker.prototype.direct = function (sock) {
  this.unallocatedSocks.push(sock);
  sock.emit('To Matchmaking')
  sock.emit("share game total", GameConstants.GAME_TOTAL);
  sock.on('disconnect', ejectSockFromWaiting.bind(this, sock));
  sock.on('select game', joinGame.bind(this, sock));
  ClientUpdater.updateWaitingPlayers();
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
  var gameIdx = data.gameIdx;

  if(this.players[gameIdx].length === GameConstants.PLAYER_TOTAL) {
    sock.emit('game full notification');
  } else {
    ejectSockFromWaiting.call(this, sock);
    this.players[gameIdx].push(sock);
    sock.emit('To Purgatory');
    ClientUpdater.updateAll(gameIdx);
  }
}

module.exports = MatchMaker;
