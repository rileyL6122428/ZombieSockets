var Renderer = require('./utils/purg_renderer.js');

module.exports = {
  init: function (sock) {

  },

  run: function(ctx) {
    var intervalId = setInterval(function () {
      Renderer.render(ctx);
    }, 1000 / 30);

    return intervalId;
  }
};
