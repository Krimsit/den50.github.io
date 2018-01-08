(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var App, React;

React = require('react');

App = require('./app');

React.render(React.createElement(App, null), document.getElementById('app'));



},{"./app":2,"react":"react"}],2:[function(require,module,exports){
var App, Configs, Node, Path, React, ee, history_app, mx;

React = require('react');

ee = require('./global/Events');

Node = require("./figures/Node");

Path = require("./figures/Path");

Configs = require('./config/classes/Configs');

mx = require('./config/modules/matrix.fn');

history_app = require("./config/modules/history.module");

App = React.createClass({
  displayName: 'App',
  getInitialState: function() {
    return {
      Nodes: [],
      Paths: [],
      deletingMode: false,
      modeNodesNumbering: false,
      history_app: [],
      _Matrix: [],
      MatrixNamesNodes: [],
      colorNodes: "#2e9f5c",
      radiusNode: 20,
      IdsPath: [],
      val: 0
    };
  },
  handleClick: function(e) {
    if (e.target.nodeName === "svg" && !this.state.deletingMode) {
      this.setState({
        val: this.state.val + 1
      });
      this.AddNode(e.nativeEvent.offsetX, e.nativeEvent.offsetY, "circle" + this.state.val, this.state.colorNodes, this.state.radiusNode);
    }
    if (e.target.nodeName === "circle" || e.target.nodeName === "text") {
      if (!this.state.deletingMode) {
        return this.AddPath(e.target.id);
      } else {
        return this.DeleteNodeById(e.target.id);
      }
    }
  },
  AddNode: function(cx, cy, id, color, r) {
    this.state.Nodes.push({
      cx: cx,
      cy: cy,
      id: id,
      color: color,
      r: r
    });
    this.setState({
      _Matrix: mx(this.state.MatrixNamesNodes, this.state.Nodes.length)
    });
    return history_app.setEvent({
      cx: cx,
      cy: cy,
      id: id,
      color: color,
      r: r
    }, 'AddNode');
  },
  DeleteLastNode: function() {
    var tmp;
    tmp = this.state.Nodes;
    tmp.splice(tmp.length - 1, tmp.length);
    return this.setState({
      Nodes: tmp
    });
  },
  DeleteNodeById: function(id) {
    var IT, NOW0, NOW1, i, j, k, l, len, len1, len2, len3, len4, len5, m, maxVal, maxValArr, n, num, o, p, q, ref, ref1, s, tmp, tmpMN, w, warr;
    tmp = this.state.Nodes;
    tmpMN = this.state.MatrixNamesNodes;
    ref = this.state.Nodes;
    for (l = k = 0, len = ref.length; k < len; l = ++k) {
      i = ref[l];
      if (id === i.id) {
        history_app.setEvent({
          id: id
        }, "DeleteNodeById");
        tmp.splice(l, 1);
        warr = [];

        /*
        				Delete nodes in Adjacency matrix
        				begin....
         */
        for (w = m = 0, len1 = tmpMN.length; m < len1; w = ++m) {
          q = tmpMN[w];
          if (q[0] === id || q[1] === id) {
            warr.push(w);
          }
        }
        warr.reverse();
        for (n = 0, len2 = warr.length; n < len2; n++) {
          i = warr[n];
          tmpMN.splice(i, 1);
          this.state.Paths.splice(i, 1);
        }

        /*
        				Delete nodes in Adjacency matrix
        				End...
         */
        break;
      }
    }
    for (j = o = 0, len3 = tmp.length; o < len3; j = ++o) {
      i = tmp[j];
      i.id = "circle" + j;
      tmp[j] = i;
    }
    this.setState({
      Nodes: tmp
    });
    maxValArr = [];
    for (j = p = 0, len4 = tmpMN.length; p < len4; j = ++p) {
      i = tmpMN[j];
      IT = +id.match(/\d+/g)[0];
      num = /\d+/g;
      NOW0 = +i[0].match(num)[0];
      NOW1 = +i[1].match(num)[0];
      if (NOW0 > IT) {
        tmpMN[j][0] = "circle" + (NOW0 - 1);
      }
      if (NOW1 > IT) {
        tmpMN[j][1] = "circle" + (NOW1 - 1);
      }
    }
    ref1 = this.state.Nodes;
    for (s = 0, len5 = ref1.length; s < len5; s++) {
      i = ref1[s];
      maxValArr.push(+i.id.match(/\d+/g)[0]);
    }
    maxVal = Math.max.apply(null, maxValArr);
    if (this.state.Nodes.length === 0) {
      this.setState({
        val: 0
      });
    } else {
      this.setState({
        val: maxVal + 1
      });
    }
    this.setState({
      MatrixNamesNodes: tmpMN
    });
    return this.setState({
      _Matrix: mx(this.state.MatrixNamesNodes, this.state.Nodes.length)
    });
  },
  AddPath: function(id) {
    this.state.IdsPath.push(id);
    if (this.state.IdsPath.length === 2) {
      this.DrawPath(this.state.IdsPath);
      this.state.MatrixNamesNodes.push(this.state.IdsPath);
      this.setState({
        _Matrix: mx(this.state.MatrixNamesNodes, this.state.Nodes.length)
      });
      return this.setState({
        IdsPath: []
      });
    }
  },
  DrawPath: function(ids) {
    var coords, cx, cy, i, j, k, len, len1, m, str;
    coords = [];
    str = "M";
    if (ids[0] === ids[1]) {
      coords.push({
        cx: document.getElementById(ids[0]).attributes.cx.value,
        cy: document.getElementById(ids[0]).attributes.cy.value
      });
      cx = +coords[0].cx;
      cy = +coords[0].cy;
      str = "M" + cx + " " + cy + " C " + (cx - 150) + " " + (cy - 150) + ", " + (cx + 150) + " " + (cy - 150) + ", " + cx + " " + cy;
    } else {
      for (k = 0, len = ids.length; k < len; k++) {
        i = ids[k];
        coords.push({
          cx: document.getElementById(i).attributes.cx.value,
          cy: document.getElementById(i).attributes.cy.value
        });
      }
      for (j = m = 0, len1 = coords.length; m < len1; j = ++m) {
        i = coords[j];
        if (j === 0) {
          str += " " + i.cx + ", " + i.cy;
        } else {
          str += "L " + i.cx + ", " + i.cy + "Z";
        }
      }
    }
    history_app.setEvent({
      d: str
    }, "AddPath");
    return this.state.Paths.push(str);
  },
  deletingModeActive: function() {
    var i, k, len, ref, results;
    ref = this.state.Nodes;
    results = [];
    for (k = 0, len = ref.length; k < len; k++) {
      i = ref[k];
      results.push(i.color = "#FF0018");
    }
    return results;
  },
  deletingModeNoActive: function() {
    var i, k, len, ref, results;
    ref = this.state.Nodes;
    results = [];
    for (k = 0, len = ref.length; k < len; k++) {
      i = ref[k];
      results.push(i.color = this.state.colorNodes);
    }
    return results;
  },
  componentWillMount: function() {
    ee.on('changeColorNodes', ((function(_this) {
      return function(color) {
        _this.setState({
          colorNodes: color.color
        });
        return history_app.setEvent({
          color: color.color
        }, 'changeColorNode');
      };
    })(this)));
    ee.on('radiusChangeNode', ((function(_this) {
      return function(r) {
        _this.setState({
          radiusNode: r.r
        });
        return history_app.setEvent({
          r: r.r
        }, 'changeRadiusNode');
      };
    })(this)));
    ee.on("changeDeletingMode", (function(_this) {
      return function(data) {
        _this.setState({
          deletingMode: data.data
        });
        if (data.data) {
          return _this.deletingModeActive();
        } else {
          return _this.deletingModeNoActive();
        }
      };
    })(this));
    ee.on("ChangeModeNodesNumbering", (function(_this) {
      return function(data) {
        return _this.setState({
          modeNodesNumbering: data.data
        });
      };
    })(this));
    return ee.on('changeHistory', (function(_this) {
      return function(data) {
        return _this.setState({
          history_app: data.data
        });
      };
    })(this));
  },
  render: function() {
    return React.createElement("div", {
      "id": "wrap"
    }, React.createElement("svg", {
      "height": "100%",
      "version": "1.1",
      "width": "100%",
      "xmlns": "http://www.w3.org/2000/svg",
      "onClick": ((function(_this) {
        return function(e) {
          return _this.handleClick(e);
        };
      })(this))
    }, React.createElement("desc", null, "Created with Daniil(den50)"), React.createElement("defs", null), this.state.Paths.map(function(i) {
      return React.createElement(Path, {
        "d": i
      });
    }), this.state.Nodes.map((function(_this) {
      return function(i) {
        return React.createElement(Node, {
          "cx": i.cx,
          "cy": i.cy,
          "id": i.id,
          "bgc": i.color,
          "r": i.r,
          "numberingNodesMode": _this.state.modeNodesNumbering
        });
      };
    })(this))), React.createElement(Configs, {
      "matrix": this.state._Matrix,
      "history": this.state.history_app,
      "key": "Configs"
    }));
  }
});

module.exports = App;



},{"./config/classes/Configs":3,"./config/modules/history.module":9,"./config/modules/matrix.fn":10,"./figures/Node":11,"./figures/Path":12,"./global/Events":13,"react":"react"}],3:[function(require,module,exports){
var COLORS, Colors, Configs, History, Matrix, Mods, RadiusChanger, React, ee;

React = require('react');

ee = require('../../global/Events');

Colors = require("./colors");

Matrix = require('./matrix.class');

RadiusChanger = require("./RadiusChanger");

History = require('./history.class');

Mods = require("./mods.class");

COLORS = ["#2e9f5c", "#47356C", "#FF0018", "#0DF6FF", "#440BDB", "#FFAA0D"];

Configs = React.createClass({
  displayName: 'Configs',
  getInitialState: function() {
    return {
      active: 0,
      Items: [],
      colorNow: "#2e9f5c",
      Matrix: []
    };
  },
  handleChangeColor: function(id) {
    var i, j, k, len, ref, results;
    this.setState({
      active: id
    });
    ref = this.state.Items;
    results = [];
    for (j = k = 0, len = ref.length; k < len; j = ++k) {
      i = ref[j];
      if (i.active) {
        this.state.Items[j].active = false;
        continue;
      }
      if (i.id === id) {
        this.state.Items[j].active = true;
        this.setState({
          colorNow: i.color
        });
        results.push(ee.emit("changeColorNodes", {
          color: i.color
        }));
      } else {
        results.push(void 0);
      }
    }
    return results;
  },
  componentWillMount: function() {
    var i, j, k, len, results;
    results = [];
    for (j = k = 0, len = COLORS.length; k < len; j = ++k) {
      i = COLORS[j];
      results.push(this.state.Items.push({
        color: i,
        id: j,
        active: j === 0 ? true : false
      }));
    }
    return results;
  },
  render: function() {
    return React.createElement("div", {
      "className": "wrap_configs"
    }, React.createElement("div", {
      "className": "configs"
    }, React.createElement(Colors, {
      "colors": this.state.Items,
      "onChange": ((function(_this) {
        return function(id) {
          return _this.handleChangeColor(id);
        };
      })(this)),
      "key": "Colors"
    }), React.createElement("hr", null), React.createElement(RadiusChanger, {
      "key": "RadiusChanger"
    }), React.createElement("hr", null), React.createElement(Mods, null), React.createElement("hr", null), React.createElement(Matrix, {
      "matrix": this.props.matrix,
      "key": "Matrix"
    }), React.createElement("hr", null), React.createElement(History, {
      "data": this.props.history,
      "key": "History"
    })));
  }
});

module.exports = Configs;



},{"../../global/Events":13,"./RadiusChanger":4,"./colors":5,"./history.class":6,"./matrix.class":7,"./mods.class":8,"react":"react"}],4:[function(require,module,exports){
var RadiusChanger, React, ee;

React = require('react');

ee = require('../../global/Events');

RadiusChanger = React.createClass({
  displayName: "RadiusChanger",
  getInitialState: function() {
    return {
      RadiusNow: 20,
      range: {}
    };
  },
  handleChange: function(e) {
    this.setState({
      RadiusNow: +e.target.value
    });
    return ee.emit('radiusChangeNode', {
      r: +e.target.value
    });
  },
  handleClickReset: function() {
    this.setState({
      RadiusNow: 20
    });
    document.getElementById('InRange').value = 20;
    return ee.emit('radiusChangeNode', {
      r: 20
    });
  },
  render: function() {
    return React.createElement("div", {
      "className": "wrapRadiusChanger"
    }, React.createElement("span", {
      "id": "span_switch_color"
    }, "Change radius nodes:"), React.createElement("br", null), React.createElement("span", {
      "className": "showRadius"
    }, this.state.RadiusNow), React.createElement("button", {
      "onClick": this.handleClickReset,
      "className": "resetRadiusNode"
    }, "Reset"), React.createElement("input", {
      "type": "range",
      "min": "10",
      "max": "30",
      "id": "InRange",
      "step": "1",
      "onChange": ((function(_this) {
        return function(e) {
          return _this.handleChange(e);
        };
      })(this))
    }));
  }
});

module.exports = RadiusChanger;



},{"../../global/Events":13,"react":"react"}],5:[function(require,module,exports){
var Colors, React;

React = require('react');

Colors = React.createClass({
  displayName: 'Colors',
  handleSwitch: function(id) {
    return console.log(id);
  },
  render: function() {
    return React.createElement("div", {
      "className": "colors_switch"
    }, React.createElement("span", {
      "id": "span_switch_color"
    }, "Switch color nodes:"), React.createElement("br", null), this.props.colors.map((function(_this) {
      return function(i, j) {
        return React.createElement("div", {
          "style": {
            backgroundColor: i.color
          },
          "className": (i.active ? "color_item active" : "color_item"),
          "onClick": _this.props.onChange.bind(null, i.id),
          "key": "Color" + j
        });
      };
    })(this)));
  }
});

module.exports = Colors;



},{"react":"react"}],6:[function(require,module,exports){
var History, React;

React = require('react');

History = React.createClass({
  displayName: "History",
  render: function() {
    return React.createElement("div", {
      "className": "wrap_history"
    }, React.createElement("div", {
      "className": "history"
    }, this.props.data.map(function(i, j) {
      return React.createElement("div", {
        "className": "history_item",
        "key": "item" + j
      }, i.type, ": ", i.MainData);
    })));
  }
});

module.exports = History;



},{"react":"react"}],7:[function(require,module,exports){
var Matrix, React;

React = require('react');

Matrix = React.createClass({
  displayName: "Matrix",
  render: function() {
    return React.createElement("div", {
      "className": "wrapMatrix"
    }, React.createElement("i", {
      "class": "fa fa-th",
      "aria-hidden": "true"
    }), React.createElement("table", {
      "className": "Matrix"
    }, this.props.matrix.map(function(i, l) {
      return React.createElement("tr", {
        "key": "tr" + l
      }, i.map(function(j, p) {
        return React.createElement("td", {
          "key": "td" + p
        }, j);
      }));
    })));
  }
});

module.exports = Matrix;



},{"react":"react"}],8:[function(require,module,exports){
var Deleting, React, ee, history_app;

React = require("react");

ee = require('../../global/Events');

history_app = require("../modules/history.module");

Deleting = React.createClass({
  displayName: "Mods",
  handleChangeDeleting: function(e) {
    history_app.setEvent({
      deletingMode: e.target.checked
    }, "deleteMode");
    return ee.emit('changeDeletingMode', {
      data: e.target.checked
    });
  },
  handleChangeModeNodesNumbering: function(e) {
    history_app.setEvent({
      modeNodesNumbering: e.target.checked
    }, "modeNodesNumbering");
    return ee.emit('ChangeModeNodesNumbering', {
      data: e.target.checked
    });
  },
  render: function() {
    return React.createElement("div", {
      "className": "wrapMods"
    }, React.createElement("i", {
      "class": "fa fa-sliders",
      "aria-hidden": "true"
    }), React.createElement("div", {
      "className": "wrapDeleting"
    }, React.createElement("div", {
      "className": "labelFor"
    }, React.createElement("span", null, "Deleting Mode: ")), React.createElement("div", {
      "className": "toggleWrapper"
    }, React.createElement("input", {
      "type": "checkbox",
      "name": "toggle2",
      "className": "mobileToggle",
      "id": "toggle2",
      "onChange": ((function(_this) {
        return function(e) {
          return _this.handleChangeDeleting(e);
        };
      })(this))
    }))), React.createElement("div", {
      "className": "wrapModeNodesNumbering"
    }, React.createElement("div", {
      "className": "labelFor"
    }, React.createElement("span", null, "ModeNodesNumbering: ")), React.createElement("div", {
      "className": "toggleWrapper"
    }, React.createElement("input", {
      "type": "checkbox",
      "name": "toggle2",
      "className": "mobileToggle",
      "id": "toggle2",
      "onChange": ((function(_this) {
        return function(e) {
          return _this.handleChangeModeNodesNumbering(e);
        };
      })(this))
    }))));
  }
});

module.exports = Deleting;



},{"../../global/Events":13,"../modules/history.module":9,"react":"react"}],9:[function(require,module,exports){
var History_class, ee, history_app;

ee = require("../../global/Events");


/*
HISTORY = [
	{ type: "AddNode", date: "21:3:58", id: "circle0" }
	{ type: "AddNode", date: "21:3:59", id: "circle1" }
	{ type: "AddPath", date: "21:4:11" }
]
 */

History_class = (function() {
  function History_class() {
    this.HISTORY = [];
    this.Configs = {
      use: ["user", "App"]
    };
    this.types_history = ["AddNode", "AddPath", "DeleteNode", "changeColorNode", "changeRadiusNode"];
  }

  History_class.prototype.setEvent = function(obj, type_event) {
    var strDate, tmp, tmpstrDate;
    tmp = {};
    tmpstrDate = new Date;
    strDate = "" + tmpstrDate.getHours() + ":" + tmpstrDate.getMinutes() + ":" + tmpstrDate.getSeconds();
    tmp["type"] = type_event;
    if (type_event === "AddNode") {
      tmp["MainData"] = obj.id;
    }
    if (type_event === "changeColorNode") {
      tmp["MainData"] = obj.color;
    }
    if (type_event === "AddPath") {
      tmp["MainData"] = obj.d;
    }
    if (type_event === "changeRadiusNode") {
      tmp["MainData"] = obj.r;
    }
    if (type_event === "deleteMode") {
      tmp["MainData"] = "" + obj.deletingMode;
    }
    if (type_event === "DeleteNodeById") {
      tmp["MainData"] = obj.id;
    }
    if (type_event === "modeNodesNumbering") {
      tmp["MainData"] = "" + obj.modeNodesNumbering;
    }
    tmp["date"] = strDate;
    if (obj.id != null) {
      tmp['id'] = obj.id;
    }
    this.HISTORY.push(tmp);
    return ee.emit('changeHistory', {
      data: this.HISTORY
    });
  };

  History_class.prototype.getHistory = function() {
    return this.HISTORY;
  };

  return History_class;

})();

history_app = new History_class;

module.exports = history_app;



},{"../../global/Events":13}],10:[function(require,module,exports){

/*
matrix = [
	   0  1  2  3
	0 [1, 1, 0, 1]
	1 [1, 0, 0, 1]
	2 [0, 1, 0, 1]
	3 [1, 1, 1, 0]
]

tmp_all = ""
	for i in arr
		tmp_all+= i[0]
		tmp_all+= i[1]
	console.log tmp_all
	arr_ints = tmp_all.match /\d+/g
	for i, j in arr_ints
		arr_ints[j] = +i
 */
var getMatrix;

getMatrix = function(arr, n) {
  var Mx, RevArr, i, j, k, l, len, len1, len2, len3, len4, len5, len6, m, o, p, q, r, ref, ref1, ref2, ref3, ref4, ref5, s, t, tmpArr, tmpObj, u;
  if (n > 0) {
    Mx = [];
    tmpObj = {};
    for (i = k = 0, ref = n - 1; 0 <= ref ? k <= ref : k >= ref; i = 0 <= ref ? ++k : --k) {
      tmpObj["circle" + i] = {};
      for (q = l = 0, ref1 = n - 1; 0 <= ref1 ? l <= ref1 : l >= ref1; q = 0 <= ref1 ? ++l : --l) {
        tmpObj["circle" + i]["circle" + q] = 0;
      }
    }
    for (j = m = 0, len = arr.length; m < len; j = ++m) {
      i = arr[j];
      ref2 = Object.keys(tmpObj);
      for (o = 0, len1 = ref2.length; o < len1; o++) {
        q = ref2[o];
        if (i[0] === q) {
          tmpObj[q][i[1]] = 1;
        }
      }
    }
    RevArr = [];
    for (p = 0, len2 = arr.length; p < len2; p++) {
      i = arr[p];
      RevArr.push([i[1], i[0]]);
    }
    for (j = r = 0, len3 = RevArr.length; r < len3; j = ++r) {
      i = RevArr[j];
      ref3 = Object.keys(tmpObj);
      for (s = 0, len4 = ref3.length; s < len4; s++) {
        q = ref3[s];
        if (i[0] === q) {
          tmpObj[q][i[1]] = 1;
        }
      }
    }
    ref4 = Object.keys(tmpObj);
    for (t = 0, len5 = ref4.length; t < len5; t++) {
      i = ref4[t];
      tmpArr = [];
      ref5 = Object.keys(tmpObj[i]);
      for (u = 0, len6 = ref5.length; u < len6; u++) {
        j = ref5[u];
        tmpArr.push(tmpObj[i][j]);
      }
      Mx.push(tmpArr);
    }
    return Mx;
  } else {
    return [];
  }
};

module.exports = getMatrix;



},{}],11:[function(require,module,exports){
var Node, React;

React = require('react');

Node = React.createClass({
  displayName: 'Node',
  render: function() {
    if (this.props.numberingNodesMode) {
      return React.createElement("g", null, React.createElement("circle", {
        "cx": this.props.cx,
        "cy": this.props.cy,
        "r": this.props.r,
        "fill": this.props.bgc,
        "id": this.props.id
      }), React.createElement("text", {
        "x": this.props.cx,
        "y": this.props.cy - 3,
        "id": this.props.id,
        "stroke": "#fff",
        "fill": "#fff",
        "textAnchor": "middle",
        "alignmentBaseline": "middle",
        "dy": ".6em",
        "fontFamily": "sans-serif",
        "fontSize": "17px"
      }, (this.props.id.match(/\d+/g)[0])));
    } else {
      return React.createElement("circle", {
        "cx": this.props.cx,
        "cy": this.props.cy,
        "r": this.props.r,
        "fill": this.props.bgc,
        "id": this.props.id
      });
    }
  }
});

module.exports = Node;



},{"react":"react"}],12:[function(require,module,exports){
var Path, React;

React = require('react');

Path = React.createClass({
  displayName: 'Path',
  render: function() {
    return React.createElement("path", {
      "d": this.props.d,
      "fill": "transparent",
      "stroke": "black",
      "style": {
        strokeWidth: 2
      }
    });
  }
});

module.exports = Path;



},{"react":"react"}],13:[function(require,module,exports){
var EventEmitter, ee;

EventEmitter = require("events").EventEmitter;

ee = new EventEmitter;

module.exports = ee;



},{"events":14}],14:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

function EventEmitter() {
  this._events = this._events || {};
  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
EventEmitter.defaultMaxListeners = 10;

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function(n) {
  if (!isNumber(n) || n < 0 || isNaN(n))
    throw TypeError('n must be a positive number');
  this._maxListeners = n;
  return this;
};

EventEmitter.prototype.emit = function(type) {
  var er, handler, len, args, i, listeners;

  if (!this._events)
    this._events = {};

  // If there is no 'error' event listener then throw.
  if (type === 'error') {
    if (!this._events.error ||
        (isObject(this._events.error) && !this._events.error.length)) {
      er = arguments[1];
      if (er instanceof Error) {
        throw er; // Unhandled 'error' event
      }
      throw TypeError('Uncaught, unspecified "error" event.');
    }
  }

  handler = this._events[type];

  if (isUndefined(handler))
    return false;

  if (isFunction(handler)) {
    switch (arguments.length) {
      // fast cases
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      // slower
      default:
        len = arguments.length;
        args = new Array(len - 1);
        for (i = 1; i < len; i++)
          args[i - 1] = arguments[i];
        handler.apply(this, args);
    }
  } else if (isObject(handler)) {
    len = arguments.length;
    args = new Array(len - 1);
    for (i = 1; i < len; i++)
      args[i - 1] = arguments[i];

    listeners = handler.slice();
    len = listeners.length;
    for (i = 0; i < len; i++)
      listeners[i].apply(this, args);
  }

  return true;
};

EventEmitter.prototype.addListener = function(type, listener) {
  var m;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events)
    this._events = {};

  // To avoid recursion in the case that type === "newListener"! Before
  // adding it to the listeners, first emit "newListener".
  if (this._events.newListener)
    this.emit('newListener', type,
              isFunction(listener.listener) ?
              listener.listener : listener);

  if (!this._events[type])
    // Optimize the case of one listener. Don't need the extra array object.
    this._events[type] = listener;
  else if (isObject(this._events[type]))
    // If we've already got an array, just append.
    this._events[type].push(listener);
  else
    // Adding the second element, need to change to array.
    this._events[type] = [this._events[type], listener];

  // Check for listener leak
  if (isObject(this._events[type]) && !this._events[type].warned) {
    var m;
    if (!isUndefined(this._maxListeners)) {
      m = this._maxListeners;
    } else {
      m = EventEmitter.defaultMaxListeners;
    }

    if (m && m > 0 && this._events[type].length > m) {
      this._events[type].warned = true;
      console.error('(node) warning: possible EventEmitter memory ' +
                    'leak detected. %d listeners added. ' +
                    'Use emitter.setMaxListeners() to increase limit.',
                    this._events[type].length);
      if (typeof console.trace === 'function') {
        // not supported in IE 10
        console.trace();
      }
    }
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function(type, listener) {
  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  var fired = false;

  function g() {
    this.removeListener(type, g);

    if (!fired) {
      fired = true;
      listener.apply(this, arguments);
    }
  }

  g.listener = listener;
  this.on(type, g);

  return this;
};

// emits a 'removeListener' event iff the listener was removed
EventEmitter.prototype.removeListener = function(type, listener) {
  var list, position, length, i;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events || !this._events[type])
    return this;

  list = this._events[type];
  length = list.length;
  position = -1;

  if (list === listener ||
      (isFunction(list.listener) && list.listener === listener)) {
    delete this._events[type];
    if (this._events.removeListener)
      this.emit('removeListener', type, listener);

  } else if (isObject(list)) {
    for (i = length; i-- > 0;) {
      if (list[i] === listener ||
          (list[i].listener && list[i].listener === listener)) {
        position = i;
        break;
      }
    }

    if (position < 0)
      return this;

    if (list.length === 1) {
      list.length = 0;
      delete this._events[type];
    } else {
      list.splice(position, 1);
    }

    if (this._events.removeListener)
      this.emit('removeListener', type, listener);
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function(type) {
  var key, listeners;

  if (!this._events)
    return this;

  // not listening for removeListener, no need to emit
  if (!this._events.removeListener) {
    if (arguments.length === 0)
      this._events = {};
    else if (this._events[type])
      delete this._events[type];
    return this;
  }

  // emit removeListener for all listeners on all events
  if (arguments.length === 0) {
    for (key in this._events) {
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners('removeListener');
    this._events = {};
    return this;
  }

  listeners = this._events[type];

  if (isFunction(listeners)) {
    this.removeListener(type, listeners);
  } else {
    // LIFO order
    while (listeners.length)
      this.removeListener(type, listeners[listeners.length - 1]);
  }
  delete this._events[type];

  return this;
};

EventEmitter.prototype.listeners = function(type) {
  var ret;
  if (!this._events || !this._events[type])
    ret = [];
  else if (isFunction(this._events[type]))
    ret = [this._events[type]];
  else
    ret = this._events[type].slice();
  return ret;
};

EventEmitter.listenerCount = function(emitter, type) {
  var ret;
  if (!emitter._events || !emitter._events[type])
    ret = 0;
  else if (isFunction(emitter._events[type]))
    ret = 1;
  else
    ret = emitter._events[type].length;
  return ret;
};

function isFunction(arg) {
  return typeof arg === 'function';
}

function isNumber(arg) {
  return typeof arg === 'number';
}

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

function isUndefined(arg) {
  return arg === void 0;
}

},{}]},{},[1]);
