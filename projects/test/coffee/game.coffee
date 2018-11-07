canvas = document.getElementById 'canvas'
ctx = canvas.getContext '2d'
canvas.width = 1000
canvas.height = 400


mapManager=
	mapData: null,
	tLayer: null,
	xCount: 0,
	yCount: 0,
	tSize:
		x:64,
		y:64
	mapSize:
		x:64,
		y:64
	tilesets: new Array(),
	view:
		x: 0,
		y: 0,
		w: 800,
		h: 600
	imgLoadCount: 0,
	imgLoaded: no,
	jsonLoaded:no
loadMap =(path) ->
	request = new XMLHttpRequest()
	request.onreadystatechange = ->
		if request.readyState is 4 and request.status is 200
			mapManager.parseMap request.responseText
	request.open("GET", path, true)
	do request.send

	
i = 0
parseMap = (tilesJSON) ->
	@mapData = JSON.parse tilesJSON
	@xCount = @mapData.width
	@yCount = @mapData.height
	@tSize.x = @mapData.tilewidth
	@tSize.y = @mapData.tileheight
	@mapSize.x = @xCount * @tSize.x
	@mapSize.y = @yCount * @tSize.y

	while i < @mapData.tilesets.length
		img = new Image()
		mapManager.imgLoadCount++
		img.onload = ->
			if mapManager.imgLoadCount is mapManager.mapData.tilesets.length
				mapManager.imgLoaded = on
		img.src = @mapData.tilesets[i].image
		t = @mapData.tilesets[i]
		ts=
			firstgid: t.firstgid,
			image:img,
			name: t.name,
			xCount: Math.floor t.imagewidth / mapManager.tSize.x,
			yCount: Math.floor t.imageheight / mapManager.tSize.y
		@tilesets.push ts
		i++
	@jsonLoaded = on
isVisible = (x, y, w, h) ->
	if (x + w < @view.w) or (y + h < @view.y) or (x > @view.x + @view.w) or (y > @view.y + @view.h)
		return false
	return true
draw = (ctx) ->
	id = 0
	i = 0
	if not mapManager.imgLoaded or not mapManager.jsonLoaded
		f = ->
			mapManager.draw(ctx)
		setTimeout f, 100
	else
		if @tLayer is null
			while id < @mapData.layer.length
				layer = @mapData.layer[id]
				if layertype is 'tilelayer'
					@tLayer = layer
					break;
				id++
			while i < @tLayer.data.length
				if @tLayer.data[i] isnt 0
					tile = @getTile @tLayer.data[i]
					pX = (i % @xCount) * @tSize.x
					pY = Math.floor(i / @xCount) * @tSize.y
					if not @.isVisible pX, pY, @tSize.x, @tSize.y
						continue
					pX -= @view.x
					pY -= @view.y
					ctx.drawImage tile.img, tile.px, tile.py, @tSize.x, @tSize.y, pX, pY, @tSize.x, @tSize.y
				i++
getTile = (tileIndex)->
	tile=
		img:null,
		px:0,py:0

	tileset = @getTileset tileIndex
	tile.img = tileset.image
	id = tileIndex - tileset.firstgid
	x = id % tileset.xCount
	y = Math.floor id / tileset.xCount
	tile.px = x * mapManager.tSize.x
	tile.py = y * mapManager.tSize.y
	return tile
getTileset = (tileIndex) ->
	i = mapManager.tilesets.length - 1
	while i >= 0

		if mapManager.tilesets[i].firstgid <= tileIndex
			return mapManager.tilesets[i]
		i--

	return null


loadMap '../js/map.json'
mapManager.draw ctx



