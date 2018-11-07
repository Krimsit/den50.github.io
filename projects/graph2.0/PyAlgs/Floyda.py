n = 5
INF = 20000000000000

W = [
	[INF,3,10,INF, INF],
	[3,INF, INF, 5,INF],
	[10,INF,INF,6, 15],
	[INF,5,6,INF, 4],
	[INF,INF,INF,4, INF]
]
A = [[W[i][j] for j in range(n)] for i in range(n)] 
Prev = [[j if i != j else "-" for j in range(n)] for i in range(n)] 


for k in range(n):
	for i in range(n):
		for j in range(n):
			if A[i][k] < INF and A[k][j] < INF and A[i][k] + A[k][j] < A[i][j] and i != j:
				A[i][j] = A[i][k] + A[k][j]
				Prev[i][j] = k
			elif i == j:
				A[i][j] = 0

# for i in A:
# 	a = []
# 	for j in i:
# 		a.append(j if j != 0 else "-")
# 	print(a)
# print()
# for i in Prev:
# 	print(i)

# def getPaths_max(n):
# 	n1 = 3
# 	N = 3
# 	for i in range(n-3):
# 		N+=n1
# 		n1+=1
# 	return N

def getMinPath(m, n, A, W):
	if m == n:
		return 0
	start = m
	finish = n

	path = [m]
	subpath = []

	# Start path
	while W[m][n] != n:
		subpath.append(W[m][n])
		n = W[m][n]

	subpath.reverse()
	path.extend(subpath)
	path.append(finish)

	# print(path)
	#Finish path
	summ = 0
	for i in range(len(path)-1):
		#path[i]
		#path[i+1]
		summ += A[path[i]][path[i+1]]

	return summ

Mins = {i: getMinPath(0, i, A, Prev) for i in range(n)}

print(Mins)