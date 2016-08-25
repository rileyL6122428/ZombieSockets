var _ids = [];

var Regulator = {
  clearAllIntervals: function () {
    while(_ids.length > 0) {
      clearInterval(_ids.pop());
    }
  },

  store: function (id) {
    _ids.push(id);
  }
};

window.addEventListener("beforeunload", (e) => {
  // TODO CLEAR INTERVALS
  Regulator.clearAllIntervals();
});

module.exports = Regulator;
