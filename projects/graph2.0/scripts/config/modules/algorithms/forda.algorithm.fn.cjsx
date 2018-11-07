range = (s, f)->
	[s..f-1]

INF = 20000000000000
# start = 0
# W = [
# 	[INF,3,10,INF, INF],
# 	[3,INF, INF, 5,INF],
# 	[10,INF,INF,6, 15],
# 	[INF,5,6,INF, 4],
# 	[INF,INF,INF,4, INF]
# ]


main = (W, start)->
	console.log W, start
	N = W.length
	F = []
	for i in range(0, N)
		F.push INF
	F[start] = 0 
	for k in range(1, N)
		for i in range(0, N)
			for j in range(0, N)
				if F[j] + W[j][i] < F[i]
					F[i] = F[j] + W[j][i]
	Mins = {}
	for i, j in F
		Mins[j] = i
	Mins

module.exports = main

