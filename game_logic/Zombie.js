var inheriter = require('./utils/inheriter');
var Player = require('./Player.js');

function Zombie(socket) {
  Player.call(this, socket);
}

inheriter.inherits(Zombie, Player); //NOTE SEE PLAYER FOR RELEVEVANT INTERFACE

var moveSpeed = 3;
Zombie.prototype.moveRight = function() { this.position[0] += moveSpeed; }
Zombie.prototype.moveLeft  = function() { this.position[0] -= moveSpeed; }
Zombie.prototype.moveDown  = function() { this.position[1] += moveSpeed; }
Zombie.prototype.moveUp    = function() { this.position[1] -= moveSpeed; }

module.exports = Zombie;
