React = require 'react'


Matrix = React.createClass
	displayName: "Matrix"
	getInitialState: ->
		matrixNow: "AdjecencyMatrix"
	switchMatrix: (obj)->
		tmp = obj.e.target.classList.value.split(' ')
		for i in tmp
			if i != "IconAction"
				continue
			else
				tmp.push "IconAction"
				break
		obj.e.target.classList.value = tmp.join " "
		# tmp.push "IconAction"
		# obj.e.target.classList = tmp
		if @state.matrixNow != obj.type
			@setState matrixNow: obj.type
	render: ->
		<div className="wrapMatrix">
			<i className={if @state.matrixNow == "AdjecencyMatrix" then "fa far fa-table switchMatrix IconAction" else "fa far fa-table switchMatrix"} title="AdjecencyMatrix" onClick={(e) => @switchMatrix {type: "AdjecencyMatrix", e: e}}></i>
			<i className={if @state.matrixNow == "IncindenceMatrix" then "fa far fa-table switchMatrix IconAction" else "fa far fa-table switchMatrix"} title="IncindenceMatrix" onClick={(e) => @switchMatrix {type: "IncindenceMatrix", e: e}}></i><br />
			{
				if @state.matrixNow == "AdjecencyMatrix"
					if @props.matrix.length != 0
						<table className="AdjecancyMatrix">
							{
								@props.matrix.map (i, l)->
									<tr key="tr#{l}">
										{
											i.map (j, p)->
												if j == 0
													return <td className="cgray50" key="td#{p}">{j}</td>
												else
													return <td key="td#{p}">{j}</td>
										}
									</tr>
							}
						</table>
					else
						<span>Adjecency matrix is empty<br />Сlick into the empty space...</span>
				else#
					if @state.matrixNow == "IncindenceMatrix"
						<span>Incindence matrix is empty<br />Сlick into the empty space...</span>
			}
			
		</div>

module.exports = Matrix