React = require 'react'
ee = require "../../global/Events"

Info = React.createClass
	displayName: "Info"
	getInitialState: ->
		itemNow: "history"
		typeAlg: ""
		dataAlg: {}
		timeAlg: 0
		middleTimeAlg: 0
		noTest: 1
		dataGenerate: {}
	switchItem: (obj)->
		tmp = obj.e.target.classList.value.split(' ')
		for i in tmp
			if i != "IconActionGold"
				continue
			else
				tmp.push "IconActionGold"
				break
		obj.e.target.classList.value = tmp.join " "
		# tmp.push "IconAction"
		# obj.e.target.classList = tmp
		if @state.itemNow != obj.type
			@setState itemNow: obj.type
	getPaths_max: (n)->
		if n > 3
			n1 = 3
			N = 3
			for i in [0..n-4]
				N+=n1
				n1++
			return N
		else
			return -1
			# else
			# 	return -1
	getValGenerate: (e, obj)->
		data = @state.dataGenerate or {}
		data[obj.type] = e.target.value
		@setState dataGenerate: data
	generate_graph: (e)->
		ee.emit "generate", data: @state.dataGenerate
		console.log @state.dataGenerate
	componentWillMount: ->
		# ee.on "switchAlgorithm", (data)=>
		# 	@setState typeAlg: data.data
		# 	@setState itemNow: "map"
		ee.on "sendDataAlgs", (data)=>
			@setState itemNow: "map"
			console.log data
			if @state.typeAlg == data.type
				@setState middleTimeAlg: (@state.middleTimeAlg + data.time) / 2
			else
				@state.middleTimeAlg = 0
			if @state.typeAlg is data.type then @setState(noTest: @state.noTest+1) else @setState(noTest: 1)
			@setState typeAlg: data.type
			@setState dataAlg: data.data
			@setState timeAlg: data.time
			
	render: ->
		<div className="wrapInfo">
			<i className={if @state.itemNow == "history" then "fa fa-history itemInfoIcon IconActionGold" else "fa fa-history itemInfoIcon"} title="history" onClick={(e) => @switchItem {type: "history", e: e}}></i>
			<i className={if @state.itemNow == "database" then "fa fa-database itemInfoIcon IconActionGold" else "fa fa-database itemInfoIcon"} title="database" onClick={(e) => @switchItem {type: "database", e: e}}></i>
			<i className={if @state.itemNow == "map" then "fa fa-map itemInfoIcon IconActionGold" else "fa fa-map itemInfoIcon"} title="map" onClick={(e) => @switchItem {type: "map", e: e}}></i>
			<i className={if @state.itemNow == "generate" then "fa fa-plus itemInfoIcon IconActionGold" else "fa fa-plus itemInfoIcon"} title="generate" onClick={(e) => @switchItem {type: "generate", e: e}}></i>
			{
				if @state.itemNow == "history"
					<div className="wrap_history">
						<div className="history">
							{
								@props.history.map (i, j)->
									<div className="history_item" key="item#{j}">{i.type}: {i.MainData}</div>
							}
						</div>
					</div>
				else
					if @state.itemNow == "database"
						<div>
							<span>Count nodes: {@props.database.nodes.length}</span><br/>
							<span>Count paths: {@props.database.paths.length}</span>
						</div>
					else
						if @state.itemNow == "map"
							if @state.dataAlg?
								<div className="wrapMap">
									<span className="InfoAlg">Type_algorithm: <span className="klaster">{@state.typeAlg}</span></span>
									<span className="InfoAlg">Time work algorithm: <span className="klaster">{@state.timeAlg}</span></span>
									<span className="InfoAlg">Middle time work algorithm: <span className="klaster">{@state.middleTimeAlg}</span></span>
									<span className="InfoAlg">Number test algorithm: <span className="klaster">{@state.noTest}</span></span>
									<div className="wrapMapItem">
										{
											Object.keys(@state.dataAlg).map (i, j)=>
												<div>
												<span>{i}: {@state.dataAlg[i]}</span><br />
												</div>
										}
									</div>
								</div>
							else
								<p>ooooooh=)MAP IS EMPTY)</p>
						else
							if @state.itemNow == "generate"
								<div>
									<br/>
									<label>Nodes_count: <input type="number" title="nodes_count" onChange={((e)=> @getValGenerate(e, {type: "nodes_count"}))}/></label><br/>
									<label>Paths_count: <input type="number" title="paths_count" onChange={((e)=> @getValGenerate(e, {type: "paths_count"}))}/></label><span>max: {@getPaths_max @state.dataGenerate.nodes_count}</span><br/>
									<button className="generateBtn" onClick={((e)=>@generate_graph e)}>Generate!</button>
								</div>
			}
			
		</div>

module.exports = Info