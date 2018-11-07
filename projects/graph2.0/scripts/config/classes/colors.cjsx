React = require 'react'

Colors = React.createClass
	displayName: 'Colors'
	handleSwitch: (id)->
		console.log id
	render: ->
		<div className="colors_switch">
			<span id="span_switch_color">Switch color nodes:</span><br/>
			{
				@props.colors.map((i, j)=>
					if typeof i.color == "string"
						<div style={{backgroundColor: i.color}} className={if i.active then "color_item active" else "color_item"} onClick={@props.onChange.bind(null, i.id)} key="Color#{j}"></div>
					else
						<div style={{backgroundColor: i.color[0]}} className={if i.active then "color_item active" else "color_item"} onClick={@props.onChange.bind(null, i.id)} key="Color#{j}"></div>
				)
			}
		</div>

module.exports = Colors