var HEIGHT, Hero, LETs, WIDTH, canvas, conflets, controller, ctx, ctx1, hero, lets, model, pass, view;

canvas = document.getElementById("canvas");

ctx = canvas.getContext("2d");

ctx1 = canvas.getContext("2d");

HEIGHT = window.innerHeight - 5;

WIDTH = window.innerWidth - 5;

canvas.width = WIDTH;

canvas.height = HEIGHT;

Hero = (function() {
  var self;

  function Hero(x, y) {
    this.y = HEIGHT - y;
    this.x = x;
  }

  Hero.prototype.a = 50;

  Hero.prototype.b = 50;

  self = Hero;

  Hero.prototype.summ = function(sx, sy) {
    return {
      dx: this.x + sx,
      dy: this.y + sy
    };
  };

  return Hero;

})();


/*
  [
    {
      x: 30,
      y: HEIGHT,
      a: 30,
      b: 200,
      color: "red"
    },
    {
      x: 500,
      y: HEIGHT - 50,
      a: 300,
      b: 40,
      color: "green"
    }
  ]
 */

LETs = (function() {
  var self;

  function LETs(arr) {
    this.arr = arr;
  }

  LETs.prototype.add = function() {
    var i, j, len, ref, results;
    ref = this.arr;
    results = [];
    for (j = 0, len = ref.length; j < len; j++) {
      i = ref[j];
      results.push(view.writeRect(i.x, i.y, i.a, i.b, i.color));
    }
    return results;
  };

  LETs.prototype.a = 50;

  LETs.prototype.b = 50;

  self = LETs;

  return LETs;

})();

hero = new Hero(700, 0);

window.requestAnimFrame = function() {
  return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || (function(callback) {
    return window.setTimeout(callback, 1000 / 60);
  });
};

pass = function() {
  try {
    throw TypeError();
  } catch (error) {}
};

view = {
  writeRect: function(x, y, a, b, color) {
    ctx.fillStyle = color;
    return ctx.fillRect(x, y - b, a, b);
  }
};

model = {
  spacing: function(fps) {
    var fx, fy, i, j, len, ref;
    if (this.reverse) {
      fx = this.summ(hero.x, hero.y, -this.speedSpacing.x, this.speedSpacing.y).x;
      fy = this.summ(hero.x, hero.y, -this.speedSpacing.x, this.speedSpacing.y).y;
    } else {
      fx = this.summ(hero.x, hero.y, this.speedSpacing.x, this.speedSpacing.y).x;
      fy = this.summ(hero.x, hero.y, this.speedSpacing.x, this.speedSpacing.y).y;
    }
    hero.x = fx;
    hero.y = fy;
    ref = lets.arr;
    for (j = 0, len = ref.length; j < len; j++) {
      i = ref[j];
      if (hero.x + hero.a > i.x) {
        continue;
      } else {
        if (hero.y + hero.b >= i.y && (controller.touchX(hero.x, hero.a, "r" || controller.touchX(hero.x, hero.a, "l")))) {
          hero.y = HEIGHT - i.b;
          console.log(HEIGHT - hero.b - i.b);
          console.log(hero.y);
        }
      }
    }
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    lets.add();
    view.writeRect(hero.x, hero.y, hero.a, hero.b, "#333");
    this.speedSpacing = this.summ(this.speedSpacing.x, this.speedSpacing.y, this.gravity.x, this.gravity.y);
    if (fy >= HEIGHT) {
      return this.speedSpacing = {
        x: 0,
        y: -30
      };
    } else {
      return setTimeout(((function(_this) {
        return function() {
          return window.requestAnimFrame(_this.spacing(80));
        };
      })(this)), 1000 / fps);
    }
  },
  ToLeft: function(fps) {
    var fx, fy;
    if (this.stopWayLeft) {
      if (!controller.touchX(hero.x, hero.a, "l")) {
        return this.stopWayLeft = false;
      }
    } else {
      this.reverse = true;
      fx = this.summ(hero.x, hero.y, -this.speed.x, 0).x;
      fy = this.summ(hero.x, hero.y, -this.speed.x, 0).y;
      hero.x = fx;
      hero.y = fy;
      ctx.clearRect(0, 0, WIDTH, HEIGHT);
      lets.add();
      view.writeRect(hero.x, hero.y, hero.a, hero.b, "#333");
      if (controller.touchX(hero.x, hero.a, "l")) {
        console.log(controller.touchX(hero.x, hero.a, "l"));
      }
      if (fx % 60 === 0) {

      } else {
        return setTimeout(((function(_this) {
          return function() {
            return window.requestAnimFrame(_this.ToLeft(120));
          };
        })(this)), 1000 / fps);
      }
    }
  },
  ToRight: function(fps) {
    var fx, fy;
    this.reverse = false;
    fx = this.summ(hero.x, hero.y, this.speed.x, 0).x;
    fy = this.summ(hero.x, hero.y, this.speed.x, 0).y;
    hero.x = fx;
    hero.y = fy;
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    lets.add();
    view.writeRect(hero.x, hero.y, hero.a, hero.b, "#333");
    if (controller.touchX(hero.x, hero.a, "r")) {
      console.log(controller.touchX(hero.x, hero.a, "r"));
    }
    if (fx % 60 === 0) {
      return pass();
    } else {
      return setTimeout(((function(_this) {
        return function() {
          return window.requestAnimFrame(_this.ToRight(120));
        };
      })(this)), 1000 / fps);
    }
  },
  gravity: {
    x: 0,
    y: 2
  },
  speedSpacing: {
    x: 0,
    y: -30
  },
  speed: {
    x: 2,
    y: 0
  },
  reverse: false,
  stopWayRight: false,
  stopWayLeft: false,
  summ: function(dx, dy, rx, ry) {
    return {
      x: dx + rx,
      y: dy + ry
    };
  }
};

controller = {
  touchX: function(x, a, arrow) {
    var i, j, k, len, len1, ref, ref1;
    if (arrow === "r") {
      ref = lets.arr;
      for (j = 0, len = ref.length; j < len; j++) {
        i = ref[j];
        if (x + a > i.x) {
          continue;
        } else {
          if (i != null) {
            if (x + a === i.x) {
              return true;
              break;
            } else {
              return false;
            }
          } else {
            return false;
            break;
          }
        }
      }
    }
    if (arrow === "l") {
      ref1 = lets.arr;
      for (k = 0, len1 = ref1.length; k < len1; k++) {
        i = ref1[k];
        if (x > i.x + i.a) {
          continue;
        } else {
          if (i != null) {
            if (x === i.x + i.a) {
              return true;
              break;
            } else {
              return false;
            }
          } else {
            return false;
            break;
          }
        }
      }
    }
  }
};

conflets = [
  {
    x: 30,
    y: HEIGHT,
    a: 30,
    b: 200,
    color: "red"
  }, {
    x: 500,
    y: HEIGHT,
    a: 300,
    b: 40,
    color: "green"
  }
];

lets = new LETs(conflets);

!(function() {
  view.writeRect(hero.x, hero.y, hero.a, hero.b, "#333");
  document.onkeydown = function(e) {
    if (e.code === "Space") {
      model.spacing();
    }
    if (e.code === "ArrowUp") {
      model.spacing();
    }
    if (e.code === "ArrowLeft") {
      model.ToLeft();
    }
    if (e.code === "ArrowRight") {
      return model.ToRight();
    }
  };
  return lets.add();
})();
