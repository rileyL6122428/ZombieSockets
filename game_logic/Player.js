// NOTE THIS IS A BASE CLASS
// INHERITORS of this class must implement move and is a Zombie

function Player(sock) {
  this.sock = sock;
  this.position = [];
  this._initializePosition();
  this.radius = 15;
}

Player.prototype._initializePosition = function () {
  for (var i = 0; i < 2; i++) {
    this.position.push(Math.floor(Math.random() * 400));
  }
};

var _movementSetup = [
  ['move right', "RIGHT"],
  ['move left', "LEFT"],
  ['move down', "DOWN"],
  ['move up', "UP"]
];

Player.prototype._initSocket = function () {
  _movementSetup.forEach(function(inputs) {
    this.sock.on(inputs[0], move.bind(this, inputs[1]));
  }, this);
};

function move(direction) {
  switch(direction) {
    case "RIGHT": this.moveRight(); break;
    case "LEFT" : this.moveLeft() ; break;
    case "DOWN" : this.moveDown() ; break;
    case "UP"   : this.moveUp()   ; break;
  }
}

module.exports = Player;
