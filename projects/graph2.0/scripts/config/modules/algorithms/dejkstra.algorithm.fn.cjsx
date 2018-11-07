

# -> ["circle0", "circle4", "circle6", "circle3", "circle9"]

###
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
###






getMapDejkstra = (graph, _start, p={}, u=[], d={})->
	start = _start
	

	if Object.keys(p).length == 0 then p[start] = 0 # инициализация начального пути
	# print "start V: %d, " % (start)

	for x in Object.keys(graph[start])
		if ((x not in u) and x != start)
			if (x not in Object.keys(p) or (graph[start][x] + p[start]) < p[x])
				p[x] = graph[start][x] + p[start]

	u.push(start)

	min_v = 0
	min_x = null

	for x in Object.keys(p)
		# print "x: %d, p[x]: %d, mv %d" % (x, p[x], min_v)
		if (p[x] < min_v or min_v == 0) and x not in u
			min_x = x
			min_v = p[x]
	if((u.length < Object.keys(graph).length) and min_x)
		return getMapDejkstra(graph, min_x, p, u)
	else
		return p


module.exports = getMapDejkstra