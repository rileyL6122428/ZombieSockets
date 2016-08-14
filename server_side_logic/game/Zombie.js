var inheriter = require('./utils/inheriter');
var Player = require('./Player.js');

function Zombie(socket) {
  Player.call(this, socket);
  this.moveSpeed = 3
}

inheriter.inherits(Zombie, Player); //NOTE SEE PLAYER FOR RELEVEVANT INTERFACE

module.exports = Zombie;
