(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var App, React, a;

React = require('react');

App = require('./app');

a = 10;

React.render(React.createElement(App, null), document.getElementById('app'));



},{"./app":2,"react":"react"}],2:[function(require,module,exports){
var App, Configs, Node, Path, React, amx, ee, generating_nodes, generating_paths, getWeight, history_app, switcher;

React = require('react');

ee = require('./global/Events');

Node = require("./figures/Node");

Path = require("./figures/Path");

getWeight = require("./config/modules/calcWeightPaths.fn");

Configs = require('./config/classes/Configs');

amx = require('./config/modules/adjacency_matrix.fn');

history_app = require("./config/modules/history.module");

switcher = require("./config/modules/switcher.controller");

generating_nodes = require("./config/modules/generate.fn").get_Nodes_sequence;

generating_paths = require("./config/modules/generate.fn").write_paths;

App = React.createClass({
  displayName: 'App',
  getInitialState: function() {
    return {
      Nodes: [],
      Paths: [],
      deletingMode: false,
      modeNodesNumbering: false,
      calcWeightMode: false,
      addItemMapMode: false,
      ALGNOW: "dejkstra",
      STARTNode: "",
      history_app: [],
      _Matrix: [],
      MatrixNamesNodes: [],
      maps: [],
      colorNodes: "#2e9f5c",
      radiusNode: 20,
      IdsPath: [],
      val: 0
    };
  },
  handleClick: function(e) {
    var i, j, k, len, len1, len2, m, n, ref, ref1, ref2, results, results1, tmp;
    if (e.target.nodeName === "svg" && !this.state.deletingMode) {
      this.setState({
        val: this.state.val + 1
      });
      this.AddNode(e.nativeEvent.offsetX, e.nativeEvent.offsetY, "circle" + this.state.val, this.state.colorNodes, this.state.radiusNode);
    }
    if (e.target.nodeName === "circle" || e.target.nodeName === "text") {
      if (this.state.addItemMapMode) {
        this.setState({
          STARTNode: e.target.attributes.id.nodeValue
        });
        switcher.regist(e.target.attributes.id.nodeValue);
        if (this.state.STARTNode === "") {
          ref = this.state.Nodes;
          results = [];
          for (j = k = 0, len = ref.length; k < len; j = ++k) {
            i = ref[j];
            if (i.id === e.target.attributes.id.nodeValue) {
              tmp = this.state.Nodes;
              tmp[j].color = "#FF0018";
              this.setState({
                Nodes: tmp
              });
              this.state.maps.push(i);
              break;
            } else {
              results.push(void 0);
            }
          }
          return results;
        } else {
          ref1 = this.state.Nodes;
          for (j = m = 0, len1 = ref1.length; m < len1; j = ++m) {
            i = ref1[j];
            if (i.id === this.state.STARTNode) {
              tmp = this.state.Nodes;
              tmp[j].color = this.state.colorNodes;
              this.setState({
                Nodes: tmp
              });
              this.state.maps.push(i);
              break;
            }
          }
          ref2 = this.state.Nodes;
          results1 = [];
          for (j = n = 0, len2 = ref2.length; n < len2; j = ++n) {
            i = ref2[j];
            if (i.id === e.target.attributes.id.nodeValue) {
              tmp = this.state.Nodes;
              tmp[j].color = "#FF0018";
              this.setState({
                Nodes: tmp
              });
              this.state.maps.push(i);
              break;
            } else {
              results1.push(void 0);
            }
          }
          return results1;
        }
      } else {
        if (e.altKey) {
          return this.DeleteNodeById(e.target.id);
        } else {
          if (!this.state.deletingMode) {
            return this.AddPath(e.target.id);
          } else {
            return this.DeleteNodeById(e.target.id);
          }
        }
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
      _Matrix: amx(this.state.MatrixNamesNodes, this.state.Paths, this.state.Nodes.length, this.state.calcWeightMode)
    });
    history_app.setEvent({
      cx: cx,
      cy: cy,
      id: id,
      color: color,
      r: r
    }, 'AddNode');
    return switcher.setArrMx(this.state._Matrix);
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
      _Matrix: amx(this.state.MatrixNamesNodes, this.state.Paths, this.state.Nodes.length, this.state.calcWeightMode)
    });
  },
  AddPath: function(id) {
    this.state.IdsPath.push(id);
    if (this.state.IdsPath.length === 2) {
      this.DrawPath(this.state.IdsPath);
      this.state.MatrixNamesNodes.push(this.state.IdsPath);
      switcher.regist(this.state.MatrixNamesNodes);
      this.setState({
        _Matrix: amx(this.state.MatrixNamesNodes, this.state.Paths, this.state.Nodes.length, this.state.calcWeightMode)
      });
      return this.setState({
        IdsPath: []
      });
    }
  },
  DrawPath: function(ids) {
    var __xy, _xy, coords, cx, cy, i, j, k, len, len1, len2, m, n, ref, self, str;
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
    _xy = {
      x: 0,
      y: 0
    };
    __xy = {
      x: 0,
      y: 0
    };
    ref = this.state.Nodes;
    for (n = 0, len2 = ref.length; n < len2; n++) {
      i = ref[n];
      if (ids[0] === i.id) {
        _xy.x = i.cx;
        _xy.y = i.cy;
      }
      if (ids[1] === i.id) {
        __xy.x = i.cx;
        __xy.y = i.cy;
      }
    }
    self = this;
    this.state.Paths.push({
      d: str,
      coords1: {
        x: _xy.x,
        y: _xy.y
      },
      coords2: {
        x: __xy.x,
        y: __xy.y
      },
      weight: getWeight([
        {
          x: _xy.x,
          y: _xy.y
        }, {
          x: __xy.x,
          y: __xy.y
        }
      ]),
      color: "#000",
      fill: self.state.colorNodes,
      id: ids[0] + "." + ids[1]
    });
    switcher.regist(this.state.Paths);
    return switcher.setArrMx(this.state._Matrix);
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
    ee.on("ChangeCalcWeightPathsMode", (function(_this) {
      return function(data) {
        _this.setState({
          calcWeightMode: data.data
        });
        return _this.setState({
          _Matrix: amx(_this.state.MatrixNamesNodes, _this.state.Paths, _this.state.Nodes.length, data.data)
        });
      };
    })(this));
    ee.on("AddItemMapMode", (function(_this) {
      return function(data) {
        var i, j, k, len, ref, results, tmp;
        _this.setState({
          addItemMapMode: data.data
        });
        if (!data.data) {
          ref = _this.state.Nodes;
          results = [];
          for (j = k = 0, len = ref.length; k < len; j = ++k) {
            i = ref[j];
            if (i.color === "#FF0018") {
              tmp = _this.state.Nodes;
              tmp[j].color = _this.state.colorNodes;
              results.push(_this.setState({
                Nodes: tmp
              }));
            } else {
              results.push(void 0);
            }
          }
          return results;
        }
      };
    })(this));
    ee.on('changeHistory', (function(_this) {
      return function(data) {
        return _this.setState({
          history_app: data.data
        });
      };
    })(this));
    ee.on('switchAlgorithm', (function(_this) {
      return function(data) {
        _this.setState({
          ALGNOW: data.type
        });
        switcher.setArrMx(_this.state._Matrix);
        return switcher.init(data.type);
      };
    })(this));
    return ee.on("generate", (function(_this) {
      return function(data) {
        return _this.generateGraph(data.data.nodes_count, data.data.paths_count);
      };
    })(this));
  },
  generateGraph: function(nodes_count, paths_count) {
    var i, j, k, len, ref;
    ref = generating_nodes(nodes_count, 30, 30, {
      width: window.innerWidth * 0.8,
      height: window.innerHeight
    });
    for (j = k = 0, len = ref.length; k < len; j = ++k) {
      i = ref[j];
      this.AddNode(i.cx, i.cy, "circle" + j, this.state.colorNodes, 20);
    }
    return setTimeout(((function(_this) {
      return function() {
        var len1, m, ref1, results;
        _this.setState({
          MatrixNamesNodes: generating_paths(paths_count, nodes_count)
        });
        switcher.regist(_this.state.MatrixNamesNodes);
        ref1 = generating_paths(paths_count, nodes_count);
        results = [];
        for (m = 0, len1 = ref1.length; m < len1; m++) {
          i = ref1[m];
          results.push(_this.DrawPath(i));
        }
        return results;
      };
    })(this)), 1500);
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
    }, React.createElement("desc", null, "Created with Daniil(https:\x2F\x2Fgithub.com\x2Fden50)"), React.createElement("defs", null), this.state.Paths.map((function(_this) {
      return function(i) {
        return React.createElement(Path, {
          "d": i.d,
          "_xy": i.coords1,
          "__xy": i.coords2,
          "weight": i.weight,
          "fill": i.fill,
          "CalcWeightMode": _this.state.calcWeightMode,
          "id": i.id,
          "color": i.color
        });
      };
    })(this)), this.state.Nodes.map((function(_this) {
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
      "database": {
        nodes: this.state.Nodes,
        paths: this.state.Paths
      },
      "maps": this.state.maps
    }));
  }
});

module.exports = App;


/*
copyright; Daniil Shenyagin, 2018
 */



},{"./config/classes/Configs":3,"./config/modules/adjacency_matrix.fn":9,"./config/modules/calcWeightPaths.fn":13,"./config/modules/generate.fn":14,"./config/modules/history.module":15,"./config/modules/switcher.controller":16,"./figures/Node":17,"./figures/Path":18,"./global/Events":19,"react":"react"}],3:[function(require,module,exports){
var COLORS, Colors, Configs, Info, Matrix, Mods, RadiusChanger, React, ee;

React = require('react');

ee = require('../../global/Events');

Colors = require("./colors");

Matrix = require('./matrix.class');

RadiusChanger = require("./RadiusChanger");

Info = require('./info.class');

Mods = require("./mods.class");

COLORS = ["#2e9f5c", "#2866F7", "#C9283E", "#0DF6FF", "#023852", ["#FFAA0D", "#2B9483", "#F53855"]];

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
    }), React.createElement("hr", null), React.createElement(Info, {
      "history": this.props.history,
      "key": "Info",
      "database": this.props.database,
      "maps": this.props.maps,
      "dataAlg": this.props.dataAlg
    }), React.createElement("p", {
      "className": "copyright_configs"
    }, "©Daniil Shenyagin, 2018")));
  }
});

module.exports = Configs;



},{"../../global/Events":19,"./RadiusChanger":4,"./colors":5,"./info.class":6,"./matrix.class":7,"./mods.class":8,"react":"react"}],4:[function(require,module,exports){
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



},{"../../global/Events":19,"react":"react"}],5:[function(require,module,exports){
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
        if (typeof i.color === "string") {
          return React.createElement("div", {
            "style": {
              backgroundColor: i.color
            },
            "className": (i.active ? "color_item active" : "color_item"),
            "onClick": _this.props.onChange.bind(null, i.id),
            "key": "Color" + j
          });
        } else {
          return React.createElement("div", {
            "style": {
              backgroundColor: i.color[0]
            },
            "className": (i.active ? "color_item active" : "color_item"),
            "onClick": _this.props.onChange.bind(null, i.id),
            "key": "Color" + j
          });
        }
      };
    })(this)));
  }
});

module.exports = Colors;



},{"react":"react"}],6:[function(require,module,exports){
var Info, React, ee;

React = require('react');

ee = require("../../global/Events");

Info = React.createClass({
  displayName: "Info",
  getInitialState: function() {
    return {
      itemNow: "history",
      typeAlg: "",
      dataAlg: {},
      timeAlg: 0,
      middleTimeAlg: 0,
      noTest: 1,
      dataGenerate: {}
    };
  },
  switchItem: function(obj) {
    var i, k, len, tmp;
    tmp = obj.e.target.classList.value.split(' ');
    for (k = 0, len = tmp.length; k < len; k++) {
      i = tmp[k];
      if (i !== "IconActionGold") {
        continue;
      } else {
        tmp.push("IconActionGold");
        break;
      }
    }
    obj.e.target.classList.value = tmp.join(" ");
    if (this.state.itemNow !== obj.type) {
      return this.setState({
        itemNow: obj.type
      });
    }
  },
  getPaths_max: function(n) {
    var N, i, k, n1, ref;
    if (n > 3) {
      n1 = 3;
      N = 3;
      for (i = k = 0, ref = n - 4; 0 <= ref ? k <= ref : k >= ref; i = 0 <= ref ? ++k : --k) {
        N += n1;
        n1++;
      }
      return N;
    } else {
      return -1;
    }
  },
  getValGenerate: function(e, obj) {
    var data;
    data = this.state.dataGenerate || {};
    data[obj.type] = e.target.value;
    return this.setState({
      dataGenerate: data
    });
  },
  generate_graph: function(e) {
    ee.emit("generate", {
      data: this.state.dataGenerate
    });
    return console.log(this.state.dataGenerate);
  },
  componentWillMount: function() {
    return ee.on("sendDataAlgs", (function(_this) {
      return function(data) {
        _this.setState({
          itemNow: "map"
        });
        console.log(data);
        if (_this.state.typeAlg === data.type) {
          _this.setState({
            middleTimeAlg: (_this.state.middleTimeAlg + data.time) / 2
          });
        } else {
          _this.state.middleTimeAlg = 0;
        }
        if (_this.state.typeAlg === data.type) {
          _this.setState({
            noTest: _this.state.noTest + 1
          });
        } else {
          _this.setState({
            noTest: 1
          });
        }
        _this.setState({
          typeAlg: data.type
        });
        _this.setState({
          dataAlg: data.data
        });
        return _this.setState({
          timeAlg: data.time
        });
      };
    })(this));
  },
  render: function() {
    return React.createElement("div", {
      "className": "wrapInfo"
    }, React.createElement("i", {
      "className": (this.state.itemNow === "history" ? "fa fa-history itemInfoIcon IconActionGold" : "fa fa-history itemInfoIcon"),
      "title": "history",
      "onClick": ((function(_this) {
        return function(e) {
          return _this.switchItem({
            type: "history",
            e: e
          });
        };
      })(this))
    }), React.createElement("i", {
      "className": (this.state.itemNow === "database" ? "fa fa-database itemInfoIcon IconActionGold" : "fa fa-database itemInfoIcon"),
      "title": "database",
      "onClick": ((function(_this) {
        return function(e) {
          return _this.switchItem({
            type: "database",
            e: e
          });
        };
      })(this))
    }), React.createElement("i", {
      "className": (this.state.itemNow === "map" ? "fa fa-map itemInfoIcon IconActionGold" : "fa fa-map itemInfoIcon"),
      "title": "map",
      "onClick": ((function(_this) {
        return function(e) {
          return _this.switchItem({
            type: "map",
            e: e
          });
        };
      })(this))
    }), React.createElement("i", {
      "className": (this.state.itemNow === "generate" ? "fa fa-plus itemInfoIcon IconActionGold" : "fa fa-plus itemInfoIcon"),
      "title": "generate",
      "onClick": ((function(_this) {
        return function(e) {
          return _this.switchItem({
            type: "generate",
            e: e
          });
        };
      })(this))
    }), (this.state.itemNow === "history" ? React.createElement("div", {
      "className": "wrap_history"
    }, React.createElement("div", {
      "className": "history"
    }, this.props.history.map(function(i, j) {
      return React.createElement("div", {
        "className": "history_item",
        "key": "item" + j
      }, i.type, ": ", i.MainData);
    }))) : this.state.itemNow === "database" ? React.createElement("div", null, React.createElement("span", null, "Count nodes: ", this.props.database.nodes.length), React.createElement("br", null), React.createElement("span", null, "Count paths: ", this.props.database.paths.length)) : this.state.itemNow === "map" ? this.state.dataAlg != null ? React.createElement("div", {
      "className": "wrapMap"
    }, React.createElement("span", {
      "className": "InfoAlg"
    }, "Type_algorithm: ", React.createElement("span", {
      "className": "klaster"
    }, this.state.typeAlg)), React.createElement("span", {
      "className": "InfoAlg"
    }, "Time work algorithm: ", React.createElement("span", {
      "className": "klaster"
    }, this.state.timeAlg)), React.createElement("span", {
      "className": "InfoAlg"
    }, "Middle time work algorithm: ", React.createElement("span", {
      "className": "klaster"
    }, this.state.middleTimeAlg)), React.createElement("span", {
      "className": "InfoAlg"
    }, "Number test algorithm: ", React.createElement("span", {
      "className": "klaster"
    }, this.state.noTest)), React.createElement("div", {
      "className": "wrapMapItem"
    }, Object.keys(this.state.dataAlg).map((function(_this) {
      return function(i, j) {
        return React.createElement("div", null, React.createElement("span", null, i, ": ", _this.state.dataAlg[i]), React.createElement("br", null));
      };
    })(this)))) : React.createElement("p", null, "ooooooh=)MAP IS EMPTY)") : this.state.itemNow === "generate" ? React.createElement("div", null, React.createElement("br", null), React.createElement("label", null, "Nodes_count: ", React.createElement("input", {
      "type": "number",
      "title": "nodes_count",
      "onChange": ((function(_this) {
        return function(e) {
          return _this.getValGenerate(e, {
            type: "nodes_count"
          });
        };
      })(this))
    })), React.createElement("br", null), React.createElement("label", null, "Paths_count: ", React.createElement("input", {
      "type": "number",
      "title": "paths_count",
      "onChange": ((function(_this) {
        return function(e) {
          return _this.getValGenerate(e, {
            type: "paths_count"
          });
        };
      })(this))
    })), React.createElement("span", null, "max: ", this.getPaths_max(this.state.dataGenerate.nodes_count)), React.createElement("br", null), React.createElement("button", {
      "className": "generateBtn",
      "onClick": ((function(_this) {
        return function(e) {
          return _this.generate_graph(e);
        };
      })(this))
    }, "Generate!")) : void 0));
  }
});

module.exports = Info;



},{"../../global/Events":19,"react":"react"}],7:[function(require,module,exports){
var Matrix, React;

React = require('react');

Matrix = React.createClass({
  displayName: "Matrix",
  getInitialState: function() {
    return {
      matrixNow: "AdjecencyMatrix"
    };
  },
  switchMatrix: function(obj) {
    var i, k, len, tmp;
    tmp = obj.e.target.classList.value.split(' ');
    for (k = 0, len = tmp.length; k < len; k++) {
      i = tmp[k];
      if (i !== "IconAction") {
        continue;
      } else {
        tmp.push("IconAction");
        break;
      }
    }
    obj.e.target.classList.value = tmp.join(" ");
    if (this.state.matrixNow !== obj.type) {
      return this.setState({
        matrixNow: obj.type
      });
    }
  },
  render: function() {
    return React.createElement("div", {
      "className": "wrapMatrix"
    }, React.createElement("i", {
      "className": (this.state.matrixNow === "AdjecencyMatrix" ? "fa far fa-table switchMatrix IconAction" : "fa far fa-table switchMatrix"),
      "title": "AdjecencyMatrix",
      "onClick": ((function(_this) {
        return function(e) {
          return _this.switchMatrix({
            type: "AdjecencyMatrix",
            e: e
          });
        };
      })(this))
    }), React.createElement("i", {
      "className": (this.state.matrixNow === "IncindenceMatrix" ? "fa far fa-table switchMatrix IconAction" : "fa far fa-table switchMatrix"),
      "title": "IncindenceMatrix",
      "onClick": ((function(_this) {
        return function(e) {
          return _this.switchMatrix({
            type: "IncindenceMatrix",
            e: e
          });
        };
      })(this))
    }), React.createElement("br", null), (this.state.matrixNow === "AdjecencyMatrix" ? this.props.matrix.length !== 0 ? React.createElement("table", {
      "className": "AdjecancyMatrix"
    }, this.props.matrix.map(function(i, l) {
      return React.createElement("tr", {
        "key": "tr" + l
      }, i.map(function(j, p) {
        if (j === 0) {
          return React.createElement("td", {
            "className": "cgray50",
            "key": "td" + p
          }, j);
        } else {
          return React.createElement("td", {
            "key": "td" + p
          }, j);
        }
      }));
    })) : React.createElement("span", null, "Adjecency matrix is empty", React.createElement("br", null), "Сlick into the empty space...") : this.state.matrixNow === "IncindenceMatrix" ? React.createElement("span", null, "Incindence matrix is empty", React.createElement("br", null), "Сlick into the empty space...") : void 0));
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
  getInitialState: function() {
    return {
      algNow: "dejkstra",
      algMode: false
    };
  },
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
  handleChangeModeCalcWeight: function(e) {
    history_app.setEvent({
      data: e.target.checked
    }, "calcWeightPathsMode");
    return ee.emit('ChangeCalcWeightPathsMode', {
      data: e.target.checked
    });
  },
  handleAddItemMapMode: function(e) {
    history_app.setEvent({
      data: e.target.checked
    }, "addItemMapMode");
    ee.emit('AddItemMapMode', {
      data: e.target.checked
    });
    return this.setState({
      algMode: e.target.checked
    });
  },
  changeSwitchAlgorithm: function(e, data) {
    return ee.emit("switchAlgorithm", {
      type: data.type
    });
  },
  render: function() {
    return React.createElement("div", {
      "className": "wrapMods"
    }, React.createElement("div", {
      "className": "wrapDeleting"
    }, React.createElement("div", {
      "className": "labelFor"
    }, React.createElement("span", null, "Deleting Mode: ")), React.createElement("div", {
      "className": "toggleWrapper"
    }, React.createElement("input", {
      "type": "checkbox",
      "name": "toggle2",
      "className": "mobileToggle",
      "id": "toggle1",
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
    }))), React.createElement("div", {
      "className": "wrapModeCalcWeight"
    }, React.createElement("div", {
      "className": "labelFor"
    }, React.createElement("span", null, "CalcWeightPathMode: ")), React.createElement("div", {
      "className": "toggleWrapper"
    }, React.createElement("input", {
      "type": "checkbox",
      "name": "toggle2",
      "className": "mobileToggle",
      "id": "toggle3",
      "onChange": ((function(_this) {
        return function(e) {
          return _this.handleChangeModeCalcWeight(e);
        };
      })(this))
    }))), React.createElement("div", {
      "className": "wrapAddItemMapMode"
    }, React.createElement("div", {
      "className": "labelFor"
    }, React.createElement("span", null, "AddItemMapMode: ")), React.createElement("div", {
      "className": "toggleWrapper"
    }, React.createElement("input", {
      "type": "checkbox",
      "name": "toggle2",
      "className": "mobileToggle",
      "id": "toggle4",
      "onChange": ((function(_this) {
        return function(e) {
          return _this.handleAddItemMapMode(e);
        };
      })(this))
    })), (this.state.algMode ? React.createElement("div", {
      "className": "switchAlgorithm fr"
    }, React.createElement("label", {
      "for": "dejkstra"
    }, React.createElement("input", {
      "type": "radio",
      "name": "algorithm",
      "id": "dejkstra",
      "onChange": ((function(_this) {
        return function(e) {
          return _this.changeSwitchAlgorithm(e, {
            type: "dejkstra"
          });
        };
      })(this))
    }), "\t\t\t\t\t\t\tDejkstra\'s Algorithm"), React.createElement("br", null), React.createElement("label", {
      "for": "floyda"
    }, React.createElement("input", {
      "type": "radio",
      "name": "algorithm",
      "id": "floyda",
      "onChange": ((function(_this) {
        return function(e) {
          return _this.changeSwitchAlgorithm(e, {
            type: "floyda"
          });
        };
      })(this))
    }), "\t\t\t\t\t\t\tFloyd\'s Algorithm"), React.createElement("label", {
      "for": "forda"
    }, React.createElement("input", {
      "type": "radio",
      "name": "algorithm",
      "id": "forda",
      "onChange": ((function(_this) {
        return function(e) {
          return _this.changeSwitchAlgorithm(e, {
            type: "forda"
          });
        };
      })(this))
    }), "\t\t\t\t\t\t\tFord\'s Algorithm")) : void 0)));
  }
});

module.exports = Deleting;



},{"../../global/Events":19,"../modules/history.module":15,"react":"react"}],9:[function(require,module,exports){

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

getMatrix = function(arr, paths, n, WeightMode) {
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
          tmpObj[q][i[1]] = WeightMode ? Math.round(paths[j].weight) : 1;
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
          tmpObj[q][i[1]] = WeightMode ? Math.round(paths[j].weight) : 1;
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



},{}],10:[function(require,module,exports){

/*
Path = {
	color:"#000"
	coords1: {…}
	coords2: {…}
	d: "M 366, 115L 896, 101Z"
	fill: "#2e9f5c"
	id: "circle0.circle1"
	weight: 26.5
}

namesArr = [
	["circle3", "circle0"]
	["circle0", "circle2"]
	["circle2", "circle1"]
	["circle3", "circle1"]
	["circle4", "circle1"]
	["circle4", "circle0"]
]

Paths = [
	{
		id: "circle3.circle0"
		weight: 5
	},
	{
		id: "circle0.circle2"
		weight: 10
	},
	{
		id: "circle2.circle1"
		weight: 7
	},
	{
		id: "circle3.circle1"
		weight: 4
	}, 
	{
		id: "circle4.circle1"
		weight: 6
	},
	{
		id: "circle4.circle0"
		weight: 8
	}
]

namesArr = [
	["circle3", "circle0"]
	["circle0", "circle2"]
	["circle2", "circle1"]
	["circle3", "circle1"]
	["circle4", "circle1"]
	["circle4", "circle0"]
]
 */
var getMapDejkstra,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

getMapDejkstra = function(graph, _start, p, u, d) {
  var i, j, len, len1, min_v, min_x, ref, ref1, start, x;
  if (p == null) {
    p = {};
  }
  if (u == null) {
    u = [];
  }
  if (d == null) {
    d = {};
  }
  start = _start;
  if (Object.keys(p).length === 0) {
    p[start] = 0;
  }
  ref = Object.keys(graph[start]);
  for (i = 0, len = ref.length; i < len; i++) {
    x = ref[i];
    if ((indexOf.call(u, x) < 0) && x !== start) {
      if (indexOf.call(Object.keys(p), x) < 0 || (graph[start][x] + p[start]) < p[x]) {
        p[x] = graph[start][x] + p[start];
      }
    }
  }
  u.push(start);
  min_v = 0;
  min_x = null;
  ref1 = Object.keys(p);
  for (j = 0, len1 = ref1.length; j < len1; j++) {
    x = ref1[j];
    if ((p[x] < min_v || min_v === 0) && indexOf.call(u, x) < 0) {
      min_x = x;
      min_v = p[x];
    }
  }
  if ((u.length < Object.keys(graph).length) && min_x) {
    return getMapDejkstra(graph, min_x, p, u);
  } else {
    return p;
  }
};

module.exports = getMapDejkstra;



},{}],11:[function(require,module,exports){
var INF, MAIN, _main, getMinPath, init, main, range;

range = function(s, f) {
  var o, ref, results;
  return (function() {
    results = [];
    for (var o = s, ref = f - 1; s <= ref ? o <= ref : o >= ref; s <= ref ? o++ : o--){ results.push(o); }
    return results;
  }).apply(this);
};

init = function(W, n) {
  var A, Prev, a, i, j, len, len1, len2, len3, o, p, q, r, ref, ref1, ref2, ref3;
  A = [];
  Prev = [];
  ref = range(0, n);
  for (o = 0, len = ref.length; o < len; o++) {
    i = ref[o];
    a = [];
    ref1 = range(0, n);
    for (p = 0, len1 = ref1.length; p < len1; p++) {
      j = ref1[p];
      a.push(W[i][j]);
    }
    A.push(a);
  }
  ref2 = range(0, n);
  for (q = 0, len2 = ref2.length; q < len2; q++) {
    i = ref2[q];
    a = [];
    ref3 = range(0, n);
    for (r = 0, len3 = ref3.length; r < len3; r++) {
      j = ref3[r];
      a.push(i !== j ? j : "-");
    }
    Prev.push(a);
  }
  return {
    A: A,
    Prev: Prev
  };
};

main = function(_A, _Prev, n) {
  var A, Prev, _time, i, j, k, len, len1, len2, o, p, q, ref, ref1, ref2, time;
  _time = performance.now();
  A = _A;
  Prev = _Prev;
  ref = range(0, n);
  for (o = 0, len = ref.length; o < len; o++) {
    k = ref[o];
    ref1 = range(0, n);
    for (p = 0, len1 = ref1.length; p < len1; p++) {
      i = ref1[p];
      ref2 = range(0, n);
      for (q = 0, len2 = ref2.length; q < len2; q++) {
        j = ref2[q];
        if (A[i][k] < INF && A[k][j] < INF && A[i][k] + A[k][j] < A[i][j] && i !== j) {
          A[i][j] = A[i][k] + A[k][j];
          Prev[i][j] = k;
        } else {
          if (i === j) {
            A[i][j] = 0;
          }
        }
      }
    }
  }
  time = performance.now() - _time;
  return {
    A: A,
    Prev: Prev,
    time: time
  };
};

getMinPath = function(m, l, A, W) {
  var finish, i, len, len1, o, p, path, ref, start, subpath, summ;
  if (m === l) {
    return 0;
  }
  start = m;
  finish = l;
  path = [m];
  subpath = [];
  while (W[m][l] !== l) {
    subpath.push(W[m][l]);
    l = W[m][l];
  }
  subpath.reverse();
  for (o = 0, len = subpath.length; o < len; o++) {
    i = subpath[o];
    path.push(i);
  }
  path.push(finish);
  console.log(start + " -> " + finish + ": path" + path);
  summ = 0;
  ref = range(0, path.length - 1);
  for (p = 0, len1 = ref.length; p < len1; p++) {
    i = ref[p];
    summ += A[path[i]][path[i + 1]];
  }
  return summ;
};

_main = function(_start, A, Prev, n) {
  var Mins, _time, i, len, o, obj, ref, time;
  Mins = [];
  _time = performance.now();
  ref = range(0, n);
  for (o = 0, len = ref.length; o < len; o++) {
    i = ref[o];
    Mins.push((
      obj = {},
      obj["" + i] = getMinPath(_start, i, A, Prev),
      obj
    ));
  }
  time = performance.now() - _time;
  return {
    Mins: Mins,
    time: time
  };
};

INF = 20000000000000;

MAIN = function(start, W) {
  var A, Prev, n, time;
  n = W.length;
  A = init(W, n).A;
  Prev = init(W, n).Prev;
  A = main(A, Prev, n).A;
  Prev = main(A, Prev, n).Prev;
  time = main(A, Prev, n).time;
  time += _main(start, A, Prev, n).time;
  return {
    maps: _main(start, A, Prev, n).Mins,
    time: time
  };
};

module.exports = MAIN;



},{}],12:[function(require,module,exports){
var INF, main, range;

range = function(s, f) {
  var l, ref, results;
  return (function() {
    results = [];
    for (var l = s, ref = f - 1; s <= ref ? l <= ref : l >= ref; s <= ref ? l++ : l--){ results.push(l); }
    return results;
  }).apply(this);
};

INF = 20000000000000;

main = function(W, start) {
  var F, Mins, N, i, j, k, l, len, len1, len2, len3, len4, m, n, o, p, ref, ref1, ref2, ref3;
  console.log(W, start);
  N = W.length;
  F = [];
  ref = range(0, N);
  for (l = 0, len = ref.length; l < len; l++) {
    i = ref[l];
    F.push(INF);
  }
  F[start] = 0;
  ref1 = range(1, N);
  for (m = 0, len1 = ref1.length; m < len1; m++) {
    k = ref1[m];
    ref2 = range(0, N);
    for (n = 0, len2 = ref2.length; n < len2; n++) {
      i = ref2[n];
      ref3 = range(0, N);
      for (o = 0, len3 = ref3.length; o < len3; o++) {
        j = ref3[o];
        if (F[j] + W[j][i] < F[i]) {
          F[i] = F[j] + W[j][i];
        }
      }
    }
  }
  Mins = {};
  for (j = p = 0, len4 = F.length; p < len4; j = ++p) {
    i = F[j];
    Mins[j] = i;
  }
  return Mins;
};

module.exports = main;



},{}],13:[function(require,module,exports){

/*
	coords = [
		{
			d: "M 365, 171L 123, 66Z", 
			coords1: {x: 365, y: 171}, 
			coords2: {x: 123, y: 66}
		}
	]
 */
var getWeight;

getWeight = function(coords) {
  var cat1, cat2, coords1, coords2, hypotenuse;
  coords1 = {
    x: coords[0].x,
    y: coords[0].y
  };
  coords2 = {
    x: coords[1].x,
    y: coords[1].y
  };
  if (coords1.x === coords2.x && coords1.y === coords2.y) {
    return 12;
  } else {
    cat1 = Math.abs(coords1.x - coords2.x);
    cat2 = Math.abs(coords1.y - coords2.y);
    hypotenuse = Math.sqrt((Math.pow(cat1, 2)) + (Math.pow(cat2, 2)));
    return Math.round((Math.round(hypotenuse)) / 20);
  }
};

module.exports = getWeight;



},{}],14:[function(require,module,exports){
"use strict";
var DeleteGarbage, div, getPaths_max, getRandomInt, get_Nodes_random, get_Nodes_sequence, hittingOnInterval, write_paths;

getRandomInt = function(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

hittingOnInterval = function(nodes, fl_screen, cx, cy) {
  var j, k, len, obj;
  obj = {
    x: 0,
    y: 0
  };
  for (k = 0, len = nodes.length; k < len; k++) {
    j = nodes[k];
    if ((j.cx - fl_screen <= cx && cx <= j.cx + fl_screen)) {
      obj.x = 1;
    }
    if ((j.cy - fl_screen <= cy && cy <= j.cy + fl_screen)) {
      obj.y = 1;
    }
  }
  return obj;
};

get_Nodes_random = function(n, fl_screen, fl_nodes, screen, _nodes) {
  var cx, cy, i, k, nodes, ref, x_max, x_min, y_max, y_min;
  fl_nodes += 20;
  x_min = fl_screen;
  x_max = screen.width - fl_screen;
  y_min = fl_screen;
  y_max = screen.height - fl_screen;
  nodes = _nodes || [];
  for (i = k = 0, ref = n - 1; 0 <= ref ? k <= ref : k >= ref; i = 0 <= ref ? ++k : --k) {
    if (nodes.length === n) {
      break;
    } else {
      console.log(i);
      cx = getRandomInt(x_min, x_max);
      cy = getRandomInt(y_min, y_max);
      if (hittingOnInterval(nodes, fl_screen, cx, cy).x === 0 && hittingOnInterval(nodes, fl_screen, cx, cy).y === 0) {
        nodes.push({
          cx: cx,
          cy: cy
        });
        console.log("ok");
      } else {
        console.log("no");
        console.log([cx, cy]);
      }
    }
  }
  if (nodes.length < n) {
    return get_Nodes_random(n, fl_screen, fl_nodes, screen, nodes);
  } else {
    return nodes;
  }
};

div = function(val, b) {
  return (val - val % b) / b;
};

get_Nodes_sequence = function(n, fl_screen, fl_nodes, screen) {
  var cx, cy, d, i, j, k, nodes, ref, x_max, x_min, y_max, y_min;
  fl_nodes += 20;
  x_min = fl_screen;
  x_max = screen.width - fl_screen;
  y_min = fl_screen;
  y_max = screen.height - fl_screen;
  nodes = [];
  j = 0;
  d = 0;
  console.log(div(screen.width - fl_screen * 2, n));
  console.log(div(Math.round(x_max - x_min), 50));
  for (i = k = 0, ref = n - 1; 0 <= ref ? k <= ref : k >= ref; i = 0 <= ref ? ++k : --k) {
    cx = x_min + j * fl_nodes + fl_nodes;
    cy = fl_screen + d * 50;
    if (i % div(Math.round(x_max - x_min), 50) === 0) {
      d++;
      j = 0;
      cx = x_min + j * fl_nodes + fl_nodes;
      cy = fl_screen + d * 50;
      nodes.push({
        cx: cx,
        cy: cy
      });
    } else {
      nodes.push({
        cx: cx,
        cy: cy
      });
    }
    j++;
  }
  return nodes;
};

getPaths_max = function(n) {
  var N, i, k, n1, ref;
  n1 = 3;
  N = 3;
  for (i = k = 0, ref = n - 4; 0 <= ref ? k <= ref : k >= ref; i = 0 <= ref ? ++k : --k) {
    N += n1;
    n1++;
  }
  return N;
};

DeleteGarbage = function(arr) {
  var __arr, _arr, a, i, j, k, l, len, len1, now1, now2, tmp;
  for (j = k = 0, len = arr.length; k < len; j = ++k) {
    i = arr[j];
    now1 = +i[0].match(/\d+/g)[0];
    now2 = +i[1].match(/\d+/g)[0];
    if (now2 < now1) {
      tmp = arr[j][0];
      arr[j][0] = arr[j][1];
      arr[j][1] = tmp;
    }
  }
  _arr = [];
  for (l = 0, len1 = arr.length; l < len1; l++) {
    i = arr[l];
    _arr.push(i[0] + i[1]);
  }
  a = new Set(_arr);
  __arr = [];
  a.forEach((function(_this) {
    return function(v) {
      return __arr.push([v.match(/circle\d+/g)[0], v.match(/circle\d+/g)[1]]);
    };
  })(this));
  return __arr;
};

write_paths = function(procents, n, I) {
  var MAX, N, arr, d, i, j, k, l, paths, ref, ref1;
  if (I == null) {
    I = 0;
  }
  MAX = getPaths_max(n);
  N = MAX * procents / 100;
  paths = [];
  d = 1;
  arr = [];
  for (i = k = 0, ref = Math.round(n * procents / 100) - 1; 0 <= ref ? k <= ref : k >= ref; i = 0 <= ref ? ++k : --k) {
    for (j = l = 0, ref1 = Math.round(n * procents / 100) - 1; 0 <= ref1 ? l <= ref1 : l >= ref1; j = 0 <= ref1 ? ++l : --l) {
      if (i !== j) {
        paths.push(["circle" + i, "circle" + j]);
      }
    }
  }
  return DeleteGarbage(paths);
};

module.exports = {
  get_Nodes_sequence: get_Nodes_sequence,
  write_paths: write_paths
};



},{}],15:[function(require,module,exports){
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
    if (type_event === "calcWeightPathsMode") {
      tmp["MainData"] = "" + obj.data;
    }
    if (type_event === "addItemMapMode") {
      tmp["MainData"] = "" + obj.data;
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



},{"../../global/Events":19}],16:[function(require,module,exports){
var INF, Switcher, dejkstra, ee, floyda, forda;

ee = require("../../global/Events");

dejkstra = require("./algorithms/dejkstra.algorithm.fn");

floyda = require("./algorithms/floyda.algorithm.fn");

forda = require("./algorithms/forda.algorithm.fn");

INF = 20000000000000;

Switcher = (function() {
  function Switcher(ArrNames, Paths, start) {
    this.ArrNames = ArrNames;
    this.Paths = Paths;
    this.start = start;
    this.Mxw = [];
    this.graph = {};
    this._obj = {};
    this.n = 0;
    this.time = 0;
    this.ALGNOW = "";
  }

  Switcher.prototype.setArrMx = function(arr) {
    var i, k, len, results;
    this.Mxw = [];
    results = [];
    for (k = 0, len = arr.length; k < len; k++) {
      i = arr[k];
      results.push(this.Mxw.push(i));
    }
    return results;
  };

  Switcher.prototype.regist = function(data) {
    if (typeof data === "string") {
      this.start = data;
      return this.init(this.ALGNOW);
    } else {
      if (typeof data[0][0] === "string") {
        return this.ArrNames = data;
      } else {
        return this.Paths = data;
      }
    }
  };

  Switcher.prototype.getGraph_obj = function() {
    var arrNames, i, j, k, l, len, len1, len2, m, obj, paths, tmp;
    arrNames = this.ArrNames;
    paths = this.Paths;
    obj = {};
    for (j = k = 0, len = arrNames.length; k < len; j = ++k) {
      i = arrNames[j];
      obj[i[0]] = obj[i[0]] || {};
      obj[i[0]][i[1]] = paths[j].weight;
    }
    for (j = l = 0, len1 = arrNames.length; l < len1; j = ++l) {
      i = arrNames[j];
      tmp = arrNames[j][0];
      arrNames[j][0] = arrNames[j][1];
      arrNames[j][1] = tmp;
    }
    for (j = m = 0, len2 = arrNames.length; m < len2; j = ++m) {
      i = arrNames[j];
      obj[i[0]] = obj[i[0]] || {};
      obj[i[0]][i[1]] = paths[j].weight;
    }
    return this.graph = obj;
  };

  Switcher.prototype.getGraph_mx = function() {
    var _arr, arr, i, j, k, l, len, len1, ref;
    console.log(this.Mxw);
    arr = [];
    ref = this.Mxw;
    for (k = 0, len = ref.length; k < len; k++) {
      i = ref[k];
      _arr = [];
      for (l = 0, len1 = i.length; l < len1; l++) {
        j = i[l];
        _arr.push(j !== 0 ? j : INF);
      }
      arr.push(_arr);
    }
    this.Mx = arr;
    return this.n = arr.length;
  };

  Switcher.prototype.AlgProcess = function(type) {
    var time;
    switch (type) {
      case "dejkstra":
        console.log("dejkstra");
        this.getGraph_obj();
        time = performance.now();
        this._obj = (dejkstra(this.graph, this.start)) || {};
        return this.time = performance.now() - time;
      case "floyda":
        this.getGraph_mx();
        console.log(this.Mx);
        this._obj = (floyda(+this.start.match(/\d+/g)[0], this.Mx).maps) || {};
        return this.time = floyda(+this.start.match(/\d+/g)[0], this.Mx).time;
      case "forda":
        console.log("forda");
        this.getGraph_mx();
        time = performance.now();
        this._obj = (forda(this.Mx, +this.start.match(/\d+/g)[0])) || {};
        return this.time = performance.now() - time;
      default:
        return this._obj = {};
    }
  };

  Switcher.prototype.init = function(type_alg) {
    this.ALGNOW = type_alg;
    this.AlgProcess(type_alg);
    return ee.emit("sendDataAlgs", {
      type: type_alg,
      data: this._obj,
      time: this.time
    });
  };

  return Switcher;

})();

module.exports = new Switcher;



},{"../../global/Events":19,"./algorithms/dejkstra.algorithm.fn":10,"./algorithms/floyda.algorithm.fn":11,"./algorithms/forda.algorithm.fn":12}],17:[function(require,module,exports){
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
      }, "" + (+this.props.id.match(/\d+/g)[0])));
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



},{"react":"react"}],18:[function(require,module,exports){
var Path, React;

React = require('react');

Path = React.createClass({
  displayName: 'Path',
  render: function() {
    return React.createElement("path", {
      "d": this.props.d,
      "fill": "transparent",
      "stroke": this.props.color,
      "style": {
        strokeWidth: 2
      }
    });
  }
});

module.exports = Path;


/*
if @props.CalcWeightMode
			<g>
				<path d={@props.d} fill="transparent" stroke="black" style={{strokeWidth: 2}}/>
				<rect x={if @props._xy.x != @props.__xy.x and @props._xy.y != @props.__xy.y then (Math.min(@props._xy.x, @props.__xy.x) + (Math.abs @props._xy.x - @props.__xy.x) / 2 - 32) else (@props._xy.x - 32.5)} 
							y={if @props._xy.x != @props.__xy.x and @props._xy.y != @props.__xy.y then (Math.min(@props._xy.y, @props.__xy.y) + (Math.abs @props._xy.y - @props.__xy.y) / 2 - 16) else (@props._xy.y - 130)}
							width="60" height="30" fill={@props.fill} widthStroke="5" stroke="#333"></rect>
				<text x={if @props._xy.x != @props.__xy.x and @props._xy.y != @props.__xy.y then (Math.min(@props._xy.x, @props.__xy.x) + (Math.abs @props._xy.x - @props.__xy.x) / 2 - 15) else (@props._xy.x - 10)} 
							y={if @props._xy.x != @props.__xy.x and @props._xy.y != @props.__xy.y then (Math.min(@props._xy.y, @props.__xy.y) + (Math.abs @props._xy.y - @props.__xy.y) / 2 - 5) else (@props._xy.y - 120)}
							fill="#fff" dy=".6em" fontFamily="sans-serif" fontSize="17px" className="weightPaths">
								{""+@props.weight}
				</text>
			</g>
		else
 */



},{"react":"react"}],19:[function(require,module,exports){
var EventEmitter, ee;

EventEmitter = require("events").EventEmitter;

ee = new EventEmitter;

module.exports = ee;



},{"events":20}],20:[function(require,module,exports){
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
