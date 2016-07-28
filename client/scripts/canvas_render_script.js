var canvas = document.getElementById("canvas");
var ctx = canvas.getContext('2d');
var sock = io()
var socketInitializer = require('./utils/socket_initializer.js');
var inputHandler = require('./utils/player_input_handler.js');

var positions = [[-100, 0], [-100, 0]];
var renderID = setInterval(function() {
  ctx.clearRect(0, 0, 600, 500);
  positions.forEach((pos) => { ctx.fillRect(pos[0], pos[1], 100, 100); });
  inputHandler.handleInput(sock);
}, 1000/30);

window.addEventListener("beforeunload", (e) => { clearInterval(renderID); });

socketInitializer.initializeSockets(sock, positions);
