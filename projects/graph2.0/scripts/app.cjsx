React = require 'react'																		#|Platform
ee = require './global/Events'														#|Events

Node = require "./figures/Node"														#|Figures
Path = require "./figures/Path"														#|

getWeight = require "./config/modules/calcWeightPaths.fn"	#|Get Weight for paths in Graph

Configs = require './config/classes/Configs'							#|Configs class
amx = require './config/modules/adjacency_matrix.fn'			#|module matrix
history_app = require "./config/modules/history.module"	  #|module history

switcher = require "./config/modules/switcher.controller"

generating_nodes = require("./config/modules/generate.fn").get_Nodes_sequence
generating_paths = require("./config/modules/generate.fn").write_paths

App = React.createClass
	displayName: 'App'

	getInitialState:->
		Nodes: []
		Paths: []
		deletingMode: false
		modeNodesNumbering: false
		calcWeightMode: false
		addItemMapMode: false
		ALGNOW: "dejkstra"
		STARTNode: ""
		history_app: []
		_Matrix: []
		MatrixNamesNodes: []
		maps: []
		colorNodes: "#2e9f5c"
		radiusNode: 20
		IdsPath: []
		val: 0

	handleClick: (e)->
		#console.log "X: #{e.nativeEvent.offsetX}, Y: #{e.nativeEvent.offsetY}"
		if e.target.nodeName == "svg" and !@state.deletingMode
			@setState val: @state.val + 1
			@AddNode e.nativeEvent.offsetX, e.nativeEvent.offsetY, "circle"+@state.val, @state.colorNodes, @state.radiusNode
		if e.target.nodeName == "circle" or e.target.nodeName == "text"
			#Map
			if @state.addItemMapMode
				#ReColor for Nodes =)
				
				@setState STARTNode: e.target.attributes.id.nodeValue
				switcher.regist e.target.attributes.id.nodeValue



				# switcher.init @state.ALGNOW # run algorithms




				if @state.STARTNode is ""
					for i, j in @state.Nodes
						if i.id == e.target.attributes.id.nodeValue
							tmp = @state.Nodes
							tmp[j].color = "#FF0018"
							@setState Nodes: tmp
							@state.maps.push i
							break
				else
					for i, j in @state.Nodes
						if i.id == @state.STARTNode
							tmp = @state.Nodes
							tmp[j].color = @state.colorNodes
							@setState Nodes: tmp
							@state.maps.push i
							break
					for i, j in @state.Nodes
						if i.id == e.target.attributes.id.nodeValue
							tmp = @state.Nodes
							tmp[j].color = "#FF0018"
							@setState Nodes: tmp
							@state.maps.push i
							break


				# for i in @state.maps
				# 	for k in @state.MatrixNamesNodes
				# 		if (i.id == k[0] and e.target.attributes.id.nodeValue == k[1]) or (i.id == k[1] and e.target.attributes.id.nodeValue == k[0])
				# 			for l, p in @state.Paths
				# 				no1 = l.id.split(".")[0]
				# 				no2 = l.id.split(".")[1]
				# 				if (i.id == no1 and e.target.attributes.id.nodeValue == no2) or (i.id == no2 and e.target.attributes.id.nodeValue == no1)
				# 					tmp = @state.Paths
				# 					tmp[p].color = "red"
				# 					@setState Paths: tmp
				# 					break
			else
				#Delete on ckich keybord -> alt
				if e.altKey
					@DeleteNodeById(e.target.id)
				else
					if !@state.deletingMode
						@AddPath e.target.id
					else
						@DeleteNodeById(e.target.id)

	AddNode: (cx, cy, id, color, r)->
		@state.Nodes.push {cx: cx, cy: cy, id: id, color: color, r: r}
		@setState _Matrix: amx @state.MatrixNamesNodes, @state.Paths, @state.Nodes.length, @state.calcWeightMode
		history_app.setEvent {cx: cx, cy: cy, id: id, color: color, r: r}, 'AddNode'
		switcher.setArrMx @state._Matrix
		#console.log @state.Nodes
	DeleteLastNode: ->
		tmp = @state.Nodes
		tmp.splice tmp.length - 1, tmp.length
		@setState Nodes: tmp
	DeleteNodeById: (id)->
		tmp = @state.Nodes
		tmpMN = @state.MatrixNamesNodes
		#console.log +id.match(/\d+/g)[0]
		for i, l in @state.Nodes
			if id == i.id
				history_app.setEvent {id: id}, "DeleteNodeById"
				tmp.splice l, 1
				warr = []
				###
				Delete nodes in Adjacency matrix
				begin....
				###
				for q, w in tmpMN
					if q[0] == id or q[1] == id
						#tmpMN.splice w, 1
						warr.push w
				warr.reverse()
				for i in warr
					tmpMN.splice i, 1
					@state.Paths.splice i, 1
				###
				Delete nodes in Adjacency matrix
				End...
				###
				break
		for i, j in tmp
			i.id = "circle#{j}"
			tmp[j] = i
		@setState Nodes: tmp
		maxValArr = []
		#Rename nodes)
		for i, j in tmpMN
			IT = +id.match(/\d+/g)[0]
			num = /\d+/g
			NOW0 = +i[0].match(num)[0]
			NOW1 = +i[1].match(num)[0]
			if NOW0 > IT
				tmpMN[j][0] = "circle#{NOW0-1}"
			if NOW1 > IT
				tmpMN[j][1] = "circle#{NOW1-1}"
		for i in @state.Nodes
			maxValArr.push +i.id.match(/\d+/g)[0]
		maxVal = Math.max.apply(null, maxValArr);
		if @state.Nodes.length == 0
			@setState val: 0
		else
			@setState val: maxVal + 1
		@setState MatrixNamesNodes: tmpMN
		@setState _Matrix: amx @state.MatrixNamesNodes, @state.Paths, @state.Nodes.length, @state.calcWeightMode

	AddPath: (id)->
		@state.IdsPath.push id
		if @state.IdsPath.length == 2
			@DrawPath @state.IdsPath
			@state.MatrixNamesNodes.push @state.IdsPath
			switcher.regist @state.MatrixNamesNodes
			@setState _Matrix: amx @state.MatrixNamesNodes, @state.Paths, @state.Nodes.length, @state.calcWeightMode
			@setState IdsPath: []
			

	DrawPath: (ids)->

		coords = []
		str = "M"
		if ids[0] == ids[1]
			#Arc
			coords.push {cx: document.getElementById(ids[0]).attributes.cx.value, cy: document.getElementById(ids[0]).attributes.cy.value}
			cx = +coords[0].cx
			cy = +coords[0].cy
			str = "M#{cx} #{cy} C #{cx - 150} #{cy - 150}, #{cx + 150} #{cy - 150}, #{cx} #{cy}"
		else	
			for i in ids
				coords.push {cx: document.getElementById(i).attributes.cx.value, cy: document.getElementById(i).attributes.cy.value}
			for i, j in coords
				if j == 0
					str += " #{i.cx}, #{i.cy}"
				else
					str += "L #{i.cx}, #{i.cy}Z"
		history_app.setEvent {d: str}, "AddPath"
		_xy = 
			x: 0
			y: 0
		__xy = 
			x: 0
			y: 0
		for i in @state.Nodes
			if ids[0] == i.id
				_xy.x = i.cx
				_xy.y = i.cy
			if ids[1] == i.id
				__xy.x = i.cx
				__xy.y = i.cy

		self = @
		@state.Paths.push 
			d: str
			coords1: {x: _xy.x, y: _xy.y}
			coords2: {x: __xy.x, y: __xy.y}
			weight: getWeight [{x: _xy.x, y: _xy.y}, x: __xy.x, y: __xy.y]
			color: "#000"
			fill: self.state.colorNodes
			id: "#{ids[0]}.#{ids[1]}"
		switcher.regist @state.Paths
		switcher.setArrMx @state._Matrix
	deletingModeActive: ->
		for i in @state.Nodes
			i.color = "#FF0018"
	deletingModeNoActive: ->
		for i in @state.Nodes
			i.color = @state.colorNodes
	componentWillMount: ->
		ee.on 'changeColorNodes', ((color)=>
			#console.log color
			@setState colorNodes: color.color
			history_app.setEvent {color: color.color}, 'changeColorNode'
		)
		ee.on 'radiusChangeNode', ((r)=>
			#console.log r.r
			@setState radiusNode: r.r
			history_app.setEvent {r: r.r}, 'changeRadiusNode'
		)
		ee.on "changeDeletingMode", (data)=>
			@setState deletingMode: data.data
			if data.data then @deletingModeActive() else @deletingModeNoActive()
		ee.on "ChangeModeNodesNumbering", (data)=>
			@setState modeNodesNumbering: data.data
		ee.on "ChangeCalcWeightPathsMode", (data)=>
			@setState calcWeightMode: data.data
			@setState _Matrix: amx @state.MatrixNamesNodes, @state.Paths, @state.Nodes.length, data.data
		ee.on "AddItemMapMode", (data)=>
			@setState addItemMapMode: data.data
			if !data.data
				for i, j in @state.Nodes
					if i.color == "#FF0018"
						tmp = @state.Nodes
						tmp[j].color = @state.colorNodes
						@setState Nodes: tmp

		ee.on 'changeHistory', (data) =>
			@setState history_app: data.data
		#ee.on "switchAlgorithm", (data)=>
		#	pass = 0
		ee.on 'switchAlgorithm', (data) =>
			@setState ALGNOW: data.type
			switcher.setArrMx @state._Matrix
			switcher.init data.type # run algorithms
		ee.on "generate", (data)=>
			@generateGraph(data.data.nodes_count, data.data.paths_count)


	generateGraph: (nodes_count, paths_count)->
		# console.log generating_nodes 20, 30, 30, {width: window.innerWidth * 0.8, height: window.innerHeight}
		for i, j in generating_nodes nodes_count, 30, 30, {width: window.innerWidth * 0.8, height: window.innerHeight}
			@AddNode i.cx, i.cy, "circle#{j}", @state.colorNodes, 20
		setTimeout (=>
			@setState MatrixNamesNodes: generating_paths paths_count, nodes_count
			switcher.regist @state.MatrixNamesNodes
			for i in generating_paths paths_count, nodes_count
				@DrawPath i
		), 1500
	render: ->
		<div id="wrap">
		  <svg height="100%" version="1.1" width="100%" xmlns="http://www.w3.org/2000/svg" onClick={((e)=>this.handleClick e)}>
		  	<desc>Created with Daniil(https://github.com/den50)</desc>
		  	<defs></defs>
				{
		  		@state.Paths.map((i)=>
		  			<Path d={i.d} _xy={i.coords1} __xy={i.coords2} weight={i.weight} fill={i.fill} CalcWeightMode={@state.calcWeightMode} id={i.id} color={i.color} />
		  		)
		  	}
		  	{
		  		@state.Nodes.map((i)=>
		  			<Node cx={i.cx} cy={i.cy} id={i.id} bgc={i.color} r={i.r} numberingNodesMode={@state.modeNodesNumbering} />
		  		)
		  	}
		  </svg>
		  <Configs 
		  	matrix={@state._Matrix} 
		  	history={@state.history_app} 
		  	database={{nodes: @state.Nodes, paths: @state.Paths}}
		  	maps={@state.maps} />
		</div>      

# dataAlg={if @state.MatrixNamesNodes.length != 0 and @state.Paths.length != 0 and @state.STARTNode.length != 0 then {obj: dejkstra(get_graph(@state.MatrixNamesNodes, @state.Paths), @state.STARTNode), type_algorithm: "dejkstra", time: @getTimeWorkAlg dejkstra}}
module.exports = App	  


###
copyright; Daniil Shenyagin, 2018
###