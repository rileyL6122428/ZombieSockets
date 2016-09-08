var Store = require('./store');

var _inputSetup = [
  ['right', 'move right'],
  ['left', 'move left'],
  ['down', 'move down'],
  ['up', 'move up']
]

module.exports = {
  handleInput: function(sock) {
    _inputSetup.forEach(function(inputs) {
      if(key.isPressed(inputs[0]) && !Store.gameIsOver()) {　
        Store.getSock().emit(inputs[1]);
      }
    });
  }
}
