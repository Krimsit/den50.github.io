range = (s, f)->
	[s..f-1]

init = (W, n)->
	A = [] 
	Prev = []
	for i in range(0, n)
		a = []
		for j in range(0, n)
			a.push W[i][j]
		A.push a

	for i in range(0, n)
		a = []
		for j in range(0, n)
			a.push if i != j then j else "-"
		Prev.push a

	A: A, Prev: Prev

main = (_A, _Prev, n)->
	_time = performance.now()
	A = _A
	Prev = _Prev
	for k in range(0, n)
		for i in range(0, n)
			for j in range(0, n)
				if A[i][k] < INF and A[k][j] < INF and A[i][k] + A[k][j] < A[i][j] and i != j
					A[i][j] = A[i][k] + A[k][j]
					Prev[i][j] = k
				else
					if i == j
						A[i][j] = 0
	time = performance.now() - _time
	A: A, Prev: Prev, time: time

getMinPath = (m, l, A, W)->

	if m == l
		return 0
	start = m
	finish = l

	path = [m]
	subpath = []

	# Start path
	while W[m][l] != l
		subpath.push W[m][l]
		l = W[m][l]

	subpath.reverse()
	for i in subpath
		path.push i

	path.push(finish)

	console.log "#{start} -> #{finish}: path#{path}"
	# print(path)
	#Finish path
	summ = 0
	for i in range(0, path.length-1)
		#path[i]
		#path[i+1]
		summ += A[path[i]][path[i+1]]

	return summ

_main = (_start, A, Prev, n)->
	Mins = []
	_time = performance.now()
	for i in range(0, n)
		Mins.push {"#{i}": getMinPath(_start, i, A, Prev) }
	time = performance.now() - _time
	Mins: Mins, time: time

# n = 5
INF = 20000000000000

# W = [
# 	[INF,3,10,INF, INF],
# 	[3,INF, INF, 5,INF],
# 	[10,INF,INF,6, 15],
# 	[INF,5,6,INF, 4],
# 	[INF,INF,INF,4, INF]
# ]

# A = init(W, n).A
# Prev = init(W, n).Prev

# A = main(A, Prev, n).A
# Prev = main(A, Prev, n).Prev

MAIN = (start, W)->
	n = W.length

	A = init(W, n).A
	Prev = init(W, n).Prev


	#Main
	A = main(A, Prev, n).A
	Prev = main(A, Prev, n).Prev

	time = main(A, Prev, n).time

	time += _main(start, A, Prev, n).time

	return maps: _main(start, A, Prev, n).Mins, time: time


module.exports = MAIN