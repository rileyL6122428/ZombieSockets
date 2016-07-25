function Player(sock) {
  this.sock = sock;
  this.position = [];
  this._initializePosition();
}

Player.prototype._initializePosition = function () {
  for (var i = 0; i < 2; i++) {
    this.position.push(Math.floor(Math.random() * 250));
  }
};

Player.prototype._initSocket = function () {
  this.sock.on('move right', moveRight);
};

function moveRight() {
  this.position[0] += 5;
}

module.exports = Player;
