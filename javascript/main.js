/**
 * Our app is a closure
 *
 *
 */

// include('./Inheritance');
// include('./ArrayList');
var utils = require('./utils');
// include('./Observer');
// include('./Subject');
var context = require('./context');

// Once page has been completely loaded. Including images. We start the game
window.onload = function() {

  var context_ = new context();

  var startGame = function(event) {
    event.preventDefault();
    utils.clearSelection();
    if (window.event.keyCode == 32) {
      if (context_.state.match("run")) {
        context_.stop();
      } else {
        context_.start();
      }
    }
  };

  window.addEventListener("keypress", startGame, false);
};
