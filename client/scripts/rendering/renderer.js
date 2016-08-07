var inputHandler = require("../utils/player_input_handler.js");
var playerIdx;

var renderer = {
  renderCanvasEl: function (ctx, positions, halfWidth, halfHeight) {
    ctx.clearRect(0, 0, 800, 550);
    _render(ctx, positions, halfWidth, halfHeight);
  },

  setPlayerIndex: function(idx) { playerIdx = idx; },
  readyToRender: function () { return playerIdx !== undefined; }
};

function _render(ctx, positions, halfWidth, halfHeight) {
  var translatedX = -positions[playerIdx][0] + halfWidth;
  var translatedY = -positions[playerIdx][1] + halfHeight;

  ctx.translate(translatedX, translatedY);
  renderBoundary(ctx);
  _renderPlayers(positions, ctx);
  ctx.translate(-translatedX, -translatedY);
}

function _renderPlayers(positions, ctx) {
  positions.forEach(function(pos) {
    ctx.beginPath();
    ctx.arc(pos[0], pos[1], 15, 0, 2 * Math.PI, false);
    ctx.stroke();
  });
}

function renderBoundary(ctx) { ctx.strokeRect(-500, -500, 1000, 1000); }

module.exports = renderer;
