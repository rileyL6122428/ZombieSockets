var Renderer = require('./utils/mm_renderer.js');
var Store = require('./utils/mm_data_store.js');
var sock;

var MatchmakingScript = {
  init: function (s) {
    sock = s;
    Store.initialzeDataReceivers(sock);
  },

  run: function (ctx) {
    var intervalId = setInterval(function() {
      Renderer.render(ctx);

      // setup an input register method
    }, 1000 / 30);

    return intervalId;
  }
};

module.exports = MatchmakingScript;
