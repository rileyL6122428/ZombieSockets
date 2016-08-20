var _width;
var _height;

module.exports = {
  CANVAS_WIDTH: getWidth,
  CANVAS_HEIGHT: getHeight,
  initDimensions: function(c) {
    _width = c.width;
    _height = c.height;
  }
};

function getWidth()  { return _width;  }
function getHeight() { return _height; }
