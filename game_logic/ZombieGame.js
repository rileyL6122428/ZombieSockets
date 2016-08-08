'use strict'
var Boundary = require('./Boundary.js');
var Player = require('./Player.js');
var HumanPlayer = require('./Human.js');

function ZombieTestDemo(sock1, sock2, io) {
  this._players = [new HumanPlayer(sock1), new HumanPlayer(sock2)];
  this.boundary = new Boundary(500, 500);
  this._initSockets();
  this.setupPositionUpdateCallback(io);
}

ZombieTestDemo.prototype._initSockets = function () {
  this._players.forEach(function(player, idx) {
    player._initSocket();
    player.sock.emit('register player number', idx);
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

ZombieTestDemo.prototype.setupPositionUpdateCallback = function (io) {
  var that = this;
  setInterval(function () {
    io.emit('position update', that.playerPositions());
  }, 1000/30);
};

module.exports = ZombieTestDemo;
