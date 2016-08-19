var canvas = document.getElementById("canvas");
var sock = io();

var GameScript = require('./game_logic/game_script.js');
var MMScript   = require('./matchmaking_logic/matchmaking_script.js');


sock.on('To Matchmaking', runMatchMaking);
var matchmakingIntervalID;
function runMatchMaking() {
  // if(gameIntervalID) {
    // clearInterval(gameIntervalID);
  // }
  MMScript.init(sock);
  matchmakingIntervalID = MMScript.run();
}


// NOTE DO NOT DELETE THE FOLLOWING!!!
// sock.on('To Game', runGame);
// var gameIntervalID;
// function runGame() {
//   clearInterval(matchmakingIntervalID);
//   GameScript.init();
//   gameIntervalID = GameScript.run();
// }


window.addEventListener("beforeunload", (e) => {
  // TODO CLEAR INTERVALS
  // clearInterval(renderID);
});
