var Store = require('./mm_data_store.js');
var InputHandler = require('./mm_input_handler.js');
var Constants = require('../../../constants');

var MatchmakingRenderer = {
  render: function (ctx) {
    ctx.clearRect(0, 0, Constants.CANVAS_WIDTH, Constants.CANVAS_HEIGHT);
    ctx.fillStyle = "black"

    drawPlayerWaitingDisplay(ctx);

    for (var row = 0; row < 2; row++) {
      for (var col = 0; col < 2; col++) {
        drawGameButton(ctx, row, col);
      }
    }
  }
};

function drawPlayerWaitingDisplay(ctx) {
  ctx.font = "22px serif";
  ctx.fillText("Players Waiting: " + Store.waitingPlayerTotal(), 70, 50);
}

function drawGameButton(ctx, row, col) {
  var gameNum = 1 + row * 2 + col;
  var drawX = col * 210 + 30;
  var drawY = row * 150 + 100;

  ctx.font = "22px serif";
  ctx.fillText("Game " + gameNum, drawX, drawY);

  drawCursor(gameNum, drawX, drawY, ctx);

  ctx.font = "17px serif";
  ctx.fillText(
    "Players: " + Store.getGamePlayerTotal(gameNum - 1),
    drawX,
    drawY + 20
  );
}

function drawCursor(gameNum, drawX, drawY, ctx) {
  if(gameNum - 1 === InputHandler.selectedGameIdx()) {
    ctx.beginPath();
    ctx.moveTo(drawX + 80, drawY);
    ctx.lineTo(drawX + 95, drawY + 10);
    ctx.lineTo(drawX + 95, drawY - 10);
    ctx.fill();
  }
}

module.exports = MatchmakingRenderer;
