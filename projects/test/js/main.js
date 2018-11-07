var ButtonNewE, animationBlock, colors, cr, i, info, main, mainBG, pass, welcome;

ButtonNewE = document.getElementById('create_events');

mainBG = document.getElementsByClassName('mainBG')[0];

pass = document.getElementById('password');

info = document.getElementById('info');

cr = document.getElementById('createNew');

welcome = document.getElementById('Welcome');

colors = ["#2E9F5C", "#60CF94", "#F0A165", "#7EEDD9", "#D36B7D", "#47356C", "#5198A6"];

var passw = "1234";

i = 0;

ButtonNewE.style.display = 'none';

pass.addEventListener('keyup', (function() {
  if (this.value === passw) {
    return main();
  }
}), false);

main = function() {
  var UpdateColors;
  animationBlock(pass, "bounceOutUp", 1000, "ease-in-out", "out");
  setTimeout((function() {
    return animationBlock(ButtonNewE, "fadeIn", 500, "ease-in-out", "in");
  }), 500);
  UpdateColors = function() {
    mainBG.style.background = colors[i];
    i++;
    if (i === colors.length) {
      return i = 0;
    }
  };
  return ButtonNewE.onclick = function() {
    setTimeout((function() {
      animationBlock(info, "fadeIn", 500, "ease-in-out", "in");
      animationBlock(ButtonNewE, "fadeOut", 500, "ease-in-out", "out");
      return setTimeout((function() {
        return animationBlock(welcome, "fadeInDownBig", 1000, "ease-in-out", "in");
      }), 700);
    }), 1000);
    mainBG.style.height = window.innerHeight + "px";
    return setInterval(UpdateColors, 1500);
  };
};

animationBlock = function(block, AnimName, AnimDur, TimeFunc, state) {
  block.style.animationName = AnimName;
  block.style.animationDuration = (AnimDur / 1000) + "s";
  block.style.animationTimingFunction = TimeFunc;
  return setTimeout((function() {
    if (state === "out") {
      block.style.display = "none";
    }
    if (state === "in") {
      return block.style.display = "block";
    }
  }), AnimDur);
};
