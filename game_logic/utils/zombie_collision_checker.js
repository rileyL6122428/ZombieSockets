var Zombie = require('../Zombie.js');

module.exports = {
  detectZombieCatches: function (humans, zombies, players, io) {
    for (var zIdx = 0; zIdx < zombies.length; zIdx++) {
      for (var hIdx = 0; hIdx < humans.length; hIdx++) {
        if(this.isCaught(humans[hIdx], zombies[zIdx])) {

          var playerIdx = players.indexOf(humans[hIdx]);
          players[playerIdx] = new Zombie(humans[hIdx].sock);
          players[playerIdx]._initSocket();

          humans.splice(hIdx, 1);
          zombies.push(players[playerIdx]);
          io.emit("Is a Zombie", playerIdx);

          // NOTE consider changing the player data structure for constant time
          // removal at some point in the future
        }
      }
    }
  },

  isCaught: function (human, zombie) {
    return(
      this.distance(human.position, zombie.position) < 2 * human.radius
    );
  },

  distance: function (pos1, pos2) {
    return (
      Math.sqrt(
        Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2)
      )
    );
  }
};
