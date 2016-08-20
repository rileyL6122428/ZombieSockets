var Store = require('./mm_data_store.js');
var Constants = require('../../general_utils/constants');

var MatchmakingRenderer = {
  render: function (ctx) {
    ctx.clearRect(0, 0, Constants.CANVAS_WIDTH(), Constants.CANVAS_HEIGHT());
    ctx.fillStyle = "black"

    ctx.font = "22px serif";
    ctx.fillText("Players Waiting: " + Store.waitingPlayerTotal(), 70, 50);

    ctx.font = "24px serif";
    for (var row = 0; row < 2; row++) {
      for (var col = 0; col < 2; col++) {
        var gameNum = 1 + row * 2 + col;
        var drawX = col * 200 + 30;
        var drawY = row * 100 + 100;

        ctx.fillText("Game " + gameNum, drawX, drawY);
      }
    }
  }
};

module.exports = MatchmakingRenderer;
