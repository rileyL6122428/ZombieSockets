var ZombieGame = require('../game/ZombieGame.js');
var GameConstants = require('../utils/constants.js');

function MatchMaker() {
  this.initializeHolders();
  this.initializeUpdaters();
}

MatchMaker.prototype.initializeHolders = function () {
  this.unallocatedSocks = [];
  this.players = [];
  this.games = [];

  this.totalsTracker = {
    playerTotals: [],
    playersWaiting: 0
  }; // will track players in each game and players currently waiting

  for (var i = 0; i < GameConstants.GAME_TOTAL; i++) {
    this.totalsTracker.playerTotals.push([0]);
    this.players.push([]);
    this.games  .push([]);
  }
};

MatchMaker.prototype.initializeUpdaters = function () {
  this.intervalId = setInterval(function() {
    this.unallocatedSocks.forEach(function (sock) {
      sock.emit('game totals', this.totalsTracker)
    });
  }.bind(this), 800);
};

MatchMaker.prototype.direct = function (sock, io) {
  this.unallocatedSocks.push(sock);
  this.totalsTracker.playersWaiting += 1;

  sock.on('join game', joinGame);
};

function joinGame(gameIdx, sock, io) {
  if(this.players[gameIdx].length === GameConstants.PLAYER_TOTAL) {
    sock.emit('game full notification');

  } else {
    var holdingCellIdx = this.unallocatedSocks.indexOf(sock);
    this.unallocatedSocks.splice(holdingCellIdx, 1);

    this.players[gameIdx].push(sock);

    this.totalsTracker.playersWaiting -= 1;
    this.totalsTracker.playerTotals[gameIdx] += 1;

    sock.emit('game entered');
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
