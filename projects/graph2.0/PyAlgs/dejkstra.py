#!/usr/bin/env python
# -*- coding: utf-8 -*-
def dijkstra_shortest_path(graph, start, p={}, u=[], d={}):

	if len(p) == 0: p[start] = 0 # инициализация начального пути
	# print "start V: %d, " % (start)
	for x in graph[start]:
		#print(x) - Номер вершины (a - 0, b - 1, c - 2...)
		if ((x not in u) and x != start):
			if (x not in p.keys() or (graph[start][x] + p[start]) < p[x]):
				p[x] = graph[start][x] + p[start]

	u.append(start)

	min_v = 0
	min_x = None
	for x in p:
		# print "x: %d, p[x]: %d, mv %d" % (x, p[x], min_v)
		if (p[x] < min_v or min_v == 0) and x not in u:
			min_x = x
			min_v = p[x]

	if(len(u) < len(graph) and min_x):
		return dijkstra_shortest_path(graph, min_x, p, u)
	else:
		return p

if __name__ == '__main__':
# инициализация графа с помощью словаря смежности
	a, b, c, d, e, f, g, h = range(8)
	N = [
		{b: 7, c: 9, f: 14},#a
		{a: 7, c: 10, d: 15},#b
		{a: 9, b: 10, d: 11, f: 2},#c
		{b: 15, c: 11, e: 6},#d
		{d: 6, f: 9},#e
		{a: 14, c: 2, e: 9},#f
		{h: 2},#g
		{g: 2}#h
	]
	print(dijkstra_shortest_path(N, a))
# b in N[a] - смежность
# len(N[f]) - степень
# N[a][b] - вес (a,b)
# print N[a][b]