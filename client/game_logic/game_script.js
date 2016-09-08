var InputHandler = require('./utils/input_handler'),
    Store        = require('./utils/store'),
    Renderer     = require('./utils/renderer'),
    Constants    = require('../../constants');

var GameScript = {
  init: function (sock) { Store.init(sock); },

  run: function (ctx) {
    var halfWidth  = (Constants.CANVAS_WIDTH  - 30) / 2,
        halfHeight = (Constants.CANVAS_HEIGHT - 30) / 2;

    return setInterval (function() {
      if(Store.readyToRender()) {
        Renderer.renderCanvasEl(ctx, halfWidth, halfHeight);
        InputHandler.handleInput();
      }
    }, 1000/30);
  }
};

module.exports = GameScript;
