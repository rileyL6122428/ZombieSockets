var _width;
var _height;
var _gameTotal;

module.exports = {
  CANVAS_WIDTH: getWidth,
  CANVAS_HEIGHT: getHeight,
  MM_SCROLL_COOLDOWN: 150,
  GAME_TOTAL: getGameTotal,

  initDimensions: function(canvas) {
    _width = canvas.width;
    _height = canvas.height;
  },

  initGameTotal: function(total) {
    _gameTotal = total;
  }
};

function getWidth()     { return _width;     }
function getHeight()    { return _height;    }
function getGameTotal() { return _gameTotal; }
