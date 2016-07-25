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

module.exports = Player;
