React = require 'react'

Node = React.createClass
	displayName: 'Node'
	render: ->
		if @props.numberingNodesMode
			<g>
				<circle cx={@props.cx} cy={@props.cy} r={@props.r} fill={@props.bgc} id={@props.id}></circle>
				<text x={@props.cx} y={@props.cy - 3} id={@props.id} stroke="#fff" fill="#fff" textAnchor="middle" alignmentBaseline="middle" dy=".6em" fontFamily="sans-serif" fontSize="17px">{""+(+@props.id.match(/\d+/g)[0])}</text>
			</g>
		else
			<circle cx={@props.cx} cy={@props.cy} r={@props.r} fill={@props.bgc} id={@props.id}></circle>		
module.exports = Node