// DATA WE NEED TO STORE
// 1) PLAYER TOTALS
// 2) Zombie TOTAL / per game
// 3) Human Total / per game
// 4) Game start time, or last endtime
// 5) number of players waiting

var _data = {};

module.exports = {
  initialzeDataReceivers: function (sock) {
    sock.on('mm update', receiveData);
  },

  waitingPlayerTotal: function() {
    return _data.waitingPlayerTotal
  },

  getGamePlayerTotal: function (idx) {
    return _data.playerTotals[idx];
  }
};

function receiveData(data) {
  _data = data;
}
