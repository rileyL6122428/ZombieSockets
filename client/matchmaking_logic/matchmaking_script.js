var Renderer = require('./utils/matchmaking_renderer.js');

var MatchmakingScript = {
  init: function () {

  },

  run: function (ctx) {
    var intervalId = setInterval(function() {
      Renderer.render(ctx);

      // setup a input register method
    }, 1000 / 30);

    return intervalId;
  }
};

module.exports = MatchmakingScript;
