module.exports = {
  inherits: function (Child, Parent) {
    var Surrogate = function () {};
    Surrogate.prototype = Parent.prototype;
    Child.prototype = new Surrogate();
    Child.prototype.constructor = Child;
  }
}
