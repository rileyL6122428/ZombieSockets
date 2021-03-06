var Constants = require("../../../constants");
var Store = require('./purg_data_store');

var PurgatoryRenderer = {
  render: function (ctx) {
    var playerTotal = Store.getPlayerTotal();

    ctx.clearRect(0, 0, Constants.CANVAS_WIDTH, Constants.CANVAS_HEIGHT);
    ctx.fillText("This is the Purgatory Component", 70, 50);
    ctx.fillText("Player Count: " + playerTotal, 70, 100);
    ctx.fillText("Players needed: " + (Constants.PLAYER_TOTAL - playerTotal), 70, 150);
  }
}

module.exports = PurgatoryRenderer;
