// 'use strict'
var CollisionChecker = require('./utils/zombie_collision_checker.js');
var SocketShuffler = require('./utils/socket_shuffler.js');
var Boundary = require('./boundary2.js');
var Player = require('./Player.js');
var HumanPlayer = require('./Human.js');
var ZombiePlayer = require('./Zombie.js');

function ZombieTestDemo(sock1, sock2, io) {
  var shuffledSocks = SocketShuffler.shuffledSockets([sock1, sock2]);
  this._players = [new ZombiePlayer(shuffledSocks[0]), new HumanPlayer(shuffledSocks[1])];
  this._zombies = [this._players[0]];
  this._humans = this._players.slice(1);

  this.boundary = new Boundary(500, 500);
  this._initSockets(io);
  this.setupClientUpdateCallback(io);
}

ZombieTestDemo.prototype._initSockets = function (io) {
  this._players.forEach(function(player, idx) {
    player._initSocket();
    player.sock.emit('register player number', idx);
    if(player instanceof ZombiePlayer) { io.emit("Is a Zombie", idx); }
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

ZombieTestDemo.prototype.setupClientUpdateCallback = function (io) {
  var that = this;
  setInterval(function () {
    CollisionChecker.detectZombieCatches(
      that._humans, that._zombies, that._players, io
    );

    io.emit('position update', that.playerPositions());
  }, 1000/30);
};

module.exports = ZombieTestDemo;
