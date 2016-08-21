var Renderer = require('./utils/mm_renderer.js');
var Store = require('./utils/mm_data_store.js');
var InputHandler = require('./utils/mm_input_handler.js');
var sock;

var MatchmakingScript = {
  init: function (s) {
    sock = s;
    Store.initialzeDataReceivers(sock);
  },

  run: function (ctx) {
    var intervalId = setInterval(function() {
      Renderer.render(ctx);
      InputHandler.handleInput();
      // setup an input register method
    }, 1000 / 30);

    return intervalId;
  }
};

module.exports = MatchmakingScript;
