#
#   2--0--6--7   1--9   5
#   |  |  |
#   3--4  8 
#
n = 10
adj_list = [
	[2, 4, 6],
	[9],
	[0, 3],
	[2, 4],
	[0, 3],
	[],
	[0, 7, 8],
	[6],
	[6],
	[1]
]
s = 0

visited = [] # массив "посещена ли вершина?"

for i in [0..n-1]
	visited.push no
dfs = (v)->
	visited[v] = on
	for w in adj_list[v]
		if not visited[w]  # посещён ли текущий сосед?
			dfs(w)

dfs(s)

summ = 0
for i in visited
	if i
		summ++

console.log summ