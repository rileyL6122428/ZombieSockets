'use strict'

var Player = require('./Player.js');

function ZombieTestDemo(sock1, sock2, io) {
  this._players = [new Player(sock1), new Player(sock2)];
  this._initSockets();
  this.setupPositionUpdateCallback(io);
}

ZombieTestDemo.prototype._initSockets = function () {
  this._players.forEach((player) => { player._initSocket(); });
};

ZombieTestDemo.prototype.playerPositions = function () {
  var positions = [];
  this._players.forEach((player) => { positions.push(player.position); });
  return positions;
};

ZombieTestDemo.prototype.setupPositionUpdateCallback = function (io) {
  var that = this;
  setInterval(function () {
    io.emit('position update', that.playerPositions());
  }, 1000/30);
};
module.exports = ZombieTestDemo;
