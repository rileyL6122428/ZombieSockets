var playersArr;
var gamesArr;
var waitingSocks;

var ClientUpdater = {
  initialize: function (games, players, waitingPlayers) {
    playersArr = players;
    gamesArr = games;
    waitingSocks = waitingPlayers
  },

  updateAll: function (gameIdx) {
    ClientUpdater.updateWaitingPlayers();
    ClientUpdater.updatePurgatoryPlayers(gameIdx);
  },

  updateWaitingPlayers: function () {
    waitingSocks.forEach((sock) => {
      sock.emit('mm update', waitingData());
    });
  },

  updatePurgatoryPlayers: function (gameIdx) {
    playersArr[gameIdx].forEach(function(player) {
      player.emit('purg update', purgatoryData(gameIdx))
    });
  }
}

function waitingData() {
  return {
    playerTotals: generatePlayerTotals(),
    waitingPlayerTotal: waitingSocks.length
  };
}

function generatePlayerTotals() {
  var totals = [];
  playersArr.forEach((playersHolder) => { totals.push(playersHolder.length) });
  return totals;
}

function purgatoryData (gameIdx) {
  var players = playersArr[gameIdx];
  return({ playerTotal: players.length });
}

module.exports = ClientUpdater;
