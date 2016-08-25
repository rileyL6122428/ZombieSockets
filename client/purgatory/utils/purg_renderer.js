var Constants = require("../../general_utils/constants");

var PurgatoryRenderer = {
  render: function (ctx) {
    ctx.clearRect(0, 0, Constants.CANVAS_WIDTH(), Constants.CANVAS_HEIGHT());
    ctx.fillText("This is the Purgatory Component", 70, 50);
  }
}

module.exports = PurgatoryRenderer;
