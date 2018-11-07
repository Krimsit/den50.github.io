ee = require "../../global/Events"

dejkstra = 	require "./algorithms/dejkstra.algorithm.fn" #|Algorithms ->
floyda = 		require "./algorithms/floyda.algorithm.fn" 		#|
forda = 		require "./algorithms/forda.algorithm.fn" 		#|

INF = 20000000000000

class Switcher
	constructor: (@ArrNames, @Paths, @start)->
		@Mxw = []
		@graph = {}
		@_obj = {}
		@n = 0
		@time = 0
		@ALGNOW = ""
	setArrMx: (arr)->
		@Mxw = []
		for i in arr
			@Mxw.push i
	regist: (data)->
		if typeof data == "string"
			@start = data
			@init(@ALGNOW)
		else
			if typeof data[0][0] == "string"
				@ArrNames = data
			else
				@Paths = data
	getGraph_obj: ->
		arrNames = @ArrNames
		paths = @Paths
		obj = {}
		for i, j in arrNames
			obj[i[0]] = obj[i[0]] or {}
			obj[i[0]][i[1]] = paths[j].weight

		for i, j in arrNames
			tmp = arrNames[j][0]
			arrNames[j][0] = arrNames[j][1]
			arrNames[j][1] = tmp

		for i, j in arrNames
			obj[i[0]] = obj[i[0]] or {}
			obj[i[0]][i[1]] = paths[j].weight
		@graph = obj
	getGraph_mx: ->
		console.log @Mxw
		arr = []
		for i in @Mxw
			_arr = []
			for j in i
				_arr.push if j != 0 then j else INF
			arr.push _arr
		@Mx = arr
		@n = arr.length
	AlgProcess: (type)->
		
		switch type
			when "dejkstra"
				console.log "dejkstra"
				@getGraph_obj()
				time = performance.now()
				@_obj = (dejkstra @graph, @start) or {}
				@time = performance.now() - time

			when "floyda"
				@getGraph_mx()
				console.log @Mx
				# time = performance.now()
				@_obj = (floyda(+@start.match(/\d+/g)[0], @Mx).maps) or {}
				@time = floyda(+@start.match(/\d+/g)[0], @Mx).time
				# @time = performance.now() - time

			when "forda"
				console.log "forda"
				@getGraph_mx()
				time = performance.now()
				@_obj = (forda(@Mx, +@start.match(/\d+/g)[0])) or {}
				@time = performance.now() - time
				
			else @_obj = {}
		

	init: (type_alg) ->
		@ALGNOW = type_alg
		@AlgProcess type_alg
		ee.emit "sendDataAlgs", {type: type_alg, data: @_obj, time: @time}
		# console.log @_obj

module.exports = new Switcher