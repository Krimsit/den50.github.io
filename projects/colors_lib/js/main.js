var controller, model, named, newcolor, out, paper, view, wrapColors;

named = document.getElementById('name');

out = document.getElementById('p');

paper = Snap(window.innerWidth, window.innerHeight);

wrapColors = document.getElementById('wrapColors');

newcolor = document.getElementById('newcolor');

view = {
  printReplace: function(out, s) {
    return out.innerHTML = s;
  },
  printAppend: function(out, s) {
    return out.innerHTML += s;
  },
  setBGC: function(el, bgc) {
    return el.style.backgroundColor = bgc;
  },
  animationBlock: function(block, params) {
    block.style.animationName = params.AnimName;
    block.style.animationDuration = (params.AnimDur / 1000) + "s";
    block.style.animationTimingFunction = params.TimeFunc;
    return setTimeout((function() {
      if (params.state === "out") {
        block.style.display = "none";
      }
      if (params.state === "in") {
        return block.style.display = "block";
      }
    }), params.AnimDur);
  }
};

model = {
  self: this,
  consts: {
    color: "#60CF94",
    bgc: "#333",
    styles: {
      fill: '#fff',
      stroke: "#60CF94",
      strokeWidth: 5
    }
  },
  parseColors: function(text) {
    var arr, i, j, len, len1, p, results;
    arr = text.split("\n");
    len = arr.length;
    p = 0;
    results = [];
    for (j = 0, len1 = arr.length; j < len1; j++) {
      i = arr[j];
      console.log(i.substr(0, 1));
      if (i.substr(0, 1) === "#") {
        view.printAppend(wrapColors, "<div class='col-md-3'><div class='item-color items' style='background-color: " + i + "'><h1 class='pos cwhite text-center'>background-color: " + i + "</h1></div></div>");
      } else {
        view.printAppend(wrapColors, "<div class='col-md-3'><div class='item-color items' style='background-color: rgb( " + i + ")'><h1 class='pos cwhite text-center'>background-color: rgb(" + i + ")</h1></div></div>");
      }
      if (p === len - 1) {
        console.log("yes");
        view.printAppend(wrapColors, "<div class='col-md-3'><div class='item-color items' style='background-color: #444'><input type='color' id='newcolor' value='#ff0000'></div></div>");
      }
      results.push(p += 1);
    }
    return results;
  },
  loadFile: function(path) {
    var request;
    request = new XMLHttpRequest();
    request.onreadystatechange = (function(_this) {
      return function() {
        if (request.readyState === 4 && request.status === 200) {
          _this.parseColors(request.responseText);
          return console.log(request.responseText);
        }
      };
    })(this);
    request.open("GET", path, true);
    return request.send();
  }
};

controller = {
  start: function(state) {
    return this.init({
      start: state
    });
  },
  init: function(params) {
    if (params.start === "default") {
      view.animationBlock(named, {
        AnimName: "bounceInDown",
        AnimDur: 700,
        TimeFunc: "ease-in-out",
        state: "in"
      });
      console.log(params);
      view.setBGC(document.body, model.consts.bgc);
      named.onkeyup = function() {
        return view.printReplace(out, this.value.toUpperCase());
      };
    }
    if (params.start === "nowork") {
      document.body.innerHTML = "";
      return console.log("application don't work =(");
    }
  }
};

(function() {
  model.loadFile("libs/colors.txt");
  return setTimeout((function() {
    newcolor = document.getElementById('newcolor');
    console.dir(newcolor);
    newcolor.onchange = function() {
      console.log(this.value);
      this.parentNode.style.backgroundColor = this.value;
      view.printAppend(this.parentNode, "<h1 class='pos2 cwhite text-center'>background-color: " + this.value + "</h1>");
      return this.value = this.value;
    };
    return newcolor.ondrag = function(e) {
      return console.log(e);
    };
  }), 300);
})();
