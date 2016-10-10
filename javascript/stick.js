/*
 * Crea una instància de Stick.
 * Amb aquest objecte creem la barra que el jugador té que controlar per fer
 * rebotar la bola al sobre i no perdre vides
 *
 * @constructor
 * @this {Stick}
 * @param {id_stick} ,side {left or right}
 *
 */

var inherits = require('./Inheritance');
var Observer = require('./Observer');

function Stick(id_stick, side, context) {

  this.imgObj = document.getElementById(id_stick);
  this.side = side || "left"; // right,left,
  this.gap = 80; // From this.position in pixels
  this.context = context;
  var self = this;

  //////Añadido
  // Heretem de la classe Observer pq nosaltres volem observar l'estat de la
  // Ball
  inherits(new Observer(), this);
  // Ens apuntem com Observadors dels canvis d'estat de la bola
  this.context.ball.AddObserver(this);

  window.addEventListener("mousemove", function(e) {
    y = (window.Event) ? e.pageY : event.clientY + (document.documentElement
      .scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft
    );
    self.locate(self.gap, y);
  }, false);

  // Invocat cada vegada que la bola canvia de posició
  this.Update =
    function(bola) { // bola is a Ball Object
      var pos = bola.getPosition();
      var limit = (this.context.vpWidth * 0.25) + this.gap - bola.imgObj.width -
        this.imgObj.width;
      if (pos.x <= limit) {
        console.log("Estem dins del limit");
        var distance = Math.abs((this.y + this.imgObj.height / 2) -
          (pos.y + bola.imgObj.height / 2));
        var minDist = (this.imgObj.height / 2 + bola.imgObj.height / 2);
        if (distance < minDist) {
          console.log((minDist - distance));
          if ((minDist - distance) < 23)
            bola.rebota("Stick", "punta");
          else if ((minDist - distance) < 23)
            bola.rebota("Stick", "punteta");
          else
            bola.rebota("Stick", "mig");
        }
      }
    }
    /////Añadido

  // Posicionem stick a les coordenades x,y
  this.locate = function(x, y) {
    if (y > (this.context.vpHeight - this.imgObj.height))
      y = this.context.vpHeight - this.imgObj.height;
    this.x = x;
    this.y = y;
    this.imgObj.style[this.side] = (Math.round(x)) + 'px';
    this.imgObj.style.top = (Math.round(y)) + 'px';
  };

} // End Stick class

module.exports = Stick;
