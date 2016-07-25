var canvas = document.getElementById("canvas");
var ctx = canvas.getContext('2d');

var positions = [[0,0], [200,100]];
var renderID = setInterval(function() {
  positions.forEach((pos) => { ctx.fillRect(pos[0], pos[1], 100, 100); });
}, 500);

window.addEventListener("beforeunload", function(e) {
  clearInterval(renderID);
});
