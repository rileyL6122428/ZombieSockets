var InputHandler = require('./utils/input_handler'),
    SocketInitializer = require('./utils/socket_initializer'),
    Renderer = require('./utils/renderer');

var playerPositions = [[0, 0], [0, 0], [0, 0], [0, 0]];
var _sock;

var GameScript = {
  init: function (sock) {
    _sock = sock;
    SocketInitializer.initializeSockets(sock, playerPositions);
    Renderer.setSocketListeners(sock);
    InputHandler.registerGameOverCB(sock);
  },

  run: function (ctx) {
    var halfWidth = (850 - 30) / 2;
    var halfHeight = (500 - 30) / 2;

    return setInterval(function() {
      if(Renderer.readyToRender()) {
        Renderer.renderCanvasEl(ctx, playerPositions, halfWidth, halfHeight, _sock);
        InputHandler.handleInput(_sock);
      }
    }, 1000/30);
  }
};

module.exports = GameScript;
