React = require 'react'
ee = require '../../global/Events'

RadiusChanger = React.createClass
	displayName: "RadiusChanger"
	getInitialState: ->
		RadiusNow: 20
		range: {}

	handleChange: (e)->
		@setState RadiusNow: +e.target.value
		ee.emit 'radiusChangeNode', {r: +e.target.value}
	handleClickReset: ->
		@setState RadiusNow: 20
		document.getElementById('InRange').value = 20
		ee.emit 'radiusChangeNode', {r: 20}
	render: ->
		<div className="wrapRadiusChanger">
			<span id="span_switch_color">Change radius nodes:</span><br/>
			<span className="showRadius">{@state.RadiusNow}</span>
			<button onClick={@handleClickReset} className="resetRadiusNode">Reset</button>
			<input type="range" min="10" max="30" id="InRange" step="1" onChange={((e)=>@handleChange e)}/>
		</div>


module.exports = RadiusChanger