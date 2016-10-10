/**
   prototype we bounce an image on screen
 *
 * @constructor
 * @this {Artifact}
  *
 */

var Artifact = function(id_artifact, context) {

  this.imgObj = document.getElementById(id_artifact);
  this.state = "stop"; // startdbl,startclick
  this.speed = 3;
  this.context = context;
  var self = this; // Artifici per fer funcionar setInterval
  this.getArtifactSelf = function() {
    return self;
  };

  // Get ball position. Respecte extrem superior esquerre
  this.getPosition =
    function() {
      return {
        x: parseInt(self.imgObj.style.left),
        y: parseInt(self.imgObj.style.top)
      };
    }

  this.rebota =
    function(typeObject, pos) {
      if (typeObject == "Stick" && pos == "punta") {
        // alert("punta");
        this.dirY *= (-1);
        this.dirX *= (-1);
      } else if (typeObject == "Stick" && pos == "punteta") {
        // this.imgObj.meneja=2;
        // if (this.dirX>0)
        // alert("punteta");
        this.dirY *= (-1);
        this.dirX *= (-1);

      } else {
        this.dirX *= (-1);
      }
      // this.imgObj.meneja = Math.abs(this.imgObj.meneja-(directions.length-1));
    }

  this.directions = {
    NORTH: {
      dirX: 0,
      dirY: -1
    },
    SOUTH: {
      dirX: 0,
      dirY: 1
    },
    EAST: {
      dirX: 1,
      dirY: 0
    },
    WEST: {
      dirX: -1,
      dirY: 0
    },
    NORTH_EAST: {
      dirX: 1,
      dirY: -1
    },
    SOUTH_EAST: {
      dirX: 1,
      dirY: 1
    },
    SOUTH_WEST: {
      dirX: -1,
      dirY: 1
    },
    NORTH_WEST: {
      dirX: -1,
      dirY: -1
    },
  };

  // añadido
  inherits(new Subject(), this);

}; // END  Ball prototype

Artifact.prototype.setDirection = function(CARDINAL_POINT) {
  this.dirX = this.directions[CARDINAL_POINT].dirX;
  this.dirY = this.directions[CARDINAL_POINT].dirY;
};
// Meneja la bola
Artifact.prototype.move = function() {
  // if (this.state=="runvertical") this.dirX=0;
  this.locate(parseInt(this.imgObj.style.left) + (this.dirX * this.speed),
    parseInt(this.imgObj.style.top) + (this.dirY * this.speed));
}; // End move method

// Posicionem Bola de manera absoluta en X i Y i comprovem llímits
Artifact.prototype.locate = function(x, y) {
  // Ens eixim per dalt
  if (y <= 0 || y >= this.context.vpHeight - this.imgObj.height)
    this.dirY = this.dirY * (-1);
  // Quitar choque aui detras de la barra

  if (x <= 0 || x >= this.context.vpWidth - this.imgObj.width)
    this.dirX = this.dirX * (-1);

  this.imgObj.style.left = (Math.round(x)) + 'px';
  this.imgObj.style.top = (Math.round(y)) + 'px';
  // Avisem als Observers interessats en el nostre estat que estem canviant de
  // posició
  this.Notify(this);

}; // End locate method

// Sortejem direcció i comencem a moure la pola
Artifact.prototype.start = function() {
  var self = this.getArtifactSelf();
  self.state = "run";
  self.setDirection("NORTH_WEST");
  animate = setInterval(function() {
    self.move();
  }, 5);
};

// Parem la bola
Artifact.prototype.stop = function() {
  this.state = "stop";
  clearTimeout(animate);
};

module.exports = Artifact;
