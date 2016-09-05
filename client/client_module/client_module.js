var IDRegulator = require('./interval_id_regulator.js');

function ClientModule(script, sockSignalString, sock, ctx) {
  this.script = script;
  this.signalString = sockSignalString;
  this.sock = sock;
  this.ctx = ctx;
}

ClientModule.prototype.init = function () {
  var signal    = this.signalString,
      runScript = this.runScript.bind(this);

  this.sock.on(signal, runScript);
}

ClientModule.prototype.runScript = function (script) {
  if(this.signalString === 'To Game') { debugger; }
  IDRegulator.clearAllIntervals();
  this.script.init(this.sock);
  //NOTE Should I clear sock listeners when leaving a module???
  var intervalId = this.script.run(this.ctx);
  IDRegulator.store(intervalId);
};

module.exports = ClientModule;
