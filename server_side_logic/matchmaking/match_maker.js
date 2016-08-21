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

MatchMaker.prototype.direct = function (sock, io) {
  this.unallocatedSocks.push(sock);

  sock.emit('To Matchmaking')
  sock.on('disconnect', ejectSockFromWaiting.bind(this, sock))
  sock.on('join game', joinGame);
  ClientUpdater.update();
};

function ejectSockFromWaiting(sock) {
  for (var i = 0; i < this.unallocatedSocks.length; i++) {
    if(sock === this.unallocatedSocks[i]) {
      this.unallocatedSocks.splice(i, 1);
      break;
    }
  }

  ClientUpdater.update();
}

function joinGame(gameIdx, sock, io) {
  if(this.players[gameIdx].length === GameConstants.PLAYER_TOTAL) {
    sock.emit('game full notification');

  } else {
    var holdingCellIdx = this.unallocatedSocks.indexOf(sock);
    this.unallocatedSocks.splice(holdingCellIdx, 1);

    this.players[gameIdx].push(sock);


    sock.emit('game entered');
    ClientUpdater.update();
  }
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

module.exports = MatchMaker;
