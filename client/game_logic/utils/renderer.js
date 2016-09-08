var Store     = require('./store'),
    Constants = require('../../../constants');

function render(ctx, halfWidth, halfHeight) {
  var positions = Store.getPositions(),
      playerIdx = Store.getPlayerIdx();

  var translatedX = -positions[playerIdx][0] + halfWidth,
      translatedY = -positions[playerIdx][1] + halfHeight;

  if(Store.gameIsOver()) {
    ctx.font = "48px serif";
    ctx.strokeText("GAME OVER", halfWidth - 150, halfHeight);
  }

  ctx.translate(translatedX, translatedY);
  renderBoundary(ctx);
  renderPlayers(positions, ctx);
  ctx.translate(-translatedX, -translatedY);
}

function renderPlayers(positions, ctx) {
  var zombieIdxs = Store.getZombieIdxs();

  Store.getPositions().forEach(function(pos, idx) {
    if(zombieIdxs[idx]) { ctx.strokeStyle = 'green'; }

    ctx.beginPath();
    ctx.arc(pos[0], pos[1], 15, 0, 2 * Math.PI, false);
    ctx.stroke();

    if(zombieIdxs[idx]) { ctx.strokeStyle = 'black';}
  });
}

function renderBoundary(ctx) { ctx.strokeRect(-500, -500, 1000, 1000); }

module.exports = {
  renderCanvasEl: function (ctx, halfWidth, halfHeight) {
    ctx.clearRect(0, 0, Constants.CANVAS_WIDTH, Constants.CANVAS_HEIGHT);
    render(ctx, halfWidth, halfHeight);
  }
};
