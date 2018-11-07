"use strict";
getRandomInt = (min, max) ->
  Math.floor(Math.random() * (max - min)) + min

hittingOnInterval = (nodes, fl_screen, cx, cy)->
	obj = {
		x: 0
		y: 0
	}
	for j in nodes
		if j.cx - fl_screen <= cx <= j.cx + fl_screen
			obj.x = 1
		if j.cy - fl_screen <= cy <= j.cy + fl_screen
			obj.y = 1
	obj

get_Nodes_random = (n, fl_screen, fl_nodes, screen, _nodes)->
	fl_nodes += 20
	x_min = fl_screen
	x_max = screen.width - fl_screen
	y_min = fl_screen
	y_max = screen.height - fl_screen

	nodes = _nodes or []
	for i in [0..n-1]
		if nodes.length == n
			break
		else
			console.log i
			cx = getRandomInt(x_min, x_max)
			cy = getRandomInt(y_min, y_max)
			if hittingOnInterval(nodes, fl_screen, cx, cy).x == 0 and hittingOnInterval(nodes, fl_screen, cx, cy).y == 0
				nodes.push {cx: cx, cy: cy}
				console.log "ok"
			else
				console.log "no"
				console.log [cx, cy]
	if nodes.length < n
		get_Nodes_random(n, fl_screen, fl_nodes, screen, nodes)
	else 
		nodes
#console.log get_Nodes_random(10, 100, 0, {width: 16800, height: 8000})

div = (val, b)->
	(val - val % b) / b

get_Nodes_sequence = (n, fl_screen, fl_nodes, screen)->
	fl_nodes += 20
	x_min = fl_screen
	x_max = screen.width - fl_screen
	y_min = fl_screen
	y_max = screen.height - fl_screen

	nodes = []
	j = 0
	d = 0

	console.log div screen.width - fl_screen * 2, n
	console.log div(Math.round(x_max - x_min), 50)

	for i in [0..n-1]
		cx = x_min + j*fl_nodes + fl_nodes
		cy = fl_screen + d*50
		if i % div(Math.round(x_max - x_min), 50) == 0
			d++
			j=0
			cx = x_min + j*fl_nodes + fl_nodes
			cy = fl_screen + d*50
			nodes.push {cx: cx, cy: cy}
		else
			nodes.push {cx: cx, cy: cy}
		j++
	nodes


getPaths_max = (n)->
	n1 = 3
	N = 3
	for i in [0..n-4]
		N+=n1
		n1++
	N

# console.log getPaths_max 100

DeleteGarbage = (arr)->
	# s = new Set
	# s.add 1
	# s.add 1
	# s.add 2

	# s.forEach (v) =>
	#   console.log v
	for i, j in arr
		now1 = +i[0].match(/\d+/g)[0]
		now2 = +i[1].match(/\d+/g)[0]
		if now2 < now1
			tmp = arr[j][0]
			arr[j][0] = arr[j][1]
			arr[j][1] = tmp
		# if now1 == now2
		# 	arr.splice j, 1
	_arr = []
	for i in arr
		_arr.push i[0]+i[1]
	a = new Set(_arr)
	__arr = []
	a.forEach (v) =>
		__arr.push [v.match(/circle\d+/g)[0], v.match(/circle\d+/g)[1]]
	__arr
write_paths = (procents, n, I=0)->
	# I - индекс или номер вершины из которой стартуем
	MAX = getPaths_max n # максимальное кол-во вершин
	N = MAX * procents / 100 # Сколько затронуть вершин от макс значения
	paths = []
	d = 1
	# Последовательный проход
	# for i in [0..n-2]
	# 	paths.push ["circle#{i}", "circle#{d}"]
	# 	d++
	

	# or (i[1] == arr[0] and i[1] == arr[1]) or (i[0] == arr[0] and i[1] == arr[1])
	arr = []
	for i in [0..Math.round(n*procents/100)-1]
		for j in [0..Math.round(n*procents/100)-1]
			if i isnt j
				paths.push ["circle#{i}", "circle#{j}"]
	return DeleteGarbage paths

# console.log write_paths(100, 10)
# console.log write_paths 80, 9, 5






module.exports = {get_Nodes_sequence: get_Nodes_sequence, write_paths: write_paths}# 100, 100, 10, {width: 1680, height: 800}
