var Constants = require('../../../constants.js');

var _cursorPos = [0, 0];
var _readyToMoveCursor = true;
var _readyToChooseGame = true;
var _sock;

module.exports = {
  init: function (sock) {
    _sock = sock;
  },

  handleInput: function () {
    this.handleCursorScroll();
    this.handleGameSelection();
  },

  handleCursorScroll: function() {
    if(_readyToMoveCursor) {
      scrollOnInput();
    }
  },

  handleGameSelection: function() {
    var idx = this.selectedGameIdx();
    if(key.isPressed('enter') && _readyToChooseGame) {
      _sock.emit('select game', { gameIdx: idx });
      _readyToChooseGame = false;
    }
  },

  selectedGameIdx: function () {
    return (
      _cursorPos[0] * Math.floor(Constants.GAME_TOTAL / 2) + _cursorPos[1]
    );
  }
}

var directionsAndCBs = [
  ["right", scrollRight],
  ["left", scrollLeft],
  ["up", scrollUp],
  ["down", scrollDown]
];

function scrollOnInput() {
  for (var i = 0; i < directionsAndCBs.length; i++) {
    var direction = directionsAndCBs[i][0];
    var cb = directionsAndCBs[i][1];

    if(key.isPressed(direction)) {
      cb();
      _readyToMoveCursor = false;

      setTimeout(function() {
        _readyToMoveCursor = true
      }, Constants.MM_SCROLL_COOLDOWN);
      break;
    }
  }
}

function scrollRight() {
  _cursorPos[1] = (_cursorPos[1] - 1) % Math.floor(Constants.GAME_TOTAL / 2);

  if(_cursorPos[1] === -1) {
    _cursorPos[1] = 1;
  }
}

function scrollLeft() {
  _cursorPos[1] = (_cursorPos[1] + 1) % Math.floor(Constants.GAME_TOTAL / 2);
}

function scrollUp() {
  _cursorPos[0] = (_cursorPos[0] + 1) % 2;
}

function scrollDown() {
  _cursorPos[0] = (_cursorPos[0] - 1) % 2;

  if(_cursorPos[0] === -1) {
    _cursorPos[0] = Math.floor(Constants.GAME_TOTAL / 2) - 1;
  }
}
