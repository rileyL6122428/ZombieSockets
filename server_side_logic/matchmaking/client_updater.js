var playersArr;
var gamesArr;
var waitingSocks;

module.exports = {
  initialize: function (games, players, waitingPlayers) {
    playersArr = players;
    gamesArr = games;
    waitingSocks = waitingPlayers
  },


  update: function () {
    var theData = data();
    waitingSocks.forEach((sock) => {
      console.log("herro");
      sock.emit('mm update', theData);
    });
  }
}

function data() {
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
