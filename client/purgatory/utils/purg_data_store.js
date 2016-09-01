var _playerTotal = 0;

module.exports = {
  initialize: (sock) => { sock.on('purg update', setPlayerTotal); },

  getPlayerTotal: () => { return _playerTotal; }
};

function setPlayerTotal(data) {
  _playerTotal = data.playerTotal;
}
