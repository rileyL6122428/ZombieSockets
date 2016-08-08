var Player = require('./Player.js');
var inheriter = require('./utils/inheriter');

function Human(socket) {
  Player.call(this, socket);
}
inheriter.inherits(Human, Player); //NOTE SEE PLAYER FOR RELEVEVANT INTERFACE

var moveSpeed = 5;
Human.prototype.moveRight = function() { this.position[0] += moveSpeed; }
Human.prototype.moveLeft  = function() { this.position[0] -= moveSpeed; }
Human.prototype.moveDown  = function() { this.position[1] += moveSpeed; }
Human.prototype.moveUp    = function() { this.position[1] -= moveSpeed; }

module.exports = Human;
