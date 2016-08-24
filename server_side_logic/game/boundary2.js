function Boundary(width, height) {
  this.bounds = [width, height];
}

Boundary.prototype.contain = function (player) {
  for (var i = 0; i < player.position.length; i++) {
    var boundCoeff = this.bounds[i] - player.radius;
    
    player.position[i] = Math.max(player.position[i], -boundCoeff);
    player.position[i] = Math.min(player.position[i],  boundCoeff);
  }
};

//

module.exports = Boundary;
