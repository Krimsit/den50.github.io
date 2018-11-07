var canvas, ctx, draw, getTile, getTileset, i, isVisible, loadMap, mapManager, parseMap;

canvas = document.getElementById('canvas');

ctx = canvas.getContext('2d');

canvas.width = 1000;

canvas.height = 400;

mapManager = {
  mapData: null,
  tLayer: null,
  xCount: 0,
  yCount: 0,
  tSize: {
    x: 64,
    y: 64
  },
  mapSize: {
    x: 64,
    y: 64
  },
  tilesets: new Array(),
  view: {
    x: 0,
    y: 0,
    w: 800,
    h: 600
  },
  imgLoadCount: 0,
  imgLoaded: false,
  jsonLoaded: false
};

loadMap = function(path) {
  var request;
  request = new XMLHttpRequest();
  request.onreadystatechange = function() {
    if (request.readyState === 4 && request.status === 200) {
      return mapManager.parseMap(request.responseText);
    }
  };
  request.open("GET", path, true);
  return request.send();
};

i = 0;

parseMap = function(tilesJSON) {
  var img, t, ts;
  this.mapData = JSON.parse(tilesJSON);
  this.xCount = this.mapData.width;
  this.yCount = this.mapData.height;
  this.tSize.x = this.mapData.tilewidth;
  this.tSize.y = this.mapData.tileheight;
  this.mapSize.x = this.xCount * this.tSize.x;
  this.mapSize.y = this.yCount * this.tSize.y;
  while (i < this.mapData.tilesets.length) {
    img = new Image();
    mapManager.imgLoadCount++;
    img.onload = function() {
      if (mapManager.imgLoadCount === mapManager.mapData.tilesets.length) {
        return mapManager.imgLoaded = true;
      }
    };
    img.src = this.mapData.tilesets[i].image;
    t = this.mapData.tilesets[i];
    ts = {
      firstgid: t.firstgid,
      image: img,
      name: t.name,
      xCount: Math.floor(t.imagewidth / mapManager.tSize.x, {
        yCount: Math.floor(t.imageheight / mapManager.tSize.y)
      })
    };
    this.tilesets.push(ts);
    i++;
  }
  return this.jsonLoaded = true;
};

isVisible = function(x, y, w, h) {
  if ((x + w < this.view.w) || (y + h < this.view.y) || (x > this.view.x + this.view.w) || (y > this.view.y + this.view.h)) {
    return false;
  }
  return true;
};

draw = function(ctx) {
  var f, id, layer, pX, pY, results, tile;
  id = 0;
  i = 0;
  if (!mapManager.imgLoaded || !mapManager.jsonLoaded) {
    f = function() {
      return mapManager.draw(ctx);
    };
    return setTimeout(f, 100);
  } else {
    if (this.tLayer === null) {
      while (id < this.mapData.layer.length) {
        layer = this.mapData.layer[id];
        if (layertype === 'tilelayer') {
          this.tLayer = layer;
          break;
        }
        id++;
      }
      results = [];
      while (i < this.tLayer.data.length) {
        if (this.tLayer.data[i] !== 0) {
          tile = this.getTile(this.tLayer.data[i]);
          pX = (i % this.xCount) * this.tSize.x;
          pY = Math.floor(i / this.xCount) * this.tSize.y;
          if (!this.isVisible(pX, pY, this.tSize.x, this.tSize.y)) {
            continue;
          }
          pX -= this.view.x;
          pY -= this.view.y;
          ctx.drawImage(tile.img, tile.px, tile.py, this.tSize.x, this.tSize.y, pX, pY, this.tSize.x, this.tSize.y);
        }
        results.push(i++);
      }
      return results;
    }
  }
};

getTile = function(tileIndex) {
  var id, tile, tileset, x, y;
  tile = {
    img: null,
    px: 0,
    py: 0
  };
  tileset = this.getTileset(tileIndex);
  tile.img = tileset.image;
  id = tileIndex - tileset.firstgid;
  x = id % tileset.xCount;
  y = Math.floor(id / tileset.xCount);
  tile.px = x * mapManager.tSize.x;
  tile.py = y * mapManager.tSize.y;
  return tile;
};

getTileset = function(tileIndex) {
  i = mapManager.tilesets.length - 1;
  while (i >= 0) {
    if (mapManager.tilesets[i].firstgid <= tileIndex) {
      return mapManager.tilesets[i];
    }
    i--;
  }
  return null;
};

loadMap('../js/map.json');

mapManager.draw(ctx);
