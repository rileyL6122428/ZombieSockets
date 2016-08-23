var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var sock = io();
var GameScript = require('./game_logic/game_script.js');
var MMScript   = require('./matchmaking_logic/matchmaking_script.js');
var Constants = require('./general_utils/constants');

Constants.initDimensions(canvas);

sock.on('To Matchmaking', runMatchMaking);
var matchmakingIntervalID;
function runMatchMaking() {
  // if(gameIntervalID) {
    // clearInterval(gameIntervalID);
  // }
  MMScript.init(sock);
  matchmakingIntervalID = MMScript.run(ctx);
}


// NOTE DO NOT DELETE THE FOLLOWING!!!
// sock.on('To Game', runGame);
// var gameIntervalID;
// function runGame() {
//   clearInterval(matchmakingIntervalID);
//   GameScript.init();
//   gameIntervalID = GameScript.run();
// }

sock.on('game entered', () => { console.log("entered game"); });


window.addEventListener("beforeunload", (e) => {
  // TODO CLEAR INTERVALS
  clearInterval(matchmakingIntervalID);
});
