var canvas = document.getElementById("canvas");
var ctx = canvas.getContext('2d');
var sock = io()
var inputHandler = require('./player_input_handler.js');

var positions = [[0,0], [200,100]];
var renderID = setInterval(function() {
  ctx.clearRect(0, 0, 600, 500);
  positions.forEach((pos) => { ctx.fillRect(pos[0], pos[1], 100, 100); });
  inputHandler.handleInput(sock);
}, 1000/60);

window.addEventListener("beforeunload", (e) => { clearInterval(renderID); });

sock.on('position update', updatePositions);
function updatePositions(posArr) {
  posArr.forEach((pos, idx) => { positions[idx] = posArr[idx]; })
}

sock.on('handShake', onHandshake);
function onHandshake(status) {
  var handShake = document.getElementById("hand-shake");
  handShake.innerHTML = status;
}

sock.on('msg', onMsg);
function onMsg(msg) {
  var status = document.getElementById("server-messages");
  status.innerHTML = msg;
}
