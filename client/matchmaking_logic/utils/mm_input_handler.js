var _cursorPos = [0,0];
var _gameTotal = 4; //NOTE Consider having this val initialized by server
                    //     so that you don't have to manually set it
var _readyToMoveCursor = true;

module.exports = {
  handleInput: function () {
    this.handleCursorScroll();
  },

  handleCursorScroll: function() {
    if(_readyToMoveCursor) {
      scrollOnInput();
      //NOTE Maybe trade out the timeout above for a some date action for
      // smoother controls
    }
  },

  selectedGameIdx: function () {
    return _cursorPos[0] * Math.floor(_gameTotal / 2) + _cursorPos[1];
  }
}

var direcsAndCBs = [
  ["right", scrollRight],
  ["left", scrollLeft],
  ["up", scrollUp],
  ["down", scrollDown]
];

function scrollOnInput() {
  for (var i = 0; i < direcsAndCBs.length; i++) {
    var direction = direcsAndCBs[i][0];
    var cb = direcsAndCBs[i][1];
    if(key.isPressed(direction)) {
      cb();
      _readyToMoveCursor = false;
      setTimeout(() => { _readyToMoveCursor = true }, 150);
      break;
    }
  }
}

function scrollRight() {
  _cursorPos[1] = (_cursorPos[1] - 1) % Math.floor(_gameTotal / 2);
  if(_cursorPos[1] === -1) { _cursorPos[1] = 1; }
}

function scrollLeft() {
  _cursorPos[1] = (_cursorPos[1] + 1) % Math.floor(_gameTotal / 2);
}

function scrollUp() {
  _cursorPos[0] = (_cursorPos[0] + 1) % 2;
}

function scrollDown() {
  _cursorPos[0] = (_cursorPos[0] - 1) % 2;
  if(_cursorPos[0] === -1) { _cursorPos[0] = Math.floor(_gameTotal / 2) - 1; }
}
