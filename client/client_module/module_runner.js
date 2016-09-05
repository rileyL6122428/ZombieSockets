var _modules = [];

module.exports = {
  addModules: function (modules) {
    for (var i = 0; i < modules.length; i++) {
      _modules.push(modules[i]);
      _modules[i].init();
    }
  }
};
