paper = Snap() #window.innerWidth, window.innerHight
paper.node.style.height = window.innerHeight

class Control
	toggle1: document.getElementById 'toggle1'
	toggle2: document.getElementById 'toggle2'
control = new Control




countNodes = 
	node: document.getElementById 'countNodes'
	val: 0
	write: ->
		@node.innerText = @val
countPaths = 
	node: document.getElementById 'countPaths'
	val: 0


styles = 
	fill: "#2E9F5C"
	stroke: "#333"
	strokeWidth: 3

coordsNodes = []
path = paper
	.path ""
	.attr
		stroke: "#222"
		fill: "transparent"
		strokeWidth: 3


DrawLine = ([c1x, c1y, c2x, c2y], arrCoords)->
	console.log [c1x, c1y, c2x, c2y], arrCoords
	pathh = ""
	for i, t in arrCoords
		if (c1x >= i.cx - 20 and c1x <= i.cx + 20) and (c1y >= i.cy - 20 and c1y <= i.cy + 20)
			pathh += "M #{i.cx}, #{i.cy}"

	for i, t in arrCoords
		if (c2x >= i.cx - 20 and c2x <= i.cx + 20) and (c2y >= i.cy - 20 and c2y <= i.cy + 20)
			pathh += "L #{i.cx}, #{i.cy}Z"
	paper
		.path pathh
		.attr
			stroke: "#222"
			fill: "transparent"
			strokeWidth: 3
	console.log pathh
coordsPath = []
pathT = 0
paper.click (e)->
	if !control.toggle1.checked
		if e.target.tagName is "svg" or e.target.tagName is "path"
			countNodes.val++
			countNodes.write()
			coordsNodes.push {cx: e.clientX, cy: e.clientY}
			paper
				.circle e.clientX, e.clientY, 20
				.attr styles
				.drag()
			# pathString = path.attr "d"
			# coords = "#{e.clientX}, #{e.clientY}"
			# path.attr
			# 	d: if pathString then pathString + "L #{coords}" else "M #{coords}"
	else
		if e.target.tagName is "circle" or e.target.tagName is "path"
			console.log e
			coordsPath.push {cx: e.clientX, cy:e.clientY}
			if coordsPath.length == 2
				DrawLine([coordsPath[0].cx, coordsPath[0].cy, coordsPath[1].cx, coordsPath[1].cy,], coordsNodes)
				coordsPath = []
			

