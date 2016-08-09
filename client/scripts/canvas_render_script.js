var canvas = document.getElementById("canvas");
var ctx = canvas.getContext('2d');
var halfWidth = (canvas.clientWidth - 30) / 2;
var halfHeight = (canvas.clientHeight - 30) / 2;

var sock = io();
var socketInitializer = require('./utils/socket_initializer.js');
var inputHandler = require('./utils/player_input_handler.js');
var renderer = require('./rendering/renderer.js');
var playerPositions = [[0, 0], [0, 0]];

socketInitializer.initializeSockets(sock, playerPositions);
renderer.setSocketListeners(sock);

var renderID = setInterval(function() {
  if(renderer.readyToRender()) {
    renderer.renderCanvasEl(ctx, playerPositions, halfWidth, halfHeight, sock);
    inputHandler.handleInput(sock);
  }
}, 1000/30);

window.addEventListener("beforeunload", (e) => { clearInterval(renderID); });
