// 'use strict'
var CollisionChecker = require('./utils/zombie_collision_checker.js'),
    SocketShuffler = require('./utils/socket_shuffler.js'),
    Boundary = require('./boundary2.js'),
    Player = require('./Player.js'),
    HumanPlayer = require('./Human.js'),
    ZombiePlayer = require('./Zombie.js');

function ZombieTestDemo(socks, io, idx, mm) {
  this.initializePlayers(socks);
  this.boundary = new Boundary(500, 500);
  this._initSockets(io);
  this.setupClientUpdateCallback(io);
  this.idx = idx;
  this.matchmaker = mm;
}

ZombieTestDemo.prototype.initializePlayers = function (socks) {
  var shuffledSocks = SocketShuffler.shuffledSockets(socks);
  this._players = [new ZombiePlayer(shuffledSocks[0])];

  for (var i = 1; i < shuffledSocks.length; i++) {
    this._players.push(new HumanPlayer(shuffledSocks[i]));
  }

  this._zombies = [this._players[0]];
  this._humans = this._players.slice(1);
};

ZombieTestDemo.prototype._initSockets = function () {
  this._players.forEach(function(player, idx, players) {
    player.sock.emit('register player number', idx);
    player._initSocket();
    if(player instanceof ZombiePlayer) {
      players.forEach((player) => { player.sock.emit("Is a Zombie", idx); });
    }
  });
};

ZombieTestDemo.prototype.playerPositions = function () {
  var positions = [];
  var zGame = this;
  zGame._players.forEach(function(player) {
    zGame.boundary.contain(player);
    positions.push(player.position);
  });
  return positions;
};

ZombieTestDemo.prototype.gameOver = function () {
  return this._zombies.length === this._players.length;
};

ZombieTestDemo.prototype.setupClientUpdateCallback = function () {
  var that = this,
      timeoutSet = false;

  setInterval(function () {
    CollisionChecker.detectZombieCatches(
      that._humans, that._zombies, that._players
    );

    if(that.gameOver()) {
      setTimeout(function() {
        that.emitAll('To Purgatory');
        setTimeout(function() {
          that.matchmaker.receiveFromFinishedGame(that._players, that.idx);
          that._players = [];
        }, 500);
      }, 1000);
      that.emitAll('game over');
      that._zombies = [];
    }

    that.emitAllWithData('position update', that.playerPositions());
  }, 1000/30);
};

ZombieTestDemo.prototype.emitAll = function (tag) {
  this._players.forEach((player) => { player.sock.emit(tag); });
};

ZombieTestDemo.prototype.emitAllWithData = function (tag, data) {
  this._players.forEach((player) => { player.sock.emit(tag, data); });
};

module.exports = ZombieTestDemo;
