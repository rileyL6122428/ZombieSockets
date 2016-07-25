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
  this._players.forEach((player) => { positions.push(this.position); });
  console.log("updating positions");
  return positions;
};

ZombieTestDemo.prototype.setupPositionUpdateCallback = function (io) {
  // NOTE SHOULD I CLEAR THE INTERVAL BELOW?
  var that = this;
  setInterval(function () {
    io.emit('position update', that.playerPositions());
  }, 100);
};
module.exports = ZombieTestDemo;
