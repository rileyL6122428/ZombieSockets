var Constants = require('../../../constants.js');

var _positions = [];
for (var i = 0; i < Constants.PLAYER_TOTAL; i++) { _positions.push([0,0]); }

var _sock,
    _playerIdx,
    _zombieIdxs = {},
    _gameOver = false;

function setSock(sock) { _sock = sock; }

function setPlayerIdx(idx) { _playerIdx = playerIdx; }

function setSocketListeners() {
  setPositionReciever();
  setPlayerIndexListener();
  setGameoverListener();
  setZombieStatusListener();
}

function setPositionReciever() {
  _sock.on('position update', updatePositions);

  function updatePositions(posArr) {
    posArr.forEach((pos, idx) => { _positions[idx] = posArr[idx]; });
  }
}

function setPlayerIndexListener() {
  _sock.on('register player number', (idx) => { _playerIdx = idx; });
}

function setGameoverListener() {
  _sock.on("game over", () => { _gameOver = true; })
}

function setZombieStatusListener() {
  _sock.on("Is a Zombie", (idx) => { _zombieIdxs[idx] = true; });
}

module.exports = {
  init: function (sock) {
    _sock = sock;
    setSocketListeners();
  },

  reset: function() {
    _positions = [];
    for (var i = 0; i < Constants.PLAYER_TOTAL; i++) { _positions.push([0,0]); }

    _playerIdx = undefined,
    _zombieIdxs = {},
    _gameOver = false;
  },

  getPlayerIdx : function () { return _playerIdx;          },
  getPositions : function () { return _positions;          },
  getZombieIdxs: function () { return _zombieIdxs;         },
  getSock      : function () { return _sock;               },
  gameIsOver   : function () { return _gameOver;           },
  readyToRender: function () { return _playerIdx !== null; }
};
