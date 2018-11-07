graph={ 
	0:[1,3,4],
	1:[0,2,4],
	2:[1,6],
	3:[0,4,6],
	4:[0,1,3,5],
	5:[4],
	6:[2,3],
	7: []
}
bfs = (graph, start)->
	path = []
	queue = [start]
	while queue.length isnt 0
		vertex = queue.pop(0)
		if vertex not in path
			path.push(vertex)
			for i in graph[vertex]
				queue.push(i)
	path

console.log bfs(graph, 0)
