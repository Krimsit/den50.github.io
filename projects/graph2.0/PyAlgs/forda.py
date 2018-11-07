N = 5
INF = 20000000000000
start = 0
W = [
	[INF,3,10,INF, INF],
	[3,INF, INF, 5,INF],
	[10,INF,INF,6, 15],
	[INF,5,6,INF, 4],
	[INF,INF,INF,4, INF]
]
F = [INF] * N 
F[start] = 0 
for k in range(1, N):
  for i in range(N):
    for j in range(N):
      if F[j] + W[j][i] < F[i]:
        F[i] = F[j] + W[j][i]

a = 0
for i in F:
	print(a, ":", i)
	a+=1