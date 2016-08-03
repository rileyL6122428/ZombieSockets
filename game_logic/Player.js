function Player(sock) {
  this.sock = sock;
  this.position = [];
  this._initializePosition();
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
]

Player.prototype._initSocket = function () {
  _movementSetup.forEach(function(inputs) {
    this.sock.on(inputs[0], move.bind(this, inputs[1]));
  }, this)
};

function move(direction) {
  switch(direction) {
    case "RIGHT": moveRight.apply(this); break;
    case "LEFT" : moveLeft.apply(this) ; break;
    case "DOWN" : moveDown.apply(this) ; break;
    case "UP"   : moveUp.apply(this)   ; break;
  }
}

var moveSpeed = 5;

function moveRight() {
  this.position[0] += moveSpeed;
}

function moveLeft() {
  this.position[0] -= moveSpeed;
}

function moveUp() {
  this.position[1] -= moveSpeed;
}

function moveDown() {
  this.position[1] += moveSpeed;
}

module.exports = Player;
