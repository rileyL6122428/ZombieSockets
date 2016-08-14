module.exports = {
  shuffledSockets: function (socks) {
    var seeds = {};
    for (var i = 0; i < socks.length; i++) { seeds[Math.random()] = socks[i]; }
    var sortedSeeds = this.quicksort(Object.keys(seeds));

    var shuffledSocks = [];
    sortedSeeds.forEach((seed) => { shuffledSocks.push(seeds[seed]); });
    return shuffledSocks;
  },

  quicksort: function (arr) {
    if(arr.length <= 1) { return arr; }

    var left = [];
    var right  = [];

    for (var i = 1; i < arr.length; i++) {
      if(arr[0] < arr[i]) { right.push(arr[i]); }
      else                { left.push(arr[i]) ; }
    }

    var sortedLeft = this.quicksort(left);
    var sortedRight = this.quicksort(right);

    sortedLeft.push(arr[0]);
    Array.prototype.push.apply(sortedLeft, sortedRight);

    return sortedLeft;
  }
};
