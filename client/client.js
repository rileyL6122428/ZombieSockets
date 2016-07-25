var sock = io()

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
