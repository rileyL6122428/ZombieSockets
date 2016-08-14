var _inputSetup = [
  ['d', 'move right'],
  ['a', 'move left'],
  ['s', 'move down'],
  ['w', 'move up']
]

var gameOver = false;

module.exports = {
  handleInput: function(sock) {
    _inputSetup.forEach(function(inputs) {
      if(key.isPressed(inputs[0]) && !gameOver) {　sock.emit(inputs[1]); }
    });
  },

  registerGameOverCB: function (sock) {
    sock.on('game over', () => { gameOver = true; });
  }
}
