var inputHandler = require("../utils/player_input_handler.js");
var pIdx;

// NOTE posits => 'positions'

module.exports = {
  renderCanvasEl: function (ctx, sock, posits, halfWidth, halfHeight) {
    ctx.clearRect(0, 0, 800, 550);

    ctx.translate(-posits[pIdx][0] + halfWidth, -posits[pIdx][1] + halfHeight);
    posits.forEach((pos) => { ctx.fillRect(pos[0], pos[1], 30, 30); });
    ctx.translate(posits[pIdx][0] - halfWidth, posits[pIdx][1] - halfHeight);
  },

  setPlayerIndex: function(idx) {
    pIdx = idx;
  },

  readyToRender: function () {
    return pIdx !== undefined;
  }
};
