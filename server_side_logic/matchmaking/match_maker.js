var ZombieGame = require('../game/ZombieGame.js');

function MatchMaker() {
  this.waitingSocks = [];
  this.games = [];
}

MatchMaker.prototype.direct = function (sock) {

};

module.exports = MatchMaker
