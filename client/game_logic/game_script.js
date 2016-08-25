// var Purgatory = require('./purgatory/purgatory');

var GameScript = {

  init: function (sock) {
    // setStateListeners
  },

  run: function () {
  }
};

module.exports = GameScript;

// var ctx = canvas.getContext('2d');
// var halfWidth = (canvas.clientWidth - 30) / 2;
// var halfHeight = (canvas.clientHeight - 30) / 2;

// var socketInitializer = require('./utils/socket_initializer.js');
// var inputHandler = require('./utils/player_input_handler.js');
// var GameRenderer = require('./rendering/game_renderer.js');
// var MatchmakingRenderer = require('./rendering/matchmaking_renderer.js');

// var playerPositions = [[0, 0], [0, 0]];

// socketInitializer.initializeSockets(sock, playerPositions);
// GameRenderer.setSocketListeners(sock);
// inputHandler.registerGameOverCB(sock);

// var renderID = setInterval(function() {
  // if(GameRenderer.readyToRender()) {
    // GameRenderer.renderCanvasEl(ctx, playerPositions, halfWidth, halfHeight, sock);
    // inputHandler.handleInput(sock);
  // }
// }, 1000/30);
