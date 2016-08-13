module.exports = {
  initializeSockets: function (sock, positions) {
    this.setupHandshakeReciever(sock);
    this.setupNotificationReciever(sock);
    this.setupPositionReciever(sock, positions);
    this.setupGameOverReceiver(sock);
  },

  setupGameOverReceiver: function (sock) {
    sock.on('game over', () => { console.log("game is over"); });
  },

  setupPositionReciever: function (sock, positions) {
    sock.on('position update', updatePositions);
    function updatePositions(posArr) {
      posArr.forEach((pos, idx) => { positions[idx] = posArr[idx]; });
    }
  },

  setupHandshakeReciever: function (sock) {
    sock.on('handShake', onHandshake);
    function onHandshake(status) {
      var handShake = document.getElementById("hand-shake");
      handShake.innerHTML = status;
    }
  },

  setupNotificationReciever: function (sock) {
    sock.on('msg', onMsg);
    function onMsg(msg) {
      var status = document.getElementById("server-messages");
      status.innerHTML = msg;
    }
  }
}
