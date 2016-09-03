var Player = require('./Player.js');
var inheriter = require('./utils/inheriter');

function Human(socket) {
  Player.call(this, socket);
  this.moveSpeed = 5;
}
inheriter.inherits(Human, Player); //NOTE SEE PLAYER FOR RELEVEVANT INTERFACE

module.exports = Human;
