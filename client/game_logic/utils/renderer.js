var playerIdx,
    zombieIdxs = {},
    gameOver = false;

var GameRenderer = {
  renderCanvasEl: function (ctx, positions, halfWidth, halfHeight) {
    ctx.clearRect(0, 0, 800, 550);
    _render(ctx, positions, halfWidth, halfHeight);
  },

  setSocketListeners: function (sock) {
    _setZombieStatusListener(sock);
    _setPlayerIndexListener(sock);
    _setGameoverListener(sock);
  },

  readyToRender: function () { return playerIdx !== undefined; }
};

function _setGameoverListener(s) {
  s.on("game over", () => { gameOver = true; })
}

function _setZombieStatusListener(s) {
  s.on("Is a Zombie", (idx) => { zombieIdxs[idx] = true; });
}

function _setPlayerIndexListener(s) {
  s.on('register player number', (idx) => {
    playerIdx = idx;
  });
}

function _render(ctx, positions, halfWidth, halfHeight) {
  var translatedX = -positions[playerIdx][0] + halfWidth;
  var translatedY = -positions[playerIdx][1] + halfHeight;

  if(gameOver) {
    ctx.font = "48px serif";
    ctx.strokeText("GAME OVER", halfWidth - 150, halfHeight);
  }

  ctx.translate(translatedX, translatedY);
  renderBoundary(ctx);
  _renderPlayers(positions, ctx);
  ctx.translate(-translatedX, -translatedY);
}

function _renderPlayers(positions, ctx) {
  positions.forEach(function(pos, idx) {
    if(zombieIdxs[idx]) { ctx.strokeStyle = 'green'; }
    ctx.beginPath();
    ctx.arc(pos[0], pos[1], 15, 0, 2 * Math.PI, false);
    ctx.stroke();
    if(zombieIdxs[idx]) { ctx.strokeStyle = 'black';}
  });
}

function renderBoundary(ctx) { ctx.strokeRect(-500, -500, 1000, 1000); }

module.exports = GameRenderer;
