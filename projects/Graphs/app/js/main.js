var Control, DrawLine, control, coordsNodes, coordsPath, countNodes, countPaths, paper, path, pathT, styles;

paper = Snap();

paper.node.style.height = window.innerHeight;

Control = (function() {
  function Control() {}

  Control.prototype.toggle1 = document.getElementById('toggle1');

  Control.prototype.toggle2 = document.getElementById('toggle2');

  return Control;

})();

control = new Control;

countNodes = {
  node: document.getElementById('countNodes'),
  val: 0,
  write: function() {
    return this.node.innerText = this.val;
  }
};

countPaths = {
  node: document.getElementById('countPaths'),
  val: 0
};

styles = {
  fill: "#2E9F5C",
  stroke: "#333",
  strokeWidth: 3
};

coordsNodes = [];

path = paper.path("").attr({
  stroke: "#222",
  fill: "transparent",
  strokeWidth: 3
});

DrawLine = function(arg, arrCoords) {
  var c1x, c1y, c2x, c2y, i, j, k, len, len1, pathh, t;
  c1x = arg[0], c1y = arg[1], c2x = arg[2], c2y = arg[3];
  console.log([c1x, c1y, c2x, c2y], arrCoords);
  pathh = "";
  for (t = j = 0, len = arrCoords.length; j < len; t = ++j) {
    i = arrCoords[t];
    if ((c1x >= i.cx - 20 && c1x <= i.cx + 20) && (c1y >= i.cy - 20 && c1y <= i.cy + 20)) {
      pathh += "M " + i.cx + ", " + i.cy;
    }
  }
  for (t = k = 0, len1 = arrCoords.length; k < len1; t = ++k) {
    i = arrCoords[t];
    if ((c2x >= i.cx - 20 && c2x <= i.cx + 20) && (c2y >= i.cy - 20 && c2y <= i.cy + 20)) {
      pathh += "L " + i.cx + ", " + i.cy + "Z";
    }
  }
  paper.path(pathh).attr({
    stroke: "#222",
    fill: "transparent",
    strokeWidth: 3
  });
  return console.log(pathh);
};

coordsPath = [];

pathT = 0;

paper.click(function(e) {
  if (!control.toggle1.checked) {
    if (e.target.tagName === "svg" || e.target.tagName === "path") {
      countNodes.val++;
      countNodes.write();
      coordsNodes.push({
        cx: e.clientX,
        cy: e.clientY
      });
      return paper.circle(e.clientX, e.clientY, 20).attr(styles).drag();
    }
  } else {
    if (e.target.tagName === "circle" || e.target.tagName === "path") {
      console.log(e);
      coordsPath.push({
        cx: e.clientX,
        cy: e.clientY
      });
      if (coordsPath.length === 2) {
        DrawLine([coordsPath[0].cx, coordsPath[0].cy, coordsPath[1].cx, coordsPath[1].cy], coordsNodes);
        return coordsPath = [];
      }
    }
  }
});
