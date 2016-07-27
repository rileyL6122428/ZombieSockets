var _inputSetup = [
  ['d', 'move right'],
  ['a', 'move left'],
  ['s', 'move down'],
  ['w', 'move up']
]

module.exports = {
  handleInput: function(sock) {
    _inputSetup.forEach(function(inputs) {
      if(key.isPressed(inputs[0])) {　sock.emit(inputs[1]); }
    });
  }
}
