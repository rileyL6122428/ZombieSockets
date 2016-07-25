'use strict'

var Player = require('./Player.js');

function ZombieTestDemo(sock1, sock2) {
  this._players = [new Player(sock1), new Player(sock2)];
}

ZombieTestDemo.prototype._initSockets = function () {
  
};

module.exports = ZombieTestDemo;
