ee = require "../../global/Events"

###
HISTORY = [
	{ type: "AddNode", date: "21:3:58", id: "circle0" }
	{ type: "AddNode", date: "21:3:59", id: "circle1" }
	{ type: "AddPath", date: "21:4:11" }
]
###
class History_class
	constructor: ->
		@HISTORY = []
		@Configs = {
			use: ["user", "App"]
		}
		@types_history = [
			"AddNode"
			"AddPath"
			"DeleteNode"
			"changeColorNode"
			"changeRadiusNode"
		]
	setEvent: (obj, type_event)->
		tmp = {}
		tmpstrDate = new Date
		strDate = ""+tmpstrDate.getHours() + ":"+tmpstrDate.getMinutes() + ":"+tmpstrDate.getSeconds()
		tmp["type"] = type_event
		
		if type_event is "AddNode" then tmp["MainData"] = obj.id
		if type_event == "changeColorNode" then tmp["MainData"] = obj.color
		if type_event == "AddPath" then tmp["MainData"] = obj.d
		if type_event == "changeRadiusNode" then tmp["MainData"] = obj.r
		if type_event == "deleteMode" then tmp["MainData"] = ""+obj.deletingMode
		if type_event == "DeleteNodeById" then tmp["MainData"] = obj.id
		if type_event == "modeNodesNumbering" then tmp["MainData"] = ""+obj.modeNodesNumbering
		if type_event == "calcWeightPathsMode" then tmp["MainData"] = ""+obj.data
		if type_event == "addItemMapMode" then tmp["MainData"] = ""+obj.data
		tmp["date"] = strDate
		if obj.id? then tmp['id'] = obj.id
		@HISTORY.push tmp
		ee.emit 'changeHistory', {data: @HISTORY}
	getHistory: ->
		@HISTORY

history_app = new History_class

module.exports = history_app