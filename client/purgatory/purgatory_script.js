var Renderer = require('./utils/purg_renderer.js');
var Store = require('./utils/purg_data_store.js');

module.exports = {
  init: function (sock) { Store.initialize(sock); },

  run: function(ctx) {
    var intervalId = setInterval(function () {
      Renderer.render(ctx);
    }, 1000 / 30);

    return intervalId;
  }
};
