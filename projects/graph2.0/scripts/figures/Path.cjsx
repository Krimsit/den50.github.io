React = require 'react'

Path = React.createClass
	displayName: 'Path'
	render: ->
		<path d={@props.d} fill="transparent" stroke={@props.color} style={{strokeWidth: 2}}/>

module.exports = Path
###
if @props.CalcWeightMode
			<g>
				<path d={@props.d} fill="transparent" stroke="black" style={{strokeWidth: 2}}/>
				<rect x={if @props._xy.x != @props.__xy.x and @props._xy.y != @props.__xy.y then (Math.min(@props._xy.x, @props.__xy.x) + (Math.abs @props._xy.x - @props.__xy.x) / 2 - 32) else (@props._xy.x - 32.5)} 
							y={if @props._xy.x != @props.__xy.x and @props._xy.y != @props.__xy.y then (Math.min(@props._xy.y, @props.__xy.y) + (Math.abs @props._xy.y - @props.__xy.y) / 2 - 16) else (@props._xy.y - 130)}
							width="60" height="30" fill={@props.fill} widthStroke="5" stroke="#333"></rect>
				<text x={if @props._xy.x != @props.__xy.x and @props._xy.y != @props.__xy.y then (Math.min(@props._xy.x, @props.__xy.x) + (Math.abs @props._xy.x - @props.__xy.x) / 2 - 15) else (@props._xy.x - 10)} 
							y={if @props._xy.x != @props.__xy.x and @props._xy.y != @props.__xy.y then (Math.min(@props._xy.y, @props.__xy.y) + (Math.abs @props._xy.y - @props.__xy.y) / 2 - 5) else (@props._xy.y - 120)}
							fill="#fff" dy=".6em" fontFamily="sans-serif" fontSize="17px" className="weightPaths">
								{""+@props.weight}
				</text>
			</g>
		else
###