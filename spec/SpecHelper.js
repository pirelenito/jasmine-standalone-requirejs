define([
  'jasmine'

  // Add Jasmine dependencies here like:
  // 'jasmine-jquery'
],
function (jasmine) {
  beforeEach(function() {
    this.addMatchers({
      toBePlaying: function(expectedSong) {
        var player = this.actual;
        return player.currentlyPlayingSong === expectedSong &&
               player.isPlaying;
      }
    });
  });

  return jasmine;
});