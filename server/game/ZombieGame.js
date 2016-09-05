// 'use strict'
var CollisionChecker = require('./utils/zombie_collision_checker.js');
var SocketShuffler = require('./utils/socket_shuffler.js');
var Boundary = require('./boundary2.js');
var Player = require('./Player.js');
var HumanPlayer = require('./Human.js');
var ZombiePlayer = require('./Zombie.js');

function ZombieTestDemo(socks, io) {

  this.initializePlayers(socks);
  this.boundary = new Boundary(500, 500);
  this._initSockets(io);
  this.setupClientUpdateCallback(io);
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

ZombieTestDemo.prototype._initSockets = function (io) {

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

ZombieTestDemo.prototype.setupClientUpdateCallback = function (io) {
  var that = this;
  setInterval(function () {
    CollisionChecker.detectZombieCatches(
      that._humans, that._zombies, that._players, io
    );

    if(that.gameOver()) { io.emit('game over'); }

    io.emit('position update', that.playerPositions());
  }, 1000/30);
};

module.exports = ZombieTestDemo;
