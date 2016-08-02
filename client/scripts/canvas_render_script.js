var canvas = document.getElementById("canvas");
var ctx = canvas.getContext('2d');
var halfWidth = (canvas.clientWidth - 30) / 2;
var halfHeight = (canvas.clientHeight - 30) / 2;

var sock = io()
var socketInitializer = require('./utils/socket_initializer.js');
var inputHandler = require('./utils/player_input_handler.js');

var positions = [[-100, 0], [-100, 0]];
var renderID = setInterval(function() {
  ctx.clearRect(0, 0, 600, 500);
  // ctx.translate(-positions[0][0], -positions[0][1]);
  ctx.translate(-positions[0][0] + halfWidth, -positions[0][1] + halfHeight);
  positions.forEach((pos) => { ctx.fillRect(pos[0], pos[1], 30, 30); });
  ctx.translate(positions[0][0] - halfWidth, positions[0][1] - halfHeight);
  inputHandler.handleInput(sock);
}, 1000/30);

window.addEventListener("beforeunload", (e) => { clearInterval(renderID); });

socketInitializer.initializeSockets(sock, positions);
