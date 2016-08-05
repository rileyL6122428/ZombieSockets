var inputHandler = require("../utils/player_input_handler.js");
var pIdx;

// NOTE posits => 'positions'

module.exports = {
  renderCanvasEl: function (ctx, sock, posits, halfWidth, halfHeight) {
    ctx.clearRect(0, 0, 800, 550);

    ctx.translate(-posits[pIdx][0] + halfWidth, -posits[pIdx][1] + halfHeight);
    renderBoundary(ctx);
    renderPlayers(posits, ctx);
    ctx.translate(posits[pIdx][0] - halfWidth, posits[pIdx][1] - halfHeight);
  },

  setPlayerIndex: function(idx) { pIdx = idx; },

  readyToRender: function () { return pIdx !== undefined; }
};

function renderPlayers(posits, ctx) {
  posits.forEach(function(pos) {
    ctx.beginPath();
    ctx.arc(pos[0], pos[1], 15, 0, 2 * Math.PI, false);
    ctx.stroke();
  });
}

function renderBoundary(ctx) { ctx.strokeRect(-500, -500, 1000, 1000); }
